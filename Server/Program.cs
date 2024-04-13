using MySql.Data.MySqlClient;
using Server;

var builder = WebApplication.CreateBuilder(args);
//https://www.nuget.org/packages/MySql.Data
State state = new("server=localhost;uid=root;pwd=4133;database=auction_site;port=3306");
builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/listings", Listings.GetAllListings);

//code according to:
//https://dev.mysql.com/doc/connector-net/en/connector-net-tutorials-parameters.html
app.MapPost("/listings", Listings.Post);

// GET ALL USERS
app.MapGet("/users", Users.GetAllUsers);

// GET A SPECIFIC USER (existing user) 
app.MapPost("/login", Users.GetUser);

// NEW USER REGISTRATION
app.MapPost("/registernewuser", Users.Post);

// FIND USER BY ID
app.MapPost("/finduserbyusername", Users.FindUserByUsername);

// ADD TO USER BALANCE
app.MapPost("/addbalance", Users.AddUserBalance);

// WITHDRAW FROM USER BALANCE
app.MapPost("/withdrawbalance", Users.WithdrawUserBalance);

// GET ALL Items
app.MapGet("/items", Items.GetAllItems);

app.Run("http://localhost:3000");

public record State(string DB);