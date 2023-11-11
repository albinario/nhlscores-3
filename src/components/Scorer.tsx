interface IProps {
	last?: boolean
	name: string
	pickedBy?: string
	toDate: number
}

const Scorer: React.FC<IProps> = (props) => (
	<span className='text-nowrap'>
		{props.last && ', '}
		<span className={props.pickedBy}>
			{props.name} ({props.toDate})
			{props.pickedBy && ' ' + props.pickedBy}
		</span>
	</span>
)

export default Scorer
