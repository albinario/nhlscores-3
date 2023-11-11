import classNames from 'classnames'
import type { SkaterStats } from '../types'

interface IProps {
	skater: SkaterStats
	pickedBy?: string
}

const Skater: React.FC<IProps> = ({ skater, pickedBy }) => {
	const plusMinusClass = classNames({
		'text-danger': skater.plusMinus < 0,
		'text-muted': skater.plusMinus === 0,
		'text-success': skater.plusMinus > 0,
	})

	return (
		<tr className={pickedBy}>
			<td className='text-start'>
				<span className='small'>{skater.sweaterNumber} </span>
				{skater.name.default}
				{pickedBy && <span className='small'> {pickedBy}</span>}
			</td>
			<td>{skater.goals}</td>
			<td>{skater.assists}</td>
			<td className={plusMinusClass}>
				{skater.plusMinus > 0 && '+'}
				{skater.plusMinus}
			</td>
			<td>{skater.shots}</td>
			<td>{skater.pim}</td>
			<td>{skater.hits}</td>
			<td>{skater.blockedShots}</td>
			<td className='text-end'>
				{skater.toi} | {skater.powerPlayToi} | {skater.shorthandedToi}
			</td>
		</tr>
	)
}

export default Skater
