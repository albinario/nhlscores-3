import axios from 'axios'
import type { GameDetails, GameResponse } from '../types'

const BASE_URL = 'https://statsapi.web.nhl.com/api/v1'

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getGames = async (date: string) => {
	const gamesResponse = await get<GameResponse>('/schedule?date=' + date)
	return gamesResponse.dates[0].games
}

export const getGame = (gamePk: number) => {
	return get<GameDetails>('/game/' + gamePk + '/feed/live')
}