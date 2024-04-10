
using MySql.Data.MySqlClient;
using Server;

var builder = WebApplication.CreateBuilder(args);

State state = new("server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306");

builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/listings", Listings.GetAllListings);
app.MapPost("/listings", Listings.Post);
//app.MapDelete("/listings/{id:int}", Listings.Delete);?
//app.MapGet("/listings/{id:int}", Listings.GetById);?
app.MapGet("/users", Users.GetAllUsers);
//we need: get bids, post bid, update bid, update(edit) listing, get user, delete user, update(edit) user?
// do we need more? 


app.Run("http://localhost:3000");

public record State(string DB);

/*
app.MapDelete("/delete-listing/{id}", (int id) =>
{
  
  MySqlConnection conn = new MySqlConnection(connStr);
  MySqlCommand cmd = null;
  
  try
  {
    conn.Open();
    string sql = "DELETE FROM listings WHERE id =@id";
    cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@id", id);
    
    var result = cmd.ExecuteNonQuery();
    if (result > 0)
    {
      Console.WriteLine("Listing deleted.");
      return Results.Ok($"Listing deleted successfully.");
    }
    else
    {
      return Results.NotFound($"Listing not found.");
    }
  }
  catch (Exception ex)
  {
    Console.WriteLine(ex.ToString());
    return Results.Problem("Database error occurred.");
  }
  
  finally
  {
    if (conn != null)
    {
      conn.Close();
      conn.Dispose();
    }
    cmd?.Dispose();
  }
});
*/


/*
app.MapGet("/listings/{id:int}", (int id) => Listings.GetListingById(id));
*/

/*
 //code according to:
   // https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-8.0&tabs=visual-studio
   //https://dev.mysql.com/doc/connector-net/en/connector-net-tutorials-connection.html
   //https://dev.mysql.com/doc/connector-net/en/connector-net-tutorials-stored-procedures.html

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
*/
