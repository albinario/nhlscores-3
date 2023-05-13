import { IPlayer, ITeamStats } from '../interfaces'
import { logos } from '../util/config'

interface IProps {
	team: ITeamStats
	away: boolean
	showResults: boolean
	finished: boolean
	winner: boolean
	endType: string
	playersPicked: IPlayer[]
}

const Team: React.FC<IProps> = (props) => {
	const pickers = ['A', 'J', 'S', 'V']

	return (
		<div className='d-flex justify-content-between'>
			<div className='d-flex align-items-center'>
				<img
					src={`${logos}/${props.team.team.id}.svg`}
					alt={props.team.team.name}
				/>

				<span className='d-none d-sm-block me-1'>
					{props.team.team.name}
				</span>

				{(props.showResults || !props.finished) && (
					<span className='badge rounded-pill text-bg-secondary me-1'>
						{props.team.leagueRecord.wins}-{props.team.leagueRecord.losses}
					</span>
				)}

				{pickers.map((picker, index) => (
					<span key={index} className='badge rounded-pill text-bg-warning me-1'>
						{picker}{props.playersPicked.filter(p => p.picker === picker).length}
					</span>
				))}
			</div>
			<div>
				{props.showResults && props.winner && props.endType} {(props.showResults && props.finished) && props.team.score}
			</div>
		</div>
	)
}

export default Team
