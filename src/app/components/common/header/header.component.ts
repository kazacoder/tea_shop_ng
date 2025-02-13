import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchForm = {
    search: ''
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    const searchString = new URLSearchParams(window.location.search).get('searchString');
    if (searchString) {
      this.searchForm.search = searchString;
    }
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
