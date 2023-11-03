import Logo from './Logo'
import Skater from './Skater'
import Table from 'react-bootstrap/Table'
import type { GameDetailsTeam, Player } from '../types'

interface IProps {
	team: GameDetailsTeam
	players?: Player[]
}

const Skaters: React.FC<IProps> = (props) => (
	<div className='col-12 col-lg-6'>
		<Table borderless className='small text-center' size='sm'>
			<thead>
				<tr>
					<th className='text-start ps-0'>
						<Logo team={props.team.team} />
					</th>
					<th>G</th>
					<th>A</th>
					<th>+/-</th>
					<th>S</th>
					<th>PIM</th>
					<th>H</th>
					<th>B</th>
					<th className='text-end'>TOI | PP | SH </th>
				</tr>
			</thead>
			<tbody>
				{props.team.skaters.map((playerId, index) => (
					<Skater
						key={index}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						player={props.team.players[('ID' + playerId) as any]}
						pickedBy={
							props.players?.find((player) => player.id === playerId)?.picker
						}
					/>
				))}
			</tbody>
		</Table>
	</div>
)

export default Skaters
