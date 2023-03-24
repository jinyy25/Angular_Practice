import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { User } from '../models/user.model';
// Spring Restful Api connection
// using HttpClient

//의존성주입
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(
    private httpClient:HttpClient
  ) {}
  
  //URL connection 
  private employeeURL = 'http://localhost:8080/employees';
  private userURL = 'http://localhost:8080/users/';
  
  //1. All employee List
  public getEmployees(){
    console.log("test call");
    return this.httpClient.get<Employee[]>(this.employeeURL);
  }

  //2. Employee Delete 
  public deleteEmployee(employee){
    // return this.httpClient.delete<Employee>("http://localhost:8080/employees"+"/"+employee.empId);
    console.log("delete one"+employee.empId);
    return this.httpClient.delete<Employee>(this.employeeURL+"/"+employee.empId);
  }

  //3. Employee Insert
  public createEmployee(employee){
    console.log("just one"+employee.empId);
    return this.httpClient.post<Employee>(this.employeeURL,employee);
  }

  //4. Employee Update
  public updateEmployee(employee){
    console.log("updateEmployee"+employee.name);
    return this.httpClient.put<Employee>(this.employeeURL,employee);
  }

  //5. Employee getOne
  public getOne(empId){
    console.log("getOne"+empId);
    return this.httpClient.get<Employee>(this.employeeURL+"/"+empId);
  }

  //6. User Insert
  public createUser(user){
    console.log("createUser"+user);
    return this.httpClient.post<User>(this.userURL,user);
  }

  //7. User login
  public login(user){
    console.log("login check" + user);
    return this.httpClient.get<User>(this.userURL,user);
  }


}
