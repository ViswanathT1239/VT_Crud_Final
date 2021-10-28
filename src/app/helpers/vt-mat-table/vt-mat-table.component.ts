import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-vt-mat-table',
  templateUrl: './vt-mat-table.component.html',
  styleUrls: ['./vt-mat-table.component.css']
})
export class VtMatTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Employee>;
  dataSource = new MatTableDataSource<Employee>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email'];

  constructor(private employeeService : EmployeeService, private router:Router) {
  }

   ngOnInit(){
     this.employeeService.getEmployeesList().subscribe((data:Employee[])=>
     this.dataSource.data = data as Employee[]);
   }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  AddEmployee(){    
    this.router.navigate(['/add']);
  }
}
