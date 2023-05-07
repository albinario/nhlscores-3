import { Game, Player } from '../types'
import TeamResult from './TeamResult'

const GameCard = (
	props: {
		game: Game
		playersPicked: Player[]
		showResults: boolean
	}) => {

	const gameData = props.game.gameData
	const linescore = props.game.liveData.linescore
	const showResults = props.showResults && gameData.status.statusCode === "7"
	const scoreAway = linescore.teams.away.goals
	const scoreHome = linescore.teams.home.goals
	const currentPeriodOrdinal = linescore.currentPeriodOrdinal
	const endType = currentPeriodOrdinal !== '3rd' ? currentPeriodOrdinal+' ' : ''
	const dateTime = new Date(gameData.datetime.dateTime)
	const startTime = ('0'+dateTime.getHours()).slice(-2)+':'+('0'+dateTime.getMinutes()).slice(-2)
	
	return (
		<div className='col-12 col-md-6 col-lg-4 col-xl'>
			<div className='card p-2'>
				<div className='card-body p-0 g-1'>
					<TeamResult
						team={gameData.teams.away}
						away={true}
						showResults={showResults}
						score={scoreAway}
						winner={scoreAway > scoreHome}
						endType={endType}
						playersPicked={props.playersPicked.filter(player => player.team === gameData.teams.away.id)}
						startTime={startTime}
						/>
					<TeamResult
						team={gameData.teams.home}
						away={false}
						showResults={showResults}
						score={scoreHome}
						winner={scoreHome > scoreAway}
						playersPicked={props.playersPicked.filter(player => player.team === gameData.teams.home.id)}
						endType={endType}
					/>
				</div>
			</div>
		</div>
	)
}

export default GameCard
