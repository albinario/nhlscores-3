export type Game = {
	gameDate: string
	gamePk: number
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

export type Team = {
	id: number
	name: string
}
