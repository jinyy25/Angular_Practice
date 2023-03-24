import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import {Employee} from '../models/employee.model';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  user!: Employee;
  empId: string;

  constructor(
      private httpClientService:HttpClientService,
      private route:ActivatedRoute,
    ){
      this.empId = route.snapshot.params['empId'];
    }

  ngOnInit(){
    this.httpClientService
      .getOne(this.empId)
      .subscribe(
        response => {this.user = response}
      );
  }

  updateEmployee():void {    
    this.httpClientService
      .updateEmployee(this.user)
      .subscribe(data=>{              
        alert("Employee updated succesfully :)");        
        location.replace("/");
      });


    };

}
