import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() isLoading;
  @Input() size = 1;
  @Input() message: string;

  constructor(public sharedService: SharedService) {}

  ngOnInit() {}
}
