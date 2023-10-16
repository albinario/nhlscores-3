import Logo from './Logo'
import Score from './Score'
import type { Play, Player } from '../types'

interface IProps {
	play: Play
	players?: Player[]
}

const Play: React.FC<IProps> = (props) => {
	const scoringPlayers = props.play.players.filter(player => player.playerType !== 'Goalie')
	const goalTypes: string[] = []

	if (props.play.result.gameWinningGoal) {
		goalTypes.push('GWG')
	}
	if (props.play.result.emptyNet) {
		goalTypes.push('ENG')
	}
	if (props.play.result.strength.code !== 'EVEN') {
		goalTypes.push(props.play.result.strength.code)
	}

	return (
		<div>
			<Logo team={props.play.team} />
			<span className='score'>{props.play.about.goals.away}-{props.play.about.goals.home}</span>
			<span className='time'>{props.play.about.ordinalNum} {props.play.about.periodTime}</span>

			{!!goalTypes.length && (
				<span className='small fst-italic me-1'>
					{goalTypes.map(scoreType => scoreType).join(' ')}
				</span>
			)}

			{scoringPlayers.map((player, index) => (
				<span key={index}>
					<Score
						key={index}
						player={player}
						pickedBy={props.players?.find(p => p.id === player.player.id)?.picker}
					/>
					{index !== scoringPlayers.length-1 && ', '}
				</span>
			))}
		</div>
	)
}

export default Play
