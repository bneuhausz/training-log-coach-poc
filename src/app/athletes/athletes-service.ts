import { computed, inject, Injectable, resource } from "@angular/core";
import { Supabase } from "../shared/supabase/supabase";
import { Auth } from "../shared/auth/auth";

@Injectable()
export class AthletesService {
  readonly #supabase = inject(Supabase).client;
  readonly #auth = inject(Auth);

  readonly #athletes = resource({
    loader: () => this.#loadAthletes()
  });

  readonly athletes = computed(() => {
    const isSafe = !this.#athletes.error() && this.#athletes.hasValue();
    return isSafe ? this.#athletes.value().data : [];
  });
  readonly athletesLoading = computed(() => this.#athletes.isLoading());
  readonly error = computed(() => this.#athletes.error());

  #loadAthletes() {
    const userId = this.#auth.user()!.id;
    return this.#supabase
      .from('coach_roster')
      .select(`
        id,
        display_name
      `)
      .eq('coach_id', userId);
  };
}