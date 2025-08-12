import { MergeDeep } from 'type-fest'
import { Database as DatabaseGenerated } from './types';

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Views: {
        coach_roster: {
          Row: {
            coach_id: string
            display_name: string
            id: string
          }
        }
      }
    }
  }
>;