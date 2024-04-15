
namespace Server;
using MySql.Data.MySqlClient;

public class Bid
{
    public int id { get; set; }
    public int itemid { get; set; }
    public int bidderid { get; set; }
    public decimal bidamount { get; set; }
    public DateTime datetime { get; set; }
    public bool isactive { get; set; }
}

public static class Bids
{
    public static List<Bid> GetAllBids(State state)
    {
        var bids = new List<Bid>();
        using (var connection = new MySqlConnection(state.DB))
        {
            connection.Open();
            var query = "SELECT * FROM bids";
            using (var cmd = new MySqlCommand(query, connection))
            {
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        bids.Add(new Bid
                        {
                            id = reader.GetInt32("id"),
                            itemid = reader.GetInt32("itemid"),
                            bidderid = reader.GetInt32("bidderid"),
                            bidamount = reader.GetDecimal("bidamount"),
                            datetime = reader.GetDateTime("datetime"),
                            isactive = reader.GetBoolean("isactive")
                        });
                    }
                }
            }
        }
        return bids;
    }

    public static List<Bid> GetBidsForItem(int itemId, State state)
    {
        var bids = new List<Bid>();
        using (var connection = new MySqlConnection(state.DB))
        {
            connection.Open();
            var query = "SELECT * FROM bids WHERE itemid = @ItemId";
            using (var cmd = new MySqlCommand(query, connection))
            {
                cmd.Parameters.AddWithValue("@ItemId", itemId);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        bids.Add(new Bid
                        {
                            id = reader.GetInt32("id"),
                            itemid = reader.GetInt32("itemid"),
                            bidderid = reader.GetInt32("bidderid"),
                            bidamount = reader.GetDecimal("bidamount"),
                            datetime = reader.GetDateTime("datetime"),
                            isactive = reader.GetBoolean("isactive")
                        });
                    }
                }
            }
        }
        return bids;
    }
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
    
    public record BidResult(bool Success, string Message, int? HighestBid = null, int? NewBalance = null);

    public record BidRequestDTO(int UserId, int ItemId, int BidAmount);
    
    public static BidResult PlaceBid(int id, BidRequestDTO request, State state)
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
                int newBalance = Single(request.UserId, state).balance;
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
   public static IResult GetHighestBidForItem(int itemid, State state)
{
    string highestBidQuery = "SELECT MAX(bidamount) as HighestBid FROM bids WHERE itemid = @itemid AND isactive = TRUE";
    var highestBidParameter = new MySqlParameter("@itemid", itemid);

    try
    {
        using var reader = MySqlHelper.ExecuteReader(state.DB, highestBidQuery, highestBidParameter);
        if (reader.Read() && !reader.IsDBNull(reader.GetOrdinal("HighestBid")))
        {
            int highestBid = reader.GetInt32(reader.GetOrdinal("HighestBid"));
            return Results.Json(new { HighestBid = highestBid });  
        }
        return Results.Json(new { Message = "No active bids found for this item." });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error retrieving highest bid: {ex.Message}");
        return Results.Problem($"Server error: {ex.Message}", statusCode: 500);  
    }
}

}
