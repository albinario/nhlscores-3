import { Team } from '../types'
import { logos } from '../util/config'

const TeamResult = (props: { team: Team }) => {
	return (
		<div className='d-flex justify-content-between'>
			<div>
				<img
					src={`${logos}/${props.team.team.id}.svg`}
					alt={props.team.team.name}
				/> {props.team.team.name}
			</div>
			<div>
				{props.team.score}
			</div>
		</div>
	)
}

export default TeamResult
