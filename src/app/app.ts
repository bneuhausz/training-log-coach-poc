import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonDirective],
  template: `
    <h1 class="text-3xl font-bold underline">Welcome to {{ title() }}!</h1>
    <button hlmBtn>Button</button>

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('training-log-coach-poc');
}
