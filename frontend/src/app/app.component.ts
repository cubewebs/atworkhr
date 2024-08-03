import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import {BreadcrumbsComponent} from "./shared/breadcrumbs/breadcrumbs.component";
import PagesComponent from "./pages/pages.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, BreadcrumbsComponent, PagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
