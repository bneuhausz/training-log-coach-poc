import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { Supabase } from "../shared/supabase/supabase";

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Dashboard</h1>
    <p>Welcome to the dashboard!</p>
  `
})
export default class Dashboard {
  private readonly supabase = inject(Supabase).client;
  athletes = signal<any[]>([]);

  constructor() {
    this.loadAthletes();
  }

  loadAthletes() {
    this.supabase
      .from('block')
      .select(`
        *,
        block_type:block_type_id (name),
        athlete:athlete_id (display_name),
        coach:coach_id (display_name)
      `)
      .then(response => {
        console.log('Athletes loaded:', response);
        if (response.data) {
          this.athletes.set(response.data);
        } else {
          console.error('Error loading athletes:', response.error);
        }
      });
  }
}