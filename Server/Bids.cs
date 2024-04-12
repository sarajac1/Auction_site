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
    
    public static BidResult PlaceBid(BidRequestDTO request, State state)
    {
        var user = Single(request.UserId, state);
    
        if (user == null)
            return new BidResult(false, "User not found.");

        if (user.balance < request.BidAmount)
            return new BidResult(false, "Insufficient balance for this bid.");

        // Check highest bid
        string highestBidQuery = "SELECT MAX(bidamount) as HighestBid FROM bids WHERE itemid = @itemid AND isactive = TRUE";
        var highestBidParameter = new MySqlParameter("@itemid", request.ItemId);
    
        using var reader = MySqlHelper.ExecuteReader(state.DB, highestBidQuery, highestBidParameter);
        int highestBid = 0;
    
        if (reader.Read() && !reader.IsDBNull(reader.GetOrdinal("HighestBid")))
        {
            highestBid = reader.GetInt32(reader.GetOrdinal("HighestBid"));

            if (request.BidAmount <= highestBid)
            {
                return new BidResult(false, "There is already a higher or equal bid.", highestBid);
            }
        }

        // Insert the bid
        string insertQuery = "INSERT INTO bids (itemid, bidderid, bidamount, datetime, isactive) VALUES (@itemid, @bidderid, @bidamount, NOW(), TRUE)";
        var insertParams = new[] {
            new MySqlParameter("@itemid", request.ItemId),
            new MySqlParameter("@bidderid", request.UserId),
            new MySqlParameter("@bidamount", request.BidAmount)
        };

        if (MySqlHelper.ExecuteNonQuery(state.DB, insertQuery, insertParams) > 0)
        {
            // Update balance if bid is successfully placed
            if (UpdateUserBalance(request.UserId, request.BidAmount, state))
            {
                return new BidResult(true, "Bid successfully placed.", request.BidAmount);
            }
            else
            {
                return new BidResult(false, "Failed to update user balance.");
            }
        }
        else
        {
            return new BidResult(false, "Failed to place the bid.");
        }
    }

    public static bool UpdateUserBalance(int userId, int bidAmount, State state)
    {
        string updateQuery = "UPDATE users SET balance = balance - @bidAmount WHERE id = @userId";
        var updateParams = new[] {
            new MySqlParameter("@userId", userId),
            new MySqlParameter("@bidAmount", bidAmount)
        };

        int result = MySqlHelper.ExecuteNonQuery(state.DB, updateQuery, updateParams);
        return result > 0;
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
