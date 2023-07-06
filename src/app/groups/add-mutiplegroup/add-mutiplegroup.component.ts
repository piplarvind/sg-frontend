import { Component, OnInit } from '@angular/core';
import { ProfileGroup } from '../models/groups.model';
import { Group } from '../models/group.model';
import { ProfilesService } from '@app/profiles/profiles.service';
import { SharedService } from '@app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { ProfileTypeService } from '@app/profile-type/profile-type.service';
import { skip } from 'rxjs/operators';
@Component({
  selector: 'app-add-mutiplegroup',
  templateUrl: './add-mutiplegroup.component.html',
  styleUrls: ['./add-mutiplegroup.component.scss'],
  providers:[ProfileTypeService, GroupsService, SharedService, ProfilesService]
})
export class AddMutiplegroupComponent implements OnInit {
  groupname: string = '';
  isEdit: boolean = false;
  profileGroup: ProfileGroup;
  activeRouteSubscriber: any;
  // group: Array<Group>;
  constructor(
    public ProfilesService: ProfilesService,
    private router: Router,
    public sharedService: SharedService,
    private groupService: GroupsService,
    public ProfileTypeService: ProfileTypeService,

    public activatedRoute: ActivatedRoute
  ) {
    this.profileGroup = new ProfileGroup();
  }
  ngOnInit() {
    if (this.router.url !== '/groups/add') {
      // this.coach = JSON.parse(sessionStorage.curCoach);

      this.activeRouteSubscriber = this.activatedRoute.queryParams.subscribe(
        param => {
          this.isEdit = true;
          this.profileGroup._id = param.groupsId;

          this.getOneGroup(this.profileGroup._id);
        }
      );
    }
  }
  getOneGroup(id: string) {
    this.ProfilesService.getRoles()
      .then((res: any) => {
        // console.log('response', res);
        // const prop = res.data;
        // this.profileTypes = res.data;

        this.ProfileTypeService.fetchOneGroup(id)
          .then((e: any) => {
            this.profileGroup = e.data;
          })
          .catch((err: any) => {});
      })
      .catch((err: any) => {
        console.log('err in  get profiletype', err);
      });
  }
  addGroup() {
    this.profileGroup.groups.push(new Group());
  }
  SubmitGroup() {
    let isduplicateProfile_type: boolean = true;
    let selectedprofiletype: any = [];
    let is_empty: boolean = true;
    let empty: any = [];
    //  check condition profile group name is empty
    if (!this.profileGroup.name) {
      empty.push({ name: 'empy' });
    }
    this.profileGroup.groups.map(p => {
      selectedprofiletype.push(p.type);
      p.sections.map(prop => {
        if (prop.order === null || prop.title === '') {
          empty.push({ name: 'empy' });
        }
      });
    });

    if (empty.length) {
      this.sharedService
        .showDialog(
          'Fields cannot be empty, enter data in all the fields and then click on submit.'
        )
        .subscribe(response => {
          if (response === '') {
            // this.router.navigateByUrl('/');
          }
        });
    }
    if (empty.length === 0) {
      is_empty = false;
    }
    let findDuplicates = arr =>
      arr.filter((item, index) => arr.indexOf(item) !== index);

    let depulicate = findDuplicates(selectedprofiletype);

    if (depulicate.length) {
      isduplicateProfile_type = true;
      this.sharedService
        .showDialog(
          'User type  cannot be Duplicate, enter  correct data  and then click on submit.'
        )
        .subscribe(response => {
          if (response === '') {
            // this.router.navigateByUrl('/');
          }
        });
    }
    if (depulicate.length === 0) {
      isduplicateProfile_type = false;
    }

    if (!isduplicateProfile_type && !is_empty) {
      this.sharedService.showLoader = true;
      this.profileGroup.groups = this.profileGroup.groups.map(p => {
        p.sections.map(prop => {
          let pf = prop.profile_fields.filter(t => t.isSelected === true);

          prop.profile_fields = pf;

          let filterfield_id = prop.profile_fields.map(f => {
            let field: any = f.field;
            f.field = field._id;
            return {
              field: f.field,
              order: f.order
            };
          });

          return prop;
        });
        return p;
      });
      this.ProfileTypeService.newGroups(this.profileGroup)
        .then((e: any) => {
          this.sharedService.showLoader = false;
          this.sharedService.showMessage('Groups successfully created');

          this.router.navigateByUrl('/groups');
        })
        .catch((err: any) => {});
    }
  }
  editGroup() {
    let isduplicateProfile_type: boolean = true;
    let selectedprofiletype: any = [];
    let is_empty: boolean = true;
    let empty: any = [];

    //  check condition profile group name is empty
    if (!this.profileGroup.name) {
      //  if empty push empty array
      empty.push({ name: 'empy' });
    }

    // check  profile groups group  title or order is empty if empty push array
    this.profileGroup.groups.map(p => {
      selectedprofiletype.push(p.type);
      p.sections.map(prop => {
        if (prop.order === null || prop.title === '') {
          empty.push({ name: 'empy' });
        }
      });
    });

    // show message  field cann't be empty
    if (empty.length) {
      this.sharedService
        .showDialog(
          'Fields cannot be empty, enter data in all the fields and then click on submit.'
        )
        .subscribe(response => {
          if (response === '') {
            // this.router.navigateByUrl('/');
          }
        });
    }
    if (empty.length === 0) {
      is_empty = false;
    }
    // check duplicate User type
    let findDuplicates = arr =>
      arr.filter((item, index) => arr.indexOf(item) !== index);

    let depulicate = findDuplicates(selectedprofiletype);
    if (depulicate.length) {
      isduplicateProfile_type = true;
      this.sharedService
        .showDialog(
          'User type  cannot be Duplicate, enter  correct data  and then click on submit.'
        )
        .subscribe(response => {
          if (response === '') {
            // this.router.navigateByUrl('/');
          }
        });
    }
    if (depulicate.length === 0) {
      isduplicateProfile_type = false;
    }
    // temp.name = this.profileGroup.name;

    if (!isduplicateProfile_type && !is_empty) {
      this.sharedService.showLoader = true;
      this.profileGroup.groups = this.profileGroup.groups.map(p => {
        if (p.sections) {
          p.sections.map(prop => {
            let pf = prop.profile_fields.filter(t => t.isSelected === true);

            prop.profile_fields = pf;
            //  extract id from field  and assgin in field before that field is object
            if (prop.profile_fields) {
              let filterfield_id = prop.profile_fields.map(f => {
                let field: any = f.field;
                f.field = field._id;
                return {
                  field: f.field,
                  order: f.order
                };
              });
            }

            return prop;
          });
        }

        return p;
      });

      this.ProfileTypeService.Editgroup(
        this.profileGroup._id,
        this.profileGroup
      )
        .then((e: any) => {
          this.sharedService.showLoader = false;
          this.sharedService.showMessage('Group successfully Updated');

          this.router.navigateByUrl('/groups');
        })
        .catch((err: any) => {
          this.sharedService.showLoader = false;
          console.log('err in profile creation', err);
        });
    }
  }
  cancelChanges() {
    this.sharedService
      .showDialog(
        `Unsaved data, if any will be lost if you cancel this action.
    Confirm if you want to leave this page?`
      )
      .subscribe(response => {
        if (response === true) {
          this.router.navigate(['/groups']);
        }
      });
  }
}
