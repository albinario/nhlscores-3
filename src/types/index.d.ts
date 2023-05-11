export type Game = {
	gameDate: string
	gamePk: number
	teams: {
		away: {
			team: ITeam
		},
		home: {
			team: ITeam
		}
	}
}

export type GameDetails = {
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

export type Player = {
	id: number
	name: string
	jersey: number
	pos: string
	team: number
	picker: string
}

export type ITeam = {
	id: number
	name: string
}
