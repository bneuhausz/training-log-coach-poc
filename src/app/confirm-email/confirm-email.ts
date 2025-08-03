import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-confirm-email',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Confirm Email</h1>
    <p>Please check your email for a confirmation link.</p>
  `
})
export default class ConfirmEmail { }