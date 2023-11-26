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
	winningGoalieId?: number
	winningGoalScorerId?: number
}

const Players: React.FC<IProps> = ({
	playersAway,
	playersHome,
	playersPicked,
	teamAbbrevAway,
	teamAbbrevHome,
	winningGoalieId,
	winningGoalScorerId,
}) => (
	<>
		<Goalies
			goaliesAway={playersAway.goalies}
			goaliesHome={playersHome.goalies}
			playersPicked={playersPicked?.filter((player) => player.pos === 'G')}
			teamAbbrevAway={teamAbbrevAway}
			teamAbbrevHome={teamAbbrevHome}
			winningGoalieId={winningGoalieId}
		/>
		<Row xs={1} md={2}>
			<Skaters
				defenders={playersAway.defense}
				forwards={playersAway.forwards}
				playersPicked={playersPicked?.filter(
					(player) => player.teamAbbrev === teamAbbrevAway
				)}
				teamAbbrev={teamAbbrevAway}
				winningGoalScorerId={winningGoalScorerId}
			/>
			<Skaters
				defenders={playersHome.defense}
				forwards={playersHome.forwards}
				playersPicked={playersPicked?.filter(
					(player) => player.teamAbbrev === teamAbbrevHome
				)}
				teamAbbrev={teamAbbrevHome}
				winningGoalScorerId={winningGoalScorerId}
			/>
		</Row>
	</>
)

export default Players
