export interface TimePerceptionData {
	ageRange: string;
	ageStart: number;
	ageEnd: number;
	timeFeeling: string;
	description: string;
	psychologicalFactors: string[];
	examples: string[];
	scientificBasis: string;
	sources: string[];
}

export interface Reference {
	id: string;
	title: string;
	authors: string;
	journal: string;
	year: number;
	doi?: string;
	url?: string;
}

export const references: Reference[] = [
	{
		id: "droit-volet-2013",
		title: "Time perception, emotions and mood disorders",
		authors: "Droit-Volet, S.",
		journal: "Journal of Physiology-Paris",
		year: 2013,
		doi: "10.1016/j.jphysparis.2013.03.005",
		url: "https://pubmed.ncbi.nlm.nih.gov/23542546/"
	},
	{
		id: "wittmann-2009",
		title: "The inner experience of time",
		authors: "Wittmann, M.",
		journal: "Philosophical Transactions of the Royal Society B",
		year: 2009,
		doi: "10.1098/rstb.2009.0003",
		url: "https://royalsocietypublishing.org/doi/10.1098/rstb.2009.0003"
	},
	{
		id: "friedman-2003",
		title: "The development of a temporal-landmark strategy for judging the times of past events",
		authors: "Friedman, W. J.",
		journal: "Cognitive Development",
		year: 2003,
		doi: "10.1016/S0885-2014(03)00017-9",
		url: "https://www.sciencedirect.com/science/article/abs/pii/S0885201403000179"
	},
	{
		id: "janssen-2013",
		title: "Lost time: The effect of cognitive load on time perception",
		authors: "Janssen, S. M. J., & Naka, M.",
		journal: "Applied Cognitive Psychology",
		year: 2013,
		doi: "10.1002/acp.2863",
		url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.2863"
	},
	{
		id: "lemlich-1975",
		title: "Subjective acceleration of time with aging",
		authors: "Lemlich, R.",
		journal: "Perceptual and Motor Skills",
		year: 1975,
		doi: "10.2466/pms.1975.40.1.334",
		url: "https://journals.sagepub.com/doi/10.2466/pms.1975.40.1.334"
	},
	{
		id: "draaisma-2004",
		title: "Why Life Speeds Up As You Get Older",
		authors: "Draaisma, D.",
		journal: "Cambridge University Press",
		year: 2004,
		url: "https://www.cambridge.org/core/books/why-life-speeds-up-as-you-get-older/57ED981215733C54F975408B6B6A81BF"
	},
	{
		id: "james-1890",
		title: "The Principles of Psychology",
		authors: "James, W.",
		journal: "Harvard University Press",
		year: 1890,
		url: "https://psychclassics.yorku.ca/James/Principles/"
	},
	{
		id: "flaherty-1999",
		title: "A watched pot: How we experience time",
		authors: "Flaherty, M. G.",
		journal: "NYU Press",
		year: 1999,
		url: "https://www.google.com/books/edition/A_Watched_Pot/9XvYAAAAMAAJ"
	}
];

