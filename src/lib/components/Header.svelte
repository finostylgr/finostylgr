<script>
	import { onMount } from 'svelte';
	import { asset, href } from '$lib/paths.js';
	import { nav, phones, site } from '$lib/site.js';

	let open = $state(false);
	let progress = $state(0);
	const phone = phones[0];

	onMount(() => {
		const update = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 4 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});
</script>

<a class="skip" href="#content">Μετάβαση στο περιεχόμενο</a>
<header class="site-header">
	<div class="progress" aria-hidden="true"><span style:transform={`scaleX(${progress})`}></span></div>
	<div class="header-bar">
		<a class="brand" href={href('/#top')}>
			<img src={asset('/brand/logo.png')} alt={site.name} width="235" height="66" />
			<span class="tagline">{site.tagline}</span>
		</a>
		<nav class="nav" aria-label="Κύρια">
			{#each nav as item}
				<a href={href(item.href)}>{item.label}</a>
			{/each}
		</nav>
		<a class="phone-btn btn" href="tel:{phone.tel}">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
				<path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a15 15 0 0 1-16-16Z"></path>
			</svg>
			<span class="phone-label">{phone.display}</span>
		</a>
		<button
			class="nav-toggle"
			type="button"
			aria-expanded={open}
			aria-label={open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
			onclick={() => (open = !open)}
		>
			<span></span>
		</button>
	</div>
	{#if open}
		<nav class="nav-panel" aria-label="Κινητό">
			{#each nav as item}
				<a href={href(item.href)} onclick={() => (open = false)}>{item.label}</a>
			{/each}
			<a href={href('/#book')} onclick={() => (open = false)}>Ραντεβού</a>
		</nav>
	{/if}
</header>
