import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  employee: Employee;


  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
    
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id') as string;
    const url = `${this.employeeService.apiUrl}/${employeeId}`;
    console.log('Employee ID:', employeeId);  
    console.log('API URL:', url); 
    this.employeeService.getEmployee(employeeId).subscribe(
      employee => {
        console.log('Employee Data:', employee);  
        this.employee = employee;
      },
      error => {
        console.error('Error fetching employee:', error);  
      }
    );
  }
}
