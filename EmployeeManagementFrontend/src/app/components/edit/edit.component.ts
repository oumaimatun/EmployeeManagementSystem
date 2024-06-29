import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployee(this.employeeId).subscribe(
      (employee: Employee) => {
        this.employeeForm.patchValue(employee);
      },
      error => {
        console.error('Error fetching employee:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee = {
        ...this.employeeForm.value,
        id: this.employeeId
      };

      console.log('Updating employee with data:', updatedEmployee);

      this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        error => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      console.warn('Form is not valid:', this.employeeForm);
    }
  }
}