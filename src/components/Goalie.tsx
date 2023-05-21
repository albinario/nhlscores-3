import { IGameDetailsPlayer, ITeam } from '../interfaces'
import { logos } from '../util/config'

interface IProps {
	player: IGameDetailsPlayer
	team: ITeam
	pickedBy?: string
}

const Goalie: React.FC<IProps> = (props) => {
	const stats = props.player.stats.goalieStats

	return (
		<tr>
			<td className='px-1 py-0'><img src={`${logos}/${props.team.id}.svg`} alt={props.team.name} /></td>
			<td className={`text-start ps-1 pe-0 py-0 ${props.pickedBy}`}>
				<span className='small'>{props.player.jerseyNumber}</span>
				<span className='d-none d-sm-inline'> {props.player.person.fullName}</span>
				<span className='d-sm-none'> {props.player.person.fullName.split(' ')[1]}</span>
				<span className='text-nowrap'> {(stats.decision) && `(${stats.decision})`}{(props.pickedBy) && ' '+props.pickedBy}</span>
			</td>
			<td className='px-1 py-0'>{stats.saves}/{stats.shots}</td>
			<td className='px-1 py-0'>{stats.savePercentage.toFixed(2)}</td>
			<td className='px-1 py-0'>{stats.powerPlayShotsAgainst-stats.powerPlaySaves}</td>
			<td className='px-1 py-0'>{stats.goals}</td>
			<td className='px-1 py-0'>{stats.assists}</td>
			<td className='px-1 py-0'>{stats.pim}</td>
			<td className='px-1 py-0'>{stats.timeOnIce}</td>
		</tr>
	)
}

export default Goalie
