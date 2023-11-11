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
			playersPicked={props.playersPicked?.filter(
				(player) => player.pos === 'G'
			)}
			teamAbbrevAway={props.teamAbbrevAway}
			teamAbbrevHome={props.teamAbbrevHome}
		/>
		<Row xs={1} md={2}>
			<Skaters
				defenders={props.playersAway.defense}
				forwards={props.playersAway.forwards}
				playersPicked={props.playersPicked?.filter(
					(player) => player.teamAbbrev === props.teamAbbrevAway
				)}
				teamAbbrev={props.teamAbbrevAway}
			/>
			<Skaters
				defenders={props.playersHome.defense}
				forwards={props.playersHome.forwards}
				playersPicked={props.playersPicked?.filter(
					(player) => player.teamAbbrev === props.teamAbbrevHome
				)}
				teamAbbrev={props.teamAbbrevHome}
			/>
		</Row>
	</>
)

export default Players
