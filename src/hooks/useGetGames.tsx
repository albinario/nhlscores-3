import { useQuery } from '@tanstack/react-query'
import { getGames } from '../services/NhlAPI'

export const useGetGames = (date: string) => {
	return useQuery({
		queryKey: ['games', date],
		queryFn: () => getGames(date),
	})
}
