namespace Server;
using MySql.Data.MySqlClient;


// Defined class to create user related endpoints/REST API
public static class Users
{
  public record UserCredentials(string username, string password);
  //Creating a record for editing user information. "?" means that null values are allowed. UserId must have a value.  
  public record EditUserData(
    int UserId,
    string? Username,
    string? Password,
    DateTime? JoinedDate,
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

  public static bool EditUser(EditUserData data, State state)
  {
    var parameters = new MySqlParameter[]
    {
      //Creates placeholders with "@" to prevent SQL injection. data.(parameter) is the actual value.
      //If not null, value is used, otherwise null value 
      new MySqlParameter("@UserId", data.UserId),
            new MySqlParameter("@Username", data.Username ?? (object)DBNull.Value),
            new MySqlParameter("@Password", data.Password ?? (object)DBNull.Value),
            new MySqlParameter("@JoinedDate", data.JoinedDate ?? (object)DBNull.Value),
            new MySqlParameter("@Address", data.Address ?? (object)DBNull.Value),
            new MySqlParameter("@Email", data.Email ?? (object)DBNull.Value),
            new MySqlParameter("@Balance", data.Balance ?? (object)DBNull.Value),
            new MySqlParameter("@IsAdmin", data.IsAdmin ?? (object)DBNull.Value)

    };

    string query = @"
    UPDATE users
    SET
        username = @Username,
        password = @Password,
        joinedDate = @JoinedDate,
        address = @Address,
        email = @Email,
        balance = @Balance,
        isAdmin = @IsAdmin
        WHERE id = @UserId";

    int affectedRows = MySqlHelper.ExecuteNonQuery(state.DB, query, parameters);
    return affectedRows > 0;
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


