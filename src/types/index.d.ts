export type Game = {
	teams: TeamList
}

type TeamList = {
	away: Team
	home: Team
}

export type Team = {
	leagueRecord: Record
	score: number
	team: TeamInfo
}

type TeamInfo = {
	id: number
	name: string
	link: string
}

type Record = {
	wins: number
	losses: number
	type: string
}

export type Player = {
	id: number
	name: string
	jersey: number
	pos: string
	team: number
	picker: string
}

