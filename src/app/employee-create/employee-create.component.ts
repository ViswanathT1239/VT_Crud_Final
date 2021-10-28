import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  loading = false;
  submitted = false;
  employees = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {

  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      this.employees.sort((a, b) => b.id - a.id);
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.employeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      this.loading = false;
      return;
    }

    this.createPerson();
  }

  createPerson() {
    this.loading = true;
    var user = {
      id: this.employees[0].id + 1,
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email
    };
    this.employeeService.createEmployee(user)
      .pipe(first())
      .subscribe(
        data => {
          alert("Employee Added Successfully!")
          this.router.navigate(['/employees']);
        },
        error => {
          alert("Error Occured!");
          this.loading = false;
        });
  }

}
