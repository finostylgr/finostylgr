<script>
	import { onMount } from 'svelte';
	import { asset } from '$lib/paths.js';
	import MediaFrame from './MediaFrame.svelte';
	import { steps, story } from '$lib/site.js';

	const STEP_MS = 4200;
	let active = $state(0);
	let progress = $state(0);
	let hovering = $state(false);
	let started = 0;
	let timer = 0;

	function arm() {
		started = Date.now();
		progress = 0;
		clearTimeout(timer);
		timer = setTimeout(function tick() {
			if (hovering) {
				timer = setTimeout(tick, STEP_MS);
				return;
			}
			active = (active + 1) % steps.length;
			arm();
		}, STEP_MS);
	}

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			progress = 1;
			return;
		}
		arm();
		const paint = setInterval(() => {
			progress = Math.min(1, (Date.now() - started) / STEP_MS);
		}, 50);
		return () => {
			clearTimeout(timer);
			clearInterval(paint);
		};
	});

	function pick(index) {
		active = index;
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) arm();
	}

	const current = $derived(steps[active]);
</script>

<div
	role="group"
	aria-label="Βήματα διαδικασίας"
	onmouseenter={() => (hovering = true)}
	onmouseleave={() => (hovering = false)}
>
	<ol class="steps">
		{#each steps as step, index}
			<li>
				<button
					class="step-tab"
					class:is-on={index === active}
					class:is-done={index < active}
					type="button"
					aria-current={index === active ? 'step' : undefined}
					onclick={() => pick(index)}
				>
					<span class="step-dot"></span>
					<small>ΒΗΜΑ {step.n}</small>
					<strong>{step.title}</strong>
				</button>
			</li>
		{/each}
	</ol>
	<div class="seq-bar" aria-hidden="true"><span style:transform={`scaleX(${progress})`}></span></div>
	{#key active}
		<div class="seq-panel">
			<div class="seq-media">
				<MediaFrame src={current.media} label={current.n} alt={current.title} />
			</div>
			<div>
				<p class="eyebrow">ΒΗΜΑ {current.n} ΑΠΟ 04</p>
				<h3>{current.title}</h3>
				<p>{current.text}</p>
			</div>
		</div>
	{/key}
</div>
<div class="note">
	<img src={asset('/brand/mark.png')} alt="" width="156" height="158" />
	<p>{story.confirm}</p>
</div>
