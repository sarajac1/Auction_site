using System.Text;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.MapGet("/users", () => @"[
    {
      ""id"": ""1"",
      ""username"": ""admin"",
      ""password"": ""admin"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""Admin, 123, Lund"",
      ""email"": ""admin@shadowbid.com"",
      ""balance"": 8000,
      ""isAdmin"": true
    },
    {
      ""id"": ""2"",
      ""username"": ""usifer"",
      ""password"": ""123abc"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""Usifer Baloba, 123, Lund"",
      ""email"": ""abc123@abc.com"",
      ""balance"": 9601,
      ""isAdmin"": false
    },
    {
      ""id"": ""3"",
      ""username"": ""alicesmith"",
      ""password"": ""alice123"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""456 Oak Ave, Townsville"",
      ""email"": ""alice.smith@email.com"",
      ""balance"": 7000,
      ""isAdmin"": false
    },
    {
      ""id"": ""4"",
      ""username"": ""johndoe"",
      ""password"": ""pass123"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""123 Main St, Cityville"",
      ""email"": ""john.doe@email.com"",
      ""balance"": 5000,
      ""isAdmin"": false
    },
    {
      ""id"": ""5"",
      ""username"": ""bobjohnson"",
      ""password"": ""bob456"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""789 Pine Ln, Villagetown"",
      ""email"": ""bob.johnson@email.com"",
      ""balance"": 6000,
      ""isAdmin"": false
    },
    {
      ""id"": ""6"",
      ""username"": ""mikedavis"",
      ""password"": ""mike001"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""202 Maple Rd, Countryside"",
      ""email"": ""mike.davis@email.com"",
      ""balance"": 5500,
      ""isAdmin"": false
    },
    {
      ""id"": ""7"",
      ""username"": ""sophiemiller"",
      ""password"": ""sophie789"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""303 Birch Blvd, Suburbia"",
      ""email"": ""sophie.miller@email.com"",
      ""balance"": 6500,
      ""isAdmin"": false
    },
    {
      ""id"": ""8"",
      ""username"": ""alexturner"",
      ""password"": ""alex002"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""404 Elm Lane, Outskirts"",
      ""email"": ""alex.turner@email.com"",
      ""balance"": 7500,
      ""isAdmin"": false
    },
    {
      ""id"": ""9"",
      ""username"": ""emmawhite"",
      ""password"": ""emma456"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""505 Oakwood Dr, Riverside"",
      ""email"": ""emma.white@email.com"",
      ""balance"": 8500,
      ""isAdmin"": false
    },
    {
      ""id"": ""10"",
      ""username"": ""taratarantula"",
      ""password"": ""tara"",
      ""joineddate"": ""27-02-2024"",
      ""address"": ""606 Cedar Grove, Lakeside"",
      ""email"": ""tara.taran@email.com"",
      ""balance"": 8685,
      ""isAdmin"": false
    },
    {
      ""id"": ""11"",
      ""username"": ""test"",
      ""password"": ""test"",
      ""joineddate"": ""2024-03-06"",
      ""address"": ""test"",
      ""email"": ""test@test"",
      ""balance"": 0,
      ""isAdmin"": false
    },
    {
      ""id"": ""12"",
      ""username"": ""test6"",
      ""password"": ""test6"",
      ""joineddate"": ""2024-03-07"",
      ""address"": ""test6"",
      ""email"": ""test6@test6"",
      ""balance"": 0,
      ""isAdmin"": false
    },
    {
      ""id"": ""13"",
      ""username"": ""test2"",
      ""password"": ""test2"",
      ""joineddate"": ""2024-03-08"",
      ""address"": ""test2"",
      ""email"": ""test2@test2"",
      ""balance"": 0,
      ""isAdmin"": false
    }
  ]");
app.Run("http://localhost:3000");

