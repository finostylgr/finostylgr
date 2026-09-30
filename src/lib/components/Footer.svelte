<script>
	import { asset, href } from '$lib/paths.js';
	import { nav, site, story } from '$lib/site.js';

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="wrap footer-grid">
		<div>
			<div class="logo-lockup">
				<span class="logo-chip">
					<img src={asset('/brand/logo.png')} alt={site.name} width="235" height="66" />
				</span>
				<img src={asset('/brand/mark.png')} alt="" width="156" height="158" />
			</div>
			<p>{story.footer}</p>
		</div>
		<nav class="footer-nav" aria-label="Υποσέλιδο">
			{#each nav as item}
				<a href={href(item.href)}>{item.label}</a>
			{/each}
			<a href={href('/#book')}>Ραντεβού</a>
		</nav>
		<p class="copy">© {year} Finostyl. All Rights Reserved.</p>
	</div>
</footer>
