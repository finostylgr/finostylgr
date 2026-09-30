<script>
	import { href } from '$lib/paths.js';
	import MediaFrame from '$lib/components/MediaFrame.svelte';
	import ServicesRail from '$lib/components/ServicesRail.svelte';
	import ProcessSteps from '$lib/components/ProcessSteps.svelte';
	import PriceEstimator from '$lib/components/PriceEstimator.svelte';
	import FaqList from '$lib/components/FaqList.svelte';
	import BookingForm from '$lib/components/BookingForm.svelte';
	import {
		bubblesDark,
		deliveryMinPieces,
		hours,
		phones,
		pricesIntro,
		sectors,
		showTv,
		site,
		stores,
		story,
		tv,
		usps
	} from '$lib/site.js';
</script>

<section class="hero" id="top">
	<div class="hero-pane is-down">
		<div class="hero-bg">
			<MediaFrame
				src="/media/hero-01.jpg"
				label="HERO · ΑΤΜΟΣ / ΚΡΕΜΑΣΤΡΕΣ"
				alt="Ρούχα σε κρεμάστρες στο στεγνοκαθαριστήριο"
				tone="dark"
				eager
				cover
			/>
		</div>
		<div class="hero-shade"></div>
		<div class="steam" aria-hidden="true"></div>
		<div class="hero-copy">
			<h1>{story.heroLeftTitle}</h1>
			<p>{story.heroLeftText}</p>
			<a class="btn btn-orange" href={href('/ypiresies/')}>Περισσότερα</a>
		</div>
	</div>
	<div class="hero-seam" aria-hidden="true"></div>
	<div class="hero-pane is-up">
		<div class="hero-bg">
			<MediaFrame
				src="/media/hero-02.jpg"
				label="HERO · ΚΑΘΑΡΑ ΥΦΑΣΜΑΤΑ"
				alt="Καθαρά υφάσματα στον ήλιο"
				tone="dark"
				eager
				cover
			/>
		</div>
		<div class="hero-shade"></div>
		<div class="steam" aria-hidden="true"></div>
		<div class="hero-copy">
			<h2>{story.heroRightTitle}</h2>
			<p>{story.heroRightText}</p>
			<a class="btn btn-orange" href={href('/#prices')}>Περισσότερα</a>
		</div>
	</div>
</section>

<div class="strip">
	<div class="wrap strip-inner">
		<p class="strip-kicker"><span class="dot"></span>40+ χρόνια εμπειρίας</p>
		<p>{story.strip}</p>
		<a class="btn btn-ghost" href={href('/#book')}>Κλείστε ραντεβού</a>
	</div>
</div>

