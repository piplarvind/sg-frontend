import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/shared.service';
import { CmsPageService } from '../cms-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cms-page',
  templateUrl: './add-cms-page.component.html',
  styleUrls: ['./add-cms-page.component.scss']
})
export class AddCmsPageComponent implements OnInit {
  title = "Add CMS Page";
  cms_page_data: any  ={
    page_title: "",
    content:""
  }
  dataSource: Array<any> = [];
  isEdit = false;
  showSubmit: Boolean = true;

  
  constructor(
    public sharedService: SharedService,
    public cmsPageService: CmsPageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/cms-pages/edit') {
      this.title = 'Edit CMS Page';
      this.isEdit = true;
      this.showSubmit = false;
      let getId = JSON.parse(sessionStorage.selected_cms_page);
      this.cms_page_data._id = getId._id;
      this.fetchOneCMSPage(this.cms_page_data._id);
    }
  }

  fetchOneCMSPage(pageId){
    this.sharedService.showLoader = true;
    this.isEdit = true;

    this.title = 'Edit CMS Page';
    this.cmsPageService
      .getOneCMSPage(pageId)
      .then((res: any) => {
        this.cms_page_data = res.data;
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  cancelCMSPage() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe((response) => {
        if (response === true) {
          this.router.navigate(["/cms-pages"]);
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
          this.router.navigateByUrl("/cms-pages");
        }
      });
  }

  editCMSPage() {
    this.sharedService.showLoader = true;
    this.cmsPageService.updatingCMSPage(this.cms_page_data).subscribe(
      (res: any) => {
        this.sharedService.showLoader = false;
        this.sharedService.showMessage("CMS page updated successfully");
        this.router.navigate(["/cms-pages"]);
      },
      (err: any) => {
        console.log("error occured", err);
      }
    );
  }

}
