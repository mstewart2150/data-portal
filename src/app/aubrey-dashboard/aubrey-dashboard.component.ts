import { Component } from '@angular/core';
import { DataService } from '../services/data.service'; // this imports the DataService we created
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-aubrey-dashboard',
  imports: [],
  templateUrl: './aubrey-dashboard.component.html',
  styleUrl: './aubrey-dashboard.component.css'
})

export class AubreyDashboardComponent implements OnInit {
  message: string = '';
  value: number | null = null;

  // injects data service into the component
  // this lets us use this.dataService.getData() to make API requests
  constructor(private dataService: DataService) {}

  // runs when the component loads
  ngOnInit() {
    // waits for Flask to send data and stores it in message and value
    this.dataService.getData().subscribe(response => {
      this.message = response.message;
      this.value = response.value;
    });
  }
}
