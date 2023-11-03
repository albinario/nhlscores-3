import Logo from './Logo'
import Score from './Score'
import { Fragment } from 'react'
import type { Play, Player } from '../types'

interface IProps {
	play: Play
	players?: Player[]
}

const Play: React.FC<IProps> = (props) => {
	const scoringPlayers = props.play.players.filter(
		(player) => player.playerType !== 'Goalie'
	)
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
			<span className='small'>
				{props.play.about.goals.away}-{props.play.about.goals.home} {}
			</span>
			<span className='small text-muted'>
				{props.play.about.ordinalNum} {props.play.about.periodTime} {}
			</span>

			{!!goalTypes.length && (
				<span className='small text-muted fst-italic'>
					{goalTypes.map((scoreType) => scoreType).join(' ')} {}
				</span>
			)}

			{scoringPlayers.map((player, index) => (
				<Fragment key={index}>
					<Score
						key={index}
						player={player}
						pickedBy={
							props.players?.find((p) => p.id === player.player.id)?.picker
						}
					/>
					{index !== scoringPlayers.length - 1 && ', '}
				</Fragment>
			))}
		</div>
	)
}

export default Play
