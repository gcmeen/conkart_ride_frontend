import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { NotificationsService } from './_services/notifications.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  notificationCount?: string;
  interval: any;
  eventBusSub: any;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
      this.getNotifications();
      this.interval = setInterval(() => { this.getNotifications() }, 5000)
    }

  }

  unsubscribeBusSub():void{
    this.eventBusSub.unsubscribe()
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.router.navigate(['/login'])
      },
      error: err => {
        console.log(err);
      }
    });
  }
  getNotifications(): void {
    this.notificationsService.getAllNotificationCount(['pending']).subscribe({
      next: res => {
        this.notificationCount = res.toString();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
