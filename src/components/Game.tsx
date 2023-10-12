import Fetching from './Fetching'
import Play from './Play'
import Players from './Players'
import Team from './Team'
import useGetGame from '../hooks/useGetGame'
import { useState } from 'react'
import type { Game } from '../types'

interface IProps {
	game: Game
	// playersPicked?: IPlayer[]
}

const Game: React.FC<IProps> = (props) => {
	const [showResults, setShowResults] = useState(false)

	const game = useGetGame(props.game.gamePk)

	if (game.isError) {
		return (
			<div className='col-12'>
				<div className='alert alert-secondary' role='alert'>Game details error</div>
			</div>
		)
	}

	if (!game.data) {
		return (
			<div className='alert alert-secondary'>No game details available</div>
		)
	}

	const showResultsToggle = () => {
		setShowResults(!showResults)
	}

	const dateTime = new Date(props.game.gameDate)
	const startTime = ('0'+dateTime.getHours()).slice(-2)+':'+('0'+dateTime.getMinutes()).slice(-2)

	const gameData = game.data.gameData
	const linescore = game.data.liveData.linescore
	const started = game.data.gameData.status.statusCode !== '1'
	const finished = game.data.gameData.status.statusCode === '7'
	const scoreAway = linescore.teams.away.goals
	const scoreHome = linescore.teams.home.goals
	const endTypeDesc = linescore.currentPeriodOrdinal
	const endType = endTypeDesc !== '3rd' ? endTypeDesc : ''
	const plays = game.data.liveData.plays.allPlays.filter(play => play.result.event === 'Goal')

	// const playersPicked = props.playersPicked?.filter(player => player.team === gameData.teams.away.id || player.team === gameData.teams.home.id)

	return (
		<div className='col-12'>
			<div className='card p-2'>
				<div className='card-body p-0 g-1'>
					{started && (
						<div className='form-check form-switch position-absolute'>
							<input
								className='form-check-input'
								type='checkbox'
								role='switch'
								checked={showResults}
								onChange={showResultsToggle}
							/>
						</div>
					)}

					<div className='position-absolute start-50 translate-middle-x'>
						{showResults ? (
							<div>
								<span className={`badge text-bg-${finished ? 'success' : 'danger'} me-1`}>
									{scoreAway}
								</span>
								<span className={`badge text-bg-${finished ? 'success' : 'danger'}`}>
									{scoreHome}
								</span>
								{endType && (
									<span className='position-absolute translate-middle start-50 top-100 badge rounded-pill text-bg-warning'>
										{endType}
									</span>
								)}
							</div>
						) : (
							<span className='badge text-bg-dark opacity-75'>
								{startTime}
							</span>
						)}
					</div>

					{game.isFetching && (
						// <div className='spinner-border spinner-border-sm text-seconus opacity-50 position-absolute end-0 me-2 fs-6'>
						// 	<span className='visually-hidden'>Loading...</span>
						// </div>
						<Fetching />
					)}

					<div className='row'>
						<Team
							team={props.game.teams.away}
							teamName={gameData.teams.away.teamName}
							away={true}
							showResults={showResults}
							// playersPicked={playersPicked?.filter(player => player.team === gameData.teams.away.id)}
						/>
						<Team
							team={props.game.teams.home}
							teamName={gameData.teams.home.teamName}
							away={false}
							showResults={showResults}
							// playersPicked={playersPicked?.filter(player => player.team === gameData.teams.home.id)}
						/>
					</div>

					{showResults && started && (
						<section id='game-details'>
							<section id='plays' className='my-2'>
								{plays.map((play, index) => (
									<Play
										key={index}
										play={play}
										// playersPicked={playersPicked}
									/>
								))}
							</section>

							<Players
								teamAway={game.data.liveData.boxscore.teams.away}
								teamHome={game.data.liveData.boxscore.teams.home}
								// playersPicked={playersPicked}
							/>
						</section>
					)}
				</div>
			</div>
		</div>
	)
}

export default Game
