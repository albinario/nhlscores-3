import Goal from './Goal'
import { getPeriodType } from '../helpers/getPeriodType'
import type { PlayerPicked, Scoring } from '../types'

interface IProps {
	playersPicked?: PlayerPicked[]
	scoring: Scoring
	teamAbbrevAway: string
}

const Scoring: React.FC<IProps> = ({
	playersPicked,
	scoring,
	teamAbbrevAway,
}) => (
	<div className='period mb-1'>
		<div className='d-flex justify-content-center small text-muted'>
			{getPeriodType(scoring.periodDescriptor)}
		</div>
		{scoring.goals.map((goal, index) => (
			<Goal
				key={index}
				away={goal.teamAbbrev === teamAbbrevAway}
				goal={goal}
				players={playersPicked}
			/>
		))}
	</div>
)

export default Scoring
