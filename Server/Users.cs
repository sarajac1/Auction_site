namespace Server;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public DateTime JoinedDate { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public decimal Balance { get; set; }
    public bool IsAdmin { get; set; }
    // Add other properties as needed
    
    // Constructor
    public User(int id, string username, string password, 
    DateTime joinedDate, string address, string email, decimal balance, bool isAdmin)
    {
        Id = id;
        Username = username;
        Password = password;
        JoinedDate = joinedDate;
        Address = address;
        Email = email;
        Balance = balance;
        IsAdmin = isAdmin;
        // Initialize other properties if needed
    }
    
    // Default constructor for serialization
    public User()
    {
    }
}