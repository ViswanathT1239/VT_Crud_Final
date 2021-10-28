import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isNew: boolean;
  id: number;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    this.isNew = !this.id;
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      if (this.employees.length > 0) {
        this.employees.sort((a, b) => b.id - a.id);
      }
    });
    if(!this.isNew){
      this.employeeService.getEmployee(this.id)
      .subscribe(data=>this.employeeForm.patchValue(data));
    }

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
    if(this.isNew){
    this.createEmployee();
    }
    else{
      this.updateEmployee();
    }
  }

  createEmployee() {
    this.loading = true;
    var user = {
      id: this.employees.length == 0 ? 1 : this.employees[0].id + 1,
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
updateEmployee(){
  this.loading = true;
    var user = {
      id: this.id,
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email
    };
    this.employeeService.updateEmployee(this.id, user)
    .pipe(first())
      .subscribe(
        data => {
          alert("Employee Updated Successfully!")
          this.router.navigate(['/employees']);
        },
        error => {
          alert("Error Occured!");
          this.loading = false;
        });
}

}