<section class="usps">
	<div class="wrap usp-grid">
		{#each usps as item}
			<div class="usp">
				<span>{item.n}</span>
				<div>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="section">
	<div class="wrap split">
		<div>
			<p class="kicker">Ποιοι είμαστε</p>
			<h2 class="display">{story.aboutTitle}</h2>
			{#each story.about as paragraph}
				<p class="prose">{paragraph}</p>
			{/each}
			<div class="stats">
				<div><strong>{site.founded}</strong><span>Από το</span></div>
				<div><strong>{stores.length}</strong><span>Καταστήματα</span></div>
			</div>
		</div>
		<div>
			<div class="frame" style="aspect-ratio: 515 / 591">
				<MediaFrame src="/media/storefront.jpg" label="ΚΑΤΑΣΤΗΜΑ · ΠΡΟΣΟΨΗ" alt="Η πρόσοψη του καταστήματος Finostyl" />
			</div>
			<div class="iso">
				<div class="frame">
					<MediaFrame src="/media/iso-9001.webp" label="ISO 9001" alt="Πιστοποίηση ISO 9001" />
				</div>
				<p>Πιστοποιημένες διαδικασίες ποιότητας κατά <strong>ISO 9001</strong>.</p>
			</div>
		</div>
	</div>
</section>

<section class="band section" id="svc">
	<div class="band-bg" aria-hidden="true">
		<div class="glow glow-a"></div>
		{#each bubblesDark as bubble, index (index)}
			<span
				class="bubble is-dark"
				style:left={bubble.left}
				style:width={bubble.size}
				style:height={bubble.size}
				style:animation-duration={bubble.dur}
				style:animation-delay={bubble.delay}
			></span>
		{/each}
	</div>
	<div class="wrap" style="position: relative">
		<p class="kicker kicker-light">Υπηρεσίες</p>
		<h2 class="display">{story.servicesTitle}</h2>
		<p class="lede">{story.servicesLede}</p>
		<ServicesRail />
		<p style="margin-top: 22px">
			<a class="btn btn-ghost" href={href('/ypiresies/')}>Όλες οι υπηρεσίες</a>
		</p>
	</div>
</section>

<section class="section" id="how">
	<div class="wrap">
		<p class="kicker">Η διαδικασία</p>
		<h2 class="display">{story.processTitle}</h2>
		<ProcessSteps />
	</div>
</section>

<section class="wash-band section" id="prices">
	<div class="wrap">
		<p class="kicker">{pricesIntro.kicker}</p>
		<h2 class="display">{pricesIntro.title}</h2>
		<p class="lede">{pricesIntro.lede}</p>
		<PriceEstimator />
		<div class="other">
			<p>{pricesIntro.otherTitle}</p>
			<p class="sub">{pricesIntro.otherText}</p>
			<a class="btn btn-navy" href="tel:{phones[0].tel}">Ζητήστε εκτίμηση</a>
		</div>
		<p class="footnote">{pricesIntro.footnote}</p>
	</div>
</section>

<section class="section">
	<div class="wrap split split-rev">
		<div class="frame" style="aspect-ratio: 945 / 694">
			<MediaFrame src="/media/svc-delivery.jpg" label="DELIVERY" alt="Υπηρεσία delivery Finostyl" />
		</div>
		<div>
			<p class="kicker">Delivery</p>
			<h2 class="display display-sm">{story.deliveryTitle}</h2>
			<p class="prose">{story.deliveryText}</p>
			<p class="pill"><span class="dot"></span>Από {deliveryMinPieces} τεμάχια και άνω</p>
		</div>
	</div>
</section>

<section class="b2b" id="b2b">
	<div class="b2b-media">
		<MediaFrame src="/media/b2b.jpg" label="B2B · ΙΜΑΤΙΣΜΟΣ" alt="Επαγγελματικός ιματισμός" tone="dark" cover />
	</div>
	<div class="b2b-shade"></div>
	<div class="wrap">
		<p class="kicker kicker-light">Επιχειρήσεις</p>
		<h2 class="display">{story.b2bTitle}</h2>
		<p class="lede">{story.b2bText}</p>
		<ul class="chips">
			{#each sectors as name}
				<li>{name}</li>
			{/each}
		</ul>
		<a class="btn btn-orange" href={href('/#contact')}>Ζητήστε προσφορά</a>
	</div>
</section>

<section class="section">
	<div class="wrap split">
		<div class="frame philosophy-media" style="aspect-ratio: 600 / 638">
			<MediaFrame src="/media/philosophy.jpg" label="ΦΙΛΟΣΟΦΙΑ" alt="Η φιλοσοφία μας" />
		</div>
		<div>
			<p class="kicker">Φιλοσοφία</p>
			<blockquote class="quote">{story.quote}</blockquote>
			<p class="prose">{story.philosophy}</p>
			<p class="close-line">{story.philosophyClose}</p>
		</div>
	</div>
</section>

{#if showTv}
	<section class="wash-band section">
		<div class="wrap">
			<p class="kicker">Συνεργασίες</p>
			<h2 class="display display-sm">Ιματισμός για τηλεοπτικές παραγωγές</h2>
			<ul class="tv-grid">
				{#each tv as item}
					<li class="tv-card">
						<div class="frame">
							<MediaFrame src={item.media} label={item.label} alt={item.title} />
						</div>
						<p>{item.title}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<section class="section">
	<div class="wrap">
		<p class="kicker">Συχνές ερωτήσεις</p>
		<h2 class="display display-sm">{story.faqTitle}</h2>
		<FaqList />
	</div>
</section>

<section class="book section" id="book">
	<div class="wrap book-grid">
		<div>
			<p class="kicker kicker-light">Ραντεβού</p>
			<h2 class="display">{story.bookingTitle}</h2>
			<p class="lede">{story.bookingLede}</p>
			<ul class="book-points">
				{#each hours as row}
					<li><span class="dot"></span>{row.days} {row.lines.join(' & ')}</li>
				{/each}
				<li><span class="dot"></span>Τηλεφωνικές παραγγελίες: {phones[0].display}</li>
			</ul>
		</div>
		<BookingForm />
	</div>
</section>

<section class="section" id="contact">
	<div class="wrap">
		<p class="kicker">Επικοινωνία</p>
		<h2 class="display display-sm">Τρία καταστήματα στην Αθήνα</h2>
		<ul class="store-grid">
			{#each stores as store}
				<li class="store-card">
					<p class="eyebrow">{store.tag}</p>
					<h3>{store.address}</h3>
					<p>{store.line2}</p>
					<a href={store.maps} target="_blank" rel="noopener noreferrer">
						Χάρτης
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path d="M7 17 17 7M9 7h8v8"></path>
						</svg>
					</a>
				</li>
			{/each}
		</ul>
		<div class="info-grid">
			<div class="info-card">
				<p class="eyebrow">Τηλέφωνα</p>
				<div class="phone-list">
					{#each phones as phone}
						<a href="tel:{phone.tel}">{phone.display}</a>
					{/each}
				</div>
				<a class="mail" href="mailto:{site.email}">{site.email}</a>
			</div>
			<div class="info-card">
				<p class="eyebrow">Ώρες λειτουργίας</p>
				<dl class="hours-list">
					{#each hours as row}
						<div>
							<dt>{row.days}</dt>
							<dd>
								{#each row.lines as line, index}
									{#if index > 0}<br />{/if}{line}
								{/each}
							</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</div>
</section>
