import type { PlayPlayer } from '../types'

interface IProps {
	last?: boolean
	player: PlayPlayer
	pickedBy?: string
}

const Score: React.FC<IProps> = (props) => (
	<span className='text-nowrap'>
		{props.last && ', '}
		<span className={props.pickedBy}>
			{props.player.player.fullName} ({props.player.seasonTotal})
			{props.pickedBy && ' ' + props.pickedBy}
		</span>
	</span>
)

export default Score
