import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from '$env/static/private';

import type { Database } from "./database.types" 

export const supabase = createClient<Database>(
	"https://cgieiftdrbgfzphkayia.supabase.co",
	SUPABASE_KEY
);
