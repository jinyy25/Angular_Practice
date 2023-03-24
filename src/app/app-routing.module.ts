import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AddUserComponent} from './add-user/add-user.component';
import { MainViewComponent } from './main-view/main-view.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { Error404Component } from './error404/error404.component';

//경로 설정
// Main - employeeList Component 
// Main - addEmployee Component
const routes: Routes = [
  { path:'', component: MainViewComponent },
  { path:'addemployee', component: AddEmployeeComponent },
  { path:'updateEmployee/:empId', component: UpdateEmployeeComponent},
  { path:'createuser',component: AddUserComponent },
  { path:'signin',component: SignInComponent },
  { path:'viewemployee', component:EmployeeComponent },
  { path:'**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})

export class AppRoutingModule { }
