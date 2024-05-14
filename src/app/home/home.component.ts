import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalEarning: Number = 0;
  totalRide: Number = 0
  rideChart: any;
  earningChart:any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.dashboardService.getDashboardDetails().subscribe({
      next: data => {
        this.totalEarning = data?.totalEarning;
        this.totalRide = data?.totalRides;
        this.createChart(data.chartData);
      },
      error: err => {
        console.log(err);
      }
    });
  }
  createChart(data: any) {
    console.log('chart data', data);
    this.earningChart = new Chart("earning_chart", {
      type: 'bar',
      data: {
        labels: data.dates,
        datasets: [{
          label: 'Earning',
          data: data.earning,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this.rideChart = new Chart("ride_chart", {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [{
          label: 'Rides',
          data: data.rides,
          backgroundColor: 'rgba(255, 99, 232, 0.2)',
          borderColor: 'rgba(255, 99, 232, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              maxTicksLimit: 10,
              stepSize: 1
            }
          }
        }
      }
    });
  }
}
