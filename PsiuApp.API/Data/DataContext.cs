using Microsoft.EntityFrameworkCore;
using PsiuApp.API.Models;

namespace PsiuApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}

        public DbSet<Value> Values { get; set; }       
    }
}