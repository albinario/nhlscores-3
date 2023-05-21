import { IPlay, IPlayer } from '../interfaces'
import { logos } from '../util/config'
import Score from './Score'

interface IProps {
	play: IPlay
	playersPicked: IPlayer[]
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
			<img src={`${logos}/${props.play.team.id}.svg`} alt={props.play.team.name} />
			<span className='badge'>{props.play.about.goals.away}-{props.play.about.goals.home}</span>
			<span className='small'>
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
							pickedBy={props.playersPicked.find(p => p.id === player.player.id)?.picker}
						/>
						{index !== scoringPlayers.length-1 && ', '}
					</span>
				))}
			</span>
		</div>
	)
}

export default Play
