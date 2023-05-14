import { IPlayer, ITeamStats } from '../interfaces'
import { logos } from '../util/config'

interface IProps {
	team: ITeamStats
	away: boolean
	showResults: boolean
	playersPicked: IPlayer[]
}

const Team: React.FC<IProps> = (props) => {
	return (
		<div className={`col-6 d-flex flex-column ${props.away ? ' align-items-end pe-4' : 'ps-4'}`}>
			<div className={`d-flex mb-1 ${!props.away && 'flex-row-reverse justify-content-end'}`}>
				<span className='badge text-bg-dark'>{props.team.team.name}</span>
				<img
					src={`${logos}/${props.team.team.id}.svg`}
					alt={props.team.team.name}
				/>
			</div>
			{props.playersPicked && props.playersPicked.map(player => (
				<div className={`small d-flex align-items-center ${!props.away && 'flex-row-reverse justify-content-end'}`}>
					<span>{player.jersey} {player.name} {player.pos}</span>
					<span className='mx-1 badge text-bg-success'>{player.picker}</span>
				</div>
			))}
		</div>
	)
}

export default Team
