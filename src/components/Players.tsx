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

const Players: React.FC<IProps> = ({
	playersAway,
	playersHome,
	playersPicked,
	teamAbbrevAway,
	teamAbbrevHome,
}) => (
	<>
		<Goalies
			goaliesAway={playersAway.goalies}
			goaliesHome={playersHome.goalies}
			playersPicked={playersPicked?.filter((player) => player.pos === 'G')}
			teamAbbrevAway={teamAbbrevAway}
			teamAbbrevHome={teamAbbrevHome}
		/>
		<Row xs={1} md={2}>
			<Skaters
				defenders={playersAway.defense}
				forwards={playersAway.forwards}
				playersPicked={playersPicked?.filter(
					(player) => player.teamAbbrev === teamAbbrevAway
				)}
				teamAbbrev={teamAbbrevAway}
			/>
			<Skaters
				defenders={playersHome.defense}
				forwards={playersHome.forwards}
				playersPicked={playersPicked?.filter(
					(player) => player.teamAbbrev === teamAbbrevHome
				)}
				teamAbbrev={teamAbbrevHome}
			/>
		</Row>
	</>
)

export default Players
