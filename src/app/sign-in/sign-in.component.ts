import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
// import { User } from '../models/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '../models/api-response';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../util.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // user: User = new User();

  redirectTo!:string;
  errorResponse!: ApiResponse;
  signInForm!: FormGroup;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private utilService: UtilService,
      private authService: AuthService,
      private httpClientService:HttpClientService
    ){
      this.buildForm();
    }

  ngOnInit(): void {
  }

  //error 객체
  formErrors = {
    'userId' : '',
    'password' : '',
  };

  //error 발생시 message
  formErrorMessages = {
    'userId':{
      'required' : 'Id is required!',
      'email' : 'The format should be email!',
    },
    'password' : {
      'required' : "Password is required!",
    },
  };

  //id password 유효성검사
  buildForm(): void {
    this.signInForm = this.formBuilder.group({
      userId:["",[Validators.required, Validators.email]],
      password:["",Validators.required]
    });
    
    this.signInForm.valueChanges.subscribe(data => {
      this.utilService.updateFormErrors(this.signInForm, this.formErrors, this.formErrorMessages)
    });
  };

  //submit 경로 설정
  submit(){
    this.utilService.makeFormDirtyAndUpdateErrors(this.signInForm, this.formErrors,this.formErrorMessages);
    if(this.signInForm.valid){
      this.authService.login(this.signInForm.value.userId, this.signInForm.value.password)
      .then(data =>{
        this.httpClientService
            .login(this.signInForm.value)
            .subscribe(data =>
              alert("welcome :)")              
              )
              this.router.navigate([this.redirectTo?this.redirectTo:'/']);
      })
      .catch(response => {
        this.errorResponse = response;
        this.utilService.handleFormSubmitError(this.errorResponse, this.signInForm, this.formErrors);
      })
    }
  }

}
