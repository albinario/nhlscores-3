interface IProps {
	last?: boolean
	name: string
	pickedBy?: string
	toDate: number
}

const Scorer: React.FC<IProps> = ({ last, name, pickedBy, toDate }) => (
	<span className='text-nowrap'>
		{last && ', '}
		<span className={pickedBy}>
			{name} ({toDate}){pickedBy && ' ' + pickedBy}
		</span>
	</span>
)

export default Scorer
