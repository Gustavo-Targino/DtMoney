using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_dt_money.Context;
using api_dt_money.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api_dt_money.Controllers
{
     [ApiController]
     [Route("[controller]")]
     public class CategoryController : ControllerBase
     {

          private readonly DtMoneyContext _context;

          public CategoryController(DtMoneyContext context)
          {
               _context = context;
          }

          [HttpGet("List")]
          public IActionResult GetCategories()
          {
               var categories = _context.categories.Select(c => new { c.Id, c.Name }).ToList();

               return Ok(categories);
          }

          [HttpPost("Add")]
          public IActionResult AddCategory(Category category)
          {
               _context.Add(category);
               _context.SaveChanges();

               return Ok(category);
          }

     }
}