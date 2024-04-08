
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
  var users = new List<object>(); // List to store the fetched data, initialized inside the handler.
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
      var user = new 
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

/*
//POST http://localhost:3000/add-listing 
sellerid 1 
title Poop Vase
description Merlin's poop was that holds all his powers
image https://imgur.com/gallery/oUwwY47
startdate 2024-05-05 
enddate 2024-05-19 00:00:00
startbid 100.0
*/

/*
app.MapGet("/listings", () => Listings.GetAllListings());
app.MapGet("/listings/{id:int}", (int id) => Listings.GetListingById(id));

app.MapGroup("/users")
    .MapGet("/", async () => await Users.GetAllUsers());*/

app.Run("http://localhost:3000");

/*
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/listings", () => @"[
    {
      ""id"": ""1"",
      ""sellerid"": 1,
      ""title"": ""Cat Butler (Litterbox included)"",
      ""description"": ""Once upon a whimsical whisker-filled time, in the cozy nooks of Purrington Manor, there lived a distinguished feline named Sir Fluffington, the most refined cat butler in all of Kittyshire."",
      ""image"": ""https://i.imgur.com/PrjZG6z.png"",
      ""startdate"": ""06-02-2024"",
      ""enddate"": ""18-Mar-2024 15:23:00"",
      ""startbid"": 300
    },
    {
      ""id"": ""2"",
      ""sellerid"": 1,
      ""title"": ""Magic Mirror"",
      ""description"": ""The Magic mirror from feature film Occulus!"",
      ""image"": ""https://i.imgur.com/VyIx658.png"",
      ""startdate"": ""05-03-2024"",
      ""enddate"": ""19-Mar-2024 18:23:00"",
      ""startbid"": 4000
    },
    {
      ""id"": ""3"",
      ""sellerid"": 4,
      ""title"": ""Real Fairy"",
      ""description"": ""A fairy I found in my garden. Might need feeding"",
      ""image"": ""https://i.imgur.com/HnPj8vO.png"",
      ""startdate"": ""04-03-2024"",
      ""enddate"": ""14-Mar-2024 15:23:00"",
      ""startbid"": 4000
    },
    {
      ""id"": ""4"",
      ""sellerid"": 4,
      ""title"": ""Anabelle the Doll"",
      ""description"": ""Fairly active doll. Moves without batteries. Might strangle you in your sleep."",
      ""image"": ""https://i.imgur.com/iBnyG3v.png"",
      ""startdate"": ""05-03-2024"",
      ""enddate"": ""16-Mar-2024 09:23:00"",
      ""startbid"": 9000
    },
    {
      ""id"": ""5"",
      ""sellerid"": 4,
      ""title"": ""Necronomicon"",
      ""description"": ""Bound in human skin. Need regular moisturization not to crack. Read at your own risk."",
      ""image"": ""https://i.imgur.com/EtG67zw.jpg"",
      ""startdate"": ""02-03-2024"",
      ""enddate"": ""17-Mar-2024 08:23:00"",
      ""startbid"": 9000
    },
    {
      ""id"": ""6"",
      ""sellerid"": 4,
      ""title"": ""Ghost in a bottle"",
      ""description"": ""Ghost inside a bottle. Spooking and fun decoration for the whole family."",
      ""image"": ""https://i.imgur.com/xEC9HZL.png"",
      ""startdate"": ""27-02-2024"",
      ""enddate"": ""05-Mar-2024 15:23:00"",
      ""startbid"": 200
    },
    {
      ""id"": ""7"",
      ""sellerid"": 4,
      ""title"": ""Cthulhu Statue"",
      ""description"": ""Worship the greatest of the Great Old Ones with this original marble fetish from New Orleans. Has a distinct wet smell at night.\n Never submerge completely in any liquid!\n Size: 25 cm\n Weight: 12 kg \n Great gift for birthdays, baby showers, winter holidays, solstice, or as a graduation gift."",
      ""image"": ""https://i.imgur.com/kt1JY7c.jpg"",
      ""startdate"": ""27-02-2024"",
      ""enddate"": ""03-Mar-2024 19:23:00"",
      ""startbid"": 200
    },
    {
      ""id"": ""8"",
      ""sellerid"": 2,
      ""title"": ""Lament Configuration"",
      ""description"": ""Lament configuration, apparently used as a key? \n I have never used it, I don't even know if it works\n "",
      ""image"": ""https://i.imgur.com/cwUJash.png"",
      ""startdate"": ""07-03-2024"",
      ""enddate"": ""14-Mar-2024 18:23:00"",
      ""startbid"": 2000
    },
    {
      ""id"": ""9"",
      ""sellerid"": 2,
      ""title"": ""Inconspicuous VHS tape"",
      ""description"": ""Send this to any friend in dire need of some female company. VHS player not included\n May smell damp."",
      ""image"": ""https://i.imgur.com/azIun9z.png"",
      ""startdate"": ""07-03-2024"",
      ""enddate"": ""15-Mar-2024 18:23:00"",
      ""startbid"": 2000
    }
  ]");
app.MapGet("/bids", () => @"[
    {
      ""id"": ""1"",
      ""itemid"": ""1"",
      ""bidderid"": ""1"",
      ""bidamount"": 358,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""2"",
      ""itemid"": ""4"",
      ""bidderid"": ""6"",
      ""bidamount"": 9100,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""3"",
      ""itemid"": ""4"",
      ""bidderid"": ""5"",
      ""bidamount"": 9200,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""4"",
      ""itemid"": ""2"",
      ""bidderid"": ""2"",
      ""bidamount"": 4100,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""5"",
      ""itemid"": ""3"",
      ""bidderid"": ""6"",
      ""bidamount"": 4200,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""6"",
      ""itemid"": ""9"",
      ""bidderid"": ""2"",
      ""bidamount"": 2200,
      ""datetime"": ""28-02-2024"",
      ""isactive"": false
    },
    {
      ""id"": ""7"",
      ""itemid"": ""9"",
      ""bidderid"": ""6"",
      ""bidamount"": 2100,
      ""datetime"": ""28-02-2024"",
      ""isactive"": false
    },
    {
      ""id"": ""8"",
      ""itemid"": ""8"",
      ""bidderid"": ""1"",
      ""bidamount"": 2100,
      ""datetime"": ""28-02-2024"",
      ""isactive"": false
    },
    {
      ""id"": ""9"",
      ""itemid"": ""8"",
      ""bidderid"": ""6"",
      ""bidamount"": 2200,
      ""datetime"": ""28-02-2024"",
      ""isactive"": false
    },
    {
      ""id"": ""11"",
      ""itemid"": ""1"",
      ""bidderid"": ""2"",
      ""bidamount"": 400,
      ""datetime"": ""2024-03-14T14:48:34.186Z"",
      ""isactive"": true
    }
  ]");
  
  app.Run("http://localhost:3000");

*/



