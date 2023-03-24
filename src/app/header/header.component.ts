import { Component, OnInit } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  ngOnInit(): void {
  }
  constructor(
    public authService: AuthService,
    public router: Router
  ){
    router.events.subscribe((event:RouterEvent) => {
      this.refreshToken(event);
    });
  }

  private refreshToken(event: RouterEvent): void{
    if(event instanceof NavigationStart && this.authService.isLoggedIn()){
      this.authService.refresh().catch(response => null);
    }
  }

}
