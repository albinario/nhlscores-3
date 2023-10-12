import Fetching from './components/Fetching'
import Game from './components/Game'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import useGetGames from './hooks/useGetGames'
import useGetPlayers from './hooks/useGetPlayers'
import moment from 'moment'
import { useEffect, useState } from 'react'

const App = () => {
	const dateFormat = 'YYYY-MM-DD'

	const [date, setDate] = useState(moment().subtract(1, 'days').format(dateFormat))
	const [dateTitle, setDateTitle] = useState('')

	const games = useGetGames(date)
	const players = useGetPlayers()

	const dateDecrease = () => {
		setDate(moment(date).subtract(1, 'days').format(dateFormat))
	}
	const dateIncrease = () => {
		setDate(moment(date).add(1, 'days').format(dateFormat))
	}

	useEffect(() => {
		switch (date) {
			case moment(new Date()).format(dateFormat) :
				setDateTitle('Tonight')
				break
			case moment(new Date()).add(1, 'days').format(dateFormat) :
				setDateTitle('Tomorrow night')
				break
			case moment(new Date()).subtract(1, 'days').format(dateFormat) :
				setDateTitle('Last night')
				break
			default :
				setDateTitle(date)
				break
		}
	}, [date])

	return(
		<>
			<header className='d-flex justify-content-between align-items-center position-relative'>
				<button className='ps-0' onClick={dateDecrease}>
					<i className='bi bi-arrow-left-square'></i>
				</button>

				<div className='fs-5 opacity-50'>
					{dateTitle}
				</div>

				<button className='pe-0' onClick={dateIncrease}>
					<i className='bi bi-arrow-right-square'></i>
				</button>

				<Fetching />

			</header>

			{games.isError && (
				<div className='col-12'>
					<div className='alert alert-secondary' role='alert'>Games error</div>
				</div>
			)}

			{players.isError && (
				<div className='col-12'>
					<div className='alert alert-secondary' role='alert'>Players error</div>
				</div>
			)}

			{!games.data?.length && (
				<div className='col-12'>
					<div className='alert alert-secondary' role='alert'>No games on this day</div>
				</div>
			)}

			{!games.isError && !!games.data?.length && (
				<section id='games' className='row g-1'>
					{games.data.map((game, index) => (
						<Game
							key={index}
							game={game}
							// playersPicked={players.data?.filter(player => 
							// 	player.team === game.teams.away.team.id || 
							// 	player.team === game.teams.home.team.id	
							// ).sort((a, b) => a.jersey - b.jersey).sort((a,b) => a.picker.localeCompare(b.picker))}
						/>
					))}
				</section>
			)}
		</>
	)
}

export default App
