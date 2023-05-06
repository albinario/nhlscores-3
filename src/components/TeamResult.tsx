import { Player, Team } from '../types'
import { logos } from '../util/config'

const TeamResult = (
		props: {
			team: Team
			away: boolean
			showResults: boolean
			score: number
			winner: boolean
			endType: string
			playersPicked: Player[]
			startTime?: string
		}
	) => {

	return (
		<div className='d-flex justify-content-between'>
			<div className='d-flex align-items-center'>
				<img
					src={`${logos}/${props.team.id}.svg`}
					alt={props.team.name}
				/>
				{props.team.name}
				<span className='badge text-bg-dark'>
					{props.playersPicked.length}
				</span>
			</div>
			<div>
				{props.showResults && props.winner && props.endType}
				{props.showResults && props.score}
				{props.away && !props.showResults && props.startTime}
			</div>
		</div>
	)
}

export default TeamResult
