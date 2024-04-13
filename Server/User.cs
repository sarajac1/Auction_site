namespace Server;
using MySql.Data.MySqlClient;

// Defined class to create user related endpoints/REST API
public static class Users
{
  public record UserCredentials(string username, string password);
  // Defined a method GetAllUsers, which returns a List type of User(user details)
  public static List<User> GetAllUsers(State state)
  {
    Console.WriteLine(state);
    var users = new List<User>();
    var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM users");
    Console.WriteLine(reader);

    // runs only if there are any records in reader
    while (reader.Read())
    {
      var user = new User
      {
        id = reader.GetInt32("id"),
        username = reader.GetString("username"),
        password = reader.GetString("password"),
        joinedDate = reader.GetDateTime("joineddate"),
        address = reader["address"].Equals(null) ? "" : reader.GetString("address"),
        email = reader["email"].Equals(null) ? "" : reader.GetString("email"),
        balance = reader["balance"].Equals(null) ? 0 : reader.GetDecimal("balance"),
        isAdmin = reader.GetBoolean("isAdmin")
      };
      users.Add(user);
    }

    return users;
  }

  // TO AUTHENTICATE SPECIFIC USER 
  // (https://opa23-ha.lms.nodehill.se/article/kodexempel-mysqlhelper-instead-of-mysqlconnection-to-enable-connection-pooling)
  public static User GetUser(UserCredentials credentials, State state)
  {
    var reader = MySqlHelper.ExecuteReader(
      state.DB,
      "SELECT * FROM users WHERE username = @Username AND password = @Password",
      [new("@Username", credentials.username), new("@Password", credentials.password)]
      );

    if (reader.Read())
    {
      var user = new User
      {
        id = reader.GetInt32("id"),
        username = reader.GetString("username"),
        password = reader.GetString("password"),
        joinedDate = reader.GetDateTime("joineddate"),
        address = reader["address"].Equals(null) ? "" : reader.GetString("address"),
        email = reader["email"].Equals(null) ? "" : reader.GetString("email"),
        balance = reader["balance"].Equals(null) ? 0 : reader.GetDecimal("balance"),
        isAdmin = reader.GetBoolean("isAdmin")
      };
      return user;
    }
    else
    {
      return null;
    }
  }

  // REGISTER NEW USER
  public record PostData(string username, string password, string email, string address);
  public static IResult Post(PostData data, State state)
  {
    string query = "INSERT INTO users (username, password, address, email) VALUES (@Username, @Password, @Address, @Email)";
    var result = MySqlHelper.ExecuteNonQuery(state.DB, query, [
      new("@Username", data.username),
      new("@Password", data.password),
      new("@Address", data.address),
      new("@Email", data.email),
    ]);
    if (result == 1)
    {
      return TypedResults.Created();
    }
    else
    {
      return TypedResults.Problem();
    }
  }

  // FIND USER BY USERNAME
  public static User FindUserByUsername(UserCredentials credentials, State state)
  {
    var reader = MySqlHelper.ExecuteReader(
      state.DB,
      "SELECT * FROM users WHERE username = @Username", [new("@Username", credentials.username)]
      );

    if (reader.Read())
    {
      var user = new User
      {
        id = reader.GetInt32("id"),
        username = reader.GetString("username"),
        password = reader.GetString("password"),
        joinedDate = reader.GetDateTime("joineddate"),
        address = reader.GetString("address"),
        email = reader.GetString("email"),
        balance = reader.GetDecimal("balance"),
        isAdmin = reader.GetBoolean("isAdmin")
      };
      return user;
    }
    else
    {
      return null;
    }
  }

  // ADD USER BALANCE
  public record Balance(string username, decimal updatebalance, decimal prevbalance);
  public static IResult AddUserBalance(Balance data, State state)
  {
    string query = "UPDATE users SET balance = @AddToBalance + @PrevBalance WHERE username = @Username";
    var result = MySqlHelper.ExecuteNonQuery(state.DB, query, [
      new("@Username", data.username),
      new("@PrevBalance", data.prevbalance),
      new("@AddToBalance", data.updatebalance),
    ]);
    if (result == 1)
    {
      return TypedResults.Created();
    }
    else
    {
      return TypedResults.Problem();
    }
  }

  // WITHDRAW USER BALANCE
  public static IResult WithdrawUserBalance(Balance data, State state)
  {
    string query = "UPDATE users SET balance = @PrevBalance - @WithdrawBalance WHERE username = @Username";
    var result = MySqlHelper.ExecuteNonQuery(state.DB, query, [
      new("@Username", data.username),
      new("@PrevBalance", data.prevbalance),
      new("@WithdrawBalance", data.updatebalance),
    ]);
    if (result == 1)
    {
      return TypedResults.Created();
    }
    else
    {
      return TypedResults.Problem();
    }
  }

}

// Defined class for User entity
public class User
{
  public int id { get; set; }
  public string username { get; set; }
  public string password { get; set; }
  public DateTime joinedDate { get; set; }
  public string address { get; set; }
  public string email { get; set; }
  public decimal balance { get; set; }
  public bool isAdmin { get; set; }
}


