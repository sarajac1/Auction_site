namespace Server;
using MySql.Data.MySqlClient;
public class Listing
{
    public int id { get; set; }
    public int sellerid { get; set; }
    public string? title { get; set; }
    public string? sellername { get; set; }
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

        var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT listings.*, users.username FROM listings LEFT JOIN users ON listings.sellerid = users.id;");


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
                startbid = reader.GetInt32("startbid"),
                sellername = reader["username"] as string
            };
            listings.Add(listing);
        }


        return listings;
    }

}


/*
using MySql.Data.MySqlClient;

namespace Server;

public static class Listings
{
    private static string connectionString = "server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306";

    public static IEnumerable<object> GetAllListings()
    {
        var listings = new List<object>();
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();  // Synchronous open
            var query = "SELECT * FROM listing";
            using (var cmd = new MySqlCommand(query, connection))
            {
                using (var reader = cmd.ExecuteReader())  // Synchronous execute reader
                {
                    while (reader.Read())  // Synchronous read
                    {
                        listings.Add(new
                        {
                            Id = reader["id"],
                            SellerId = reader["sellerid"],
                            Title = reader["title"].ToString(),
                            Description = reader["description"].ToString(),
                            StartDate = reader["startdate"],
                            EndDate = reader["enddate"],
                            StartBid = reader["startbid"]
                        });
                    }
                }
            }
        }
        return listings;
    }

    public static IEnumerable<object> GetListingById(int id)
    {
        var listings = new List<object>();
        using (var connection = new MySqlConnection(connectionString))
        {
            connection.Open();  // Synchronous open
            var query = "SELECT * FROM listing WHERE id = @id";
            using (var cmd = new MySqlCommand(query, connection))
            {
                cmd.Parameters.AddWithValue("@id", id);
                using (var reader = cmd.ExecuteReader())  // Synchronous execute reader
                {
                    while (reader.Read())  // Synchronous read
                    {
                        listings.Add(new
                        {
                            Id = reader["id"],
                            SellerId = reader["sellerid"],
                            Title = reader["title"].ToString(),
                            Description = reader["description"].ToString(),
                            StartDate = reader["startdate"],
                            EndDate = reader["enddate"],
                            StartBid = reader["startbid"]
                        });
                    }
                }
            }
        }
        return listings;
    }
}*/