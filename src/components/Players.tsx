import Goalies from './Goalies'
import Skaters from './Skaters'
import Row from 'react-bootstrap/Row'
import type { GameDetailsTeam, PlayerPicked } from '../types'

interface IProps {
	teamAway: GameDetailsTeam
	teamHome: GameDetailsTeam
	players?: PlayerPicked[]
}

const Players: React.FC<IProps> = (props) => (
	<section id='players'>
		<Goalies
			teamAway={props.teamAway}
			teamHome={props.teamHome}
			players={props.players?.filter((player) => player.pos === 'G')}
		/>
		<Row xs={1} md={2}>
			<Skaters
				team={props.teamAway}
				players={props.players?.filter(
					(player) => player.team === props.teamAway.team.id
				)}
			/>
			<Skaters
				team={props.teamHome}
				players={props.players?.filter(
					(player) => player.team === props.teamHome.team.id
				)}
			/>
		</Row>
	</section>
)

export default Players
