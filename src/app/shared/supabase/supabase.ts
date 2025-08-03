import { Injectable } from "@angular/core";
import { createClient } from '@supabase/supabase-js'
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private readonly supabase = createClient(environment.supabase.url, environment.supabase.publicKey);

  get client() {
    return this.supabase;
  }
}
