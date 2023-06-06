import { Component, OnInit } from '@angular/core';
import { ResourceService } from '@app/resource/resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';
import { UsersService } from '@app/users/users.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  loggedInUser = '';
  today =
    new Date().getMonth() +
    1 +
    '/' +
    new Date().getDate() +
    '/' +
    new Date().getFullYear();
  title = 'Resource Library';
  isEdit = false;
  curSelectClub: any;
  isSubmit: Boolean;
  selectedVid: any = '';
  selectedImg: any = '';
  selectedVidName: any;
  progress: any;
  pro: Boolean = false;
  count = [{ question_no: 0, Question: ' ' }];
  resource_type = '';
  documentName: any;
  resource = {
    assignment_type: '',
    created_by: '',
    // created_on: '',
    type: '',
    resource_name: '',
    task_description: '',

    doc: '',
    video: '',
    quiz: [],
    quiz_name: '',
    document_name: '',
    image: '',
    image_name: '',
    video_name: '',
    clubId: ''
  };

  coachList: Array<any>;
  videoUpload: any;
  imgUpload: any;
  activeRouteSubscriber: any;
  editResourceId: any;
  docUpload: any;
  categoryDisable: Boolean = false;
  docUploadName = '';
  startDate: any = new Date(1950, 0, 1);
  taskList: Array<any>;
  assignmentList: Array<any>;

  constructor(
    public resourceService: ResourceService,
    public sharedService: SharedService,
    public userService: UsersService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private _DomSanitizationService: DomSanitizer
  ) {}

  ngOnInit() {
    if (localStorage.user_role === 'Super Admin') {
      this.loggedInUser = 'Super Admin';
      this.resource.clubId = localStorage.super_cur_clubId;
    } else if (localStorage.user_role === 'Platform Admin') {
      this.loggedInUser = 'Platform Admin';
      this.resource.clubId = localStorage.super_cur_clubId;
    } else {
      const userDetails = JSON.parse(localStorage.userDetails);
      this.resource.clubId = localStorage.club_id;
      // this.resource.clubId = userDetails.club._id;
      let name = {
        fname: '',
        lname: ''
      };
      for (let i = 0; i < userDetails.profile_fields.length; i++) {
        if (userDetails.profile_fields[i].field.name === 'first_name') {
          name.fname = userDetails.profile_fields[i].value;
        }
        if (userDetails.profile_fields[i].field.name === 'last_name') {
          name.lname = userDetails.profile_fields[i].value;
        }
      }

      this.loggedInUser = name.fname + ' ' + name.lname;
    }

    if (this.router.url !== '/resources/add') {
      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.editResourceId = param.editResId;
        }
      );
      this.getOneResource(this.editResourceId);
    }
    this.resourceService.getAllTaskTypes().subscribe((e: any) => {
      this.taskList = e.data;
    });
    if (this.resource.clubId) {
      this.resourceService
        .getAllAssignmentTypes(this.resource.clubId)
        .subscribe((e: any) => {
          this.assignmentList = e.data;
        });
    }
  }

  getOneResource(id: any) {
    this.sharedService.showLoader = true;
    this.categoryDisable = true;
    this.isEdit = true;
    this.resourceService
      .getResources(this.editResourceId)
      .subscribe((e: any) => {
        this.resource = e.data;
        this.categoryDisable = true;
        this.isEdit = true;
        this.sharedService.showLoader = false;
        if (this.resource.video && e.data.video.vimeoData) {
          this.selectedVid =
            'https://vimeo.com/' + e.data.video.vimeoData.vimeoId;
        }
        this.resource.assignment_type = e.data.assignment_type._id;
        this.resource.created_by =
          this.resource.created_by !== null ? e.data.created_by._id : '';
        this.resource.type = this.resource.type;
        this.resource.resource_name = this.resource.resource_name;
        if (this.resource.type === 'video') {
          this.resource.video_name = e.data.video.name;
        }
        if (this.resource.image_name) {
          this.resource.image_name = this.resource.image_name;
        }
        if (this.resource.doc && e.data.doc.filepath) {
          this.documentName = this.resource.resource_name;
          this.docUploadName = e.data.doc.filepath;
        }
        if (this.resource.type === 'image') {
          // this.selectedImg = this.resource.image;
          this.selectedImg = `${environment.imageUrl}${this.resource.image}`;

          this.resource.image_name = this.resource.image_name;
        }
        if (this.resource.type === 'quiz') {
          this.resource.quiz_name = this.resource.quiz_name;
          this.count = this.resource.quiz;
        }
      });
  }

  openDoc() {
    window.open(`${environment.imageUrl}${this.docUploadName}`);
  }

  openImage() {
    window.open(`${this.selectedImg}`);
  }
  uploadVideo() {
    const formData = new FormData();
    formData.append('video', this.videoUpload);

    formData.append('description', 'new test video');
    formData.append('name', this.resource.video_name);
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      formData.append('clubId', localStorage.super_cur_clubId);
    }

    this.pro = true;
    this.resourceService.uploadVideo(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        let a: any = event.body;

        this.isSubmit = true;
        this.pro = false;
        this.resource.video = a.data._id;
        // this.sharedService.showLoader = false
        this.sharedService.showMessage('video uploaded Successfully ');
      }
    });
  }

  playVideo() {
    window.open(this.selectedVid, '_blank');
  }

  uploadDocs() {
    const formData = new FormData();
    formData.append('doc', this.docUpload);
    formData.append('description', 'new test Doc');
    formData.append('name', this.documentName);
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      formData.append('clubId', localStorage.super_cur_clubId);
    }
    this.sharedService.showLoader = true;
    this.resourceService.uploadDocument(formData).subscribe(
      (result: any) => {
        this.isSubmit = true;
        (this.resource.doc = result.data._id),
          (this.sharedService.showLoader = false);
        this.sharedService.showMessage('document uploaded Successfully ');
        // .subscribe(() => this.router.navigate(['/clubs']));
      },
      err => {
        this.sharedService.showLoader = false;
        console.log(err);
        this.sharedService.loginDialog(err.error.message);
      }
    );
  }

  getVideoDetail(event: any) {
    this.videoUpload = event.target.files[0];
    this.selectedVid = event.target.files[0].name;
  }

  getDocDetails(event: any) {
    this.docUpload = event.target.files[0];
    this.docUploadName = this.docUpload.name;
  }

  getQuizData() {}

  addQuestions(q: any) {
    const data = {
      Question: q.Question
    };
    this.sharedService.showLoader = true;
    this.resourceService.addQuestion(data).subscribe((result: any) => {
      this.resource.quiz.push(result.data);
      // this.resource.video = result.data._id,
      this.sharedService.showLoader = false;
      this.sharedService.showMessage(result.message);
      // .subscribe(() => this.router.navigate(['/clubs']));
    });
  }

  createResource() {
    const temp = this.resource;
    temp.created_by = localStorage._id;
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      temp.clubId = localStorage.super_cur_clubId;
      temp.created_by = localStorage._id;
    }
    if (temp.video === '') {
      delete temp.video;
    }
    if (temp.doc === '') {
      delete temp.doc;
    }
    if (!temp.quiz) {
      delete temp.quiz;
    }

    //  remove all keys with empty value
    this.sharedService.showLoader = true;
    for (let propName in temp) {
      if (
        temp[propName] === null ||
        temp[propName] === undefined ||
        temp[propName] === ''
      ) {
        delete temp[propName];
      }
    }
    if (this.resource.image || this.resource.doc || this.resource.video) {
      this.resourceService.createResources(temp).subscribe(
        (e: any) => {
          this.sharedService.showLoader = false;
          this.sharedService
            .showMessage("Resource library created successfully'")
            .subscribe(() => this.router.navigate(['/resources']));
        },
        err => {
          console.log(err);
          this.sharedService
            .loginDialog(err.error.message)
            .subscribe(() => this.router.navigate(['/resources/add']));
          this.sharedService.showLoader = false;
        }
      );
    } else {
      this.sharedService.showLoader = false;
      this.sharedService.loginDialog(
        'Save media before saving resource library'
      );
    }
  }

  updateResource() {
    this.sharedService.showLoader = true;
    const temp: any = this.resource;
    temp.created_by = localStorage.user_id;
    temp._id = this.editResourceId;
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      temp.clubId = localStorage.super_cur_clubId;
    }
    if (this.resource.image || this.resource.doc || this.resource.video) {
      this.resourceService.updateResources(temp).subscribe(
        (e: any) => {
          this.sharedService.showLoader = false;
          this.sharedService
            .showMessage("Resource library Updated successfully'")
            .subscribe(() => this.router.navigate(['/resources']));
        },
        err => {
          this.sharedService.showLoader = false;
          console.log(err);
          this.sharedService.loginDialog(err.error.message);
        }
      );
    } else {
      this.sharedService.showLoader = false;
      this.sharedService.loginDialog('Save media before updating');
    }
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('rl_image', this.imgUpload);
    formData.append('description', 'new Image');
    formData.append('name', this.resource.image_name);
    if (
      localStorage.user_role === 'Super Admin' ||
      localStorage.user_role === 'Platform Admin'
    ) {
      formData.append('clubId', localStorage.super_cur_clubId);
    }

    this.resourceService.uploadImage(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.pro = true;
        this.progress = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        let a: any = event.body;
        this.pro = false;
        this.isSubmit = true;
        this.resource.image = a.data;
        this.sharedService.showMessage(' image uploaded Successfully');
      }
    });
  }

  getImageDetail(event: any) {
    this.imgUpload = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => (this.selectedImg = reader.result);

      reader.readAsDataURL(file);
    }
    if (this.imgUpload.name) {
      const imageType = this.imgUpload.name.split('.')[1];
      // if (
      //   imageType === 'png' ||
      //   imageType === 'jpeg' ||
      //   imageType === 'tiff' ||
      //   imageType === 'gif' ||
      //   imageType === 'jpg'
      // ) {
      // this.selectedImg =  event.target.files[0].name;

      // } else {
      // this.sharedService.loginDialog('Upload an image of type .png, .jpeg/.jpg');
      // }
    }
  }

  resourceSubmit() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/resources');
        }
      });
  }

  updateEdit() {
    this.sharedService
      .showDialog(
        `Fields cannot be empty,
    enter data in all the fields and then click on update.`
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/resources');
        }
      });
  }

  cancelChanges() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
      Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/resources']);
        }
      });
  }
}
