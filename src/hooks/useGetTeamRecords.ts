import { useQuery } from '@tanstack/react-query'
import { getTeamRecords } from '../services/NhlAPI'

export const useGetTeamRecords = () => {
	return useQuery({
		queryKey: ['teamRecords'],
		queryFn: getTeamRecords,
	})
}
