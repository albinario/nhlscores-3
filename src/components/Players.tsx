import Goalies from './Goalies'
import Skaters from './Skaters'
import type { GameDetailsTeam } from '../types'

interface IProps {
	teamAway: GameDetailsTeam
	teamHome: GameDetailsTeam
	// playersPicked?: IPlayer[]
}

const Players: React.FC<IProps> = (props) => (
	<section id='players'>
		<Goalies
			teamAway={props.teamAway}
			teamHome={props.teamHome}
			// playersPicked={props.playersPicked}
		/>
		<section id='skaters' className='row'>
			<Skaters
				team={props.teamAway}
				// playersPicked={props.playersPicked?.filter(player => player.team === props.teamAway.team.id)}
			/>
			<Skaters
				team={props.teamHome}
				// playersPicked={props.playersPicked?.filter(player => player.team === props.teamHome.team.id)}
			/>
		</section>
	</section>
)

export default Players
