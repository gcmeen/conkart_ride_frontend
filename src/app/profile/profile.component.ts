import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  status: Array<{ value: string, viewValue: string }> = [
    { value: 'online', viewValue: 'Online' },
    { value: 'busy', viewValue: 'Busy' },
    { value: 'offline', viewValue: 'Offline' },
  ];
  userStatus?: string;

  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userStatus = this.currentUser.status;
  }

  updateUserStatus(): void {
    this.userService.updateUser({
      updateData: {
        status: this.userStatus,
      }
    }).subscribe({
      next: res => {
        console.log(res);
        this.storageService.saveUser(res);
        this.currentUser = res;
        this.userStatus = res.status;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
