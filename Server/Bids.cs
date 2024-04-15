
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
}
