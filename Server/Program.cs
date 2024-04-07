using System.Text;

var builder = WebApplication.CreateBuilder(args);
Dictionary<string, string> token = new();


List<User> users = new();
users.Add(new(1, "admin", "admin", new System.DateTime(2024, 02, 27), "Admin, 123, Lund", "admin@shadowbid.com", 8000, true));
users.Add(new(2, "usifer", "123abc", new System.DateTime(2024, 02, 27), "Usifer Baloba, 123, Lund", "abc123@abc.com", 9000, false));
users.Add(new(3, "alicesmith", "alice123", new System.DateTime(2024, 02, 27), "456 Oak Ave, Townsville", "alice.smith@email.com", 7000, false));

builder.Services.AddSingleton(new State(users));
var app = builder.Build();


app.MapGet("/users", (State state) =>
{
    string result = string.Empty;
    foreach (User user in state.Users)
    {
        result += $"Name: {user.username}, Password: {user.password}\n";
    }
    return result;
});

app.MapPost("/login", (HttpContext context, State state) =>
{
    string username = context.Request.Form["username"];
    string password = context.Request.Form["password"];

    var user = state.Users.FirstOrDefault(u => u.username == username && u.password == password);
    if (user != null)
    {
        token.Remove("signed-in");
        token.Remove("token");
        token.Remove("token_id");
        token.Remove("isAdmin");
        token.Add("signed-in", "true");
        token.Add("token", username);
        token.Add("token_id", user.id.ToString());
        token.Add("isAdmin", user.isAdmin.ToString());
        return token;
    }
    else
    {
        token.Remove("signed-in");
        token.Add("signed-in", "false");
        return token;
    }
});




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

record User(
  int id, 
  string username, 
  string password, 
  DateTime joineddate, 
  string address, 
  string email, 
  decimal balance, 
  bool isAdmin);



record State(List<User> Users);