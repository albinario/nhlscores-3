import Goalie from './Goalie'
import type { GameDetailsTeam } from '../types'

interface IProps {
	teamAway: GameDetailsTeam
	teamHome: GameDetailsTeam
	// playersPicked?: IPlayer[]
}

const Goalies: React.FC<IProps> = (props) => {
	return (
		<section id='goalies'>
			<table className='table table-sm table-borderless small text-center'>
				<thead>
					<tr>
						<th colSpan={2}></th>
						<th className='py-0 px-1'>Saves</th>
						<th className='py-0 px-1'>%</th>
						<th className='py-0 px-1'>PP</th>
						<th className='py-0 px-1'>G</th>
						<th className='py-0 px-1'>A</th>
						<th className='py-0 px-1'>PIM</th>
						<th className='py-0 px-1'>TOI</th>
					</tr>
				</thead>
				<tbody>
					{props.teamAway.goalies.map((playerId, index) => (
						<Goalie
							key={index}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							player={props.teamAway.players['ID'+playerId as any]}
							team={props.teamAway.team}
							// pickedBy={props.playersPicked?.find(player => player.id === playerId)?.picker}
						/>
					))}
					{props.teamHome.goalies.map((playerId, index) => (
						<Goalie
							key={index}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							player={props.teamHome.players['ID'+playerId as any]}
							team={props.teamHome.team}
							// pickedBy={props.playersPicked?.find(player => player.id === playerId)?.picker}
						/>
					))}
				</tbody>
			</table>
		</section>
	)
}

export default Goalies
