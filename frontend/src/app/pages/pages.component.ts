import { Component } from '@angular/core';
import {BreadcrumbsComponent} from "../shared/breadcrumbs/breadcrumbs.component";
import {HeaderComponent} from "../shared/header/header.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-pages',
  standalone: true,
    imports: [
        BreadcrumbsComponent,
        HeaderComponent,
        RouterOutlet,
        SidebarComponent
    ],
  templateUrl: './pages.component.html',
  styles: ``
})
export default class PagesComponent {

}
