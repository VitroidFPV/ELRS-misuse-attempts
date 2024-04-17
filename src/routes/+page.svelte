<script lang="ts">
	import { showDetails } from "../stores/showDetails.js";
	import { fly } from "svelte/transition";

	export let data;
	// console.log(data);

	let latest: any = null;
	if (data.latest) {
		latest = data.latest[0].reported_at;
	}
	// latest is in ISO format
	let latestDate = new Date(latest);

	let timeDiffMap = {
		offset: {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		},
		base: {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		}
	};

	const updateTimeDiff = () => {
		const current = new Date();
		const timezoneOffset = current.getTimezoneOffset() * 60 * 1000;

		const diff = current.getTime() - latestDate.getTime();
		const timezoneDiff = current.getTime() - latestDate.getTime() - timezoneOffset;
		
		timeDiffMap.offset.days = Math.floor(timezoneDiff / (1000 * 60 * 60 * 24));
		timeDiffMap.offset.hours = Math.floor((timezoneDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		timeDiffMap.offset.minutes = Math.floor((timezoneDiff % (1000 * 60 * 60)) / (1000 * 60));
		timeDiffMap.offset.seconds = Math.floor((timezoneDiff % (1000 * 60)) / 1000);

		timeDiffMap.base.days = Math.floor(diff / (1000 * 60 * 60 * 24));
		timeDiffMap.base.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		timeDiffMap.base.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		timeDiffMap.base.seconds = Math.floor((diff % (1000 * 60)) / 1000);

		// prevent "-1" flash
		if (timeDiffMap.offset.days < 0) {
			timeDiffMap.offset.days = 0;
		}
	};
	updateTimeDiff();

	setInterval(updateTimeDiff, 1000);
	$: if (showDetails) updateTimeDiff();

	const title = `${timeDiffMap.base.days} day${timeDiffMap.base.days == 1 ? "" : "s"} since last incident`;
	const siteName = "ELRS Misuse Attempt Tracker";
	const url = "https://elrs-misuse-attempt-tracker.netlify.app/"
	const description = `It has been ${timeDiffMap.base.days} day${timeDiffMap.base.days == 1 ? "" : "s"}, ${timeDiffMap.base.hours} hour${timeDiffMap.base.hours == 1 ? "" : "s"}, ${timeDiffMap.base.minutes} minute${timeDiffMap.base.minutes == 1 ? "" : "s"}, and ${timeDiffMap.base.seconds} second${timeDiffMap.base.seconds == 1 ? "" : "s"} since the last incident.`;
	const color = "#a7e35f";

	// add current time to URL to prevent caching - show correct time on discord embeds
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	onMount(() => {
		let date = new Date();
		if (window.location.pathname === "/") {
			goto("/?s=" + date.getTime());
		}
	});
</script>

<svelte:head>

<meta property="og:title" content={title}>
<meta property="og:site_name" content={siteName}>
<meta property="og:url" content={url}/>
<meta property="og:description" content={description}>
<meta property="og:type" content="website">
<meta name="theme-color" content={color}>

<!-- regular HTML metadata -->
<meta name="description" content={description}>
<title>{title}</title>
	
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="text-center">
		<div
			class="flex text-9xl font-thin flex-wrap justify-center gap-x-8 items-center"
		>
			<div class="leading-snug">It</div>
			<div>has</div>
			<div>been</div>
			<div class="transition-container">
				{#if $showDetails && latest}
					<button
					 	on:click={() => $showDetails = !$showDetails}
						class="flex justify-between w-[32rem] items-center"
						in:fly={{ y: 20 }}
						out:fly={{ y: -20 }}
					>
						<div class="flex flex-col items-start justify-between w-1/2">
							<div class="transition-container w-full">
								{#key timeDiffMap.offset.days}
									<div
										class="text-primary-500 font-bold gradient-text-tbr text-4xl"
										in:fly={{ y: 20 }}
										out:fly={{ y: -20 }}
									>
										{timeDiffMap.offset.days} day{timeDiffMap.offset.days == 1 ? "" : "s"}
									</div>
								{/key}
							</div>
							<div class="transition-container w-full">
								{#key timeDiffMap.offset.minutes}
									<div
										class="text-primary-500 font-bold gradient-text-tbr text-4xl"
										in:fly={{ y: 20 }}
										out:fly={{ y: -20 }}
									>
										{timeDiffMap.offset.minutes} minutes
									</div>
								{/key}
							</div>
						</div>
						<div class="flex flex-col items-start w-1/2">
							<div class="transition-container w-full">
								{#key timeDiffMap.offset.hours}
									<div
										class="text-primary-500 font-bold gradient-text-tbr text-4xl"
										in:fly={{ y: 20 }}
										out:fly={{ y: -20 }}
									>
										{timeDiffMap.offset.hours} hours
									</div>
								{/key}
							</div>
							<div class="transition-container w-full">
								{#key timeDiffMap.offset.seconds}
									<div
										class="text-primary-500 font-bold gradient-text-tbr text-4xl"
										in:fly={{ y: 20 }}
										out:fly={{ y: -20 }}
									>
										{timeDiffMap.offset.seconds} seconds
									</div>
								{/key}
							</div>
						</div>
					</button>
				{:else}
					<button
					 	on:click={() => $showDetails = !$showDetails}
						class="text-primary-500 font-bold gradient-text-tbr w-[32rem] leading-snug"
						in:fly={{ y: 20 }}
						out:fly={{ y: -20 }}
					>
						<div class="transition-container w-full">
							{#key timeDiffMap.offset.days}
								<div
									class="text-primary-500 font-bold gradient-text-tbr"
									in:fly={{ y: 20 }}
									out:fly={{ y: -20 }}
								>
									{timeDiffMap.offset.days} day{timeDiffMap.offset.days == 1 ? "" : "s"}
								</div>
							{/key}
						</div>
					</button>
				{/if}
			</div>
			<div>since</div>
			<div>the</div>
			<div>last</div>
			<div>incident</div>
		</div>
	</div>
</div>
