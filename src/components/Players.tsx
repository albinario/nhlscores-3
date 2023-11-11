import Goalies from './Goalies'
import Skaters from './Skaters'
import Row from 'react-bootstrap/Row'
import type { GameBoxscoreTeam, PlayerPicked } from '../types'

interface IProps {
	playersAway: GameBoxscoreTeam
	playersHome: GameBoxscoreTeam
	playersPicked?: PlayerPicked[]
	teamAbbrevAway: string
	teamAbbrevHome: string
}

const Players: React.FC<IProps> = (props) => (
	<>
		<Goalies
			goaliesAway={props.playersAway.goalies}
			goaliesHome={props.playersHome.goalies}
			playersPicked={props.playersPicked?.filter((player) => player.pos === 'G')}
			teamAbbrevAway={props.teamAbbrevAway}
			teamAbbrevHome={props.teamAbbrevHome}
		/>
		{/* <Row xs={1} md={2}>
			<Skaters
				team={props.playersAway}
				players={props.playersPicked?.filter(
					(player) => player.teamAbbrev === props.teamAbbrevAway
				)}
			/>
			<Skaters
				team={props.playersHome}
				players={props.playersPicked?.filter(
					(player) => player.teamAbbrev === props.teamAbbrevHome
				)}
			/>
		</Row> */}
	</>
)

export default Players
