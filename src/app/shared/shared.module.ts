import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupComponent} from "./components/popup/popup.component";
import {RouterModule} from "@angular/router";
import {TruncPipe} from "./pipes/trunc.pipe";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    PopupComponent,
    TruncPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    PopupComponent,
    TruncPipe,
  ]
})
export class SharedModule { }
