
using System.ComponentModel.DataAnnotations;
using MySql.Data.MySqlClient;
using Server;


var builder = WebApplication.CreateBuilder(args);

State state = new("server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306");

builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/listings", Listings.GetAllListings);
app.MapPost("/listings", Listings.Post);



//endpoint for editing users
app.MapPut("/edituser", (Server.Users.EditUserData editUser, State appState) =>
{
  if (Server.Users.EditUser(editUser, appState))
  {
    return Results.Ok("User updated.");
  }
  else
  {
    return Results.BadRequest("Error updating user");
  }
  //Specifies content type of endpoint (.json)
}).Accepts<Server.Users.EditUserData>("application/json");



// GET ALL USERS
app.MapGet("/users", Users.GetAllUsers);

// GET A SPECIFIC USER (existing user) 
app.MapPost("/login", Users.GetUser);

// NEW USER REGISTRATION
app.MapPost("/registernewuser", Users.Post);

app.MapGet("/bids", Bids.GetAllBids);
app.MapGet("/bids/{itemid:int}", Bids.GetBidsByItemId);
app.MapGet("/bids/user_balance/{id:int}", Bids.Single);
app.MapPost("/bids/place_bid", Bids.PlaceBid);
/*{
    "userId": 1,
    "itemId": 1,
    "bidAmount": 500
}*/
app.MapGet("/bids/highest_Bid_For_Item/{itemId:int}", Bids.GetHighestBidForItem);

// FIND USER BY ID
app.MapPost("/finduserbyusername", Users.FindUserByUsername);

// ADD TO USER BALANCE
app.MapPost("/addbalance", Users.AddUserBalance);

// WITHDRAW FROM USER BALANCE
app.MapPost("/withdrawbalance", Users.WithdrawUserBalance);

// GET ALL Items
app.MapGet("/items", Items.GetAllItems);

// GET ALL BIDS
app.MapGet("/bids", Bids.GetAllBids);

// GET BIDS FOR A SPECIFIC ITEM
app.MapGet("/bids/{itemId}", Bids.GetBidsForItem);

app.Run("http://localhost:3000");

public record State(string DB);
