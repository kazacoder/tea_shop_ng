import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./product/product.component";
import {commonTitle} from "../../shared/config/consts";

const routes: Routes = [
  {path: 'products', component: ProductsComponent, title: commonTitle + 'Каталог'},
  {path: 'products/:id', component: ProductComponent, title: commonTitle + 'О товаре'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
