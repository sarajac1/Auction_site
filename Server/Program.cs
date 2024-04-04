using System.Text;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () =>
{
    string[] lines = File.ReadAllLines("./db.txt");
    return Results.Text(GenerateHTML(lines), "text/html");
});

app.Run();

static string GenerateHTML(string[] lines)
{
    var htmlContent = new StringBuilder();
    foreach (var line in lines)
    {
        var userData = line.Split(',');
        if (userData.Length == 8)
        {
            htmlContent.Append($"<li>Id: {userData[0]}, Username: {userData[1]}, Password: {userData[2]}, JoinedDate: {userData[3]}, Address: {userData[4]}, Email: {userData[5]}, Balance: {userData[6]}, IsAdmin: {userData[7]}</li>");
        }
    }

    htmlContent.Append("</ul></body></html>");
    return htmlContent.ToString();
}

/*
using MySql.Data.MySqlClient;
using Server;

// .NEt Web server setup Template:
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

//MySqlConnection? db = null;


string connectionString = "server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306";
using MySqlConnection db = new MySqlConnection(connectionString);
/*
try
{
    db = new (connectionString);
    db.Open();
    
    Users.All(db);

    Users.Single(db);
   
    Users.Post(db);
}
catch (MySqlException e)
{
    Console.WriteLine(e);
}
finally
{
    db?.Close();
}#1#
// tells the app which method to call when doing a get request to a certain route

/#1#/ Endpoint to insert a new user
app.MapPost("/users", async (HttpContext context) =>
{
    await context.Response.WriteAsync("Enter user details:\n");
    Users.Post(db);
});#1#

/*
// Endpoint to retrieve a user's email by username
app.MapGet("/users/{username}", async (HttpContext context) =>
{
    string username = context.Request.RouteValues["username"] as string;
    if (username != null)
    {
        await context.Response.WriteAsync($"Email for {username}:\n");
        Users.Single(db);
    }
});
#1#

/*
// Endpoint to retrieve all users
app.MapGet("/users", async (HttpContext context) =>
{
    using (MySqlConnection db = new MySqlConnection(connectionString))
    {
        try
        {
            await db.OpenAsync();
            await context.Response.WriteAsync("All users:\n");
            Users.AllUsers(db);
        }
        catch (MySqlException ex)
        {
            await context.Response.WriteAsync($"An error occurred while retrieving users: {ex.Message}");
        }
    }
});
#1#

// Endpoint to retrieve all users
app.MapGet("/users", async (HttpContext context) =>
{
    using (MySqlConnection db = new MySqlConnection(connectionString))
    {
        try
        {
            await db.OpenAsync();
            
            // Retrieve user information from the database
            string usersInformation = Users.Get(db);

            // Write the retrieved user information to the response
            await context.Response.WriteAsync(usersInformation);
        }
        catch (MySqlException ex)
        {
            // Handle any database exceptions
            context.Response.StatusCode = 500; // Internal Server Error
            await context.Response.WriteAsync($"An error occurred while retrieving users: {ex.Message}");
        }
    }
});


app.MapGet("/", ()=> "Hello World!");

// Start the server

app.Run();






/*
// C. display db
using MySql.Data.MySqlClient;
using Server;

MySqlConnection? db = null;

string connectionString = "server=localhost;uid=root;pwd=mypassword;database=auction_site;port=3306";

try
{
    db = new (connectionString);
    db.Open();
    
   Users.All(db);

   Users.Single(db);
   
   Users.Post(db);
}
catch (MySqlException e)
{
    Console.WriteLine(e);
}
finally
{
    db?.Close();
}
#1#




/*
 // B. Add to mock db
 using Server;

{
    // Read existing lines from the file
    List<string> linesList = new List<string>(File.ReadAllLines("./db.txt"));

    /*
    // Define information for the new user
    string[] newUser = { "15", "test", "test", "2024-04-23", "test", "test", "300", "false" };

    // Append the new user information to the existing lines
    linesList.Add(string.Join(",", newUser));

    // Write all lines (including the new user) back to the file
    File.WriteAllLines("./db.txt", linesList);
    #2#

    // Iterate over the linesList to process each line
    foreach (string line in linesList)
    {
        if (line.StartsWith("users"))
            continue; // Skip the header line

        string[] parts = line.Split(',');

        // Check if parts array has enough elements
        if (parts.Length >= 8)
        {
            string id = parts[0];
            string username = parts[1];
            string password = parts[2];
            string joineddate = parts[3];
            string address = parts[4];
            string email = parts[5];
            string balance = parts[6];
            string isAdmin = parts[7];

            // Assuming IUsers and Users classes are defined elsewhere
            IUsers user = new Users(id, username, password, joineddate, address, email, balance, isAdmin);
            Console.WriteLine(user.User());
        }
        else
        {
            Console.WriteLine("Invalid line format: " + line); // Print a message indicating invalid line format
        }
    }
}#1#


/*
 // A. display the mock db
using Server;

string<IUsers> lines = File.ReadAllLines("./db.txt");

foreach (IUsers line in lines)
{
    Console.WriteLine(line.User()); // writes each line from start to finish
}
#1#

/*if (lines.Length >= 2)
{
    Console.WriteLine(lines[1]); // writes the line at index 1
}#1#
*/


