import type { PlayPlayer } from '../types'

interface IProps {
	first?: boolean
	player: PlayPlayer
	pickedBy?: string
}

const Score: React.FC<IProps> = (props) => (
	<span className={`text-nowrap ${props.pickedBy}`}>
		{props.player.player.fullName} ({props.player.seasonTotal})
		{props.pickedBy && ' ' + props.pickedBy}
		{props.first && ', '}
	</span>
)

export default Score
