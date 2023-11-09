import Goalie from './Goalie'
import Table from 'react-bootstrap/Table'
import type { GameDetailsTeam, PlayerPicked } from '../types'

interface IProps {
	teamAway: GameDetailsTeam
	teamHome: GameDetailsTeam
	players?: PlayerPicked[]
}

const Goalies: React.FC<IProps> = (props) => (
	<section id='goalies'>
		<Table borderless className='small text-center' size='sm'>
			<thead>
				<tr>
					<th colSpan={2}></th>
					<th>Saves</th>
					<th>%</th>
					<th>PP</th>
					<th>G</th>
					<th>A</th>
					<th>PIM</th>
					<th className='pe-0 text-end'>TOI</th>
				</tr>
			</thead>
			<tbody>
				{props.teamAway.goalies.map((playerId, index) => (
					<Goalie
						key={index}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						player={props.teamAway.players[('ID' + playerId) as any]}
						team={props.teamAway.team}
						pickedBy={
							props.players?.find((player) => player.id === playerId)?.picker
						}
					/>
				))}
				{props.teamHome.goalies.map((playerId, index) => (
					<Goalie
						key={index}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						player={props.teamHome.players[('ID' + playerId) as any]}
						team={props.teamHome.team}
						pickedBy={
							props.players?.find((player) => player.id === playerId)?.picker
						}
					/>
				))}
			</tbody>
		</Table>
	</section>
)

export default Goalies
