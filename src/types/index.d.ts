export type Game = {
	gameDate: string
	teams: {
		away: Team
		home: Team
	}
	status: {
		codedGameState: string
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
	leagueRecord: {
		wins: number
		losses: number
		type: string
	}
	score: number
	team: {
		id: number
		name: string
		link: string
	}
}
