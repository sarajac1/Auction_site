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
//everything that has to do with bids will come here
public static class Bids
{
    // Connection to the db
    public static string ConnectionString { get; set; }
    // Method for fetching all bids
    public static List<Bid> GetAllBids(State state)
    {
        var bids = new List<Bid>();
        // Selecting the db
        var reader= MySqlHelper.ExecuteReader(state.DB,"SELECT * FROM bids");
        
        //goes through the fetch data and creates a Listing object (var bid= new Bid)
        while (reader.Read())
        {
            var bid = new Bid
            {
                id = reader.GetInt32("id"),
                itemid = reader.GetInt32("itemid"),
                bidderid= reader.GetInt32("bidderid"),
                bidamount = reader.GetInt32("bidamount"),
                datetime = reader.GetDateTime("datetime"),
                isactive = reader.GetBoolean("isactive")
            };
            bids.Add(bid);
        }
        return bids;
    }
    // Method for fetching bids for a specific item ID
    public static List<Bid> GetBidsByItemId(int itemid, State state)
    {
        List<Bid> bids = new List<Bid>();
        
        //parameters handling
        var parameters = new MySqlParameter[]
        {
            new MySqlParameter("@itemid", itemid)
        };
        var reader= MySqlHelper.ExecuteReader(state.DB,"SELECT * FROM bids WHERE itemid = @itemid", parameters); 
        while (reader.Read())
        { 
            var bid = new Bid
            { 
                id = reader.GetInt32("id"),
                itemid = reader.GetInt32("itemid"),
                bidderid= reader.GetInt32("bidderid"),
                bidamount = reader.GetInt32("bidamount"),
                datetime = reader.GetDateTime("datetime"),
                isactive = reader.GetBoolean("isactive") 
            }; 
            bids.Add(bid); 
        }
        return bids;
    }
  
}