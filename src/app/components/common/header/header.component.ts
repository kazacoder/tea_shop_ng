import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchForm = {
    search: ''
  }

  private subscriptionRouter: Subscription | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const searchString = new URLSearchParams(window.location.search).get('searchString');
    if (searchString) {
      this.searchForm.search = searchString;
    }

    this.subscriptionRouter = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event) => {
      if (!(event as NavigationStart).url.includes('/products?')) {
        this.cleanSearchInput()
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionRouter?.unsubscribe()
  }

  cleanSearchInput() {
    this.searchForm.search = '';
  }

  search() {
    if (this.searchForm.search) {
      this.router.navigate(['/products'], { queryParams: { searchString: this.searchForm.search } }).then();
    } else {
      this.router.navigate(['/products']).then();
    }
  }
}
