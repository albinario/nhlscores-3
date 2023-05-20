import { IPlayPlayer, IPlayer } from '../interfaces'

interface IProps {
	player: IPlayPlayer
	pickedBy?: IPlayer
}

const Score: React.FC<IProps> = (props) => {
	return (
		<span className={`text-nowrap ${props.player.playerType === 'Assist' && 'small'} ${props.pickedBy?.picker}`}>
			{props.player.player.fullName} {props.player.seasonTotal}
			{(props.pickedBy) && ' '+props.pickedBy?.picker}
		</span>
	)
}

export default Score
