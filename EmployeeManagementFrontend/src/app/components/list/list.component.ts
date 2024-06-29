import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        
        this.employees = this.employees.filter(employee => employee.id !== id);
      });
    }
  }

}
