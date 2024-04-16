
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
    public record BidResult(bool Success, string Message, int? HighestBid = null);

    public record BidRequestDTO(int UserId, int ItemId, int BidAmount);
    
    public static BidResult PlaceBid(int id, BidRequestDTO request, State state)
{
    int? highestBid = null;
    using var connection = new MySqlConnection(state.DB);
    connection.Open();

    // Start a transaction
    using var transaction = connection.BeginTransaction();
    try
    {
        // Check highest bid
        string highestBidQuery = "SELECT MAX(bidamount) as HighestBid FROM bids WHERE itemid = @itemid AND isactive = TRUE";
        var highestBidParameter = new MySqlParameter("@itemid", request.ItemId);

        using (var command = new MySqlCommand(highestBidQuery, connection))
        {
            command.Parameters.Add(highestBidParameter);
            using (var reader = command.ExecuteReader())
            {
                if (reader.Read() && !reader.IsDBNull(reader.GetOrdinal("HighestBid")))
                {
                    highestBid = reader.GetInt32(reader.GetOrdinal("HighestBid"));
                }
            }
        }

        if (highestBid.HasValue && request.BidAmount <= highestBid)
        {
            return new BidResult(false, "There is already a higher or equal bid.", highestBid);
        }

        // Check user balance
        string balanceQuery = "SELECT balance FROM users WHERE id = @userId";
        using (var balanceCommand = new MySqlCommand(balanceQuery, connection))
        {
            balanceCommand.Parameters.Add(new MySqlParameter("@userId", request.UserId));
            int currentBalance = (int)balanceCommand.ExecuteScalar();
            if (currentBalance < request.BidAmount)
            {
                return new BidResult(false, "Insufficient balance to place the bid.");
            }
        }

        // Insert the bid
        string insertQuery = "INSERT INTO bids (itemid, bidderid, bidamount, datetime, isactive) VALUES (@itemid, @bidderid, @bidamount, NOW(), TRUE)";
        using (var insertCommand = new MySqlCommand(insertQuery, connection))
        {
            insertCommand.Parameters.AddRange(new MySqlParameter[]
            {
                new MySqlParameter("@itemid", request.ItemId),
                new MySqlParameter("@bidderid", request.UserId),
                new MySqlParameter("@bidamount", request.BidAmount)
            });
            insertCommand.ExecuteNonQuery();
        }

        // Update user balance
        string updateQuery = "UPDATE users SET balance = balance - @bidAmount WHERE id = @userId";
        using (var updateCommand = new MySqlCommand(updateQuery, connection))
        {
            updateCommand.Parameters.Add(new MySqlParameter("@userId", request.UserId));
            updateCommand.Parameters.Add(new MySqlParameter("@bidAmount", request.BidAmount));
            updateCommand.ExecuteNonQuery();
        }

        // Commit the transaction
        transaction.Commit();
        return new BidResult(true, "Bid successfully placed.", request.BidAmount);
    }
    catch (Exception ex)
    {
        // Roll back the transaction on error
        transaction.Rollback();
        return new BidResult(false, "Failed to place the bid due to an error: " + ex.Message);
    }
}
}
