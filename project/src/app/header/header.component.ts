import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shered/data-storege.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private service: DataStorageService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(res => {
      this.isAuthenticated = !!res;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSave() {
    this.service.put();
  }

  onFetch() {
    this.service.get().subscribe();
  }
}
