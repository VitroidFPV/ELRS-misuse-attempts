import { supabase } from "$lib/supabaseClient";

export async function load() {
	
	// const { data: attempts } = await supabase.from("attempts").select("*");
	// return {
	// 	attempts: attempts,
	// };
	// return latest reported attempt time
	const { data: latest } = await supabase.from("attempts").select("reported_at").order("reported_at", { ascending: false }).limit(1);
	return {
		latest: latest,
	};

}