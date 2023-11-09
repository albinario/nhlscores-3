import Logo from './Logo'
import Skater from './Skater'
import Table from 'react-bootstrap/Table'
import type { GameDetailsTeam, PlayerPicked } from '../types'
import { Col } from 'react-bootstrap'

interface IProps {
	team: GameDetailsTeam
	players?: PlayerPicked[]
}

const Skaters: React.FC<IProps> = (props) => (
	<Col>
		<Table borderless className='small text-center' size='sm'>
			<thead>
				<tr>
					<th className='ps-0 text-start'>
						<Logo team={props.team.team} />
					</th>
					<th>G</th>
					<th>A</th>
					<th>+/-</th>
					<th>S</th>
					<th>PIM</th>
					<th>H</th>
					<th>B</th>
					<th className='pe-0 text-end'>TOI | PP | SH </th>
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
	</Col>
)

export default Skaters
