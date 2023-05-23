import { IGameDetailsPlayer } from '../interfaces'

interface IProps {
	player: IGameDetailsPlayer
	pickedBy?: string
}

const Skater: React.FC<IProps> = (props) => {
	const fullName = props.player.person.fullName
	const namesAmount = fullName.split(' ').length
	const lastName = fullName.split(' ')[namesAmount-1]

	const stats = props.player.stats.skaterStats

	if (!stats) {	
		if (props.pickedBy) {
			return (
				<tr className={props.pickedBy}>
					<td className='text-start'>
						<span className='small'>{props.player.jerseyNumber} </span>
						<span className='d-none d-sm-inline'>{fullName}</span>
						<span className='d-sm-none'>{lastName}</span>
						{props.pickedBy && <span className={`badge ${props.pickedBy}`}>{props.pickedBy}</span>}
					</td>
				</tr>
			)
		} else {
			return (
				<></>
			)
		}
	}

	return (
		<tr className={props.pickedBy}>
			<td className='text-start'>
				<span className='small'>{props.player.jerseyNumber} </span>
				<span className='d-none d-sm-inline'>{fullName}</span>
				<span className='d-sm-none'>{lastName}</span>
				{props.pickedBy && <span className={`badge ${props.pickedBy}`}>{props.pickedBy}</span>}
			</td>
			<td>{stats.goals}</td>
			<td>{stats.assists}</td>
			<td>{(stats.plusMinus > 0 && '+')}{stats.plusMinus}</td>
			<td>{stats.shots}</td>
			<td>{stats.penaltyMinutes}</td>
			<td>{stats.hits}</td>
			<td>{stats.blocked}</td>
			<td>{stats.timeOnIce} | {stats.powerPlayTimeOnIce} | {stats.shortHandedTimeOnIce}</td>
		</tr>
	)
}

export default Skater
