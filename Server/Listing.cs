namespace Server;
using MySql.Data.MySqlClient;
public class Listing
{
    public int id { get; set; }
    public int sellerid { get; set; }
    public string? title { get; set; }
    public string? description { get; set; }
    public string? image { get; set; }
    public DateTime startdate { get; set; }
    public DateTime enddate { get; set; }
    public int startbid { get; set; }
}
public static class Listings
{
    public static string ConnectionString { get; set; }

    public record PostData(
        int SellerId,
        string Title,
        string Description,
        string Image,
        decimal StartBid);
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
    public static List<Listing> GetAllListings(State state)
    {
        var listings = new List<Listing>();
    
           var reader= MySqlHelper.ExecuteReader(state.DB,"SELECT * FROM listings");


            while (reader.Read())
            {
                var listing = new Listing
                {
                    id = reader.GetInt32("id"),
                    sellerid = reader.GetInt32("sellerid"),
                    title = reader["title"] as string,
                    description = reader["description"] as string,
                    image = reader["image"] as string,
                    startdate = reader.GetDateTime("startdate"),
                    enddate = reader.GetDateTime("enddate"),
                    startbid = reader.GetInt32("startbid")
                };
                listings.Add(listing);
            }
        
      
        return listings;
    }
    public record SingleDTO(int id, int sellerid, string title, string description, string image, DateTime startdate, DateTime enddate, int startbid);

    public static SingleDTO? ListById(int id, State state)
    {
        SingleDTO? result = null;

        string query = "SELECT * FROM listings WHERE id = @id";
        var parameter = new MySqlParameter("@id", id);

        using var reader = MySqlHelper.ExecuteReader(state.DB, query, parameter);
        if (reader.Read())
        {
            int fetchedId = reader.GetInt32(reader.GetOrdinal("id"));
            int fetchSellerId = reader.GetInt32(reader.GetOrdinal("sellerid"));
            string fetchTitle = reader.GetString(reader.GetOrdinal("title"));
            string fetchDescription = reader.GetString(reader.GetOrdinal("description"));
            string fetchImage = reader.GetString(reader.GetOrdinal("image"));
            DateTime fetchStartDate = reader.GetDateTime(reader.GetOrdinal("startdate"));
            DateTime fetchEndDate = reader.GetDateTime(reader.GetOrdinal("enddate"));
            int fetchStartBid = reader.GetInt32(reader.GetOrdinal("startbid"));

            result = new SingleDTO(fetchedId, fetchSellerId, fetchTitle, fetchDescription, fetchImage, fetchStartDate, fetchEndDate, fetchStartBid);
        }

        return result;
    }
}

