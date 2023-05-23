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
	const [gamesError, setGamesError] = useState('')
	const [gamesLoading, setGamesLoading] = useState(true)
	const [players, setPlayers] = useState<IPlayer[]>([])
	const [playersError, setPlayersError] = useState('')
	const [playersLoading, setPlayersLoading] = useState(true)

	useEffect(() => {
		setGamesLoading(true)
		const fetchData = async () => {
			const res = await fetch(`${nhlApi}/schedule?date=${date}`)
			if (!res.ok) {
				setGamesError("Failed to load games")
				setGamesLoading(false)
				return
			}
			const games = await res.json()
			if (games.dates.length) {
				setGames(games.dates[0].games)
			} else {
				setGames([])
			}
			setGamesError('')
			setGamesLoading(false)
		}
		fetchData()
		getDateTitle()
	}, [date])

	useEffect(() => {
		setPlayersLoading(true)
		const fetchData = async () => {
			const res = await fetch(tradesApi)
			if (!res.ok) {
				setPlayersLoading(false)
				setPlayersError("Failed to load players")
				return
			}
			const players = await res.json()
			setPlayers(players.data.filter((player: IPlayer) => player.picker))
			setPlayersError('')
			setPlayersLoading(false)
		}
		fetchData()
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

				{(gamesLoading || playersLoading) && (
					<div className='spinner-border spinner-border-sm text-seconus opacity-50 position-absolute end-0 me-5 fs-6'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				)}
			</header>

			{gamesError && (
				<div className='col-12'>
					<div className='alert alert-secondary' role='alert'>{gamesError}</div>
				</div>
			)}

			{!games.length && (
				<div className='col-12'>
					<div className='alert alert-secondary' role='alert'>No games on this day</div>
				</div>
			)}

			{!gamesError && !!games.length && (
				<section id='games' className='row g-1'>
					{games.map((game, index) => (
						<Game
							key={index}
							game={game}
							playersPicked={players.filter(player => 
								player.team === game.teams.away.team.id || 
								player.team === game.teams.home.team.id	
							).sort((a, b) => a.jersey - b.jersey).sort((a,b) => a.picker.localeCompare(b.picker))}
						/>
					))}

					{playersError && (
						<div className='col-12'>
							<div className='alert alert-warning' role='alert'>{playersError}</div>
						</div>
					)}
				</section>
			)}
		</>
	)
}

export default App
