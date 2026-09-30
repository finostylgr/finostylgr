<script>
	import { faq } from '$lib/site.js';

	let open = $state(null);
</script>

<ul class="faq-list">
	{#each faq as item, index}
		<li>
			<button type="button" aria-expanded={open === index} onclick={() => (open = open === index ? null : index)}>
				<span>{item.q}</span>
				<span class="faq-icon" aria-hidden="true">+</span>
			</button>
			<div class="answer" class:is-open={open === index}>
				<p>{item.a}</p>
			</div>
		</li>
	{/each}
</ul>
