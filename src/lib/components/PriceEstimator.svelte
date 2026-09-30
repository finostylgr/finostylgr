<script>
	import { asset, href } from '$lib/paths.js';
	import { deliveryMinPieces, formatEuro, laundryOffer, priceLines } from '$lib/site.js';

	let mode = $state('ironing');
	let qty = $state(Object.fromEntries(priceLines.map((line) => [line.id, line.defaultQty])));
	let totalEl = $state(null);
	let seenTotal = '';

	const laundry = $derived(mode === 'laundry');

	function unitPrice(line) {
		return line.deliveryPrice;
	}

	function setQty(id, value, max) {
		qty[id] = Math.max(0, Math.min(max, value));
	}

	const summary = $derived(
		priceLines
			.filter((line) => (qty[line.id] || 0) > 0)
			.map((line) => {
				const count = qty[line.id];
				return {
					label: `${line.title} · ${count} ${line.suffix} × ${formatEuro(unitPrice(line))}`,
					amount: formatEuro(count * unitPrice(line))
				};
			})
	);

	const total = $derived(priceLines.reduce((sum, line) => sum + (qty[line.id] || 0) * unitPrice(line), 0));
	const totalLabel = $derived(formatEuro(total));
	const pieces = $derived(
		priceLines.reduce((sum, line) => sum + (line.countsTowardMinimum ? qty[line.id] || 0 : 0), 0)
	);
	const warn = $derived(
		pieces > 0 && pieces < deliveryMinPieces
			? `Η παραλαβή στον χώρο σας ισχύει από ${deliveryMinPieces} τεμάχια και άνω.`
			: ''
	);
	const itemsNote =
		'Το σύνολο καλύπτει μόνο το σιδέρωμα πουκαμίσου. Για τα υπόλοιπα, εκτίμηση κατόπιν επικοινωνίας.';

	$effect(() => {
		const next = totalLabel;
		if (typeof window === 'undefined') return;
		if (seenTotal && seenTotal !== next && totalEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			totalEl.animate(
				[
					{ transform: 'translateY(4px)', opacity: 0.4 },
					{ transform: 'none', opacity: 1 }
				],
				{ duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' }
			);
		}
		seenTotal = next;
	});

	function reset() {
		for (const line of priceLines) qty[line.id] = 0;
	}
</script>

<div class="est">
	<div>
		<div class="modes" role="group" aria-label="Υπηρεσία τιμοκαταλόγου">
			<button type="button" class:is-on={!laundry} aria-pressed={!laundry} onclick={() => (mode = 'ironing')}>
				Παράδοση στον χώρο σας
			</button>
			<button type="button" class:is-on={laundry} aria-pressed={laundry} onclick={() => (mode = 'laundry')}>
				{laundryOffer.tab}
			</button>
		</div>
		{#if laundry}
			<div class="laundry-offer">
				<p class="kicker">Νέα υπηρεσία</p>
				<h3>{laundryOffer.title}</h3>
				<p>{laundryOffer.text}</p>
				<p class="laundry-price">{formatEuro(laundryOffer.price)} <span>{laundryOffer.unit}</span></p>
				<a class="btn btn-navy" href={href('/#book')}>Κλείστε ραντεβού</a>
			</div>
		{:else}
		<div class="lines">
			{#each priceLines as line (line.id)}
				<div class="line">
					<div class="line-head">
						<div>
							<h3>{line.title}</h3>
							<p class="note-text">{line.note}</p>
						</div>
						<div class="line-price">
							<strong>{formatEuro(unitPrice(line))}</strong>
							<span>{line.unit}</span>
						</div>
					</div>
					<div class="qty">
						<button type="button" aria-label="Μείωση — {line.title}" onclick={() => setQty(line.id, (qty[line.id] || 0) - line.step, line.max)}>−</button>
						<div class="qty-mid">
							<span>{qty[line.id] || 0} {line.suffix}</span>
							<input
								type="range"
								min="0"
								max={line.max}
								step={line.step}
								value={qty[line.id] || 0}
								aria-label={line.title}
								oninput={(event) => setQty(line.id, Number(event.currentTarget.value) || 0, line.max)}
							/>
						</div>
						<button type="button" aria-label="Αύξηση — {line.title}" onclick={() => setQty(line.id, (qty[line.id] || 0) + line.step, line.max)}>+</button>
					</div>
				</div>
			{/each}
		</div>
		{/if}
	</div>

	{#if laundry}
		<figure class="laundry-visual">
			<img src={asset(laundryOffer.image)} alt={laundryOffer.alt} />
		</figure>
	{:else}
	<div class="estimate">
		<p class="estimate-kicker">
			<img src={asset('/brand/mark.png')} alt="" width="156" height="158" />
			Η εκτίμηση σας
		</p>
		{#if summary.length}
			<ul class="summary">
				{#each summary as row}
					<li><span>{row.label}</span><strong>{row.amount}</strong></li>
				{/each}
			</ul>
		{:else}
			<p class="empty-note">Επιλέξτε ποσότητες για να δείτε το σύνολο.</p>
		{/if}
		<div class="total-row">
			<span>Σύνολο</span>
			<strong bind:this={totalEl}>{totalLabel}</strong>
		</div>
		<p class="items-note">{itemsNote}</p>
		{#if warn}<p class="warn">{warn}</p>{/if}
		<div class="estimate-actions">
			<a class="btn btn-orange" href={href('/?service=ironing#book')}>Κλείστε ραντεβού</a>
			<button class="btn btn-line" type="button" onclick={reset}>Μηδενισμός</button>
		</div>
	</div>
	{/if}
</div>
