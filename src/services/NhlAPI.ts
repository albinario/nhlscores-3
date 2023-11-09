import axios from 'axios'
import type { Game, GameBoxscore, GameDetails } from '../types'

const instance = axios.create({
	baseURL: 'http://localhost:3000',
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

export const getGames = (date: string) => get<Game[]>('/schedule/' + date)

export const getGame = async (gameId: number) => {
	const boxscore = await get<GameBoxscore>(
		'/gamecenter/' + gameId + '/boxscore'
	)
	const landing = await get<GameDetails>('/gamecenter/' + gameId + '/landing')

	return {
		boxscore,
		landing,
	}
}
