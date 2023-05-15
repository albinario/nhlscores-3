import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import moment from 'moment'
import { IGame, IPlayer } from './interfaces'
import { dateFormat, nhlApi, tradesApi } from './util/config'
import Game from './components/Game'

const App = () => {
	const [date, setDate] = useState(moment().subtract(1, 'days').format(dateFormat))
	const [dateTitle, setDateTitle] = useState('Loading...')
	const [games, setGames] = useState<IGame[]>([])
	const [players, setPlayers] = useState<IPlayer[]>([])

	useEffect(() => {
		fetch(`${nhlApi}/schedule?date=${date}`)
			.then(res => res.json())
			.then(games => (games.dates.length) ? setGames(games.dates[0].games) : setGames([]))
			.catch(err => console.error(err))
		getDateTitle()
	}, [date])

	useEffect(() => {
		fetch(`${tradesApi}/players`)
			.then(res => res.json())
			.then(players => setPlayers(players.data.filter((player: IPlayer) => player.picker !== '')))
			.catch(err => console.error(err))
	}, [])	

	const getDateTitle = () => {
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
	}

	const dateDecrease = () => {
		setDate(moment(date).subtract(1, 'days').format(dateFormat))
	}
	const dateIncrease = () => {
		setDate(moment(date).add(1, 'days').format(dateFormat))
	}

	return(
		<div className='row g-2'>
			<div className='d-flex justify-content-between align-items-center my-3'>
				<button
					className='btn'
					onClick={dateDecrease}
				>
					<i className='bi bi-arrow-left-square'></i>
				</button>
				<div className='fs-4'>
					{dateTitle}
				</div>
				<button
					className='btn'
					onClick={dateIncrease}
				>
					<i className='bi bi-arrow-right-square'></i>
				</button>
			</div>
			{!!games.length && games.map((game, index) => (
				<Game
					key={index}
					game={game}
					playersPicked={players.filter(player => 
						player.team === game.teams.away.team.id || 
						player.team === game.teams.home.team.id	
					).sort((a, b) => a.jersey - b.jersey).sort((a,b) => a.picker.localeCompare(b.picker))}
				/>
			))}
			{!games.length && (
				<div
					className='alert alert-secondary'
					role='alert'
				>No games on this day</div>
			)}
		</div>
	)
}

export default App
