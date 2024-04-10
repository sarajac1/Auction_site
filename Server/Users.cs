using MySql.Data.MySqlClient;

namespace Server;

public static class Users
{
    private static string connectionString = "server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306";

    public static async Task<IEnumerable<object>> GetAllUsers()
    {
        var users = new List<object>();
        using (var connection = new MySqlConnection(connectionString))
        {
            await connection.OpenAsync();
            var query = "SELECT * FROM user";
            using (var cmd = new MySqlCommand(query, connection))
            {
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        users.Add(new
                        {
                            Id = reader["id"],
                            Username = reader["username"].ToString(),
                            Password = reader["password"].ToString(),
                            //look it up how to convert to date?is it neccesary?
                        });
                    }
                }
            }
        }
        return users; 
    }
    

}
