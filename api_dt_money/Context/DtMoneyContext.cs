using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_dt_money.Entities;
using Microsoft.EntityFrameworkCore;

namespace api_dt_money.Context
{
    public class DtMoneyContext : DbContext
    {
        public DtMoneyContext(DbContextOptions<DtMoneyContext> options) : base(options) { }

        public DbSet<Category> categories { get; set; }
        public DbSet<Transaction> transactions { get; set; }

    }
}