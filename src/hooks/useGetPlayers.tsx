import { useQuery } from '@tanstack/react-query'
import { getPlayers } from '../services/TradesAPI'

export const useGetPlayers = () => {
	return useQuery({
		queryKey: ['players'],
		queryFn: getPlayers,
	})
}
