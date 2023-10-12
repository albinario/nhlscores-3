import { useQuery } from '@tanstack/react-query'
import { getPlayers } from '../services/TradesAPI'

const useGetPlayers = () => {
	return useQuery(
		['players'],
		getPlayers, {
			cacheTime: 1000 * 60 * 60 * 24 * 6
		}
	)
}

export default useGetPlayers
