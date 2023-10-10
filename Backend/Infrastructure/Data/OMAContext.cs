using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class OMAContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public OMAContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().HasData(
                new Customer{
                    Id = 1,
                    FirstName= "James",
                    LastName = "Bond",
                    ContactNumber = "995465734973",
                    IsDeleted = false,
                    Email = "jamesbond@hermajesty.com"
                },
                new Customer{
                    Id = 2,
                    FirstName= "Monty",
                    LastName = "Python",
                    ContactNumber = "4456788755",
                    IsDeleted = false,
                    Email = "montypython@hermajesty.com"
                }
            );

            modelBuilder.Entity<Address>().HasData(
                new Address {
                    Id = 1,
                    CustomerId= 1,
                    AdressLine1 = "Some Place",
                    AdressLine2 = "There",
                    City = "Melbourne",
                    State = "Victoria",
                    Country= "AU"
                },
                new Address {
                    Id = 2,
                    CustomerId= 2,
                    AdressLine1 = "Anothere Place",
                    AdressLine2 = "Here",
                    City = "Melbourne",
                    State = "Victoria",
                    Country= "AU"
                }
            );

            modelBuilder.Entity<Order>().HasData(
                new Order {
                    Id = 1,
                    CustomerId= 1,
                    OrderDate= new DateTime(2022,10,20),
                    Description= "New Item",
                    Totalmount= 500,
                    DepositAmount= 10,
                    IsDelivery = true,
                    Status = Status.PENDING,
                    OtherNotes = "Something new",
                    IsDeleted = false,
                },
                new Order {
                    Id = 2,
                    CustomerId= 2,
                    OrderDate= new DateTime(2022,11,20),
                    Description= "Another New Item",
                    Totalmount= 5000,
                    DepositAmount= 250,
                    IsDelivery = false,
                    Status = Status.DRAFT,
                    OtherNotes = "Something new again",
                    IsDeleted = false,
                }
            );
        }
    }
}