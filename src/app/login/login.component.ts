import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '@app/shared/shared.service';
import { environment } from '@env/environment';
import { AuthenticationService } from '@app/core';
import { LoginService } from '@app/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  hide = true;
  invalidUsername = false;
  message: any;

  constructor(
    public sharedService: SharedService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private loginService: LoginService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.message = sessionStorage && sessionStorage.loginErrMessage ? JSON.parse(sessionStorage.loginErrMessage) : '';
  }

  login() {
    this.authenticationService.login(this.loginForm.value).subscribe(
      (e: any) => {
        console.log(e);
      },
      err => {
        console.log(err);
      }
    );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

  validateUsername(value: any) {
    if (value.search(/^[0-9]{10}$/) === 0) {
      this.invalidUsername = false;
    } else {
      this.invalidUsername = true;
    }
  }

  validateLength(value: any) {
    if (value.length === 10) {
      this.invalidUsername = false;
    } else {
      this.invalidUsername = true;
    }
  }

  // forgorPassword() {
  //   this.router.navigateByUrl('/forgot');
  // }
}
