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
	}
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
}

export interface ITeamStats {
	leagueRecord: {
		losses: number
		wins: number
	}
	score: number
	team: ITeam
}