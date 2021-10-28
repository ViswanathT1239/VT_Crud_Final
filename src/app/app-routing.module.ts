import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employees', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'add', component: EmployeeCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EmployeeCreateComponent, canActivate: [AuthGuard] },
  { path: 'view', component: EmployeeViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
