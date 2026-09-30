import { error } from '@sveltejs/kit';
import { getService, services } from '$lib/site.js';

export function entries() {
	return services.map((service) => ({ id: service.id }));
}

export function load({ params }) {
	const service = getService(params.id);
	if (!service) error(404, 'Δεν βρέθηκε η υπηρεσία.');
	return {
		service,
		title: `${service.title} | Finostyl`,
		description: service.teaser
	};
}
