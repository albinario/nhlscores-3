import Logo from './Logo'
import type { Play, Player } from '../types'
import Score from './Score'

interface IProps {
	away: boolean
	play: Play
	players?: Player[]
}

const Play: React.FC<IProps> = (props) => {
	console.log(props.away)

	const scoringPlayers = props.play.players.filter(
		(player) => player.playerType !== 'Goalie'
	)

	const goalScorer = scoringPlayers[0]
	const assists = scoringPlayers.slice(1)

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
		<div className={`d-flex mb-2 ${props.away ? 'flex-row-reverse' : ''}`}>
			<div className='me-1'>
				<span className='small me-1'>
					<Logo team={props.play.team} />
					{props.play.about.goals.away}-{props.play.about.goals.home}
				</span>
				<span className='small text-muted'>
					{props.play.about.periodTime} <sup>{props.play.about.ordinalNum}</sup>
				</span>
			</div>

			<div>
				<Score
					player={goalScorer}
					pickedBy={
						props.players?.find((p) => p.id === goalScorer.player.id)?.picker
					}
				/>

				{!!goalTypes.length && (
					<span className='small text-muted fst-italic ms-1'>
						{goalTypes.map((scoreType) => scoreType).join(' ')}
					</span>
				)}

				<br />

				<span className='small text-muted'>
					{assists.map((assist, index) => (
						<Score
							first={index === 0}
							key={index}
							player={assist}
							pickedBy={
								props.players?.find((p) => p.id === assist.player.id)?.picker
							}
						/>
					))}
				</span>
			</div>
		</div>
	)
}

export default Play
