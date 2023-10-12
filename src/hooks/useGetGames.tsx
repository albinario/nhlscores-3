import { useQuery } from '@tanstack/react-query'
import { getGames } from '../services/NhlAPI'

const useGetGames = (date: string) => {
	return useQuery(
		['games', date],
		() => getGames(date)
	)
}

export default useGetGames
