import React, { useEffect, useState } from 'react'
import { IGame, IGameDetails, IPlayer } from '../interfaces'
import Team from './Team'
import { nhlApi } from '../util/config'
import Play from './Play'
import Players from './Players'

interface IProps {
	game: IGame
	playersPicked: IPlayer[]
}

const Game: React.FC<IProps> = (props) => {
	const [gameDetails, setGameDetails] = useState<IGameDetails>()
	const [error, setError] = useState('')
	const [showResults, setShowResults] = useState(false)
	const [loading, setLoading] = useState(false)
	
	useEffect(() => {
		setShowResults(false)
		setLoading(true)
		const fetchData = async () => {
			const res = await fetch(`${nhlApi}/game/${props.game.gamePk}/feed/live`)
			if (!res.ok) {
				setError("Failed to load game")
				setLoading(false)
				return
			}
			setGameDetails(await res.json())
			setError('')
			setLoading(false)
		}
		fetchData()
	}, [props.game])

	if (error) {
		return (
			<div className='col-12'>
				<div className='alert alert-secondary' role='alert'>{error}</div>
			</div>
		)
	}

	if (!gameDetails) {
		return (
			<div className='alert alert-secondary'>No game details available</div>
		)
	}

	const showResultsToggle = () => {
		setShowResults(!showResults)
	}

	const dateTime = new Date(props.game.gameDate)
	const startTime = ('0'+dateTime.getHours()).slice(-2)+':'+('0'+dateTime.getMinutes()).slice(-2)

	const gameData = gameDetails.gameData
	const linescore = gameDetails.liveData.linescore
	const started = gameDetails.gameData.status.statusCode !== '1'
	const finished = gameDetails.gameData.status.statusCode === '7'
	const scoreAway = linescore.teams.away.goals
	const scoreHome = linescore.teams.home.goals
	const endTypeDesc = linescore.currentPeriodOrdinal
	const endType = endTypeDesc !== '3rd' ? endTypeDesc : ''
	const plays = gameDetails.liveData.plays.allPlays.filter(play => play.result.event === 'Goal')

	const playersPicked = props.playersPicked.filter(player => player.team === gameData.teams.away.id || player.team === gameData.teams.home.id)

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

					{loading && (
						<div className='spinner-border spinner-border-sm text-seconus opacity-50 position-absolute end-0 me-2 fs-6'>
							<span className='visually-hidden'>Loading...</span>
						</div>
					)}

					<div className='row'>
						<Team
							team={props.game.teams.away}
							teamName={gameData.teams.away.teamName}
							away={true}
							showResults={showResults}
							playersPicked={playersPicked.filter(player => player.team === gameData.teams.away.id)}
						/>
						<Team
							team={props.game.teams.home}
							teamName={gameData.teams.home.teamName}
							away={false}
							showResults={showResults}
							playersPicked={playersPicked.filter(player => player.team === gameData.teams.home.id)}
						/>
					</div>

					{showResults && started && (
						<section id="game-details">
							<section id="plays" className='my-2'>
								{plays.map((play, index) => (
									<Play
										key={index}
										play={play}
										playersPicked={playersPicked}
									/>
								))}
							</section>

							<Players
								teamAway={gameDetails.liveData.boxscore.teams.away}
								teamHome={gameDetails.liveData.boxscore.teams.home}
								playersPicked={playersPicked}
							/>
						</section>
					)}
				</div>
			</div>
		</div>
	)
}

export default Game
