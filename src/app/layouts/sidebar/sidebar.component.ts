import { GeneralService } from './../../services/general.service';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import { CookieService } from 'src/app/core/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isCondensed = false;
  isLoding: boolean;
  menu: any;
  currentUser: any;
  @ViewChild('sideMenu', { static: false }) sideMenu: ElementRef;

  constructor(private cookie: CookieService,private service:GeneralService , private router:Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(this.cookie.getCookie('currentUser'));
  }

  ngAfterViewInit() {

    this.menu = new MetisMenu(this.sideMenu.nativeElement);

    this._activateMenuDropdown();

  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  /**
   * small sidebar
   */
  smallSidebar() {
    document.body.classList.add('left-side-menu-sm');
    document.body.classList.remove('left-side-menu-dark');
    document.body.classList.remove('topbar-light');
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('enlarged');
  }

  /**
   * Dark sidebar
   */
  darkSidebar() {
    document.body.classList.remove('left-side-menu-sm');
    document.body.classList.add('left-side-menu-dark');
    document.body.classList.remove('topbar-light');
    document.body.classList.remove('boxed-layout');
  }

  /**
   * Light Topbar
   */
  lightTopbar() {
    document.body.classList.add('topbar-light');
    document.body.classList.remove('left-side-menu-dark');
    document.body.classList.remove('left-side-menu-sm');
    document.body.classList.remove('boxed-layout');

  }

  /**
   * Sidebar collapsed
   */
  sidebarCollapsed() {
    document.body.classList.remove('left-side-menu-dark');
    document.body.classList.remove('left-side-menu-sm');
    document.body.classList.toggle('enlarged');
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('topbar-light');
  }

  /**
   * Boxed Layout
   */
  boxedLayout() {
    document.body.classList.add('boxed-layout');
    document.body.classList.remove('left-side-menu-dark');
    document.body.classList.add('enlarged');
    document.body.classList.remove('left-side-menu-sm');
  }

  /**
   * Activates the menu dropdown
   */
  _activateMenuDropdown() {
    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]['pathname']) {
        menuItemEl = links[i];
        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add('active');

      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('active');

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('in');
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add('active');
          parent3El.firstChild.classList.add('active');
        }
      }
    }
  }
  switchUser(){
    if(this.currentUser.UserType === 'Bank Manager'){
      this.currentUser.UserType = 'Lawyer';
      this.cookie.deleteCookie('currentUser');
      this.service.saveCookie(this.currentUser);
      if(this.router.url === '/loan/dashboard'){
        location.reload();
      }else{
        this.router.navigate(['/loan/dashboard']);
      }
    }else if(this.currentUser.UserType === 'Lawyer'){
      this.currentUser.UserType = 'Bank Manager';
      this.cookie.deleteCookie('currentUser');
      this.service.saveCookie(this.currentUser);
      if(this.router.url === '/loan/dashboard'){
        location.reload();
      }else{
        this.router.navigate(['/loan/dashboard']);
      }
    }
  }
}
