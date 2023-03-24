import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();

  constructor(
    private httpClientService:HttpClientService
  ){}

  ngOnInit(): void {}

  createEmployee():void {
    this.httpClientService
        .createEmployee(this.employee)
        .subscribe(data=>{
          alert("Employee created successfully.");
          location.replace("/");
        });
  };
}
