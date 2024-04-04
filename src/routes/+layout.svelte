<script lang="ts">
	import "../app.postcss";
	import { AppShell, AppBar, SlideToggle } from "@skeletonlabs/skeleton";
	import { showDetails } from "../stores/showDetails";

	// Floating UI for Popups
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow
	} from "@floating-ui/dom";
	import { storePopup } from "@skeletonlabs/skeleton";
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl gradient-text-tbr font-bold"
					>ELRS Misuse Tracker</strong
				>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex gap-4">
					<SlideToggle
						name="details"
						bind:checked={$showDetails}
						active="bg-primary-500"
						size="sm"
					/>
					<div>Show Details</div>
				</div>
				<span class="divider-vertical h-8"></span>
				<a href="/report" class="btn btn-base variant-filled-primary">
					Report
				</a>
				<a href="/why" class="btn btn-base variant-ghost-secondary"> Why? </a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
