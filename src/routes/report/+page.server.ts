// src/routes/+page.server.ts
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "$lib/supabaseClient";

export const load: PageServerLoad = async ({
	url,
	locals: { safeGetSession }
}) => {
	// const { session } = await safeGetSession()
	const { session } = (await safeGetSession()) as { session: Session };

	if (session) {
		throw redirect(303, "/report");
	}

	const { data: verifiedUsers, error: verifiedUsersError } = await supabase
		.from("verified-users")
		.select("UUID");
	if (verifiedUsersError) {
		console.error("Error fetching verified users", verifiedUsersError);
	}

	const { data: equipment, error: equipmentError } = await supabase
		.from("attempts")
		.select("equipment");
	if (equipmentError) {
		console.error("Error fetching equipment", equipmentError);
	}

	return { url: url.origin, verifiedUsers, equipment };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const req = await request.formData();
		const equipment = req.get("equipment") as string;
		const comment = req.get("comment") as string;
		const reported_at = req.get("time") as string;

		const { error } = await supabase
			.from("attempts")
			.insert([{ equipment, comment, reported_at }])
			.select();
		if (error) {
			console.error("Error inserting attempt", error);
		}
	}
} satisfies Actions;
