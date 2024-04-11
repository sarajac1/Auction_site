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
        
        var reader= MySqlHelper.ExecuteReader(state.DB,"SELECT * FROM bids");
        
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
    // get bids with a specific item ID
    public static List<Bid> GetBidsByItemId(int itemid, State state)
    {
        List<Bid> bids = new List<Bid>();
        
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

    // i need a get a user based on a token ID?
   // i need a get existing bids for a specific item/listing using ?
        // the sql sstatement would be something like SELECT bid.id, listings.id FROM id,  itemid, bidder id...., WHERE  bid.itemid = listings.id and ...... 
   
   // get a bid with a specific itemid //MySQL query
   //Get for the highest bid --> do i actually need it? will it not just compare it in the react? 
   //i need a patch - to Update user balance
   // i need a post to add the new bid
}