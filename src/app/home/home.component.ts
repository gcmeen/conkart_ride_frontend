import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { EventBusService } from '../_shared/event-bus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalEarning:Number=0;
  totalRide:Number=0

  constructor(private dashboardService: DashboardService,private eventBusService:EventBusService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardDetails().subscribe({
      next: data => {
        this.totalEarning = data.totalEarning;
        this.totalRide = data.totalRide;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
