<script>
	import { href } from '$lib/paths.js';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import { services, story } from '$lib/site.js';
</script>

<section class="band section">
	<div class="wrap">
		<p class="crumbs"><a href={href('/')}>Αρχική</a> <span aria-hidden="true">/</span> Υπηρεσίες</p>
		<p class="kicker kicker-light">Υπηρεσίες</p>
		<h1 class="display">{story.servicesTitle}</h1>
		<p class="lede">{story.servicesLede}</p>
		<div class="svc-directory">
			{#each services as service (service.id)}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</section>
