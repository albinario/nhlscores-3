import { useQuery } from '@tanstack/react-query'
import { getPlayersPicked } from '../services/TradesAPI'

export const useGetPlayers = () => {
	return useQuery(
		['playersPicked'],
		getPlayersPicked, {
			cacheTime: 1000 * 60 * 60 * 24
		}
	)
}
