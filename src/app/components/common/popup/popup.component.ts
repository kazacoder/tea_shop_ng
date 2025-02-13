import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'popup-dialog',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  title: string

  constructor(@Inject(MAT_DIALOG_DATA) data: { title: string }) {
    this.title = data.title;
  }

  ngOnInit(): void {
  }

}
