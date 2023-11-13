import Goal from './Goal'
import Players from './Players'
import Team from './Team'
import { getPeriodType } from '../helpers/getPeriodType'
import { useGetGame } from '../hooks/useGetGame'
import { Fragment, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import type { Game, PlayerPicked, TeamRecord } from '../types'

interface IProps {
	game: Game
	playersPicked?: PlayerPicked[]
	teamRecordAway?: TeamRecord
	teamRecordHome?: TeamRecord
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
	const ended = game.landing.gameState === 'OFF'
	const endTypeDesc = ended ? game.boxscore.gameOutcome.lastPeriodType : ''
	const endType = endTypeDesc !== 'REG' ? endTypeDesc : ''

	return (
		<Col>
			<Card>
				<Card.Body className='p-2'>
					{started && (
						<Form.Switch
							checked={showResults}
							className='position-absolute'
							name='show-result-switcher'
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
									bg={ended ? 'success' : 'danger'}
									className='me-1'
									style={{ fontSize: '1em' }}
								>
									{game.landing.awayTeam.score}
								</Badge>

								<Badge
									bg={ended ? 'success' : 'danger'}
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
							away={true}
							playersPicked={props.playersPicked?.filter(
								(player) => player.teamAbbrev === game.landing.awayTeam.abbrev
							)}
							showResults={showResults}
							team={game.landing.awayTeam}
							teamRecord={props.teamRecordAway}
						/>
						<Team
							away={false}
							playersPicked={props.playersPicked?.filter(
								(player) => player.teamAbbrev === game.landing.homeTeam.abbrev
							)}
							showResults={showResults}
							team={game.landing.homeTeam}
							teamRecord={props.teamRecordHome}
						/>
					</Row>

					{showResults && started && (
						<>
							<div className='mt-2'>
								{game.landing.summary.scoring.map((period) => (
									<Fragment key={period.periodDescriptor.number}>
										{!!period.goals.length && (
											<div className='period mb-1'>
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
														players={props.playersPicked}
													/>
												))}
											</div>
										)}
									</Fragment>
								))}
							</div>

							<Players
								playersAway={game.boxscore.boxscore.playerByGameStats.awayTeam}
								playersHome={game.boxscore.boxscore.playerByGameStats.homeTeam}
								playersPicked={props.playersPicked}
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
