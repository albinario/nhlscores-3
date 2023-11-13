import Logo from './Logo'
import Col from 'react-bootstrap/Col'
import type { PlayerPicked, Team, TeamRecord } from '../types'

interface IProps {
	away: boolean
	playersPicked?: PlayerPicked[]
	showResults: boolean
	team: Team
	teamRecord?: TeamRecord
}

const Team: React.FC<IProps> = (props) => (
	<Col className={`d-flex flex-column ${props.away && 'align-items-end'}`}>
		<div
			className={`d-flex mb-1 ${
				props.away ? 'me-3' : 'flex-row-reverse justify-content-end ms-3'
			}`}
		>
			<span className='d-none d-sm-inline'>
				{props.team.placeName.default} {props.team.name.default}
			</span>
			<span className='d-sm-none'>{props.team.name.default}</span>
			<Logo team={props.team} />
		</div>

		{!props.showResults &&
			props.playersPicked
				?.sort((a, b) => a.jersey - b.jersey)
				.map((player) => (
					<div className={`${props.away && 'text-end'}`} key={player.id}>
						<div className={player.picker}>
							<span className='small'>{player.jersey} </span>
							<span className='d-none d-sm-inline'>{player.name}</span>
							<span className='d-sm-none'>{player.name.split(' ')[1]}</span>
							<span className='small'>
								{' '}
								{player.pos} {player.picker}
							</span>
						</div>
					</div>
				))}

		{props.showResults && props.teamRecord && (
			<span className='small'>
				{props.teamRecord.wins}-{props.teamRecord.losses}-
				{props.teamRecord.otLosses}{' '}
				<span className='text-muted'>
					{props.teamRecord.streakCode}
					{props.teamRecord.streakCount}
				</span>
			</span>
		)}
	</Col>
)

export default Team
