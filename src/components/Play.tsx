import { IPlay, IPlayer } from '../interfaces'
import { logos } from '../util/config'
import Score from './Score'

interface IProps {
	play: IPlay
	playersPicked: IPlayer[]
}

const Play: React.FC<IProps> = (props) => {
	const scoringPlayers = props.play.players.filter(player => player.playerType !== 'Goalie')

	return (
		<div>
			<img src={`${logos}/${props.play.team.id}.svg`} alt={props.play.team.name} />
			<span className='badge'>{props.play.about.goals.away}-{props.play.about.goals.home}</span>
			<span className='small'>
				<em>
					{props.play.result.gameWinningGoal && 'GWG '}
				</em>
				{scoringPlayers.map((player, index) => (
					<span key={index}>
						<Score
							key={index}
							player={player}
							pickedBy={props.playersPicked.find(p => p.id === player.player.id)}
						/>
						{index !== scoringPlayers.length-1 && ', '}
					</span>
				))}
			</span>
		</div>
	)
}

export default Play
