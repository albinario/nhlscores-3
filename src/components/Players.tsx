import { IGameDetailsTeam, IPlayer } from "../interfaces"
import Goalies from "./Goalies"

interface IProps {
	teamAway: IGameDetailsTeam
	teamHome: IGameDetailsTeam
	playersPicked: IPlayer[]
}

const Players: React.FC<IProps> = (props) => {
	return (
		<Goalies
			teamAway={props.teamAway}
			teamHome={props.teamHome}
			playersPicked={props.playersPicked}
		/>
	)
}

export default Players
