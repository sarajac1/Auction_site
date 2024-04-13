using MySql.Data.MySqlClient;
using Server;

var builder = WebApplication.CreateBuilder(args);
//https://www.nuget.org/packages/MySql.Data

State state = new("server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306");
builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/listings", Listings.GetAllListings);

//code according to:
//https://dev.mysql.com/doc/connector-net/en/connector-net-tutorials-parameters.html
app.MapPost("/listings", Listings.Post);
app.MapGet("/listings/{id:int}", Listings.ListById);

// GET ALL USERS
app.MapGet("/users", Users.GetAllUsers);

// GET A SPECIFIC USER
app.MapPost("/login", Users.GetUser);

// NEW USER REGISTRATION
app.MapPost("/registernewuser", Users.Post);


// GET ALL Items
app.MapGet("/items", Items.GetAllItems);

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



app.Run("http://localhost:3000");

public record State(string DB);