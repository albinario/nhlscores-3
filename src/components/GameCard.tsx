import React, { useEffect, useState } from 'react'
import { IGame, IGameDetails, IPlayer } from '../interfaces'
import Team from './Team'
import { nhlApi } from '../util/config'

interface IProps {
	game: IGame
	playersPicked: IPlayer[]
	showResults: boolean
}

const gameDetailsEmpty: IGameDetails = {
	gameData: {
		teams: {
			away: {
				id: 0,
				name: ""
			},
			home: {
				id: 1,
				name: ""
			}
		},
		datetime: {
			dateTime: ""
		},
		status: {
			statusCode: ""
		}
	},
	liveData: {
		linescore: {
			currentPeriodOrdinal: "",
			teams: {
				away: {
					goals: 0
				},
				home: {
					goals: 0
				}
			}
		}
	}
}

const GameCard: React.FC<IProps> = (props) => {
	console.log("GameCard()")
	
	const [gameDetails, setGameDetails] = useState<IGameDetails>(gameDetailsEmpty)
	
	useEffect(() => {
		fetch(`${nhlApi}/game/${props.game.gamePk}/feed/live`)
		.then(res => res.json())
		.then(gameDetails => setGameDetails(gameDetails))
		.catch(err => console.error(err))
	}, [])

	const dateTime = new Date(props.game.gameDate)
	const startTime = ('0'+dateTime.getHours()).slice(-2)+':'+('0'+dateTime.getMinutes()).slice(-2)
	
	const gameData = gameDetails.gameData
	const linescore = gameDetails.liveData.linescore
	const showResults = props.showResults && gameData.status.statusCode === "7"
	const scoreAway = linescore.teams.away.goals
	const scoreHome = linescore.teams.home.goals
	const currentPeriodOrdinal = linescore.currentPeriodOrdinal
	const endType = currentPeriodOrdinal !== '3rd' ? currentPeriodOrdinal+' ' : ''
	
	return (
		<div className='col-12 col-md-6 col-lg-4 col-xl'>
			<div className='card p-2'>
				<div className='card-body p-0 g-1'>
					<Team
						team={gameData.teams.away}
						away={true}
						showResults={showResults}
						score={scoreAway}
						winner={scoreAway > scoreHome}
						endType={endType}
						playersPicked={props.playersPicked.filter(player => player.team === gameData.teams.away.id)}
						startTime={startTime}
						/>
					<Team
						team={gameData.teams.home}
						away={false}
						showResults={showResults}
						score={scoreHome}
						winner={scoreHome > scoreAway}
						endType={endType}
						playersPicked={props.playersPicked.filter(player => player.team === gameData.teams.home.id)}
					/>
				</div>
			</div>
		</div>
	)
}

export default GameCard
