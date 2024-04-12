namespace Server;
using MySql.Data.MySqlClient;
public class Bid
{
    public int id { get; set; }
    public int itemid  { get; set; }
    public int bidderid { get; set; }
    public int bidamount { get; set; }
    public DateTime datetime { get; set; }
    public bool isactive { get; set; }
}

public static class Bids
{
    public static string ConnectionString { get; set; }

    public static List<Bid> GetAllBids(State state)
    {
        var bids = new List<Bid>();

        var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM bids");

        while (reader.Read())
        {
            var bid = new Bid
            {
                id = reader.GetInt32("id"),
                itemid = reader.GetInt32("itemid"),
                bidderid = reader.GetInt32("bidderid"),
                bidamount = reader.GetInt32("bidamount"),
                datetime = reader.GetDateTime("datetime"),
                isactive = reader.GetBoolean("isactive")
            };
            bids.Add(bid);
        }

        return bids;
    }

    // get bids with a specific item ID
    public static List<Bid> GetBidsByItemId(int itemid, State state)
    {
        List<Bid> bids = new List<Bid>();

        var parameters = new MySqlParameter[]
        {
            new MySqlParameter("@itemid", itemid)
        };
        var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM bids WHERE itemid = @itemid", parameters);
        while (reader.Read())
        {
            var bid = new Bid
            {
                id = reader.GetInt32("id"),
                itemid = reader.GetInt32("itemid"),
                bidderid = reader.GetInt32("bidderid"),
                bidamount = reader.GetInt32("bidamount"),
                datetime = reader.GetDateTime("datetime"),
                isactive = reader.GetBoolean("isactive")
            };
            bids.Add(bid);
        }

        return bids;
    }

    //Get user balance:

    public record SingleDTO(int id, int balance);

    public static SingleDTO? Single(int id, State state)
    {
        SingleDTO? result = null;

        string query = "SELECT id, balance FROM users WHERE id = @id";
        var parameter = new MySqlParameter("@id", id);

        using var reader = MySqlHelper.ExecuteReader(state.DB, query, parameter);
        if (reader.Read())
        {
            int fetchedId = reader.GetInt32(reader.GetOrdinal("id"));
            int fetchedBalance = reader.GetInt32(reader.GetOrdinal("balance"));

            result = new SingleDTO(fetchedId, fetchedBalance);
        }

        return result;
    }

    
    public record PlaceBidRequestDTO(int UserId, int ItemId, int BidAmount);

    public record BidResult(bool Success, string Message, int? HighestBid = null);

    public record BidRequestDTO(int UserId, int ItemId, int BidAmount);

    public static BidResult CheckBid(BidRequestDTO request, State state)
    {
        var user = Single(request.UserId, state);
    
        if (user == null)
            return new BidResult(false, "User not found.");

        if (user.balance < request.BidAmount)
            return new BidResult(false, "Insufficient balance for this bid.");

        string query = "SELECT MAX(bidamount) as HighestBid FROM bids WHERE itemid = @itemid AND isactive = TRUE";
        var highestBidParameter = new MySqlParameter("@itemid", request.ItemId);
    
        using var reader = MySqlHelper.ExecuteReader(state.DB, query, highestBidParameter);
        int highestBid = 0;
    
        if(reader.Read() && !reader.IsDBNull(reader.GetOrdinal("HighestBid")))
        {
            highestBid = reader.GetInt32(reader.GetOrdinal("HighestBid"));

            if (request.BidAmount <= highestBid)
            {
                return new BidResult(false, "There is already a higher or equal bid.", highestBid);
            }
        }

        return new BidResult(true, "Bid can be placed successfully.", highestBid);
    }

    public static async Task<string> PlaceBid(int userId, int itemId, int bidAmount, State state, MySqlConnection connection)
    {
        BidRequestDTO request = new BidRequestDTO(userId, itemId, bidAmount);

        BidResult result = CheckBid(request, state);

        if (result.Success)
        {
            string insertQuery = "INSERT INTO bids (itemid, bidderid, bidamount, datetime, isactive) VALUES (@itemid, @bidderid, @bidamount, NOW(), TRUE)";
        
            await MySqlHelper.ExecuteNonQueryAsync(connection, insertQuery,
                new MySqlParameter("@itemid", itemId),
                new MySqlParameter("@bidderid", userId),
                new MySqlParameter("@bidamount", bidAmount));
        
            return "Bid placed successfully.";
        }
        else
        {
            return result.Message;
        }
    }



}

//PLACE /POST new bid
//{
//GET user balance - done

//GET is bid valid

// POST new bid

//UPDATE user balance
//}



    // i need a get a user based on a token ID?
   // i need a get existing bids for a specific item/listing using ?
        // the sql sstatement would be something like SELECT bid.id, listings.id FROM id,  itemid, bidder id...., WHERE  bid.itemid = listings.id and ...... 
   
   // get a bid with a specific itemid //MySQL query
   //Get for the highest bid --> do i actually need it? will it not just compare it in the react? 
   //i need a patch - to Update user balance
   // i need a post to add the new bid
