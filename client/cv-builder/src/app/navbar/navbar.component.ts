import { Component, AfterViewInit } from '@angular/core';

declare var M: any; // Declare Materialize variable

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements AfterViewInit {
  
  ngAfterViewInit() {window.onload = () => {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
  };
  }
}
