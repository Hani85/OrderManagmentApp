using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Models;
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

        public async Task<Order> AddOrUpdateOrderAsync(OrderModel orderModel)
        {
            var context = _dbContextFactory.CreateDbContext();
            Order order;

            var customer = await context.Customers
                            .Where(c => c.Id == orderModel.CustomerId)
                            .FirstOrDefaultAsync();
            if(customer == null){
                throw new Exception($"Customer with id {orderModel.CustomerId} was not found");
            }
            if(orderModel.Id ==null){
                order = new Order {
                    CustomerId = orderModel.CustomerId,
                    OrderDate = orderModel.OrderDate,
                    Description = orderModel.Description,
                    Totalmount = orderModel.Totalmount,
                    DepositAmount = orderModel.DepositAmount,
                    IsDelivery = orderModel.IsDelivery,
                    Status = orderModel.Status,
                    OtherNotes = orderModel.OtherNotes   
                };
                
                await context.Orders.AddAsync(order); 
                
            }
            else{
                order = await context.Orders
                            .Where(o => o.Id == orderModel.Id)
                            .FirstOrDefaultAsync();

                if(order == null){
                    throw new Exception($"Order with id {orderModel.Id} was not found");
                }

                order.OrderDate = orderModel.OrderDate;
                order.Description = orderModel.Description;
                order.Totalmount = orderModel.Totalmount;
                order.DepositAmount = orderModel.DepositAmount;
                order.IsDelivery = orderModel.IsDelivery;
                order.Status = orderModel.Status;
                order.OtherNotes = orderModel.OtherNotes;

                context.Orders.Update(order);

            }
            await context.SaveChangesAsync();

            return order;
        }

        public async Task<bool> DeleteOrderAsync(int orderId)
        {
            var context = _dbContextFactory.CreateDbContext();

            var order = await context.Orders
                            .Where(o => o.Id == orderId)
                            .FirstOrDefaultAsync();
            
            if(order == null)
                 throw new Exception($"Order with id {orderId} was not found");

            order.IsDeleted = true;

            context.Orders.Update(order);
            return await context.SaveChangesAsync() > 0;
        }
    }
}