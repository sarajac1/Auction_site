
using MySql.Data.MySqlClient;
using Server;

var builder = WebApplication.CreateBuilder(args);

State state = new("server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306");

builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/listings", Listings.GetAllListings);
app.MapPost("/listings", Listings.Post);

// GET ALL USERS
app.MapGet("/users", Users.GetAllUsers);

// GET A SPECIFIC USER
app.MapPost("/login", Users.GetUser);

// NEW USER REGISTRATION
app.MapPost("/registernewuser", Users.Post);

app.MapGet("/bids", Bids.GetAllBids);
app.MapGet("/bids/{itemid:int}", Bids.GetBidsByItemId);
app.MapGet("/bids/user_balance/{id:int}", Bids.Single);
app.MapPost("/bids/check_bid", Bids.CheckBid);
/*{
    "userId": 1,
    "itemId": 1,
    "bidAmount": 500
}*/


app.Run("http://localhost:3000");

public record State(string DB);
