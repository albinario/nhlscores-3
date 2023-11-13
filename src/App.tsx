import Fetching from './components/Fetching'
import Game from './components/Game'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useGetGames } from './hooks/useGetGames'
import { useGetPlayersPicked } from './hooks/useGetPlayersPicked'
import { useGetTeamRecords } from './hooks/useGetTeamRecords'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const App = () => {
	const dateFormat = 'YYYY-MM-DD'

	const [date, setDate] = useState(
		moment().subtract(1, 'days').format(dateFormat)
	)
	const [dateTitle, setDateTitle] = useState('')

	const games = useGetGames(date)
	const { data: playersPicked } = useGetPlayersPicked()
	const { data: teamRecords } = useGetTeamRecords()

	const dateDecrease = () => {
		setDate(moment(date).subtract(1, 'days').format(dateFormat))
	}
	const dateIncrease = () => {
		setDate(moment(date).add(1, 'days').format(dateFormat))
	}

	useEffect(() => {
		switch (date) {
			case moment(new Date()).format(dateFormat):
				setDateTitle('Tonight')
				break
			case moment(new Date()).add(1, 'days').format(dateFormat):
				setDateTitle('Tomorrow night')
				break
			case moment(new Date()).subtract(1, 'days').format(dateFormat):
				setDateTitle('Last night')
				break
			default:
				setDateTitle(date)
				break
		}
	}, [date])

	return (
		<Container>
			<header className='d-flex justify-content-between align-items-center position-relative'>
				<Button className='ps-0' onClick={dateDecrease}>
					<i className='bi bi-arrow-left-square'></i>
				</Button>

				<div className='fs-5 opacity-75'>{dateTitle}</div>

				<Button className='pe-0' onClick={dateIncrease}>
					<i className='bi bi-arrow-right-square'></i>
				</Button>

				<Fetching />
			</header>

			{games.isError && <Alert variant='warning'>Error loading games</Alert>}

			{!games.isFetching && !games.isError && !games.data?.length && (
				<Alert variant='secondary'>No games on this day</Alert>
			)}

			{!games.isError && !!games.data?.length && (
				<Row xs={1} className='g-2'>
					{games.data.map((game) => (
						<Game
							key={game.id}
							game={game}
							playersPicked={playersPicked?.filter(
								(player) =>
									player.teamAbbrev === game.awayTeam.abbrev ||
									player.teamAbbrev === game.homeTeam.abbrev
							)}
							teamRecordAway={teamRecords?.find(
								(team) => team.teamAbbrev.default === game.awayTeam.abbrev
							)}
							teamRecordHome={teamRecords?.find(
								(team) => team.teamAbbrev.default === game.homeTeam.abbrev
							)}
						/>
					))}
				</Row>
			)}
		</Container>
	)
}

export default App
