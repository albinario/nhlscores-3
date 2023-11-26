import Scorer from './Scorer'
import { getGoalTypes } from '../helpers/getGoalTypes'
import { getLogoUrl } from '../helpers/getLogoUrl'
import Image from 'react-bootstrap/Image'
import type { Goal as TGoal, PlayerPicked } from '../types'

interface IProps {
	away: boolean
	goal: TGoal
	losingScore: number
	players?: PlayerPicked[]
	winningGoalScorerId?: number
}

const Goal: React.FC<IProps> = ({
	away,
	goal,
	losingScore,
	players,
	winningGoalScorerId,
}) => {
	const gameWinner =
		goal.playerId === winningGoalScorerId &&
		(goal.awayScore === losingScore + 1 || goal.homeScore === losingScore + 1)

	const goalTypes = getGoalTypes(goal, gameWinner)

	return (
		<div className='mb-2'>
			<div className={`d-flex ${!away && 'flex-row-reverse'}`}>
				<Image
					className={away ? 'me-1' : 'ms-1'}
					src={getLogoUrl(goal.teamAbbrev)}
				/>

				<div className={away ? 'me-1' : 'ms-1'}>
					{goal.awayScore}-{goal.homeScore}
				</div>
				<div className={`text-muted ${away ? 'me-1' : 'ms-1'}`}>
					{goal.timeInPeriod}
				</div>

				<div>
					<Scorer
						name={goal.firstName + ' ' + goal.lastName}
						pickedBy={
							players?.find((player) => player.id === goal.playerId)?.picker
						}
						toDate={goal.goalsToDate}
					/>
					{!!goalTypes.length && (
						<span className='small text-muted fst-italic ms-1'>
							{goalTypes.map((goalType) => goalType).join(' ')}
						</span>
					)}
				</div>
			</div>

			<div
				className={`d-flex small text-muted ${
					away ? 'ms-4' : 'justify-content-end me-4'
				}`}
			>
				{goal.assists.map((assist, index) => (
					<Scorer
						key={index}
						last={index !== 0}
						name={assist.firstName + ' ' + assist.lastName}
						toDate={assist.assistsToDate}
						pickedBy={
							players?.find((player) => player.id === assist.playerId)?.picker
						}
					/>
				))}
			</div>
		</div>
	)
}

export default Goal
