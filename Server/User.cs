namespace Server;
using MySql.Data.MySqlClient;

// Defined class to create user related endpoints/REST API
public static class Users
{
  public record UserCredentials(string username, string password);
  //Creating a record for editing user information
  public record EditUserData(
    int UserId,
    string? Username,
    string? Password,
    DateOnly? JoinedDate,
    string? Address,
    string? Email,
    int? Balance,
    bool? IsAdmin
  );

  // Defined a method GetAllUsers, which returns a List type of User(user details)

  public static List<User> GetAllUsers(State state)
  {
    var users = new List<User>();
    var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM users");

    // runs only if there are any records in reader
    while (reader.Read())
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
      "SELECT * FROM user WHERE username = @Username AND password = @Password",
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

  public static bool EditUser(EditUserData data, State state)
  {
    var parameters = new MySqlParameter[]
    {
      new MySqlParameter("@UserId", data.UserId),
            new MySqlParameter("@Username", data.Username ?? (object)DBNull.Value),
            new MySqlParameter("@Password", data.Password ?? (object)DBNull.Value),
            new MySqlParameter("@JoinedDate", data.JoinedDate ?? (object)DBNull.Value),
            new MySqlParameter("@Address", data.Address ?? (object)DBNull.Value),
            new MySqlParameter("@Email", data.Email ?? (object)DBNull.Value),
            new MySqlParameter("@Balance", data.Balance ?? (object)DBNull.Value),
            new MySqlParameter("@IsAdmin", data.IsAdmin ?? (object)DBNull.Value)

    };
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


