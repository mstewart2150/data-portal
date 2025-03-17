import { Component } from '@angular/core';
import { AubreyDashboardComponent } from './aubrey-dashboard/aubrey-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AubreyDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-portal';
}
