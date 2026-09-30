import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const userSite = repo.endsWith('.github.io');
const base = process.env.GITHUB_ACTIONS && repo && !userSite ? `/${repo}` : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		paths: { base },
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Photos are optional. Drop a file in static/media/ and it replaces the placeholder.
				if (path.startsWith('/media/')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
