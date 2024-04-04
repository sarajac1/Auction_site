using System;

public class Users
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public DateTime JoinedDate { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public decimal Balance { get; set; }
    public bool IsAdmin { get; set; }

    public override string ToString()
    {
        return $"Id: {Id}, Username: {Username}, JoinedDate: {JoinedDate}, Address: {Address}, Email: {Email}, Balance: {Balance}, IsAdmin: {IsAdmin}";
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


/*
 // A. using mock data and interface 
using System;

namespace Server
{
    public class Users:IUsers
    {
        private string _id;
        private string _username;
        private string _password;
        private string _joineddate;
        private string _address;
        private string _email;
        private string _balance;
        private string _isAdmin;

        public Users(string id, string username, string password, string joineddate, string address, string email,
            string balance, string isAdmin)
        {
            _id = id;
            _username = username;
            _password = password; 
            _joineddate = joineddate;
            _address = address;
            _email = email;
            _balance = balance;
            _isAdmin = isAdmin;
        }
        
        public string User()
        {
            return _id + " " +_username + " "+ _password + " "+ _joineddate + " "+ _address + " "+ _email + " "+ _balance + " "+ _isAdmin;
            //throw new NotImplementedException();
        }
    }
}
#1#
*/

