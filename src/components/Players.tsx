import Goalies from './Goalies'
import Skaters from './Skaters'
import type { GameDetailsTeam, Player } from '../types'

interface IProps {
	teamAway: GameDetailsTeam
	teamHome: GameDetailsTeam
	players?: Player[]
}

const Players: React.FC<IProps> = (props) => (
	<section id='players'>
		<Goalies
			teamAway={props.teamAway}
			teamHome={props.teamHome}
			players={props.players?.filter(player => player.pos === 'G')}
		/>
		<section id='skaters' className='row'>
			<Skaters
				team={props.teamAway}
				players={props.players?.filter(player => player.team === props.teamAway.team.id)}
			/>
			<Skaters
				team={props.teamHome}
				players={props.players?.filter(player => player.team === props.teamHome.team.id)}
			/>
		</section>
	</section>
)

export default Players
