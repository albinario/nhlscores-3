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
	defense: Skater[]
	goalies: GoalieStats[]
	forwards: Skater[]
}

type Skater = {
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
	shortHandedToi: string
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

// export type GameDetailsTeam = {
// 	players: GameDetailsPlayer[]
// 	goalies: number[]
// 	team: Team
// 	skaters: number[]
// }

// export type GameDetailsPlayer = {
// 	jerseyNumber: number
// 	person: {
// 		fullName: string
// 	}
// 	stats: {
// 		goalieStats: {
// 			assists: number
// 			decision: string
// 			goals: number
// 			pim: number
// 			powerPlaySaves: number
// 			powerPlayShotsAgainst: number
// 			savePercentage: number
// 			saves: number
// 			shots: number
// 			timeOnIce: string
// 		}
// 		skaterStats: {
// 			assists: number
// 			blocked: number
// 			evenTimeOnIce: string
// 			goals: number
// 			hits: number
// 			penaltyMinutes: number
// 			plusMinus: number
// 			powerPlayTimeOnIce: number
// 			shortHandedTimeOnIce: number
// 			shots: number
// 			timeOnIce: string
// 		}
// 	}
// }

// type Play = {
// 	about: {
// 		goals: {
// 			away: number
// 			home: number
// 		}
// 		ordinalNum: string
// 		periodTime: string
// 	}
// 	players: PlayPlayer[]
// 	result: {
// 		emptyNet: boolean
// 		event: string
// 		gameWinningGoal: boolean
// 		strength: {
// 			code: string
// 		}
// 	}
// 	team: Team
// }

// type PlayPlayer = {
// 	player: {
// 		id: number
// 		fullName: string
// 	}
// 	playerType: string
// 	seasonTotal: number
// }

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

// export type Team = {
// 	id: number
// 	name: string
// 	teamName: string
// }

// export type TeamStats = {
// 	leagueRecord: {
// 		losses: number
// 		ot: number
// 		wins: number
// 	}
// 	score: number
// 	team: Team
// }
