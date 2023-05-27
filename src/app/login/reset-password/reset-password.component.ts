import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/login/login.service';
import { SharedService } from '@app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  newPassword: any;
  reNewPassword: any;
  reqObj: any;
  passwordMismatch: Boolean;
  activeRouteSubscriber: any;
  userId: any;
  req: any;
  pathurl: any;
  constructor(
    private loginService: LoginService,
    public sharedService: SharedService,
    public activateRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    //  this.req=false;
    this.activeRouteSubscriber = this.activateRoute.queryParams.subscribe(
      param => {
        this.userId = param.user;
        this.getPath();
      }
    );
  }

  getPath() {
    let path = window.location.href;
    this.pathurl = path.split('?');
  }

  updatepassword() {
    this.reqObj = {
      password: this.newPassword,
      user_id: this.userId
    };
    this.loginService
      .changePassword(this.reqObj)
      .then((res: any) => {
        this.sharedService.showMessage('Password Updated successfully');
        if (this.pathurl[0] === `${environment.resetpasswordurl}`) {
          this.router.navigateByUrl('/login');
        } else {
          this.router.navigateByUrl('/message');
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  // }

  errUpdate() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
  enter password and then click on submit.`
      )
      .subscribe(response => {
        if (response === '') {
        }
      });
  }

  matchPassword() {
    if (this.newPassword !== this.reNewPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }
}
