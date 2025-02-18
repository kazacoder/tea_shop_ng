import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main.component";
import {commonTitle} from "../../shared/config/consts";

const routes: Routes = [
  {path: '', component: MainComponent, title: commonTitle + 'Главная'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
