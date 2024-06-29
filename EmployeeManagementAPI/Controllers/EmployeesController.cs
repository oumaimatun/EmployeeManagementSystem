using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;
using Microsoft.Extensions.Logging;

namespace EmployeeManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeContext _context;
        private readonly ILogger<EmployeesController> _logger;
        public EmployeesController(EmployeeContext context, ILogger<EmployeesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
public async Task<ActionResult<Employee>> GetEmployee(Guid id)
{
    _logger.LogInformation($"Received request for Employee ID: {id}");

    var employee = await _context.Employees.FindAsync(id);

    if (employee == null)
    {
        _logger.LogWarning($"Employee with ID {id} not found.");
        return NotFound();
    }

    _logger.LogInformation($"Employee with ID {id} found: {employee.FirstName} {employee.LastName}");
    return employee;
}


        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            employee.Id = Guid.NewGuid();
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(Guid id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Employees.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
