export type DateOrder = 'DMY' | 'MDY' | 'YMD';

export function getLocaleDateOrder(): DateOrder {
	if (typeof document !== 'undefined' && document.documentElement.dataset.dateFormat) {
		const order = document.documentElement.dataset.dateFormat;
		if (order === 'DMY' || order === 'MDY' || order === 'YMD') {
			return order;
		}
	}

	if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
		try {
			const formatter = new Intl.DateTimeFormat(undefined, {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			});
			const parts = formatter.formatToParts(new Date(2000, 11, 31));
			const order = parts
				.filter((part) => part.type === 'day' || part.type === 'month' || part.type === 'year')
				.map((part) => (part.type === 'day' ? 'D' : part.type === 'month' ? 'M' : 'Y'))
				.join('');
			if (order === 'DMY' || order === 'MDY' || order === 'YMD') {
				return order;
			}
		} catch {
			return 'DMY';
		}
	}

	return 'DMY';
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
}
