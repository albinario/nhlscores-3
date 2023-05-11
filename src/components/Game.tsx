import React, { useEffect, useState } from 'react'
import { IGame, IGameDetails, IPlayer } from '../interfaces'
import Team from './Team'
import { nhlApi } from '../util/config'
import { gameDetailsEmpty } from '../util/variables'

interface IProps {
	game: IGame
	playersPicked: IPlayer[]
	showResults: boolean
}

const Game: React.FC<IProps> = (props) => {
	const [gameDetails, setGameDetails] = useState<IGameDetails>(gameDetailsEmpty)
	
	useEffect(() => {
		fetch(`${nhlApi}/game/${props.game.gamePk}/feed/live`)
		.then(res => res.json())
		.then(gameDetails => setGameDetails(gameDetails))
		.catch(err => console.error(err))
	}, [props.game])

	const dateTime = new Date(props.game.gameDate)
	const startTime = ('0'+dateTime.getHours()).slice(-2)+':'+('0'+dateTime.getMinutes()).slice(-2)

	const gameData = gameDetails.gameData
	const linescore = gameDetails.liveData.linescore
	const showResults = props.showResults && gameData.status.statusCode === "7"
	const scoreAway = linescore.teams.away.goals
	const scoreHome = linescore.teams.home.goals
	const endTypeDesc = linescore.currentPeriodOrdinal
	const endType = endTypeDesc !== '3rd' ? endTypeDesc+' ' : ''
	
	return (
		<div className='col-12'>
			<div className='card p-2'>
				<div className='card-body p-0 g-1'>
					<Team
						team={props.game.teams.away}
						away={true}
						showResults={showResults}
						winner={scoreAway > scoreHome}
						endType={endType}
						playersPicked={props.playersPicked.filter(player => player.team === gameData.teams.away.id)}
						startTime={startTime}
						/>
					<Team
						team={props.game.teams.home}
						away={false}
						showResults={showResults}
						winner={scoreHome > scoreAway}
						endType={endType}
						playersPicked={props.playersPicked.filter(player => player.team === gameData.teams.home.id)}
					/>
				</div>
			</div>
		</div>
	)
}

export default Game
