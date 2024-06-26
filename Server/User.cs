namespace Server;
using MySql.Data.MySqlClient;


// Defined class to create user related endpoints/REST API
public static class Users
{
  public record UserCredentials(string username, string password);
  //Creates a record for editing user information. "?" means that null values are allowed. UserId must have a value.  
  public record EditUserData(
    int UserId,
    string? Username,
    string? Password,
    string? Address,
    string? Email,
    int? Balance,
    bool? IsAdmin
  );

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
        id = reader.IsDBNull(reader.GetOrdinal("id")) ? 0 : reader.GetInt32("id"),
        username = reader.IsDBNull(reader.GetOrdinal("username")) ? string.Empty : reader.GetString("username"),
        password = reader.IsDBNull(reader.GetOrdinal("password")) ? string.Empty : reader.GetString("password"),
        joinedDate = reader.IsDBNull(reader.GetOrdinal("joineddate")) ? DateTime.MinValue : reader.GetDateTime("joineddate"),
        address = reader.IsDBNull(reader.GetOrdinal("address")) ? string.Empty : reader.GetString("address"),
        email = reader.IsDBNull(reader.GetOrdinal("email")) ? string.Empty : reader.GetString("email"),
        balance = reader.IsDBNull(reader.GetOrdinal("balance")) ? 0 : reader.GetInt32("balance"),
        isAdmin = reader.IsDBNull(reader.GetOrdinal("isAdmin")) ? false : reader.GetBoolean("isAdmin")
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
        new MySqlParameter("@Username", credentials.username),
        new MySqlParameter("@Password", credentials.password)
    );

    if (reader.Read())
    {
        var user = new User
        {
            id = reader.IsDBNull(reader.GetOrdinal("id")) ? 0 : reader.GetInt32("id"),
            username = reader.IsDBNull(reader.GetOrdinal("username")) ? string.Empty : reader.GetString("username"),
            password = reader.IsDBNull(reader.GetOrdinal("password")) ? string.Empty : reader.GetString("password"),
            joinedDate = reader.IsDBNull(reader.GetOrdinal("joineddate")) ? DateTime.MinValue : reader.GetDateTime("joineddate"),
            address = reader.IsDBNull(reader.GetOrdinal("address")) ? string.Empty : reader.GetString("address"),
            email = reader.IsDBNull(reader.GetOrdinal("email")) ? string.Empty : reader.GetString("email"),
            balance = reader.IsDBNull(reader.GetOrdinal("balance")) ? 0 : reader.GetInt32("balance"),
            isAdmin = reader.IsDBNull(reader.GetOrdinal("isAdmin")) ? false : reader.GetBoolean("isAdmin")
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
    using (var connection = new MySqlConnection(state.DB))
    {
      connection.Open();
      var command = new MySqlCommand("SELECT * FROM users WHERE username = @Username", connection);
      command.Parameters.AddWithValue("@Username", credentials.username);

      using (var reader = command.ExecuteReader())
      {
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
            balance = reader.GetInt32("balance"),
            isAdmin = reader.GetBoolean("isAdmin")
          };
          return user;
        }
      }
    }
    return null;
  }

  // ADD USER BALANCE
  public record Balance(string username, int updatebalance, int prevbalance);
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


  public static bool EditUser(EditUserData data, State state)
  {
    //Creates array of objects
    var parameters = new MySqlParameter[]
    {
      //Creates placeholders with "@" to prevent SQL injection. data.(parameter) is the actual value.
      //If not null, value is used, otherwise null value 
      new MySqlParameter("@UserId", data.UserId),
      new MySqlParameter("@Username", data.Username ?? (object)DBNull.Value),
      new MySqlParameter("@Password", data.Password ?? (object)DBNull.Value),
      new MySqlParameter("@Address", data.Address ?? (object)DBNull.Value),
      new MySqlParameter("@Email", data.Email ?? (object)DBNull.Value),
      new MySqlParameter("@Balance", data.Balance ?? (object)DBNull.Value),
      new MySqlParameter("@IsAdmin", data.IsAdmin ?? (object)DBNull.Value)

    };

    //Query with "@" to prevent SQL injection
    string query = @"
    UPDATE users
    SET
        username = @Username,
        password = @Password,
        address = @Address,
        email = @Email,
        balance = @Balance,
        isAdmin = @IsAdmin
        WHERE id = @UserId";

    int affectedRows = MySqlHelper.ExecuteNonQuery(state.DB, query, parameters);
    //Returns true if rows were updated
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
  public int balance { get; set; }
  public bool isAdmin { get; set; }
}


