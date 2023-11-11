import Skater from './Skater'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import type { PlayerPicked, SkaterStats } from '../types'
import { getLogoUrl } from '../helpers/getLogoUrl'

interface IProps {
	defenders: SkaterStats[]
	forwards: SkaterStats[]
	playersPicked?: PlayerPicked[]
	teamAbbrev: string
}

const Skaters: React.FC<IProps> = (props) => (
	<Col>
		<Table borderless className='small text-center' size='sm'>
			<thead>
				<tr>
					<th className='ps-0 text-start'>
						<Image src={getLogoUrl(props.teamAbbrev)} />
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
				{props.defenders
					.concat(props.forwards)
					.sort((a, b) => a.sweaterNumber - b.sweaterNumber)
					.map((skater) => (
						<Skater
							key={skater.playerId}
							pickedBy={
								props.playersPicked?.find(
									(player) => player.id === skater.playerId
								)?.picker
							}
							skater={skater}
						/>
					))}
			</tbody>
		</Table>
	</Col>
)

export default Skaters
