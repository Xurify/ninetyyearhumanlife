<script>
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<slot></slot>
