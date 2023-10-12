import { getLogo } from '../helpers/getLogo'
import type { Team } from '../types'

interface IProps {
	team: Team
}

const Logo: React.FC<IProps> = (props) => (
	<img
		src={getLogo(props.team.id)}
		alt={props.team.name}
	/>
)

export default Logo
