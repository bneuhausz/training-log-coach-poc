import { inject, Injectable } from "@angular/core";
import { Supabase } from "../shared/supabase/supabase";

@Injectable()
export class AthleteService {
  private readonly supabase = inject(Supabase).client;
}