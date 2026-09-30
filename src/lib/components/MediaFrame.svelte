<script>
	import { asset } from '$lib/paths.js';

	let { src = '', label = '', alt = '', tone = 'light', eager = false, cover = false } = $props();
	let failed = $state(false);
	let loaded = $state(false);
	const fileName = $derived((src || '').split('/').pop() || '—');
	const showCaption = $derived(!cover);
	const resolved = $derived(!src || /^(https?:|data:)/.test(src) ? src : asset(src));
</script>

<div class="media" class:is-dark={tone === 'dark'}>
	<div class="media-grain"></div>
	<div class="media-sheen"></div>
	<svg class="media-mark" viewBox="0 0 100 130" aria-hidden="true">
		<path d="M50 2C50 2 8 56 8 84a42 42 0 0 0 84 0C92 56 50 2 50 2Z" fill="currentColor"></path>
	</svg>
	{#if src && !failed}
		<img
			class:is-ready={loaded}
			src={resolved}
			{alt}
			loading={eager ? 'eager' : 'lazy'}
			decoding="async"
			onload={() => (loaded = true)}
			onerror={() => (failed = true)}
		/>
	{/if}
	{#if showCaption}
		<div class="media-caption">
			<span class="media-rule"></span>
			<span class="media-label">{label || 'MEDIA'}</span>
			<span class="media-file">{fileName}</span>
		</div>
		<div class="media-border"></div>
	{/if}
</div>
