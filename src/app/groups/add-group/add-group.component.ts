import {
  Component,
  OnInit,
  ɵConsole,
  Input,
  SimpleChanges
} from '@angular/core';
import { Group } from '../models/group.model';
import { Section } from '../models/section.model';
import { ProfilesService } from '@app/profiles/profiles.service';
import { ProfileType } from '../models/profiletype.model';
import { SectionProfileField } from '../models/sectionProfileField.model';
import { SharedService } from '@app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { ProfileTypeService } from '@app/profile-type/profile-type.service';
import { ProfileGroup } from '../models/groups.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  providers:[ProfilesService, ProfileTypeService, GroupsService]
})
export class AddGroupComponent implements OnInit {
  @Input() group: Group;
  @Input() profileGroup: ProfileGroup;

  type: any;
  isEdit: boolean = false;
  editId: string = '';

  profileTypes: Array<ProfileType>;
  selectedProfileType: ProfileType;
  section: Array<Section>;
  activeRouteSubscriber: any;
  constructor(
    public ProfilesService: ProfilesService,
    private router: Router,
    public sharedService: SharedService,
    private groupService: GroupsService,
    public ProfileTypeService: ProfileTypeService,

    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllProfileTypes();
  }
  ngOnChanges(changes: SimpleChanges) {
    //  get one profile groups that time group type means profile type would be there
    if (this.group) {
      if (this.group.type && this.group.type._id) {
        this.isEdit = true;
        let type_id: any = this.group.type._id;
        this.group.type = type_id;
        //  calling api to get all type map with profile type list
        this.ProfilesService.getRoles().then((res: any) => {
          this.profileTypes = res.data;
          let selectedpt = this.profileTypes.filter(
            item => item._id === type_id
          );

          // get selected profile field and map with profile field list array based on profile field getting form profile type
          this.selectedProfileType = selectedpt[0];

          this.group.sections = this.group.sections.map((prop: Section) => {
            let profilefields: any = [];
            let selectedprofile_fields: any = prop.profile_fields;
            // profile field from profile type  need that field  and mapping with already selected field set is selected true
            for (let i = 0; i < this.selectedProfileType.fields.length; i++) {
              let isfieldsectionPf = false;
              let orderSection: string = '0';
              for (let j = 0; j < selectedprofile_fields.length; j++) {
                let pf_id: any = this.selectedProfileType.fields[i];
                let sectionpf_id: any = selectedprofile_fields[j].field._id;

                if (pf_id._id === sectionpf_id) {
                  isfieldsectionPf = true;

                  orderSection = selectedprofile_fields[j].order;
                }
              }
              if (isfieldsectionPf) {
                profilefields.push({
                  field: this.selectedProfileType.fields[i],
                  order: orderSection,
                  isSelected: true
                });
              } else {
                profilefields.push({
                  field: this.selectedProfileType.fields[i],
                  order: '0',
                  isSelected: false
                });
              }
            }
            // prop.changeProfileFields(this.selectedProfileType.fields);

            prop.profile_fields = profilefields;
            return prop;
          });
        });
      }
    }

    this.profileGroup.groups.map(prop => {
      this.type = prop.type;
    });
  }
  InvalidForm() {
    this.sharedService
      .showDialog(
        'Fields cannot be empty, enter data in all the fields and then click on submit.'
      )
      .subscribe(response => {
        if (response === '') {
          this.router.navigateByUrl('/groups');
        }
      });
  }

  addSection() {
    this.group.sections.push(new Section(this.selectedProfileType?.fields));
  }

  changeDropdown(selectedpf) {
    let selectedpt = this.profileTypes.filter(item => item._id === selectedpf);
    this.selectedProfileType = selectedpt[0];

    this.group.sections = this.group.sections.map((prop: Section) => {
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

      let profilefields: any = [];
      let selectedprofile_fields: any = prop.profile_fields;

      for (let i = 0; i < this.selectedProfileType.fields.length; i++) {
        let isfieldsectionPf = false;
        let orderSection: string = '0';
        for (let j = 0; j < selectedprofile_fields.length; j++) {
          let pf_id: any = this.selectedProfileType.fields[i];
          let sectionpf_id: any = selectedprofile_fields[j].field;

          if (pf_id._id === sectionpf_id) {
            isfieldsectionPf = true;

            orderSection = selectedprofile_fields[j].order;
          }
        }
        if (isfieldsectionPf) {
          profilefields.push({
            field: this.selectedProfileType.fields[i],
            order: orderSection,
            isSelected: true
          });
        } else {
          profilefields.push({
            field: this.selectedProfileType.fields[i],
            order: '0',
            isSelected: false
          });
        }
      }

      prop.profile_fields = profilefields;
      return prop;
    });
  }

  /*
   * Gets all profile types along with the profile fields for each type.
   */
  getAllProfileTypes() {
    this.ProfilesService.getRoles().then((res: any) => {
      this.profileTypes = res.data;

      // this.profileGroup.groups.map(prop => {
      //   this.type = prop.type;
      // });
    });
  }
}
