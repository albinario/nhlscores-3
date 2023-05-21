export interface IGame {
	gameDate: string
	gamePk: number
	teams: {
		away: {
			leagueRecord: {
				losses: number
				wins: number
			}
			score: number
			team: ITeam
		},
		home: {
			leagueRecord: {
				losses: number
				wins: number
			}
			score: number
			team: ITeam
		}
	}
}

export interface IGameDetails {
	gameData: {
		teams: {
			away: ITeam
			home: ITeam
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
				away: {
					players: IGameDetailsPlayer[]
					goalies: number[]
				}
				home: {
					players: IGameDetailsPlayer[]
					goalies: number[]
				}
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
			allPlays: IPlay[]
		}
	}
}

export interface IGameDetailsPlayer {
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
	}
}

interface IPlay {
	about: {
		goals: {
			away: number
			home: number
		}
	}
	players: IPlayPlayer[]
	result: {
		emptyNet: boolean
		event: string
		gameWinningGoal: boolean
		strength: {
			code: string
		}
	}
	team: {
		id: number
		name: string
	}
}

interface IPlayPlayer {
	player: {
		id: number
		fullName: string
	}
	playerType: string
	seasonTotal: number
}

export interface IPlayer {
	id: number
	name: string
	jersey: number
	pos: string
	team: number
	picker: string
}

export interface ITeam {
	id: number
	name: string
	teamName: string
}

export interface ITeamStats {
	leagueRecord: {
		losses: number
		wins: number
	}
	score: number
	team: ITeam
}