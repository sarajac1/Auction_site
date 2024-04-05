using MySql.Data.MySqlClient;

namespace Server;

public static class Listings
{
    private static string connectionString = "server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306";

    public static async Task<IEnumerable<object>> GetAllListings()
    {
        var listings = new List<object>();
        using (var connection = new MySqlConnection(connectionString))
        {
            await connection.OpenAsync();
            var query = "SELECT * FROM listing";
            using (var cmd = new MySqlCommand(query, connection))
            {
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
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
    

}
