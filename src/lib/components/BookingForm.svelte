<script>
	import { page } from '$app/state';
	import { services, site } from '$lib/site.js';

	let sent = $state(false);
	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let address = $state('');
	let pickup = $state('');
	let delivery = $state('');
	let service = $state('');
	let message = $state('');
	let errors = $state({});

	$effect(() => {
		const preset = page.url.searchParams.get('service') || '';
		if (services.some((item) => item.id === preset)) service = preset;
	});

	function validate() {
		const next = {};
		if (name.trim().length < 2) next.name = 'Συμπληρώστε το ονοματεπώνυμο σας.';
		if (!/^[0-9+\s().-]{10,}$/.test(phone.trim())) next.phone = 'Συμπληρώστε έγκυρο τηλέφωνο (10 ψηφία).';
		if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim())) next.email = 'Συμπληρώστε έγκυρο e-mail.';
		if (address.trim().length < 4) next.address = 'Συμπληρώστε τη διεύθυνση παραλαβής.';
		if (!pickup) next.pickup = 'Επιλέξτε ημερομηνία και ώρα παραλαβής.';
		return next;
	}

	function submit(event) {
		event.preventDefault();
		const next = validate();
		errors = next;
		if (Object.keys(next).length) return;
		const chosen = services.find((item) => item.id === service);
		const body = [
			`Ονοματεπώνυμο: ${name.trim()}`,
			`Τηλέφωνο: ${phone.trim()}`,
			`E-mail: ${email.trim()}`,
			`Διεύθυνση: ${address.trim()}`,
			`Παραλαβή: ${pickup}`,
			delivery ? `Παράδοση: ${delivery}` : '',
			chosen ? `Υπηρεσία: ${chosen.title}` : '',
			message.trim() ? `Σχόλια: ${message.trim()}` : ''
		]
			.filter(Boolean)
			.join('\n');
		window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Ραντεβού παραλαβής — Finostyl')}&body=${encodeURIComponent(body)}`;
		sent = true;
	}

	function reset() {
		sent = false;
		name = '';
		phone = '';
		email = '';
		address = '';
		pickup = '';
		delivery = '';
		service = '';
		message = '';
		errors = {};
	}
</script>

<form class="form" novalidate onsubmit={submit}>
	{#if sent}
		<div class="sent">
			<h3>Το αίτημα ετοιμάστηκε στο e-mail σας.</h3>
			<p>Στείλτε το μήνυμα για να το λάβουμε, ή καλέστε μας για επιβεβαίωση της ώρας παραλαβής. Στην πρώτη μας συνεργασία τηλεφωνούμε μισή ώρα πριν.</p>
			<button class="btn btn-line" type="button" onclick={reset}>Νέο αίτημα</button>
		</div>
	{:else}
		<label>
			<span>Ονοματεπώνυμο *</span>
			<input class:is-bad={errors.name} name="your-name" type="text" autocomplete="name" bind:value={name} />
			{#if errors.name}<span class="err">{errors.name}</span>{/if}
		</label>
		<label>
			<span>Τηλέφωνο *</span>
			<input class:is-bad={errors.phone} name="your-phone" type="tel" inputmode="tel" autocomplete="tel" bind:value={phone} />
			{#if errors.phone}<span class="err">{errors.phone}</span>{/if}
		</label>
		<label>
			<span>E-mail *</span>
			<input class:is-bad={errors.email} name="your-email" type="email" inputmode="email" autocomplete="email" bind:value={email} />
			{#if errors.email}<span class="err">{errors.email}</span>{/if}
		</label>
		<label>
			<span>Διεύθυνση *</span>
			<input class:is-bad={errors.address} name="your-address" type="text" autocomplete="street-address" bind:value={address} />
			{#if errors.address}<span class="err">{errors.address}</span>{/if}
		</label>
		<label>
			<span>Ημ/νία παραλαβής *</span>
			<input class:is-bad={errors.pickup} name="date-pick-up" type="datetime-local" bind:value={pickup} />
			{#if errors.pickup}<span class="err">{errors.pickup}</span>{/if}
		</label>
		<label>
			<span>Ημ/νία παράδοσης</span>
			<input name="date-delivery" type="datetime-local" bind:value={delivery} />
		</label>
		<label>
			<span>Υπηρεσία</span>
			<select name="service" bind:value={service}>
				<option value="">Επιλέξτε υπηρεσία</option>
				{#each services as option}
					<option value={option.id}>{option.title}</option>
				{/each}
			</select>
		</label>
		<label>
			<span>Σχόλια</span>
			<textarea name="your-message" rows="3" maxlength="400" bind:value={message}></textarea>
			<span class="counter">{message.length} / 400</span>
		</label>
		<button class="btn btn-orange" type="submit">Αποστολή</button>
		<p class="fine">Η αποστολή ανοίγει e-mail προς {site.email}. Για άμεση εξυπηρέτηση, καλέστε μας.</p>
	{/if}
</form>
