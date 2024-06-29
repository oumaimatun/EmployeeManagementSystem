using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<EmployeeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddDbContext<EmployeeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
           .EnableSensitiveDataLogging()
           .LogTo(Console.WriteLine, LogLevel.Information));

var app = builder.Build();

// Configure CORS
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:4200") 
           .AllowAnyHeader()
           .AllowAnyMethod();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
