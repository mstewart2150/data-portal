import { Component } from '@angular/core';
import { AubreyDashboardComponent } from './aubrey-dashboard/aubrey-dashboard.component';
import { JessDashboardComponent } from './jess-dashboard/jess-dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AubreyDashboardComponent, JessDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-portal';
  selectedDashboard: string = 'aubrey'; // Default to Aubrey's dashboard

  handleDashboardChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedDashboard = target.value;
    }
  }
}
