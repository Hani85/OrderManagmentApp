namespace Core.Models
{
    public class CustomerModel
    {
        public int? Id { get; set; }
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public string AdressLine1 { get; set; }
        public string AdressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}