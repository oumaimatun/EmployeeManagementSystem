import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../employee.model';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent {

  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      position: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeService.createEmployee(newEmployee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
