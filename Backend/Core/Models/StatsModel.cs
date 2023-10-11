namespace Core.Models
{
    public class Stats
    {
        public int TotalCustomers {get; set;}
        public int TotoalOrders { get; set; }
        public int PendingOrders {get; set;}
        public int DraftOrders { get; set; }
        public int CompletedOrders {get; set;}
        public int ShippedOrders { get; set; }
    }
}