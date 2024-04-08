namespace Server;

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