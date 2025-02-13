import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  private subscriptionProducts: Subscription | null = null;
  public products: ProductType[] = [];

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.loading = true;

    //setTimeout для тестирования лоадера
    setTimeout(() => {
      this.subscriptionProducts = this.productService.getProducts()
        .pipe(
          tap(() => {
            this.loading = false;
          }),
        )
        .subscribe(
          {
            next: data => {
              this.products = data;
            },
            error: error => {
              console.log(error);
              this.router.navigate(['/']).then();
            }
          }
        )
    }, 300)
  }

  ngOnDestroy(): void {
    this.subscriptionProducts?.unsubscribe()
  }

}
