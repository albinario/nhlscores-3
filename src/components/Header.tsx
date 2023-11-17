import Fetching from './Fetching'
import getDateTitle from '../helpers/getDateTitle'
import { Next, Previous } from '../icons'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

interface IProps {
	date: string
	dateFormat: string
	dateDecrease: () => void
	dateIncrease: () => void
}

const Header: React.FC<IProps> = ({
	date,
	dateFormat,
	dateDecrease,
	dateIncrease,
}) => {
	const [dateTitle, setDateTitle] = useState('')

	useEffect(() => {
		setDateTitle(getDateTitle(date, dateFormat))
	}, [date, dateFormat])

	return (
		<header className='d-flex justify-content-between align-items-center my-1 position-relative'>
			<Button className='ps-0' onClick={dateDecrease}>
				<Previous />
			</Button>

			<div className='fs-5 opacity-75'>{dateTitle}</div>

			<Button className='pe-0' onClick={dateIncrease}>
				<Next />
			</Button>

			<Fetching />
		</header>
	)
}

export default Header
