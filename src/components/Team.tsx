import Logo from './Logo'
import Col from 'react-bootstrap/Col'
import type { Player, TeamStats } from '../types'

interface IProps {
	away: boolean
	players?: Player[]
	showResults: boolean
	team: TeamStats
	teamName: string
}

const Team: React.FC<IProps> = (props) => (
	<Col className={`d-flex flex-column ${props.away && 'align-items-end'}`}>
		<div className={`d-flex mb-1 ${props.away ? 'me-3' : 'flex-row-reverse justify-content-end ms-3'}`}>
			<span className='d-none d-sm-inline'>{props.team.team.name}</span>
			<span className='d-sm-none'>{props.teamName}</span>
			<Logo team={props.team.team} />
		</div>

		{!props.showResults && props.players?.map(player => (
			<div
				className={`d-flex align-items-center ${props.away ? 'text-end' : 'flex-row-reverse justify-content-end'}`}
				key={player.id}
			>
				<div className={player.picker}>
					<span className='small'>{player.jersey} </span>
					<span className='d-none d-sm-inline'>{player.name}</span>
					<span className='d-sm-none'>{player.name.split(' ')[1]}</span>
					<span className='small'> {player.pos}</span>
				</div>
				<span className={`badge ${player.picker} ${props.away ? 'ms-1' : 'me-1'}`}>{player.picker}</span>
			</div>
		))}
	</Col>
)

export default Team