
using MySql.Data.MySqlClient;
using Server;

var builder = WebApplication.CreateBuilder(args);

State state = new("server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306");
builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/listings", Listings.GetAllListings);
app.MapPost("/listings", Listings.Post);

app.Run("http://localhost:3000");

public record State(string DB);

// 
/*

Steps to refractor:
1. make a class to represent a user (whatever we have in the db we should have it here as):
    ex: 
    public int id { get; set; } 
    public int sellerid { get; set; } 

2. create a static class that handles user-related bd code like: create a new user, display users, display user by id...

3. add the connection string to the db that is in the  program.cs 
    public static string ConnectionString { get; set; }

4. create a method to fetch all users ( you need a list to get back the json)
    public static List<User> GetAllUsers(State state)
    {
        

no need of this in the users.cs file
app.MapGet("/users", () =>
{

5. 
  var users = new List<object>(); // List to store the fetched data, initialized inside the handler.
  
6. you use a reader instead to read the db :
  so replace this: 

  MySqlConnection conn = new MySqlConnection(connStr);
  MySqlCommand cmd = null;
  MySqlDataReader reader = null;
  try
  {
    conn.Open();
    cmd = new MySqlCommand("SELECT * FROM user", conn);
    reader = cmd.ExecuteReader();
  
  with this: 
      var reader= MySqlHelper.ExecuteReader(state.DB,"SELECT * FROM users");

7. Iterate through the fetched data and create Listing objects ( var user = new...)     
    while (reader.Read())
    {
      var user = new User
      {
        Id = reader.GetInt32("id"),
        Username = reader["username"] as string,
        Password = reader["password"] as string,
        JoinedDate = reader.GetDateTime("joineddate"),
        Address = reader["address"] as string,
        Email = reader["email"] as string,

8. make sure to make changes to db datatype to int and change the GetDecimal to GetInt32
        Balance = reader.GetDecimal("balance"), 
        IsAdmin = reader.GetBoolean("isAdmin"),
      };
      users.Add(user);
    }
  }

9. removed the catch, the closing db connection, the console message and just kept the return
  catch (Exception ex)
  {
    Console.WriteLine(ex.ToString());
  }
  conn.Close();
  Console.WriteLine("Done.");

10. Keep return statement
  return users;

11. Make sure to close all curly brackets
}); // These are not needed ");"
*/