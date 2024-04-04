<script lang="ts">
	import { Auth } from "@supabase/auth-ui-svelte";
	import { supabase } from "$lib/supabaseClient";
	import { Autocomplete, popup } from "@skeletonlabs/skeleton";
	import type {
		AutocompleteOption,
		PopupSettings
	} from "@skeletonlabs/skeleton";

	export let data;

	let session = data.session;
	let isLogged = session ? true : false;

	let allowReport = false;
	// if current session id matches any of the verified users, allow report
	if (session && data?.verifiedUsers) {
		data.verifiedUsers.forEach((user) => {
			if (user.UUID === session?.user.id) {
				allowReport = true;
			}
		});
	}

	// $: console.log(data.equipment)

	// get the current date and time
	let now = new Date();

	let { year, month, day, hours, minutes } = {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate(),
		hours: now.getHours(),
		minutes: now.getMinutes()
	};

	// map equipment names
	let equipmentNames: AutocompleteOption<string>[] = [];
	data.equipment?.forEach((equipment) => {
		if (equipment.equipment !== null) {
			equipmentNames.push({
				value: equipment.equipment,
				label: equipment.equipment
			});
		}
	});
	equipmentNames = equipmentNames.filter(
		(v, i, a) => a.findIndex((t) => t.value === v.value) === i
	);

	let selectedEquipment = "";
	function onEquipmentSelected(e: CustomEvent<AutocompleteOption>) {
		selectedEquipment = e.detail.value as string;
	}
	let popupSettings: PopupSettings = {
		event: "focus-click",
		target: "popupAutocomplete",
		placement: "bottom-start"
	};
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="w-full p-16">
		{#if !isLogged}
			<div class="card flex flex-col gap-8 p-8">
				<div class="card-header p-0">
					<h1 class="text-4xl gradient-text-tbr font-bold leading-snug">
						Login
					</h1>
				</div>
				<Auth
					supabaseClient={data.supabase}
					redirectTo={`${data.url}/auth/callback`}
					showLinks={false}
					view="magic_link"
					providers={["github"]}
					appearance={{
						extend: false,
						className: {
							button:
								"!btn !btn-base !variant-filled-primary !border-none my-4",
							input: "input",
							label: "label mb-2"
						}
					}}
				/>
			</div>
		{:else}
			<h1 class="text-6xl text-primary-500 font-bold leading-snug">Report</h1>
		{/if}

		<div class="text-xl">
			{#if !allowReport}
				{#if isLogged}
					<div>
						Succesfully logged in, but you are not authorized to report. Please
						get in contact to get authorized.
					</div>
				{/if}
			{:else}
				<div>
					<form method="POST">
						<div class="flex flex-col gap-4">
							<div class="flex flex-col gap-2">
								<label for="equipment"
									>Equipment (enter name, or select from other reports)</label
								>
								<input
									class="input autocomplete"
									type="search"
									name="equipment"
									id="equipment"
									bind:value={selectedEquipment}
									placeholder="Search..."
									use:popup={popupSettings}
								/>
								<div data-popup="popupAutocomplete" class="card p-4 w-max">
									<Autocomplete
										bind:input={selectedEquipment}
										options={equipmentNames}
										on:selection={onEquipmentSelected}
									/>
								</div>
							</div>
							<div class="flex flex-col gap-2">
								<label for="link" class="text-lg">Discord Message Link</label>
								<input type="text" name="link" id="link" class="input" />
							</div>
							<div class="flex flex-col gap-2">
								<label for="comment" class="text-lg">Comment</label>
								<input type="text" name="comment" id="comment" class="input" />
							</div>
							<!-- 
								<div class="input-group input-group-divider grid-cols-[1fr_auto]">
									<input type="text" placeholder="Enter Username..." />
									<a href="/" title="Username already in use.">(icon)</a>
								</div>
							 -->
							<div class="flex flex-col gap-2">
								<label for="time" class="text-lg">Time</label>
								<input
									type="datetime-local"
									name="time"
									id="time"
									class="input"
									value={`${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}T${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`}
									required
								/>
							</div>
							<div class="flex flex-col gap-2">
								<button
									type="submit"
									class="!btn !btn-primary !variant-filled-primary !border-none"
									>Report</button
								>
							</div>
						</div>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>
