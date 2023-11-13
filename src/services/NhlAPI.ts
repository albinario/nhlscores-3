import axios from 'axios'
import type {
	Game,
	GameBoxscore,
	GameDetails,
	GameLanding,
	TeamRecord,
} from '../types'

const instance = axios.create({
	baseURL: 'https://nhlscores-proxy.cyclic.app',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getGame = async (gameId: number) => {
	const boxscore = await get<GameBoxscore>(
		'/gamecenter/' + gameId + '/boxscore'
	)
	const landing = await get<GameLanding>('/gamecenter/' + gameId + '/landing')
	const gameDetails: GameDetails = {
		boxscore,
		landing,
	}
	return gameDetails
}

export const getGames = (date: string) => get<Game[]>('/schedule/' + date)

export const getTeamRecords = async () => {
	const teamRecords = await get<TeamRecord[]>('/standings')
	const teams: TeamRecord[] = teamRecords.map((team) => {
		return {
			losses: team.losses,
			otLosses: team.otLosses,
			streakCode: team.streakCode,
			streakCount: team.streakCount,
			teamAbbrev: {
				default: team.teamAbbrev.default,
			},
			wins: team.wins,
		}
	})
	return teams
}
