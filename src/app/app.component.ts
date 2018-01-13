import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private count = 0;

  basicButtonClick(): void {
    this.count++;

    this.title = 'woz - ' + this.count;
    console.log('hello');
  }
}
