
using System.ComponentModel.DataAnnotations;
using MySql.Data.MySqlClient;
using Server;


var builder = WebApplication.CreateBuilder(args);
//https://www.nuget.org/packages/MySql.Data
State state = new("server=localhost;uid=root;pwd=Student1;database=auction_site;port=3306");
builder.Services.AddSingleton(state);
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
}).Accepts<Server.Users.EditUserData>("application/json");



// GET ALL USERS
app.MapGet("/users", Users.GetAllUsers);

// GET A SPECIFIC USER
app.MapPost("/login", Users.GetUser);


app.Run("http://localhost:3000");

public record State(string DB);