export const timePerceptionData: TimePerceptionData[] = [
	{
		ageRange: "0-5 years",
		ageStart: 0,
		ageEnd: 5,
		timeFeeling: "Eternal Present",
		description: "Time moves incredibly slowly. A single day feels like forever, and waiting for anything seems endless.",
		psychologicalFactors: [
			"No concept of future planning",
			"Living entirely in the present moment",
			"Every experience is new and takes longer to process",
			"No reference frame for time comparison"
		],
		examples: [
			"Waiting for Christmas feels like an eternity",
			"Summer vacation seems to last forever",
			"A car ride to grandma's house feels like a cross-country journey"
		],
		scientificBasis: "Young children have underdeveloped prefrontal cortex, limiting their ability to understand time sequences and duration.",
		sources: ["friedman-2003", "droit-volet-2013"]
	},
	{
		ageRange: "6-12 years",
		ageStart: 6,
		ageEnd: 12,
		timeFeeling: "Slow and Rich",
		description: "Time still moves slowly, but you're starting to understand sequences. School years feel very long.",
		psychologicalFactors: [
			"Developing time awareness",
			"Many new experiences and learning",
			"Strong emotional memories being formed",
			"Beginning to understand past and future"
		],
		examples: [
			"A school year feels like a lifetime",
			"Summer break is an epic adventure",
			"Waiting for your birthday party is torture",
			"Learning to ride a bike takes 'forever'"
		],
		scientificBasis: "The brain is rapidly developing and forming new neural pathways, making each experience feel longer and more significant.",
		sources: ["friedman-2003", "wittmann-2009"]
	},
	{
		ageRange: "13-18 years",
		ageStart: 13,
		ageEnd: 18,
		timeFeeling: "Intense and Dramatic",
		description: "Time feels both slow and fast. Individual moments are intense, but you're aware time is passing.",
		psychologicalFactors: [
			"Heightened emotional experiences",
			"Many 'firsts' happening",
			"Developing identity and relationships",
			"Increased awareness of mortality"
		],
		examples: [
			"A crush lasting 'forever'",
			"High school drama feels earth-shattering",
			"Senior year flies by unexpectedly",
			"Waiting to turn 18 takes ages"
		],
		scientificBasis: "Adolescent brain development creates intense emotional experiences while the prefrontal cortex is still maturing.",
		sources: ["droit-volet-2013", "flaherty-1999"]
	},
	{
		ageRange: "19-25 years",
		ageStart: 19,
		ageEnd: 25,
		timeFeeling: "Fast and Exciting",
		description: "Time starts speeding up. So many new experiences, but they're happening quickly.",
		psychologicalFactors: [
			"Many life transitions and firsts",
			"Increased independence and responsibility",
			"Future planning becomes important",
			"Routine hasn't set in yet"
		],
		examples: [
			"College years fly by",
			"First job experiences are intense but brief",
			"Relationships feel both eternal and fleeting",
			"'Real life' starts feeling urgent"
		],
		scientificBasis: "The brain is fully developed but experiencing many novel situations, creating a mix of detailed memories and rapid progression.",
		sources: ["janssen-2013", "wittmann-2009"]
	},
	{
		ageRange: "26-35 years",
		ageStart: 26,
		ageEnd: 35,
		timeFeeling: "Accelerating",
		description: "Time is definitely speeding up. You notice years passing more quickly than before.",
		psychologicalFactors: [
			"Establishing routines and patterns",
			"Career focus and goal-oriented thinking",
			"Fewer completely novel experiences",
			"Beginning to feel time pressure"
		],
		examples: [
			"'Where did my twenties go?'",
			"Birthdays start coming faster",
			"Seasons seem to change quickly",
			"Planning becomes more future-focused"
		],
		scientificBasis: "As routines establish and novel experiences decrease, the brain processes time more efficiently, creating the sensation of acceleration.",
		sources: ["draaisma-2004", "lemlich-1975"]
	},
	{
		ageRange: "36-45 years",
		ageStart: 36,
		ageEnd: 45,
		timeFeeling: "Racing",
		description: "Time feels like it's racing by. You're very aware of how quickly years pass.",
		psychologicalFactors: [
			"Midlife awareness kicking in",
			"Routine-heavy lifestyle",
			"Comparing current age to past expectations",
			"Increased awareness of aging"
		],
		examples: [
			"'I can't believe I'm almost 40'",
			"Kids growing up too fast",
			"Decades feeling like years",
			"Nostalgia for 'simpler times'"
		],
		scientificBasis: "The proportional theory: each year represents a smaller fraction of your total life experience, making time feel faster.",
		sources: ["james-1890", "draaisma-2004"]
	},
	{
		ageRange: "46-55 years",
		ageStart: 46,
		ageEnd: 55,
		timeFeeling: "Rushing",
		description: "Time feels like it's rushing past. There's urgency about accomplishing goals.",
		psychologicalFactors: [
			"Midlife crisis potential",
			"Awareness of limited time remaining",
			"Peak career and family responsibilities",
			"Health awareness increasing"
		],
		examples: [
			"'Life is half over'",
			"Urgency about unfulfilled dreams",
			"Watching parents age rapidly",
			"Career peak pressure"
		],
		scientificBasis: "Psychological research shows peak time acceleration perception occurs in middle age due to routine and proportional time effects.",
		sources: ["lemlich-1975", "flaherty-1999"]
	},
	{
		ageRange: "56-65 years",
		ageStart: 56,
		ageEnd: 65,
		timeFeeling: "Flying",
		description: "Time feels like it's flying. Retirement planning makes you very aware of time's passage.",
		psychologicalFactors: [
			"Pre-retirement awareness",
			"Empty nest syndrome possible",
			"Health becomes more prominent",
			"Legacy thinking begins"
		],
		examples: [
			"'Where did the years go?'",
			"Grandchildren growing up instantly",
			"Retirement countdown feels urgent",
			"Decades blending together"
		],
		scientificBasis: "Established routines and fewer novel experiences create the strongest sensation of time acceleration.",
		sources: ["draaisma-2004", "wittmann-2009"]
	},
	{
		ageRange: "66-75 years",
		ageStart: 66,
		ageEnd: 75,
		timeFeeling: "Precious",
		description: "Time becomes precious. You're very aware of its value and try to savor moments.",
		psychologicalFactors: [
			"Retirement adjustment",
			"Health concerns more prominent",
			"Wisdom and perspective gained",
			"Mortality awareness heightened"
		],
		examples: [
			"Savoring time with grandchildren",
			"'Making every moment count'",
			"Appreciating simple pleasures more",
			"Feeling urgency about bucket lists"
		],
		scientificBasis: "Awareness of mortality combined with more free time can create both acceleration and appreciation of time's value.",
		sources: ["flaherty-1999", "droit-volet-2013"]
	},
	{
		ageRange: "76-90 years",
		ageStart: 76,
		ageEnd: 90,
		timeFeeling: "Reflective",
		description: "Time becomes more reflective. Past memories feel vivid while present time can feel both fast and slow.",
		psychologicalFactors: [
			"Strong focus on memories and past",
			"Present moment awareness",
			"Acceptance of life's rhythm",
			"Wisdom about time's nature"
		],
		examples: [
			"Childhood memories feeling like yesterday",
			"Appreciating quiet moments",
			"Time with family feels precious",
			"Past decades feeling like a lifetime"
		],
		scientificBasis: "Cognitive changes and life reflection create a complex relationship with time, mixing acceleration with deep appreciation.",
		sources: ["wittmann-2009", "friedman-2003"]
	}
];

export function getTimePerceptionForAge(age: number): TimePerceptionData | null {
	return timePerceptionData.find(data => age >= data.ageStart && age <= data.ageEnd) || null;
}

export function getTimePerceptionForMonth(monthIndex: number): TimePerceptionData | null {
	const age = Math.floor(monthIndex / 12);
	return getTimePerceptionForAge(age);
}

export function getReference(id: string): Reference | null {
	return references.find(ref => ref.id === id) || null;
}

export function getReferencesForData(data: TimePerceptionData): Reference[] {
	return data.sources.map(id => getReference(id)).filter(ref => ref !== null) as Reference[];
}
