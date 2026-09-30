<script>
	import { page } from '$app/state';
	import { bubbles, site } from '$lib/site.js';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>{page.data.title ?? site.title}</title>
	<meta name="description" content={page.data.description ?? site.description} />
</svelte:head>

<div class="atmosphere" aria-hidden="true">
	<div class="glow glow-a"></div>
	<div class="glow glow-b"></div>
	{#each bubbles as bubble, index (index)}
		<span
			class="bubble"
			style:left={bubble.left}
			style:width={bubble.size}
			style:height={bubble.size}
			style:animation-duration={bubble.dur}
			style:animation-delay={bubble.delay}
		></span>
	{/each}
</div>

<div class="shell">
	<Header />
	<main id="content">
		{@render children()}
	</main>
	<Footer />
</div>
