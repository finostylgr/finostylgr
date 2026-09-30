<script>
	import { href } from '$lib/paths.js';
	import MediaFrame from '$lib/components/MediaFrame.svelte';
	import PriceEstimator from '$lib/components/PriceEstimator.svelte';
	import { deliveryMinPieces, phones, relatedServices, serviceBadges } from '$lib/site.js';

	let { data } = $props();
	const service = $derived(data.service);
	const related = $derived(relatedServices(service));
	const badges = $derived(serviceBadges(service));
</script>

<article>
	<header class="svc-hero">
		<MediaFrame src={service.media} label={service.mediaLabel} alt={service.title} tone="dark" eager cover />
		<div class="shade"></div>
		<div class="wrap">
			<p class="kicker kicker-light">{service.kicker}</p>
			<h1>{service.title}</h1>
		</div>
	</header>

	<div class="wrap section" style="padding-top: 36px">
		<p class="crumbs">
			<a href={href('/')}>Αρχική</a>
			<span aria-hidden="true">/</span>
			<a href={href('/ypiresies/')}>Υπηρεσίες</a>
			<span aria-hidden="true">/</span>
			<span>{service.title}</span>
		</p>
		<div class="badges">
			<span class="badge-solid">{service.priceChip}</span>
			{#each badges as badge}
				<span class="badge">{badge}</span>
			{/each}
		</div>

		{#if service.pricingType === 'per_unit'}
			<ul class="price-table">
				{#each service.unitPrices as row}
					<li><span>{row.unit}</span><strong>{row.display}</strong></li>
				{/each}
			</ul>
			{#if service.storeNote}<p class="store-note">{service.storeNote}</p>{/if}
			<h2 class="display display-sm" style="margin-top: 36px">Υπολογίστε το κόστος</h2>
			<p class="lede">Οι ποσότητες χρησιμοποιούν τις ίδιες δημοσιευμένες τιμές σιδερώματος.</p>
			<PriceEstimator />
		{:else if service.pricingType === 'on_request'}
			<p class="callout">
				Εκτίμηση κατόπιν επικοινωνίας — η τιμή εξαρτάται από το ύφασμα και την κατάσταση του ρούχου.
			</p>
		{:else}
			<p class="callout">
				Παραλαβή και παράδοση στον χώρο σας. Ελάχιστο {deliveryMinPieces} τεμάχια.
			</p>
		{/if}

		<div>
			{#each service.body as paragraph}
				<p class="prose">{paragraph}</p>
			{/each}
		</div>

		{#if service.features?.length}
			<ul class="feature-list">
				{#each service.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
		{/if}

		{#if service.gallery?.length}
			<div class="gallery">
				{#each service.gallery as shot}
					<div class="frame">
						<MediaFrame src={shot.src} label={shot.label} alt={shot.label} />
					</div>
				{/each}
			</div>
		{/if}

		<div class="cta-row">
			<a class="btn btn-navy" href="tel:{phones[0].tel}">Καλέστε μας</a>
			<a class="btn btn-orange" href={href(`/?service=${service.id}#book`)}>Κλείστε ραντεβού</a>
		</div>

		{#if related.length}
			<div class="related">
				<p class="eyebrow">Σχετικές υπηρεσίες</p>
				<ul>
					{#each related as item}
						<li>
							<a href={href(item.href)}>
								<span>
									<strong>{item.title}</strong>
									<small>{item.priceChip}</small>
								</span>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
									<path d="M5 12h13M12 5l7 7-7 7"></path>
								</svg>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</article>
