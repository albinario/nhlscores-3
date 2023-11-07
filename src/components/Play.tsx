import Logo from './Logo'
import type { Play, Player } from '../types'
import Score from './Score'

interface IProps {
	away: boolean
	play: Play
	players?: Player[]
}

const Play: React.FC<IProps> = (props) => {
	const scoringPlayers = props.play.players.filter(
		(player) => player.playerType !== 'Goalie'
	)

	const goalScorer = scoringPlayers[0]
	const assisters = scoringPlayers.slice(1)

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
		<div className='mb-2'>
			<div className={`d-flex align-items-center ${!props.away && 'flex-row-reverse'}`}>
				<Logo team={props.play.team} />

				<div className={`small ${props.away ? 'me-1' : 'ms-1'}`}>
					{props.play.about.goals.away}-{props.play.about.goals.home}
				</div>
				<div className={`small text-muted ${props.away ? 'me-1' : 'ms-1'}`}>
					{props.play.about.periodTime} <sup>{props.play.about.ordinalNum}</sup>
				</div>

				<div className='d-flex align-items-center'>
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
				</div>
			</div>

			<div className={`d-flex small text-muted ${props.away ? 'ms-4' : 'justify-content-end me-4'}`}>
				{assisters.map((assister, index) => (
					<Score
						key={index}
						last={index !== 0}
						player={assister}
						pickedBy={
							props.players?.find((p) => p.id === assister.player.id)?.picker
						}
					/>
				))}
			</div>
		</div>
	)
}

export default Play
