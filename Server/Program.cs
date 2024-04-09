using MySql.Data.MySqlClient;
using Server;
//code according to:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-8.0&tabs=visual-studio
//https://dev.mysql.com/doc/connector-net/en/connector-net-tutorials-connection.html
//https://dev.mysql.com/doc/connector-net/en/connector-net-tutorials-stored-procedures.html

var builder = WebApplication.CreateBuilder(args);

string connStr = "server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306";
var app = builder.Build();
app.MapGet("/listings",  () =>
{
  var listings = new List<object>(); // List to store the fetched data, initialized inside the handler.
  MySqlConnection conn = new MySqlConnection(connStr);
  MySqlCommand cmd = null;
  MySqlDataReader reader = null;

  try
  {
    conn.Open();
    cmd = new MySqlCommand("SELECT * FROM listing", conn);
    reader = cmd.ExecuteReader();

    while (reader.Read())
    {
      var listing = new 
      {
        Id = reader.GetInt32("id"),
        SellerId = reader.GetInt32("sellerid"),
        Title = reader["title"] as string,
        Description = reader["description"] as string,
        Image = reader["image"] as string,
        StartDate = reader.GetDateTime("startdate"),
        EndDate = reader.GetDateTime("enddate"),
        StartBid = reader.GetInt32("startbid")
      };
      listings.Add(listing);
    }
  }
  catch (Exception ex)
  {
    Console.WriteLine(ex.ToString());
  }

  conn.Close();
  Console.WriteLine("Done.");

  return listings; 
});

//code according to:
//https://dev.mysql.com/doc/connector-net/en/connector-net-tutorials-parameters.html
app.MapPost("/add-listing", (int sellerid, string title, string description, string image, string startdate, string enddate, decimal startbid) =>
{
  
  MySqlConnection conn = new MySqlConnection(connStr);
  MySqlCommand cmd = null;
  DateTime startDateParsed = DateTime.Parse(startdate);  // Expected to be in "YYYY-MM-DD"
  DateTime endDateParsed = DateTime.Parse(enddate);  

  try
  {
    conn.Open();
    string sql = "INSERT INTO listing (sellerid, title, description, image, startdate, enddate, startbid) VALUES (@SellerId, @Title, @Description, @Image, @StartDate, @EndDate, @StartBid)";
    cmd = new MySqlCommand(sql, conn);

    cmd.Parameters.AddWithValue("@SellerId", sellerid);
    cmd.Parameters.AddWithValue("@Title", title);
    cmd.Parameters.AddWithValue("@Description", description);
    cmd.Parameters.AddWithValue("@Image", image);
    cmd.Parameters.AddWithValue("@StartDate", startDateParsed.ToString("yyyy-MM-dd")); 
    cmd.Parameters.AddWithValue("@EndDate", endDateParsed.ToString("yyyy-MM-dd HH:mm:ss"));
    cmd.Parameters.AddWithValue("@StartBid", startbid);

    cmd.ExecuteNonQuery();
  }
  catch (Exception ex)
  {
    Console.WriteLine(ex.ToString());
  }
  
  conn.Close();
  Console.WriteLine("Listing added.");
});

// Endpoint to get all users info
app.MapGet("/users",  () =>
{
  var users = new List<User>(); 
  MySqlConnection conn = new MySqlConnection(connStr);
  MySqlCommand cmd = null;
  MySqlDataReader reader = null;

  try
  {
    conn.Open();
    cmd = new MySqlCommand("SELECT * FROM user", conn);
    reader = cmd.ExecuteReader();

    while (reader.Read())
    {
      User user = new User
      {
        Id = reader.GetInt32("id"),
        Username = reader["username"] as string,
        Password = reader["password"] as string,
        JoinedDate = reader.GetDateTime("joineddate"),
        Address = reader["address"] as string,
        Email = reader["email"] as string,
        Balance = reader.GetDecimal("balance"),
        IsAdmin = reader.GetBoolean("isAdmin"),
      };
      users.Add(user);
    }
  }
  catch (Exception ex)
  {
    Console.WriteLine(ex.ToString());
  }

  conn.Close();
  Console.WriteLine("Done.");

  return users; 
});

// Endpoint to authenticate User
app.MapGet("/login", (HttpContext context) =>
{
  string username = context.Request.Form["username"];
  string password = context.Request.Form["password"];

  User user = null;
  MySqlConnection conn = new MySqlConnection(connStr);
  MySqlCommand cmd = null;
  MySqlDataReader reader = null;

  try
  {
    conn.Open();
    cmd = new MySqlCommand("SELECT * FROM user WHERE username = @username AND password = @password", conn);
    cmd.Parameters.AddWithValue("@username", username);
    cmd.Parameters.AddWithValue("@password", password);
    reader = cmd.ExecuteReader();

    while (reader.Read())
    {
      user = new User  
      {
        Id = reader.GetInt32("id"),
        Username = reader["username"] as string,
        Password = reader["password"] as string,
        JoinedDate = reader.GetDateTime("joineddate"),
        Address = reader["address"] as string,
        Email = reader["email"] as string,
        Balance = reader.GetDecimal("balance"),
        IsAdmin = reader.GetBoolean("isAdmin"),
      };        
      };      
  }

  catch (Exception ex)
  {
    Console.WriteLine(ex.ToString());
  }

  conn.Close();
  Console.WriteLine("Done.");

  return user;
});  

// Endpoint to Register New User
app.MapPost("/RegisterNewUser", (HttpContext context) =>
{
    string username = context.Request.Form["username"];
    string password = context.Request.Form["password"];
    string email = context.Request.Form["email"];
    string address = context.Request.Form["address"];
    string message = "";

    MySqlConnection conn = new MySqlConnection(connStr);
    MySqlCommand cmd = null;
    
    try
    {
        conn.Open();
        cmd = new MySqlCommand("SELECT COUNT(*) FROM user WHERE username = @username", conn);
        cmd.Parameters.AddWithValue("@username", username);
        int count = Convert.ToInt32(cmd.ExecuteScalar());

        if (count > 0)
        { 
            return "User already exists: " + username;
        }
        else
        {
            cmd = new MySqlCommand("INSERT INTO user (username, password, joineddate, address, email, isAdmin) VALUES (@username, @password, @joineddate, @address, @email, @isAdmin)", conn);
            cmd.Parameters.AddWithValue("@username", username);
            cmd.Parameters.AddWithValue("@password", password);
            cmd.Parameters.AddWithValue("@joineddate", DateTime.Today);
            cmd.Parameters.AddWithValue("@address", address);
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@isAdmin", false);

            cmd.ExecuteNonQuery();
            message = "User added successfully: " + username;  
            Console.WriteLine("New User Registered!");
        }    
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.ToString());
        message = "User registration failed!";
    }
    finally
    {
        // Close the connection
        conn.Close();
    }

    return message;
});

app.Run("http://localhost:3000"); 