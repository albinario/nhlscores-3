import { useQuery } from '@tanstack/react-query'
import { getGame } from '../services/NhlAPI'

const useGetGameDetails = (gamePk: number) => {
	return useQuery(
		['game', gamePk],
		() => getGame(gamePk)
	)
}

export default useGetGameDetails
