import { IGameDetails } from "../interfaces"

export const gameDetailsEmpty: IGameDetails = {
	gameData: {
		teams: {
			away: {
				id: 0,
				name: ""
			},
			home: {
				id: 1,
				name: ""
			}
		},
		datetime: {
			dateTime: ""
		},
		status: {
			statusCode: ""
		}
	},
	liveData: {
		linescore: {
			currentPeriodOrdinal: "",
			teams: {
				away: {
					goals: 0
				},
				home: {
					goals: 0
				}
			}
		}
	}
}