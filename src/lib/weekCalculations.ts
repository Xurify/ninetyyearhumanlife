export interface LifeData {
	birthDate: Date;
	weeksLived: number;
	weeksRemaining: number;
	totalWeeks: number;
	monthsLived: number;
	monthsRemaining: number;
	totalMonths: number;
	yearsLived: number;
	daysLived: number;
	percentageLived: number;
}

export function calculateLifeData(birthDate: Date): LifeData {
	const now = new Date();
	const timeDiff = now.getTime() - birthDate.getTime();
	const daysLived = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	const weeksLived = Math.floor(daysLived / 7);
	
	const totalWeeks = 90 * 52; // 4680 weeks (90 years) matching the grid
	const weeksRemaining = Math.max(0, totalWeeks - weeksLived);

	const monthsLived = Math.floor(daysLived / 30.44); // Average days per month
	const totalMonths = 90 * 12; // 1080 months (90 years)
	const monthsRemaining = Math.max(0, totalMonths - monthsLived);

	const yearsLived = daysLived / 365.25;
	const percentageLived = (weeksLived / totalWeeks) * 100;

	return {
		birthDate,
		weeksLived,
		weeksRemaining,
		totalWeeks,
		monthsLived,
		monthsRemaining,
		totalMonths,
		yearsLived,
		daysLived,
		percentageLived
	};
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function getLifeStage(yearsLived: number): string {
	if (yearsLived < 2) return 'Infancy';
	if (yearsLived < 12) return 'Childhood';
	if (yearsLived < 18) return 'Adolescence';
	if (yearsLived < 30) return 'Young adulthood';
	if (yearsLived < 50) return 'Middle age';
	if (yearsLived < 70) return 'Mature adulthood';
	return 'elderhood';
}
