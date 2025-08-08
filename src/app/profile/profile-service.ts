import { computed, inject, Injectable, signal } from "@angular/core";
import { Supabase } from "../shared/supabase/supabase";
import { Auth } from "../shared/auth/auth";
import { catchError, from, map, of, Subject, switchMap, tap } from "rxjs";

type ProfileState = {
  isLoading: boolean;
  selfCoaching: boolean;
  error: string | null;
};

@Injectable()
export class ProfileService {
  private readonly supabase = inject(Supabase).client;
  private readonly auth = inject(Auth);

  readonly #state = signal<ProfileState>({
    isLoading: true,
    selfCoaching: false,
    error: null,
  });

  readonly isLoading = computed(() => this.#state().isLoading);
  readonly selfCoaching = computed(() => this.#state().selfCoaching);

  readonly toggleSelfCoaching$ = new Subject<boolean>();

  readonly #toggleSelfCoaching$ = this.toggleSelfCoaching$.pipe(
    switchMap((isEnabling) => {
      const userId = this.auth.user()?.id;

      const query = isEnabling
        ? this.supabase.from('coach_athlete').insert({ athlete_id: userId, coach_id: userId })
        : this.supabase.from('coach_athlete').delete().eq('athlete_id', userId).eq('coach_id', userId);

      return from(query).pipe(
        map(({ error }) => ({ isEnabling, error }))
      );
    }),
    tap(({ isEnabling, error }) => {
      if (!error) {
        this.#state.update(state => ({ ...state, selfCoaching: isEnabling }));
      }
    }),
    catchError(error => {
      console.error('An error occurred in the self-coaching stream:', error);
      return of(null);
    })
  );

  constructor() {
    this.#checkSelfCoaching().subscribe();
    this.#toggleSelfCoaching$.subscribe();
  }

  #checkSelfCoaching() {
    const userId = this.auth.user()?.id;

    return from(this.supabase
      .from('coach_athlete')
      .select('*', { count: 'exact', head: true })
      .eq('athlete_id', userId)
      .eq('coach_id', userId)
    ).pipe(
      map(({ count }) => ({
        isLoading: false,
        selfCoaching: (count ?? 0) > 0,
      })),
      catchError((error) => {
        console.error('Error checking self coaching:', error);
        return of({
          isLoading: false,
          selfCoaching: false,
          error: 'Failed to check self coaching',
        });
      }),
      tap((state) => this.#state.set({
        ...this.#state(),
        ...state,
      }))
    );
  }
}