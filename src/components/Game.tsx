import React, { useEffect, useState } from 'react'
import { IGame, IGameDetails, IPlayer } from '../interfaces'
import Team from './Team'
import { nhlApi } from '../util/config'
import { gameDetailsEmpty } from '../util/variables'
import Play from './Play'
import Goalie from './Goalie'

interface IProps {
	game: IGame
	playersPicked: IPlayer[]
}

const Game: React.FC<IProps> = (props) => {
	const [gameDetails, setGameDetails] = useState<IGameDetails>(gameDetailsEmpty)
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
			const gameDetails = await res.json()
			if (gameDetails) {
				setGameDetails(gameDetails)
			} else {
				setGameDetails(gameDetailsEmpty)
			}
			setError('')
			setLoading(false)
		}
		fetchData()
	}, [props.game])

	const showResultsToggle = () => {
		setShowResults(!showResults)
	}

	const dateTime = new Date(props.game.gameDate)
	const startTime = ('0'+dateTime.getHours()).slice(-2)+':'+('0'+dateTime.getMinutes()).slice(-2)

	const gameData = gameDetails.gameData
	const linescore = gameDetails.liveData.linescore
	const finished = gameData.status.statusCode === '7'
	const scoreAway = linescore.teams.away.goals
	const scoreHome = linescore.teams.home.goals
	const endTypeDesc = linescore.currentPeriodOrdinal
	const endType = endTypeDesc !== '3rd' ? endTypeDesc : ''
	const plays = gameDetails.liveData.plays.allPlays.filter(play => play.result.event === 'Goal')

	const playersPicked = props.playersPicked.filter(player => player.team === gameData.teams.away.id || player.team === gameData.teams.home.id)

	if (error) {
		return (
			<div className='col-12'>
				<div className='alert alert-secondary' role='alert'>{error}</div>
			</div>
		)
	}

	return (
		<div className='col-12'>
			<div className='card p-2'>
				<div className='card-body p-0 g-1'>
					<div className='form-check form-switch position-absolute'>
						<input
							className='form-check-input'
							type='checkbox'
							role='switch'
							checked={showResults}
							onChange={showResultsToggle}
						/>
					</div>

					<div className='position-absolute start-50 translate-middle-x'>
						{showResults ? (
							<div>
								<span className={`badge text-bg-${finished ? 'success' : 'warning'} me-1`}>
									{scoreAway}
								</span>
								<span className={`badge text-bg-${finished ? 'success' : 'warning'}`}>
									{scoreHome}
								</span>
								{endType && (
									<span className='position-absolute translate-middle start-50 top-100 badge rounded-pill text-bg-warning'>
										{endType}
									</span>
								)}
							</div>
						) : (
							<span className='badge text-bg-dark'>
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

					{showResults && (
						<>
							<div className='my-2'>
								{plays.map((play, index) => (
									<Play
										key={index}
										play={play}
										playersPicked={playersPicked}
									/>
								))}
							</div>

							<section id='goalies'>
								<table className='table table-sm table-borderless small text-center'>
									<thead>
										<tr>
											<th colSpan={2}></th>
											<th className='py-0 px-1'>Saves</th>
											<th className='py-0 px-1'>%</th>
											<th className='py-0 px-1'>PP</th>
											<th className='py-0 px-1'>G</th>
											<th className='py-0 px-1'>A</th>
											<th className='py-0 px-1'>PIM</th>
											<th className='py-0 px-1'>TOI</th>
										</tr>
									</thead>
									<tbody>
										{gameDetails.liveData.boxscore.teams.away.goalies.map((goalie, index) => (
											<Goalie
												key={index}
												player={gameDetails.liveData.boxscore.teams.away.players['ID'+goalie as any]}
												team={gameData.teams.away}
												pickedBy={playersPicked.find(p => p.id === goalie)?.picker}
											/>
										))}
										{gameDetails.liveData.boxscore.teams.home.goalies.map((goalie, index) => (
											<Goalie
												key={index}
												player={gameDetails.liveData.boxscore.teams.home.players['ID'+goalie as any]}
												team={gameData.teams.home}
												pickedBy={playersPicked.find(p => p.id === goalie)?.picker}
											/>
										))}
									</tbody>
								</table>
							</section>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Game
