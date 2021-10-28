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
  displayedColumns = ['id', 'name', 'email', 'action'];

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  loadData(){
    this.employeeService.getEmployeesList().subscribe((data: Employee[]) =>
      this.dataSource.data = data as Employee[]);
  }
  AddEmployee() {
    this.router.navigate(['/add']);
  }
  viewEmployee(id: number) {
    this.router.navigate(['/view'], { queryParams: { id: id } });
  }
  editEmployee(id: number) {
    this.router.navigate(['/edit'], { queryParams: { id: id } });
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.loadData();
        },
        (error: any) => console.log(error));
  }
}
