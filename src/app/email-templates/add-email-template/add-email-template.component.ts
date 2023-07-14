import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/shared.service';
import { EmailTemplateService } from '../email-templates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-email-template',
  templateUrl: './add-email-template.component.html',
  styleUrls: ['./add-email-template.component.scss']
})
export class AddEmailTemplateComponent implements OnInit {
  title = "Add Email Template";
  etemplate_data: any  ={
    subject: "",
    content:""
  }
  dataSource: Array<any> = [];
  isEdit = false;
  showSubmit: Boolean = true;

  
  constructor(
    public sharedService: SharedService,
    public emailTemplateService: EmailTemplateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/email-templates/edit') {
      this.title = 'Edit Email Template';
      this.isEdit = true;
      this.showSubmit = false;
      let getId = JSON.parse(sessionStorage.selected_etemplate);
      this.etemplate_data._id = getId._id;
      this.fetchOneEmailTemplate(this.etemplate_data._id);
    }
  }

  fetchOneEmailTemplate(pageId){
    this.sharedService.showLoader = true;
    this.isEdit = true;

    this.title = 'Edit Email Template';
    this.emailTemplateService
      .getOneEmailTemplate(pageId)
      .then((res: any) => {
        this.etemplate_data = res.data;
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  cancelEmailTemplate() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe((response) => {
        if (response === true) {
          this.router.navigate(["/email-templates"]);
        }
      });
  }

  updateEdit() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
    senter data in all the fields and then click on update.`
      )
      .subscribe((response) => {
        if (response === "") {
          this.router.navigateByUrl("/email-templates");
        }
      });
  }

  editEmailTemplate() {
    this.sharedService.showLoader = true;
    this.emailTemplateService.updatingEmailTemplate(this.etemplate_data).subscribe(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage("Email template updated successfully");
        this.router.navigate(["/email-templates"]);
      },
      (err: any) => {
        console.log("error occured", err);
      }
    );
  }

}
