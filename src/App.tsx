import Footer from './components/Footer'
import Games from './components/Games'
import Header from './components/Header'
import './App.css'
import { useGetGames } from './hooks/useGetGames'
import moment from 'moment'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

const App = () => {
	const dateFormat = 'YYYY-MM-DD'

	const [date, setDate] = useState(
		moment().subtract(1, 'days').format(dateFormat)
	)

	const games = useGetGames(date)

	const dateDecrease = () => {
		setDate(moment(date).subtract(1, 'days').format(dateFormat))
	}
	const dateIncrease = () => {
		setDate(moment(date).add(1, 'days').format(dateFormat))
	}

	return (
		<Container className='d-flex flex-column justify-content-between'>
			<div>
				<Header
					date={date}
					dateFormat={dateFormat}
					dateDecrease={dateDecrease}
					dateIncrease={dateIncrease}
				/>

				{games.isError && <Alert variant='warning'>Error loading games</Alert>}

				{!games.isFetching && !games.isError && !games.data?.length && (
					<Alert variant='secondary'>No games on this day</Alert>
				)}

				{!games.isError && !!games.data?.length && <Games games={games.data} />}
			</div>

			<Footer />
		</Container>
	)
}

export default App
