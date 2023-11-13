export type Game = {
	id: number
	startTimeUTC: string
	awayTeam: GameTeam
	homeTeam: GameTeam
}

type GameTeam = {
	id: string
	abbrev: string
	score: number
}

export type GameBoxscore = {
	boxscore: {
		playerByGameStats: {
			awayTeam: GameBoxscoreTeam
			homeTeam: GameBoxscoreTeam
		}
	}
	gameOutcome: {
		lastPeriodType: string
	}
}

type GameBoxscoreTeam = {
	defense: SkaterStats[]
	goalies: GoalieStats[]
	forwards: SkaterStats[]
}

type SkaterStats = {
	assists: number
	blockedShots: number
	goals: number
	hits: number
	name: Name
	pim: number
	playerId: number
	plusMinus: number
	points: number
	powerPlayToi: string
	shorthandedToi: string
	shots: number
	sweaterNumber: number
	toi: string
}

type GoalieStats = {
	name: Name
	pim: number
	playerId: number
	powerPlayGoalsAgainst: number
	savePctg: string
	saveShotsAgainst: string
	sweaterNumber: number
	toi: string
}

export type GameLanding = {
	awayTeam: Team
	clock: {
		timeRemaining: string
	}
	gameState: string
	homeTeam: Team
	summary: {
		scoring: Scoring[]
		shootout: []
	}
}

type Team = {
	abbrev: string
	id: number
	name: Name
	placeName: Name
	score: number
}

type Name = {
	default: string
}

type Scoring = {
	goals: ScoringGoal[]
	periodDescriptor: PeriodDescriptor
}

export type PeriodDescriptor = {
	number: number
	periodType: string
}

type ScoringGoal = {
	assists: Assist[]
	awayScore: number
	firstName: string
	goalModifier: string
	goalsToDate: number
	homeScore: number
	lastName: string
	playerId: number
	strength: string
	teamAbbrev: string
	timeInPeriod: string
}

type Assist = {
	assistsToDate: number
	firstName: string
	lastName: string
	playerId: number
}

export type GameDetails = {
	boxscore: GameBoxscore
	landing: GameLanding
}

export type GameResponse = {
	dates: {
		date: string
		games: Game[]
	}[]
}

export type PlayerPicked = {
	id: number
	name: string
	jersey: number
	pos: string
	teamAbbrev: string
	picker: string
}

export type PlayerResponse = {
	data: PlayerPicked[]
}

export type TeamRecord = {
	losses: number
	otLosses: number
	streakCode: string
	streakCount: number
	teamAbbrev: {
		default: string
	}
	wins: number
}
