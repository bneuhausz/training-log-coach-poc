import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Layout } from "./layout/layout";

@Component({
  selector: 'app-root',
  imports: [Layout],
  template: `
    <app-layout />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App { }
