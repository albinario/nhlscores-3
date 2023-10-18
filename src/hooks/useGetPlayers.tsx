import { useQuery } from '@tanstack/react-query'
import { getPlayers } from '../services/TradesAPI'

export const useGetPlayers = () => {
	return useQuery(
		['players'],
		getPlayers, {
			cacheTime: 1000 * 60 * 60 * 24
		}
	)
}
