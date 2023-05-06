import { Game } from '../types'
import TeamResult from './TeamResult'

const GameCard = (
	props: {
		data: Game
		showResults: boolean
	}) => {
	const showResults = props.showResults && props.data.status.codedGameState === "7"

	return (
		<div className='col'>
			<div className='card'>
				<div className='card-body g-1'>
					<TeamResult
						team={props.data.teams.away}
						away={true}
						showResults={showResults}
						startTime={new Date(props.data.gameDate)}
					/>
					<TeamResult
						team={props.data.teams.home}
						away={false}
						showResults={showResults}
					/>
				</div>
			</div>
		</div>
	)
}

export default GameCard
