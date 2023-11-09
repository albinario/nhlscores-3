import { useQuery } from '@tanstack/react-query'
import { getGame } from '../services/NhlAPI'

export const useGetGame = (gamePk: number) => {
	return useQuery({
		queryKey: ['game', gamePk],
		queryFn: () => getGame(gamePk),
	})
}
