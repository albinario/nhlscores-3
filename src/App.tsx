import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Game} from './types'
import { dateFormat, nhlApi } from './util/config'
import GameCard from './components/GameCard'
import moment from 'moment'

const App = () => {
	const [date, setDate] = useState(moment().subtract(1, 'days').format(dateFormat))
	const [dateTitle, setDateTitle] = useState('Loading...')
	const [games, setGames] = useState<Game[]>([])
	const [showResults, setShowResults] = useState(false)
	
	useEffect(() => {
		fetch(`${nhlApi}/schedule?date=${date}`)
			.then(res => res.json())
			.then(games => games.totalGames ? setGames(games.dates[0].games) : setGames([]))
			.catch(err => console.error(err))
		getDateTitle()
	}, [date])

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

	const showResultsToggle = () => {
		setShowResults(!showResults)
	}
	
	return(
		<>
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
					<GameCard
						key={index}
						game={game}
						showResults={showResults}
					/>
				))}
				{!games.length && (
					<div
						className='alert alert-secondary'
						role='alert'
					>No games on this day</div>
				)}
			</div>

			<div className='form-check form-switch mt-4'>
				<input
					className='form-check-input'
					type='checkbox'
					role='switch'
					id='flexSwitchCheckDefault'
					onChange={showResultsToggle}
				/>
				<label className='form-check-label'>
					Show results
				</label>
			</div>
		</>
	)
}

export default App
