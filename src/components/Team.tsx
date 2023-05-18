import { IPlayer, ITeamStats } from '../interfaces'
import { logos } from '../util/config'

interface IProps {
	team: ITeamStats
	teamName: string
	away: boolean
	showResults: boolean
	playersPicked: IPlayer[]
}

const Team: React.FC<IProps> = (props) => {
	return (
		<div className={`col-6 d-flex flex-column ${props.away && 'align-items-end'} px-1`}>
			<div className={`d-flex mb-2 ${props.away ? 'me-3' : 'flex-row-reverse justify-content-end ms-3'}`}>
				<span className='d-none d-sm-inline'>{props.team.team.name}</span>
				<span className='d-sm-none'>{props.teamName}</span>

				<img
					src={`${logos}/${props.team.team.id}.svg`}
					alt={props.team.team.name}
				/>
			</div>
			{props.playersPicked && props.playersPicked.map((player, index) => (
				<div key={index} className={`d-flex align-items-center ${props.away ? 'text-end' : 'flex-row-reverse justify-content-end'}`}>
					<div>
						<span className='small'>{player.jersey} </span>
						<span className='d-none d-sm-inline'>{player.name}</span>
						<span className='d-sm-none'>{player.name.split(' ')[1]}</span>
						<span className='small'> {player.pos}</span>
					</div>
					<span className={`badge text-bg-primary ${props.away ? 'ms-1' : 'me-1'}`}>
						{player.picker}
					</span>
				</div>
			))}
		</div>
	)
}

export default Team
