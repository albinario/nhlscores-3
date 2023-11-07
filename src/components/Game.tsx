import Play from './Play'
import Players from './Players'
import Team from './Team'
import { useGetGame } from '../hooks/useGetGame'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import type { Game, Player } from '../types'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

interface IProps {
	game: Game
	players?: Player[]
}

const Game: React.FC<IProps> = (props) => {
	const [showResults, setShowResults] = useState(false)
	const game = useGetGame(props.game.gamePk)

	if (game.isError)
		return <Alert variant='warning'>Error loading game details</Alert>

	if (!game.data) return <></>

	const dateTime = new Date(props.game.gameDate)
	const startTime =
		('0' + dateTime.getHours()).slice(-2) +
		':' +
		('0' + dateTime.getMinutes()).slice(-2)

	const gameData = game.data.gameData
	const linescore = game.data.liveData.linescore
	const started = game.data.gameData.status.statusCode !== '1'
	const finished = game.data.gameData.status.statusCode === '7'
	const scoreAway = linescore.teams.away.goals
	const scoreHome = linescore.teams.home.goals
	const endTypeDesc = linescore.currentPeriodOrdinal
	const endType = endTypeDesc !== '3rd' ? endTypeDesc : ''
	const plays = game.data.liveData.plays.allPlays.filter(
		(play) => play.result.event === 'Goal'
	)

	return (
		<Col>
			<Card>
				<Card.Body className='p-2'>
					{started && (
						<Form.Switch
							checked={showResults}
							className='position-absolute'
							onChange={() => setShowResults(!showResults)}
						/>
					)}

					<div
						className='position-absolute start-50 translate-middle-x'
						style={{ marginTop: '-1px' }}
					>
						{showResults ? (
							<>
								<Badge
									bg={finished ? 'success' : 'danger'}
									className='me-1'
									style={{ fontSize: '1em' }}
								>
									{scoreAway}
								</Badge>

								<Badge
									bg={finished ? 'success' : 'danger'}
									style={{ fontSize: '1em' }}
								>
									{scoreHome}
								</Badge>

								{endType && (
									<Badge
										bg='warning'
										className='position-absolute translate-middle start-50 top-100 opacity-75'
										pill
										style={{ fontSize: '.6em' }}
										text='dark'
									>
										{endType}
									</Badge>
								)}
							</>
						) : (
							<Badge bg='warning' className='opacity-75' text='dark'>
								{startTime}
							</Badge>
						)}
					</div>

					<Row>
						<Team
							team={props.game.teams.away}
							teamName={gameData.teams.away.teamName}
							away={true}
							showResults={showResults}
							players={props.players?.filter(
								(player) => player.team === gameData.teams.away.id
							)}
						/>
						<Team
							team={props.game.teams.home}
							teamName={gameData.teams.home.teamName}
							away={false}
							showResults={showResults}
							players={props.players?.filter(
								(player) => player.team === gameData.teams.home.id
							)}
						/>
					</Row>

					{showResults && started && (
						<section id='game-details'>
							<section id='plays' className='my-2'>
								{plays.map((play, index) => {
									return (
										<Play
											key={index}
											away={props.game.teams.away.team.id === play.team.id}
											play={play}
											players={props.players}
										/>
									)
								})}
							</section>

							<Players
								teamAway={game.data.liveData.boxscore.teams.away}
								teamHome={game.data.liveData.boxscore.teams.home}
								players={props.players}
							/>
						</section>
					)}
				</Card.Body>
			</Card>
		</Col>
	)
}

export default Game
