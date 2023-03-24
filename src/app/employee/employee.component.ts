import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService} from '../service/http-client.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

// ngOnInit : A callback method that is invoked immediately 
// after the default change detector has checked the directive's data bound propertys
// for the fires time, and before any of the view or content children have been checked
// : model을 지정된 값으로 초기화하기 위해 사용
export class EmployeeComponent implements OnInit {

  //employee model 변수 선언 
  employees?: Employee[];

  //constructor () : import 객체를 구조화 변수 선언
  constructor(
    private httpClientService:HttpClientService
    ) {}
  
  //employee List
  //.subscribe() : 내용 구독
  ngOnInit(){
    this.httpClientService.getEmployees()
    .subscribe(
      response => {this.employees = response},
    );
  }
  
  //delete function
  //.filter() : elements가 function 통과후 새로운 배열 형성
  // callback function once for each element in an array, and constructs 
  // a new array of all the values for which callback returns a value that coerces to true
  deleteEmployee(employee: Employee): void{
    this.httpClientService
        .deleteEmployee(employee)
        .subscribe( data => {
          this.employees = this.employees?.filter(u => u !== employee);
          alert("delete completed successfuly -!");
    })
  }
}
