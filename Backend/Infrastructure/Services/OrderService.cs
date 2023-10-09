using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IDbContextFactory<OMAContext> _dbContextFactory;

        public OrderService(IDbContextFactory<OMAContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }
        public IQueryable<Order> GetOrders()
        {
            var context = _dbContextFactory.CreateDbContext();
            context.Database.EnsureCreated();

            return context.Orders
                .Where(o => !o.IsDeleted)
                .Include(o => o.Customer);
        }
    }
}