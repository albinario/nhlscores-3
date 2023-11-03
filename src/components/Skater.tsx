import type { GameDetailsPlayer } from '../types'

interface IProps {
	player: GameDetailsPlayer
	pickedBy?: string
}

const Skater: React.FC<IProps> = (props) => {
	const fullName = props.player.person.fullName
	const namesAmount = fullName.split(' ').length
	const lastName = fullName.split(' ')[namesAmount - 1]

	const stats = props.player.stats.skaterStats

	return (
		<tr className={props.pickedBy}>
			<td className='text-start'>
				{props.player.jerseyNumber}
				<span className='d-none d-sm-inline'> {fullName} </span>
				<span className='d-sm-none'> {lastName} </span>
				{props.pickedBy && props.pickedBy}
			</td>
			{stats && (
				<>
					<td>{stats.goals}</td>
					<td>{stats.assists}</td>
					<td>
						{stats.plusMinus > 0 && '+'}
						{stats.plusMinus}
					</td>
					<td>{stats.shots}</td>
					<td>{stats.penaltyMinutes}</td>
					<td>{stats.hits}</td>
					<td>{stats.blocked}</td>
					<td className='text-end'>
						{stats.timeOnIce} | {stats.powerPlayTimeOnIce} |{' '}
						{stats.shortHandedTimeOnIce}
					</td>
				</>
			)}
		</tr>
	)
}

export default Skater
