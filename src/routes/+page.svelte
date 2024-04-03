<script lang="ts">
	import { showDetails } from "../stores/showDetails.js";
	import { fly } from "svelte/transition";

	export let data;
	// console.log(data);

	let latest = data && data.latest ? data.latest[0].reported_at : null;

	let timeDiffMap = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};

	const updateTimeDiff = () => {
		const current = new Date();
		const timeDiff = latest ? current.getTime() - new Date(latest).getTime() : 0;

		timeDiffMap = {
			days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
			hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
		};
	};

	setInterval(updateTimeDiff, 1000);
	$: if (showDetails) updateTimeDiff();

	// $: console.log(latest);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="text-center">
		<div class="flex text-9xl font-thin flex-wrap justify-center gap-x-8 items-center">
			<div class="leading-snug">It</div>
			<div>has</div>
			<div>been</div>
			<div class="transition-container">
				{#if $showDetails && latest}
					<div class="flex justify-between w-[27rem] items-center" in:fly={{y: 20}} out:fly={{y: -20}}>
						<div class="flex flex-col items-start justify-between w-1/2">
							<div class="transition-container w-full">
								{#key timeDiffMap.days}
									<div class="text-primary-500 font-bold gradient-text-tbr text-4xl" in:fly={{y: 20}} out:fly={{y: -20}}>
										{timeDiffMap.days} days
									</div>
								{/key}
							</div>
							<div class="transition-container w-full">
								{#key timeDiffMap.minutes}
									<div class="text-primary-500 font-bold gradient-text-tbr text-4xl" in:fly={{y: 20}} out:fly={{y: -20}}>
										{timeDiffMap.minutes} minutes
									</div>
								{/key}
							</div>
						</div>
						<div class="flex flex-col items-start w-1/2">
							<div class="transition-container w-full">
								{#key timeDiffMap.hours}
									<div class="text-primary-500 font-bold gradient-text-tbr text-4xl" in:fly={{y: 20}} out:fly={{y: -20}}>
										{timeDiffMap.hours} hours
									</div>
								{/key}
							</div>
							<div class="transition-container w-full">
								{#key timeDiffMap.seconds}
									<div class="text-primary-500 font-bold gradient-text-tbr text-4xl" in:fly={{y: 20}} out:fly={{y: -20}}>
										{timeDiffMap.seconds} seconds
									</div>
								{/key}
							</div>
						</div>
					</div>
				{:else}
					<div class="text-primary-500 font-bold gradient-text-tbr w-[27rem] leading-snug" in:fly={{y: 20}} out:fly={{y: -20}}>
						<div class="transition-container w-full">
							{#key timeDiffMap.days}
								<div class="text-primary-500 font-bold gradient-text-tbr" in:fly={{y: 20}} out:fly={{y: -20}}>
									{timeDiffMap.days} days
								</div>
							{/key}
						</div>
					</div>
				{/if}
			</div>
			<div>since</div>
			<div>the</div>
			<div>last</div>
			<div>incident</div>
		</div>
	</div>
</div>
