import classNames from 'classnames'
import type { SkaterStats } from '../types'

interface IProps {
	skater: SkaterStats
	pickedBy?: string
	winningGoalScorer: boolean
}

const Skater: React.FC<IProps> = ({ skater, pickedBy, winningGoalScorer }) => {
	const plusMinus = classNames({
		'text-danger': skater.plusMinus < 0,
		'text-muted': skater.plusMinus === 0,
		'text-success': skater.plusMinus > 0,
	})

	const fullName = skater.name.default
	const lastName = fullName.split(' ').pop()

	return (
		<tr className={pickedBy}>
			<td className='text-start text-nowrap'>
				<span className='small me-1'>{skater.sweaterNumber}</span>
				<span className='d-none d-sm-inline'>{fullName}</span>
				<span className='d-sm-none'>{lastName}</span>
				{pickedBy && <span className='small'> {pickedBy}</span>}
			</td>
			<td>
				{skater.goals}
				{winningGoalScorer && '*'}
			</td>
			<td>{skater.assists}</td>
			<td className={plusMinus}>
				{skater.plusMinus > 0 && '+'}
				{skater.plusMinus}
			</td>
			<td>{skater.shots}</td>
			<td>{skater.pim}</td>
			<td>{skater.hits}</td>
			<td>{skater.blockedShots}</td>
			<td className='text-end text-nowrap'>
				{skater.toi} | {skater.powerPlayToi} | {skater.shorthandedToi}
			</td>
		</tr>
	)
}

export default Skater
