
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

// GET ALL USERS
app.MapGet("/users", Users.GetAllUsers);

// GET A SPECIFIC USER
app.MapPost("/login", Users.GetUser);


app.Run("http://localhost:3000");

public record State(string DB);


