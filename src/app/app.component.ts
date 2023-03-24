import { Component} from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { AuthService } from './auth.service';

//main view component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management';

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
