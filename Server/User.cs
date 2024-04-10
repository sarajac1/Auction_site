namespace Server;
using MySql.Data.MySqlClient;

// Defined class to create user related endpoints/REST API
public static class Users
{
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