app.MapGet("/listings", () => @"[
    {
      ""id"": ""1"",
      ""sellerid"": 1,
      ""title"": ""Cat Butler (Litterbox included)"",
      ""description"": ""Once upon a whimsical whisker-filled time, in the cozy nooks of Purrington Manor, there lived a distinguished feline named Sir Fluffington, the most refined cat butler in all of Kittyshire."",
      ""image"": ""https://i.imgur.com/PrjZG6z.png"",
      ""startdate"": ""06-02-2024"",
      ""enddate"": ""18-Mar-2024 15:23:00"",
      ""startbid"": 300
    },
    {
      ""id"": ""2"",
      ""sellerid"": 1,
      ""title"": ""Magic Mirror"",
      ""description"": ""The Magic mirror from feature film Occulus!"",
      ""image"": ""https://i.imgur.com/VyIx658.png"",
      ""startdate"": ""05-03-2024"",
      ""enddate"": ""19-Mar-2024 18:23:00"",
      ""startbid"": 4000
    },
    {
      ""id"": ""3"",
      ""sellerid"": 4,
      ""title"": ""Real Fairy"",
      ""description"": ""A fairy I found in my garden. Might need feeding"",
      ""image"": ""https://i.imgur.com/HnPj8vO.png"",
      ""startdate"": ""04-03-2024"",
      ""enddate"": ""14-Mar-2024 15:23:00"",
      ""startbid"": 4000
    },
    {
      ""id"": ""4"",
      ""sellerid"": 4,
      ""title"": ""Anabelle the Doll"",
      ""description"": ""Fairly active doll. Moves without batteries. Might strangle you in your sleep."",
      ""image"": ""https://i.imgur.com/iBnyG3v.png"",
      ""startdate"": ""05-03-2024"",
      ""enddate"": ""16-Mar-2024 09:23:00"",
      ""startbid"": 9000
    },
    {
      ""id"": ""5"",
      ""sellerid"": 4,
      ""title"": ""Necronomicon"",
      ""description"": ""Bound in human skin. Need regular moisturization not to crack. Read at your own risk."",
      ""image"": ""https://i.imgur.com/EtG67zw.jpg"",
      ""startdate"": ""02-03-2024"",
      ""enddate"": ""17-Mar-2024 08:23:00"",
      ""startbid"": 9000
    },
    {
      ""id"": ""6"",
      ""sellerid"": 4,
      ""title"": ""Ghost in a bottle"",
      ""description"": ""Ghost inside a bottle. Spooking and fun decoration for the whole family."",
      ""image"": ""https://i.imgur.com/xEC9HZL.png"",
      ""startdate"": ""27-02-2024"",
      ""enddate"": ""05-Mar-2024 15:23:00"",
      ""startbid"": 200
    },
    {
      ""id"": ""7"",
      ""sellerid"": 4,
      ""title"": ""Cthulhu Statue"",
      ""description"": ""Worship the greatest of the Great Old Ones with this original marble fetish from New Orleans. Has a distinct wet smell at night.\n Never submerge completely in any liquid!\n Size: 25 cm\n Weight: 12 kg \n Great gift for birthdays, baby showers, winter holidays, solstice, or as a graduation gift."",
      ""image"": ""https://i.imgur.com/kt1JY7c.jpg"",
      ""startdate"": ""27-02-2024"",
      ""enddate"": ""03-Mar-2024 19:23:00"",
      ""startbid"": 200
    },
    {
      ""id"": ""8"",
      ""sellerid"": 2,
      ""title"": ""Lament Configuration"",
      ""description"": ""Lament configuration, apparently used as a key? \n I have never used it, I don't even know if it works\n "",
      ""image"": ""https://i.imgur.com/cwUJash.png"",
      ""startdate"": ""07-03-2024"",
      ""enddate"": ""14-Mar-2024 18:23:00"",
      ""startbid"": 2000
    },
    {
      ""id"": ""9"",
      ""sellerid"": 2,
      ""title"": ""Inconspicuous VHS tape"",
      ""description"": ""Send this to any friend in dire need of some female company. VHS player not included\n May smell damp."",
      ""image"": ""https://i.imgur.com/azIun9z.png"",
      ""startdate"": ""07-03-2024"",
      ""enddate"": ""15-Mar-2024 18:23:00"",
      ""startbid"": 2000
    }
  ]");
app.MapGet("/bids", () => @"[
    {
      ""id"": ""1"",
      ""itemid"": ""1"",
      ""bidderid"": ""1"",
      ""bidamount"": 358,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""2"",
      ""itemid"": ""4"",
      ""bidderid"": ""6"",
      ""bidamount"": 9100,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""3"",
      ""itemid"": ""4"",
      ""bidderid"": ""5"",
      ""bidamount"": 9200,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""4"",
      ""itemid"": ""2"",
      ""bidderid"": ""2"",
      ""bidamount"": 4100,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""5"",
      ""itemid"": ""3"",
      ""bidderid"": ""6"",
      ""bidamount"": 4200,
      ""datetime"": ""28-02-2024"",
      ""isactive"": true
    },
    {
      ""id"": ""6"",
      ""itemid"": ""9"",
      ""bidderid"": ""2"",
      ""bidamount"": 2200,
      ""datetime"": ""28-02-2024"",
      ""isactive"": false
    },
    {
      ""id"": ""7"",
      ""itemid"": ""9"",
      ""bidderid"": ""6"",
      ""bidamount"": 2100,
      ""datetime"": ""28-02-2024"",
      ""isactive"": false
    },
    {
      ""id"": ""8"",
      ""itemid"": ""8"",
      ""bidderid"": ""1"",
      ""bidamount"": 2100,
      ""datetime"": ""28-02-2024"",
      ""isactive"": false
    },
    {
      ""id"": ""9"",
      ""itemid"": ""8"",
      ""bidderid"": ""6"",
      ""bidamount"": 2200,
      ""datetime"": ""28-02-2024"",
      ""isactive"": false
    },
    {
      ""id"": ""11"",
      ""itemid"": ""1"",
      ""bidderid"": ""2"",
      ""bidamount"": 400,
      ""datetime"": ""2024-03-14T14:48:34.186Z"",
      ""isactive"": true
    }
  ]");

app.Run("http://localhost:3000");

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


