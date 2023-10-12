import Logo from './Logo'
import Skater from './Skater'
import type { GameDetailsTeam } from '../types'

interface IProps {
	team: GameDetailsTeam
	// playersPicked?: IPlayer[]
}

const Skaters: React.FC<IProps> = (props) => (
	<div className='col-12 col-lg-6'>
		<table className='table table-sm table-borderless small text-center'>
			<thead>
				<tr>
					<th className='text-start'><Logo team={props.team.team} /></th>
					<th>G</th>
					<th>A</th>
					<th>+/-</th>
					<th>S</th>
					<th>PIM</th>
					<th>H</th>
					<th>B</th>
					<th>TOI | PP | SH </th>
				</tr>
			</thead>
			<tbody>
				{props.team.skaters.map((playerId, index) => (
					<Skater
						key={index}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						player={props.team.players['ID'+playerId as any]}
						// pickedBy={props.playersPicked?.find(player => player.id === playerId)?.picker}
					/>
				))}
			</tbody>
		</table>
	</div>
)


export default Skaters
