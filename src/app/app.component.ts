import { Component } from '@angular/core';
import { AubreyDashboardComponent } from './aubrey-dashboard/aubrey-dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AubreyDashboardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-portal';
}
