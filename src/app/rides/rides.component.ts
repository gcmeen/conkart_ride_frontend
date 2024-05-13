import { Component } from '@angular/core';
import { NotificationsService } from '../_services/notifications.service'
import { RideService } from '../_services/ride.service'

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.css'
})
export class RidesComponent {
  notificationList: Array<any> = [];
  constructor(private notificationsService: NotificationsService, private rideService: RideService) {

  }
  ngOnInit(): void {
    this.getNotifications();
  }
  getNotifications(): void {
    this.notificationsService.getAllNotifications(['pending', 'sent', 'read', 'unread']).subscribe({
      next: res => {
        this.notificationList = res;
        let updateData = {
          notifications: res.filter((n: any) => { return n.status == 'pending' }).map((n: any) => n._id),
          status: "read"
        }
        if (updateData.notifications.length) {

          this.notificationsService.updateNotificationStatus(updateData).subscribe({
            next: res => {
              console.log('res', res);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
  acceptRideRequest(rideId: string, driverId: string,status:string): void {
    console.log('ride id', rideId);
    this.rideService.updateRideDetails({
      updateData: {
        status: status,
        driver: driverId
      }
    },rideId).subscribe({
      next: res => {
        console.log(res);
        this.getNotifications()
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
