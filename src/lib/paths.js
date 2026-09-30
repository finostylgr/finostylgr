import { assets, base } from '$app/paths';

/** In-site route. `path` starts with `/`, for example `/ypiresies/` or `/#prices`. */
export function href(path = '/') {
	if (path === '/' || path === '') return base || '/';
	return `${base}${path}`;
}

/** File from the `static` folder. `path` starts with `/`. */
export function asset(path) {
	return `${assets}${path}`;
}
