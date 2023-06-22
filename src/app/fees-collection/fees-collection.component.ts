import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '@app/shared/shared.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ClubsService } from '@app/clubs/clubs.service';
import { ProfilesService } from '@app/profiles/profiles.service';

@Component({
  selector: 'app-fees-collection',
  templateUrl: './fees-collection.component.html',
  styleUrls: ['./fees-collection.component.scss']
})
export class FeesCollectionComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  tabledataloaded: boolean = true;
  dataSource = new MatTableDataSource();

  displayedColumns: any = [
    'season_name',
    'pro',
    'basic',
    'fff',
    'total'
  ];
  tabledata: any = [];
  tnbColumns = [
    { season_name: 'Subscriptions', pro: 25, basic: 434, fff:322, total:634 },
    { season_name: 'Revenue Share', pro: '$5', basic: '$3', fff:'$1.5', total:'' },
    { season_name: 'Total', pro: '$5456.45', basic: '$334.43', fff:'$453', total:'$9876.45' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.tabledata = this.tnbColumns;
    this.dataSource.data = this.tabledata;
    console.log('this.dataSource', this.dataSource.data);
  }

}
