<script>
	import { href } from '$lib/paths.js';
	import MediaFrame from './MediaFrame.svelte';

	let { service } = $props();
</script>

<a class="svc-card" href={href(service.href)}>
	<div class="svc-card-media">
		<MediaFrame src={service.media} label={service.mediaLabel} alt={service.title} tone="dark" />
		<span class="price-chip">{service.priceChip}</span>
	</div>
	<div class="svc-card-body">
		<p class="eyebrow">{service.kicker}</p>
		<h3>{service.title}</h3>
		<p>{service.teaser}</p>
		<span class="more">
			Δείτε αναλυτικά
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path d="M5 12h13M12 5l7 7-7 7"></path>
			</svg>
		</span>
	</div>
</a>
