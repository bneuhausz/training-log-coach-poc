import { inject, Injectable } from "@angular/core";
import { Supabase } from "../shared/supabase/supabase";
import { Auth } from "../shared/auth/auth";

@Injectable()
export class AthleteService {
  private readonly supabase = inject(Supabase).client;
  readonly #auth = inject(Auth);

  loadAthlete(id: string) {
    const userId = this.#auth.user()!.id;
    return this.supabase
      .from('coach_roster')
      .select(`
        id,
        display_name
      `)
      .eq('id', id)
      .eq('coach_id', userId)
      .single();
  }
}