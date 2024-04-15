
using System.ComponentModel.DataAnnotations;
using MySql.Data.MySqlClient;
using Server;


var builder = WebApplication.CreateBuilder(args);
//https://www.nuget.org/packages/MySql.Data
State state = new("server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306");;builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/listings", Listings.GetAllListings);

//code according to:
//https://dev.mysql.com/doc/connector-net/en/connector-net-tutorials-parameters.html
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

// FIND USER BY USERNAME
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