import { useQuery } from '@tanstack/react-query'
import { getGame } from '../services/NhlAPI'

export const useGetGame = (gameId: number) => {
	return useQuery({
		queryKey: ['game', gameId],
		queryFn: () => getGame(gameId),
	})
}
