import Logo from './Logo'
import type { GameDetailsPlayer, Team } from '../types'

interface IProps {
	player: GameDetailsPlayer
	team: Team
	pickedBy?: string
}

const Goalie: React.FC<IProps> = (props) => {
	const fullName = props.player.person.fullName
	const namesAmount = fullName.split(' ').length
	const lastName = fullName.split(' ')[namesAmount-1]

	const stats = props.player.stats.goalieStats

	return (
		<tr className={props.pickedBy}>
			<td><Logo team={props.team} /></td>
			<td className='text-start'>
				<span className='small'>{props.player.jerseyNumber}</span>
				<span className='d-none d-sm-inline'> {fullName}</span>
				<span className='d-sm-none'> {lastName}</span>
				<span className='text-nowrap'> {(stats.decision) && `(${stats.decision})`}</span>
				{props.pickedBy && <span className={`badge ${props.pickedBy}`}>{props.pickedBy}</span>}
			</td>
			<td>{stats.saves}/{stats.shots}</td>
			<td>{stats.savePercentage && stats.savePercentage.toFixed(2)}</td>
			<td>{stats.powerPlayShotsAgainst-stats.powerPlaySaves}</td>
			<td>{stats.goals}</td>
			<td>{stats.assists}</td>
			<td>{stats.pim}</td>
			<td>{stats.timeOnIce}</td>
		</tr>
	)
}

export default Goalie
