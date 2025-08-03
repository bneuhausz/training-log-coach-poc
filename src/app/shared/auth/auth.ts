import { computed, inject, Injectable, signal } from "@angular/core";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { Supabase } from "../supabase/supabase";
import { filter, from, Subject, switchMap, take, tap } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";

type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: AuthError | null;
};

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly supabase = inject(Supabase).client;
  private readonly router = inject(Router);

  readonly #state = signal<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null
  });

  readonly user = computed(() => this.#state().user);
  readonly isAuthenticated = computed(() => !!this.#state().session);

  readonly initialLoad$ = toObservable(this.#state).pipe(
    filter(state => !state.isLoading),
    take(1)
  );

  readonly signIn$ = new Subject<{ email: string, password: string }>();
  readonly #signIn$ = this.signIn$.pipe(
    tap(() => this.#setLoading(true)),
    switchMap(({ email, password }) =>
      from(this.supabase.auth.signInWithPassword({ email, password }))
    ),
    tap(({ data, error }) => {
      if (error) {
        this.#handleAuthError(error);
      }
      else if (data.session) {
        this.router.navigate(['/dashboard']);
      }
      else {
        this.router.navigate(['/confirm-email']);
      }
    })
  );

  readonly signOut$ = new Subject<void>();
  readonly #signOut$ = this.signOut$.pipe(
    tap(() => this.#setLoading(true)),
    switchMap(_ =>
      from(this.supabase.auth.signOut())
    ),
    tap(({ error }) => {
      if (error) {
        this.#handleAuthError(error);
      }
      else {
        this.router.navigate(['/']);
      }
    })
  );

  constructor() {
    this.supabase.auth.onAuthStateChange((_, session) => this.#setAuthState(session));

    this.#signIn$.subscribe();
    this.#signOut$.subscribe();
  }

  #handleAuthError(error: AuthError) {
    this.#state.update(state => ({ ...state, error, isLoading: false }));
  }

  #setLoading(isLoading: boolean) {
    this.#state.update(state => ({ ...state, isLoading }));
  }

  #setAuthState(session: Session | null) {
    this.#state.update(state => ({
      ...state,
      user: session?.user ?? null,
      session,
      isLoading: false,
      error: null
    }));
  }
}
