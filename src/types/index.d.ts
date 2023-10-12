export type Game = {
	gameDate: string
	gamePk: number
	teams: {
		away: {
			leagueRecord: {
				losses: number
				wins: number
			}
			score: number
			team: Team
		},
		home: {
			leagueRecord: {
				losses: number
				wins: number
			}
			score: number
			team: Team
		}
	}
}

export type GameDetails = {
	gameData: {
		teams: {
			away: Team
			home: Team
		}
		datetime: {
			dateTime: string
		}
		status: {
			statusCode: string
		}
	}
	liveData: {
		boxscore: {
			teams: {
				away: GameDetailsTeam
				home: GameDetailsTeam
			}
		}
		linescore: {
			currentPeriodOrdinal: string
			teams: {
				away: {
					goals: number
				}
				home: {
					goals: number
				}
			}
		}
		plays: {
			allPlays: Play[]
		}
	}
}

export type GameResponse = {
	dates: {
		date: string
		games: Game[]
	}[]
}

export type GameDetailsTeam = {
	players: GameDetailsPlayer[]
	goalies: number[]
	team: Team
	skaters: number[]
}

export type GameDetailsPlayer = {
	jerseyNumber: number
	person: {
		fullName: string
	}
	stats: {
		goalieStats: {
			assists: number
			decision: string
			goals: number
			pim: number
			powerPlaySaves: number
			powerPlayShotsAgainst: number
			savePercentage: number
			saves: number
			shots: number
			timeOnIce: string
		}
		skaterStats: {
			assists: number
			blocked: number
			evenTimeOnIce: string
			goals: number
			hits: number
			penaltyMinutes: number
			plusMinus: number
			powerPlayTimeOnIce: number
			shortHandedTimeOnIce: number
			shots: number
			timeOnIce: string
		}
	}
}

type Play = {
	about: {
		goals: {
			away: number
			home: number
		}
		ordinalNum: string
		periodTime: string
	}
	players: PlayPlayer[]
	result: {
		emptyNet: boolean
		event: string
		gameWinningGoal: boolean
		strength: {
			code: string
		}
	}
	team: Team
}

type PlayPlayer = {
	player: {
		id: number
		fullName: string
	}
	playerType: string
	seasonTotal: number
}

export type Player = {
	id: number
	name: string
	jersey: number
	pos: string
	team: number
	picker: string
}

export type PlayerResponse = {
	data: Player[]
}

export type Team = {
	id: number
	name: string
	teamName: string
}

export type TeamStats = {
	leagueRecord: {
		losses: number
		wins: number
	}
	score: number
	team: Team
}