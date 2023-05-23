import { IGameDetailsTeam, IPlayer } from '../interfaces'
import { logos } from '../util/config'
import Skater from './Skater'

interface IProps {
	team: IGameDetailsTeam
	playersPicked: IPlayer[]
}

const Skaters: React.FC<IProps> = (props) => {
	return (
		<div className='col-12 col-lg-6'>
			<table className='table table-sm table-borderless small text-center'>
				<thead>
					<tr>
						<th className='text-start'><img src={`${logos}/${props.team.team.id}.svg`} alt={props.team.team.name} /></th>
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
							player={props.team.players['ID'+playerId as any]}
							pickedBy={props.playersPicked.find(player => player.id === playerId)?.picker}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Skaters
