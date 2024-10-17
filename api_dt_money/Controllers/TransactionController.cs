using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_dt_money.Context;
using api_dt_money.dto;
using api_dt_money.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api_dt_money.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly DtMoneyContext _context;

        public TransactionController(DtMoneyContext context)
        {
            _context = context;
        }

        [HttpPost("Add")]
        public IActionResult AddTransaction([FromBody] TransactionCreateDto transactionDto)
        {

            var category = _context.categories.FirstOrDefault(c => c.Id == transactionDto.CategoryId);

            if (category == null)
            {
                return NotFound("Categoria não encontrada");
            }

            var transaction = new Transaction
            {
                Description = transactionDto.Description,
                Price = transactionDto.Price,
                CreatedAt = DateTime.Now,
                Type = transactionDto.Type,
                CategoryId = transactionDto.CategoryId,
                Category = category
            };

            var newTransaction = new TransactionDto
            {
                Description = transaction.Description,
                Price = transaction.Price,
                CreatedAt = transaction.CreatedAt,
                Type = transaction.Type,
                Category = category.Name
            };

            _context.transactions.Add(transaction);
            _context.SaveChanges();

            return Ok(newTransaction);
        }


        [HttpGet("List")]
        public IActionResult GetTransactions(string? description)
        {

            var transactionsQuery = from transaction in _context.transactions
                                    join category in _context.categories
                                        on transaction.CategoryId equals category.Id
                                    select new TransactionDto
                                    {
                                        Id = transaction.Id,
                                        Description = transaction.Description,
                                        Type = transaction.Type,
                                        Price = transaction.Price,
                                        CreatedAt = transaction.CreatedAt,
                                        Category = category.Name
                                    };

            if (!string.IsNullOrEmpty(description))
            {
                transactionsQuery = transactionsQuery.Where(t => t.Description.Contains(description));
            }

            var transactions = transactionsQuery.OrderByDescending(o => o.CreatedAt).ToList();

            return Ok(transactions);
        }

    }
}