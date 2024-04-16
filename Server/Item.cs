using MySql.Data.MySqlClient;
namespace Server;

public class Item
{
    public int Id { get; set; }
    public string? SellerName { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int StartBid { get; set; }
    public int CurrentBid { get; set; }
    public int RemainingDays { get; set; }
    public int RemainingHours { get; set; }
   
}
public static class Items
{
    public static string ConnectionString { get; set; }

    public record PostData(
        int SellerId,
        string Title,
        string Description,
        string Image,
        int StartBid
        );
    public static IResult Post(PostData data, State state)
    {
        string query = "INSERT INTO listings (sellerid, title, description, image, startbid) VALUES (@SellerId, @Title, @Description, @Image, @StartBid)";
        var result = MySqlHelper.ExecuteNonQuery(state.DB, query, [
            new("@SellerId", data.SellerId),
            new("@Title", data.Title),
            new("@Description", data.Description),
            new("@Image", data.Image),
            new("@StartBid", data.StartBid)
        ]);
        if (result == 1)
        {
            return TypedResults.Created();
        }
        else
        {
            return TypedResults.Problem();
        }
    
    }
    public static List<Item> GetAllItems(State state)
    {
        var items = new List<Item>();
    
        var reader= MySqlHelper.ExecuteReader(state.DB,
            "select id, seller_username, title, description, image, startdate, enddate, startbid, current_bid, remaining_days, remaining_hours from active_auctions");


        while (reader.Read())
        {
            var item = new Item
            {
                Id = reader.GetInt32("id"),
                SellerName = reader["seller_username"] as string,
                Title = reader["title"] as string,
                Description = reader["description"] as string,
                Image = reader["image"] as string,
                StartDate = reader.GetDateTime("startdate"),
                EndDate = reader.GetDateTime("enddate"),
                StartBid = reader.GetInt32("startbid"),
                CurrentBid = reader.GetInt32("current_bid"),
                RemainingDays = reader.GetInt32("remaining_days"),
                RemainingHours = reader.GetInt32("remaining_hours"),
            };
            items.Add(item);
        }
        
      
        return items;
    }
    
}
