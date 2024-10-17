using System;
using System.Collections.Generic;


namespace api_dt_money.Entities
{
    public class Transaction
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public string Type { get; set; }

        public decimal Price { get; set; }

        public DateTime CreatedAt { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

    }
}