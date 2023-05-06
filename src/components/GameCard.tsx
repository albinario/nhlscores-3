import { Game } from '../types'
import TeamResult from './TeamResult'

const GameCard = (props: { data: Game }) => {
	return (
		<div className='col'>
			<div className='card'>
				<div className='card-body g-1'>
					<TeamResult
						team={props.data.teams.away}
					/>
					<TeamResult
						team={props.data.teams.home}
					/>
				</div>
			</div>
		</div>
	)
}

export default GameCard
