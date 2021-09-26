import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-type',
  templateUrl: './banner-type.component.html',
  styleUrls: ['./banner-type.component.scss']
})
export class BannerTypeComponent implements OnInit {
  @Input() type: string = 'normal';
  @Input() size: string = 'M';

  constructor() { }

  ngOnInit(): void {
  }

}
