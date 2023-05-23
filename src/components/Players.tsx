import { IGameDetailsTeam, IPlayer } from "../interfaces"
import Goalies from "./Goalies"
import Skaters from "./Skaters"

interface IProps {
	teamAway: IGameDetailsTeam
	teamHome: IGameDetailsTeam
	playersPicked: IPlayer[]
}

const Players: React.FC<IProps> = (props) => {
	return (
		<section id="players">
			<Goalies
				teamAway={props.teamAway}
				teamHome={props.teamHome}
				playersPicked={props.playersPicked}
			/>
			<Skaters
				team={props.teamAway}
				playersPicked={props.playersPicked.filter(player => player.team === props.teamAway.team.id)}
				/>
			<Skaters
				team={props.teamHome}
				playersPicked={props.playersPicked.filter(player => player.team === props.teamHome.team.id)}
			/>
		</section>
	)
}

export default Players
