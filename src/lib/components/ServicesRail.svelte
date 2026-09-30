<script>
	import { onMount } from 'svelte';
	import ServiceCard from './ServiceCard.svelte';
	import { services } from '$lib/site.js';

	let rail = $state(null);
	let index = $state(0);
	let atStart = $state(true);
	let atEnd = $state(false);
	let fill = $state(0.06);

	function paint() {
		if (!rail) return;
		const max = rail.scrollWidth - rail.clientWidth;
		const ratio = max > 2 ? rail.scrollLeft / max : 1;
		fill = Math.max(0.06, Math.min(1, ratio));
		const card = rail.querySelector('li');
		const width = card ? card.getBoundingClientRect().width + 14 : 1;
		index = Math.min(services.length - 1, Math.max(0, Math.round(rail.scrollLeft / width)));
		atStart = rail.scrollLeft <= 2;
		atEnd = max <= 2 || rail.scrollLeft >= max - 2;
	}

	function nudge(direction) {
		if (!rail) return;
		const card = rail.querySelector('li');
		const width = card ? card.getBoundingClientRect().width + 14 : rail.clientWidth * 0.8;
		rail.scrollBy({ left: direction * width, behavior: 'smooth' });
	}

	onMount(() => {
		paint();
		window.addEventListener('resize', paint);
		return () => window.removeEventListener('resize', paint);
	});

	const counter = $derived(
		`${String(index + 1).padStart(2, '0')} / ${String(services.length).padStart(2, '0')}`
	);
</script>

<div class="rail-wrap">
	<div class="rail" bind:this={rail} onscroll={paint} aria-label="Υπηρεσίες — κυλιόμενη λίστα">
		<ul>
		{#each services as service (service.id)}
			<li><ServiceCard {service} /></li>
		{/each}
		</ul>
	</div>
	<div class="rail-meta">
		<div class="rail-track" aria-hidden="true"><span style:transform={`scaleX(${fill})`}></span></div>
		<p class="rail-count">{counter}</p>
		<div class="rail-nav">
			<button class="icon-btn" type="button" aria-label="Προηγούμενη υπηρεσία" disabled={atStart} onclick={() => nudge(-1)}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M19 12H6M13 5l-7 7 7 7"></path>
				</svg>
			</button>
			<button class="icon-btn" type="button" aria-label="Επόμενη υπηρεσία" disabled={atEnd} onclick={() => nudge(1)}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M5 12h13M12 5l7 7-7 7"></path>
				</svg>
			</button>
		</div>
	</div>
</div>
