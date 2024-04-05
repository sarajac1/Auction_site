
using MySql.Data.MySqlClient;
using Server;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGroup("/listings")
.MapGet("/", async () => await Listings.GetAllListings());


app.MapGroup("/users")
    .MapGet("/", async () => await Users.GetAllUsers());

app.Run("http://localhost:3000");


