import { getLogo } from '../helpers/getLogo'
import { ITeam } from '../interfaces'

interface IProps {
	team: ITeam
}

const Logo: React.FC<IProps> = (props) => (
	<img
		src={getLogo(props.team.id)}
		alt={props.team.name}
	/>
)

export default Logo
