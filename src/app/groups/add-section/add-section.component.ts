import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { Section } from '../models/section.model';
import { ProfileField } from '../models/profile-field.model';
import { SectionProfileField } from '../models/sectionProfileField.model';
import { GroupsService } from '../groups.service';
import { Group } from '../models/group.model';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss'],
  providers:[GroupsService, SharedService]
})
export class AddSectionComponent implements OnInit, OnChanges {
  @Input() section: Section;
  // @Input() profileFields: Array<ProfileField>;
  @Input() group: Group;
  @Output() name = new EventEmitter<SectionProfileField>();
  selectedProfileFields: Array<SectionProfileField>;

  constructor(
    private groupService: GroupsService,
    public sharedService: SharedService
  ) {}
  @ViewChild('gridView') gridView;

  columnNum = 1;

  divSize;

  setColNum(div) {
    // console.log(div);
    if (this.gridView.nativeElement.offsetWidth < 950) {
      this.columnNum = 2;
    }

    if (this.gridView.nativeElement.offsetWidth > 950) {
      this.columnNum = 3;
    }

    if (this.gridView.nativeElement.offsetWidth < 750) {
      this.columnNum = 1;
    }
  }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    this.selectedProfileFields = new Array<SectionProfileField>();
  }

  deleteSection(deletesection) {
    this.sharedService
      .showDialog('Are you sure you want to delete?')
      .subscribe(response => {
        if (response !== '') {
          // this.sharedService.showLoader = true;
          console.log('group::', this.group.sections);
          const index = this.group.sections.findIndex(
            x => x.title === deletesection.title
          );

          this.group.sections.splice(index, 1);
        }
      });
  }
  validateOrder(text) {
    var phoneNo = '';
    for (let i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch >= '0' && ch <= '9') {
        phoneNo += ch;
      }
    }

    setTimeout(() => {
      this.section.order = phoneNo;
    }, 0);
  }
  validateProfileOrder(text, i) {
    var phoneNo = '';
    for (let i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch >= '0' && ch <= '9') {
        phoneNo += ch;
      }
    }

    setTimeout(() => {
      this.section.profile_fields[i].order = phoneNo;
    }, 0);
  }
}
