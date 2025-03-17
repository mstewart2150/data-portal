import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service'; // this imports the DataService we created
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aubrey-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aubrey-dashboard.component.html',
  styleUrls: ['./aubrey-dashboard.component.css']
})

export class AubreyDashboardComponent implements OnInit, OnDestroy {
  jsonData: any = null; // store entire JSON response
  private refreshInterval: any;

  // injects data service into the component
  // this lets us use this.dataService.getData() to make API requests
  constructor(private dataService: DataService) {}

  // runs when the component loads
  ngOnInit() {
    this.fetchData(); // fetch data when component loads
    this.refreshInterval = setInterval(() => {
      this.fetchData(); // fetch data every 5 seconds
    }, 10000);
  }

  fetchData() {
    // waits for Flask to send data and stores it in message and value
    this.dataService.getData().subscribe(response => {
    this.jsonData = response;
    console.log('Received data: ', response); // log in console for debugging
  });
}
  ngOnDestroy() {
    clearInterval(this.refreshInterval); // clear the interval when the component is destroyed
  }
}


