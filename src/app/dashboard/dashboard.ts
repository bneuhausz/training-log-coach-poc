import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Dashboard</h1>
    <p>Welcome to the dashboard!</p>
  `
})
export default class Dashboard {

}