using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_dt_money.dto
{
    public class TransactionCreateDto
    {
        public string Description { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
    }
}