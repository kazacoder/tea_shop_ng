import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public productTitle: string = 'Наши чайные коллекции';
  public isEmptySearch = false;
  public loading: boolean = false;
  private subscriptionProducts: Subscription | null = null;
  private subscriptionSearch: Subscription | null = null;
  private subscriptionRoute: Subscription | null = null;
  private subject: Subject<ProductType[]> = new Subject();
  public products: ProductType[] = [];

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptionRoute = this.activatedRoute.queryParams.subscribe(params => {
      if (params['searchString']) {
        this.loading = true;
        this.productService.searchProducts(params['searchString']).subscribe(data => {
          this.isEmptySearch = data.length === 0;
          this.loading = false;
          this.subject.next(data);
        });

        this.subscriptionSearch = this.subject.subscribe(data => {
          this.products = data;
        });

        this.productTitle = `Результаты поиска по запросу "${params['searchString']}"`

      } else {
        this.loading = true;
        this.productTitle = 'Наши чайные коллекции';
        this.isEmptySearch = false;
        this.showAllProducts()
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionProducts?.unsubscribe()
    this.subscriptionSearch?.unsubscribe()
    this.subscriptionRoute?.unsubscribe()
  }


  showAllProducts() {
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

}
