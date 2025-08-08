import { Injectable } from "@angular/core";
import { createClient } from '@supabase/supabase-js'
import { environment } from "../../../environments/environment";
import { Database } from "./types";

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private readonly supabase = createClient<Database>(environment.supabase.url, environment.supabase.publicKey);

  get client() {
    return this.supabase;
  }
}
