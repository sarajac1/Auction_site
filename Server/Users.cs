using MySql.Data.MySqlClient;

namespace Server;

public class User
{
    public int id { get; set; }
    public string? username { get; set; }
    public string? password { get; set; }
    public DateTime joineddate { get; set; }
    public string? address { get; set; }
    public string? email { get; set; }
    public int balance { get; set; }
    public bool isAdmin { get; set; }
}

public static class Users
{
    public static string ConnectionString { get; set; }

    public static List<User> GetAllUsers(State state)
    {
        var users = new List<User>();

        var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM users");

        while (reader.Read())
        {
            var user = new User
            {
                id = reader.GetInt32("id"),
                username = reader["username"] as string,
                password = reader["password"] as string,
                joineddate = reader.GetDateTime("joineddate"),
                address = reader["address"] as string,
                email = reader["email"] as string,
                balance = reader.GetInt32("balance"),
                isAdmin = reader.GetBoolean("isAdmin"),
            };
            users.Add(user);
        }

        return users;
    }

  public static List<User> GetUserById(State state, int id)
    {
        
        List<User> users = new List<User>();
        
        //parameters handling
        var parameters = new MySqlParameter[]
        {
            new MySqlParameter("@id", id)
        };
        var reader= MySqlHelper.ExecuteReader(state.DB,"SELECT * FROM users WHERE id = @id", parameters);
        while(reader.Read())
        {
            var user = new User
            {
                id = reader.GetInt32("id"),
                username = reader["username"] as string,
                password = reader["password"] as string,
                joineddate = reader.GetDateTime("joineddate"),
                address = reader["address"] as string,
                email = reader["email"] as string,
                balance = reader.GetInt32("balance"),
                isAdmin = reader.GetBoolean("isAdmin"),
            };users.Add(user); 
        }

        return users; 
    }
}
    

