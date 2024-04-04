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
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};

	const updateTimeDiff = () => {
		const current = new Date();
		const timezoneOffset = current.getTimezoneOffset() * 60 * 1000;

		const diff = current.getTime() - latestDate.getTime() - timezoneOffset;
		
		timeDiffMap.days = Math.floor(diff / (1000 * 60 * 60 * 24));
		timeDiffMap.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		timeDiffMap.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		timeDiffMap.seconds = Math.floor((diff % (1000 * 60)) / 1000);

		// prevent "-1" flash
		if (timeDiffMap.days < 0) {
			timeDiffMap.days = 0;
		}
	};

	setInterval(updateTimeDiff, 1000);
	$: if (showDetails) updateTimeDiff();

</script>

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
								{#key timeDiffMap.days}
									<div
										class="text-primary-500 font-bold gradient-text-tbr text-4xl"
										in:fly={{ y: 20 }}
										out:fly={{ y: -20 }}
									>
										{timeDiffMap.days} day{timeDiffMap.days == 1 ? "" : "s"}
									</div>
								{/key}
							</div>
							<div class="transition-container w-full">
								{#key timeDiffMap.minutes}
									<div
										class="text-primary-500 font-bold gradient-text-tbr text-4xl"
										in:fly={{ y: 20 }}
										out:fly={{ y: -20 }}
									>
										{timeDiffMap.minutes} minutes
									</div>
								{/key}
							</div>
						</div>
						<div class="flex flex-col items-start w-1/2">
							<div class="transition-container w-full">
								{#key timeDiffMap.hours}
									<div
										class="text-primary-500 font-bold gradient-text-tbr text-4xl"
										in:fly={{ y: 20 }}
										out:fly={{ y: -20 }}
									>
										{timeDiffMap.hours} hours
									</div>
								{/key}
							</div>
							<div class="transition-container w-full">
								{#key timeDiffMap.seconds}
									<div
										class="text-primary-500 font-bold gradient-text-tbr text-4xl"
										in:fly={{ y: 20 }}
										out:fly={{ y: -20 }}
									>
										{timeDiffMap.seconds} seconds
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
							{#key timeDiffMap.days}
								<div
									class="text-primary-500 font-bold gradient-text-tbr"
									in:fly={{ y: 20 }}
									out:fly={{ y: -20 }}
								>
									{timeDiffMap.days} day{timeDiffMap.days == 1 ? "" : "s"}
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
