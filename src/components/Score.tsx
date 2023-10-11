import { IPlayPlayer } from '../interfaces'

interface IProps {
	player: IPlayPlayer
	pickedBy?: string
}

const Score: React.FC<IProps> = (props) => (
	<span className={`text-nowrap ${props.player.playerType === 'Assist' && 'small'} ${props.pickedBy}`}>
		{props.player.player.fullName} ({props.player.seasonTotal})
		{(props.pickedBy) && ' '+props.pickedBy}
	</span>
)

export default Score
