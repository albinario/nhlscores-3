import { getLogoUrl } from '../helpers/getLogoUrl'
import { Image } from 'react-bootstrap'
import type { GoalieStats } from '../types'

interface IProps {
	goalie: GoalieStats
	teamAbbrev: string
	pickedBy?: string
}

const Goalie: React.FC<IProps> = (props) =>
	props.goalie.toi !== '00:00' ? (
		<tr className={props.pickedBy}>
			<td className='text-start'>
				<Image src={getLogoUrl(props.teamAbbrev)} />
			</td>
			<td className='text-start'>
				<span className='small'>{props.goalie.sweaterNumber} </span>
				{props.goalie.name.default} {}
				{props.pickedBy && props.pickedBy}
			</td>
			<td>{props.goalie.saveShotsAgainst}</td>
			<td>{(Number(props.goalie.savePctg) * 100).toFixed(2)}</td>
			<td>{props.goalie.powerPlayGoalsAgainst}</td>
			<td>{props.goalie.pim}</td>
			<td className='text-end'>{props.goalie.toi}</td>
		</tr>
	) : (
		<></>
	)

export default Goalie
