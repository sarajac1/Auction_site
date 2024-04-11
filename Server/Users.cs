using MySql.Data.MySqlClient;

namespace Server;

public class User
{
    public int id { get; set; }
    public string? username { get; set; }
    public string? password { get; set; }
    public DateTime joineddate { get; set; }
    public string? address { get; set; }
    public string? email { get; set; }
    public int balance { get; set; }
    public bool isAdmin { get; set; }
}

