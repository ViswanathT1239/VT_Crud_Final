import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Observable<Employee[]>=new Observable<Employee[]>();
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }


}
