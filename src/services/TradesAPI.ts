import axios from 'axios'
import type { PlayerResponse } from '../types'

const BASE_URL = 'https://trades-api.onrender.com'

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getPlayersPicked = async () => {
	const response = await get<PlayerResponse>('/players')
	return response.data.filter((player) => player.picker)
}
