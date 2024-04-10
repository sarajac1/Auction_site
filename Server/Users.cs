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
    
        var reader= MySqlHelper.ExecuteReader(state.DB,"SELECT * FROM users");

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

}

/*
using System.Text;

namespace Server;
using MySql.Data.MySqlClient;

public class Users
{
    public static void Post(MySqlConnection db)
    {
        MySqlCommand command = new("INSERT INTO user(username, password, joineddate, address, email, balance, isAdmin) values(@username, @password, @joineddate, @address, @email, @balance, @isAdmin)", db);
        Console.WriteLine("Please enter username");
        string username = Console.ReadLine() ?? string.Empty;
        Console.WriteLine("Please enter password");
        string password = Console.ReadLine() ?? string.Empty;
        Console.WriteLine("Please enter joineddate (yyyy-MM-dd)");
        string joineddateInput = Console.ReadLine() ?? string.Empty;
        DateTime joineddate;
        if (!DateTime.TryParseExact(joineddateInput, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out joineddate))
        {
            Console.WriteLine("Invalid date format. Please use yyyy-MM-dd format.");
            return;
        }
        Console.WriteLine("Please enter address");
        string address = Console.ReadLine() ?? string.Empty;
        Console.WriteLine("Please enter email");
        string email = Console.ReadLine() ?? string.Empty;
        Console.WriteLine("Please enter balance");
        string balance = Console.ReadLine() ?? string.Empty;
        Console.WriteLine("Please enter isAdmin");
        string isAdmin = Console.ReadLine() ?? string.Empty;


        command.Parameters.AddWithValue("@username", username);
        command.Parameters.AddWithValue("@password", password);
        command.Parameters.AddWithValue("@joineddate", joineddate.Date);
        command.Parameters.AddWithValue("@address", address);
        command.Parameters.AddWithValue("@email", email);
        command.Parameters.AddWithValue("@balance", balance);
        command.Parameters.AddWithValue("@isAdmin", isAdmin);

        command.ExecuteNonQuery();
    }
    public static void Single(MySqlConnection db)
    {
        MySqlCommand command = new("SELECT * FROM user WHERE username = @input", db);

        Console.WriteLine(("Please enter the username you want the email of"));
        string input = Console.ReadLine() ?? string.Empty;

        command.Parameters.AddWithValue("@input", input); //prepared statement

        using MySqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
            string email = reader.GetString("email");
            Console.WriteLine($"{input} has email: {email}");
        }
    }
    public static void All(MySqlConnection db)
    {
        MySqlCommand command = new("SELECT * FROM user", db);

        using MySqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
            int id = reader.GetInt32("id");
            string username = reader.GetString("username");
            Console.WriteLine($"{username} has id: {id}");
        }
    }
    public static void AllUsers(MySqlConnection db)
    {
        MySqlCommand command = new("SELECT * FROM user", db);

        using MySqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {

            string username = reader.GetString("username");
            Console.WriteLine($"{username}");
        }
    }

    public static string Get(MySqlConnection db)
    {
        StringBuilder usersInfo = new StringBuilder();

        try
        {
            string query = "SELECT * FROM user"; // Query to select all users
            using (MySqlCommand command = new MySqlCommand(query, db))
            {
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        // Assuming the 'user' table has 'id' and 'username' columns
                        int id = reader.GetInt32("id");
                        string username = reader.GetString("username");
                        // Append user information to the StringBuilder
                        usersInfo.AppendLine($"ID: {id}, Username: {username}");
                    }
                }
            }
        }
        catch (MySqlException e)
        {
            // Handle any exceptions
            Console.WriteLine("Error retrieving user information from the database: " + e.Message);
        }

        return usersInfo.ToString();
    }
}

*/
