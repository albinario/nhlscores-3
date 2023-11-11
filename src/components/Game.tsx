import Goal from './Goal'
import Players from './Players'
import Team from './Team'
import { getPeriodType } from '../helpers/getPeriodType'
import { useGetGame } from '../hooks/useGetGame'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import type { Game, PlayerPicked } from '../types'

interface IProps {
	game: Game
	players?: PlayerPicked[]
}

const Game: React.FC<IProps> = (props) => {
	const [showResults, setShowResults] = useState(false)
	const { data: game, isError } = useGetGame(props.game.id)

	if (isError)
		return <Alert variant='warning'>Error loading game details</Alert>

	if (!game) return <></>

	const dateTime = new Date(props.game.startTimeUTC)
	const startTime =
		('0' + dateTime.getHours()).slice(-2) +
		':' +
		('0' + dateTime.getMinutes()).slice(-2)

	const started = game.landing.gameState !== 'FUT'
	const finished = game.landing.gameState === 'OFF'
	const endTypeDesc = game.boxscore.gameOutcome.lastPeriodType
	const endType = endTypeDesc !== 'REG' ? endTypeDesc : ''

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
									{game.landing.awayTeam.score}
								</Badge>

								<Badge
									bg={finished ? 'success' : 'danger'}
									style={{ fontSize: '1em' }}
								>
									{game.landing.homeTeam.score}
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
							team={game.landing.awayTeam}
							away={true}
							showResults={showResults}
							players={props.players?.filter(
								(player) => player.teamAbbrev === game.landing.awayTeam.abbrev
							)}
						/>
						<Team
							team={game.landing.homeTeam}
							away={false}
							showResults={showResults}
							players={props.players?.filter(
								(player) => player.teamAbbrev === game.landing.homeTeam.abbrev
							)}
						/>
					</Row>

					{showResults && started && (
						<>
							<div className='mt-2'>
								{game.landing.summary.scoring.map((period) => (
									<>
										{!!period.goals.length && (
											<div
												key={period.periodDescriptor.number}
												className='period mb-1'
											>
												<div className='d-flex justify-content-center small text-muted'>
													{getPeriodType(period.periodDescriptor)}
												</div>
												{period.goals.map((goal, index) => (
													<Goal
														key={index}
														away={
															goal.teamAbbrev === game.landing.awayTeam.abbrev
														}
														goal={goal}
														players={props.players}
													/>
												))}
											</div>
										)}
									</>
								))}
							</div>

							<Players
								playersAway={game.boxscore.boxscore.playerByGameStats.awayTeam}
								playersHome={game.boxscore.boxscore.playerByGameStats.homeTeam}
								playersPicked={props.players}
								teamAbbrevAway={game.landing.awayTeam.abbrev}
								teamAbbrevHome={game.landing.homeTeam.abbrev}
							/>
						</>
					)}
				</Card.Body>
			</Card>
		</Col>
	)
}

export default Game
