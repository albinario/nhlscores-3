import { IPlayer, ITeamStats } from '../interfaces'
import { logos } from '../util/config'

interface IProps {
	team: ITeamStats
	away: boolean
	showResults: boolean
	playersPicked: IPlayer[]
}

const Team: React.FC<IProps> = (props) => {
	const pickers = ['A', 'J', 'S', 'V']
	const picksAmount = pickers.map(picker => props.playersPicked.filter(p => p.picker === picker).length)

	return (
		<div className={`col-6 d-flex justify-content-end ${props.away ? 'pe-4' : 'flex-row-reverse ps-4'}`}>
			<span className='badge text-bg-dark'>{props.team.team.name}</span>
			<img
				src={`${logos}/${props.team.team.id}.svg`}
				alt={props.team.team.name}
			/>
		</div>
	)
}

export default Team
