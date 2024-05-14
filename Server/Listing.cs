namespace Server;
using MySql.Data.MySqlClient;

public class Listing
{
    public int id { get; set; }
    public int sellerid { get; set; }
    public string? title { get; set; }
    public string? sellername { get; set; }
    public string? description { get; set; }
    public string? image { get; set; }
    public DateTime startdate { get; set; }
    public DateTime enddate { get; set; }
    public int startbid { get; set; }
    public decimal highbidamount { get; set; }
}

public static class Listings
{
    public static string ConnectionString { get; set; }

    public record PostData(int SellerId, string Title, string Description, string Image, decimal StartBid);

    public static IResult Post(PostData data, State state)
    {
        string query = "INSERT INTO listings (sellerid, title, description, image, startbid) VALUES (@SellerId, @Title, @Description, @Image, @StartBid)";
        var parameters = new MySqlParameter[]
        {
            new MySqlParameter("@SellerId", data.SellerId),
            new MySqlParameter("@Title", data.Title),
            new MySqlParameter("@Description", data.Description),
            new MySqlParameter("@Image", data.Image),
            new MySqlParameter("@StartBid", data.StartBid)
        };
        var result = MySqlHelper.ExecuteNonQuery(state.DB, query, parameters);
        if (result == 1)
        {
            return TypedResults.Created();
        }
        else
        {
            return TypedResults.Problem();
        }
    }

    public static List<Listing> GetAllListings(State state)
    {
        var listings = new List<Listing>();
        var query = "SELECT users.username, IFNULL(MAX(bidamount),0) AS highestbidamount, listings.* FROM listings " +
                    "LEFT JOIN users ON listings.sellerid = users.id " +
                    "LEFT JOIN bids ON bids.itemid = listings.id GROUP BY listings.id";
        using var reader = MySqlHelper.ExecuteReader(state.DB, query);
        while (reader.Read())
        {
            var listing = new Listing
            {
                id = reader.GetInt32("id"),
                sellerid = reader.GetInt32("sellerid"),
                title = reader["title"] as string,
                description = reader["description"] as string,
                image = reader["image"] as string,
                startdate = reader.GetDateTime("startdate"),
                enddate = reader.GetDateTime("enddate"),
                startbid = reader.GetInt32("startbid"),
                sellername = reader["username"] as string,
                highbidamount = reader.GetDecimal("highestbidamount"),
            };
            listings.Add(listing);
        }
        return listings;
    }

    public static IResult Delete(int listingId, State state)
    {
        string query = "DELETE FROM listings WHERE id = @ListingId";
        var parameters = new MySqlParameter[] {
            new MySqlParameter("@ListingId", listingId)
        };
        int result = MySqlHelper.ExecuteNonQuery(state.DB, query, parameters);
        if (result == 1)
        {
            return TypedResults.NoContent();
        }
        else
        {
            return TypedResults.NotFound();
        }
    }

    public record SingleDTO(int id, int sellerid, string title, string description, string image, DateTime startdate, DateTime enddate, int startbid);

    public static SingleDTO? ListById(int id, State state)
    {
        string query = "SELECT * FROM listings WHERE id = @id";
        var parameter = new MySqlParameter("@id", id);
        using var reader = MySqlHelper.ExecuteReader(state.DB, query, parameter);
        if (reader.Read())
        {
            return new SingleDTO(
                reader.GetInt32("id"),
                reader.GetInt32("sellerid"),
                reader.GetString("title"),
                reader.GetString("description"),
                reader.GetString("image"),
                reader.GetDateTime("startdate"),
                reader.GetDateTime("enddate"),
                reader.GetInt32("startbid"));
        }
        return null;
    }
}
