import GameDetails from './GameDetails'
import Team from './Team'
import { getStartTime } from '../helpers/getStartTime'
import { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import type { Game as TGame, PlayerPicked, TeamRecord } from '../types'

interface IProps {
	game: TGame
	playersPicked?: PlayerPicked[]
	teamRecordsAway?: TeamRecord
	teamRecordsHome?: TeamRecord
}

const Game: React.FC<IProps> = ({
	game,
	playersPicked,
	teamRecordsAway,
	teamRecordsHome,
}) => {
	const [showResults, setShowResults] = useState(false)

	const startDateTime = new Date(game.startTimeUTC)
	const now = new Date(Date.now())
	const started = startDateTime < now
	const ended = game.gameState === 'OFF'

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
						{showResults && (
							<>
								<Badge
									bg={ended ? 'success' : 'primary'}
									className='me-1'
									style={{ fontSize: '.9em' }}
								>
									{game.awayTeam.score}
								</Badge>

								<Badge
									bg={ended ? 'success' : 'primary'}
									style={{ fontSize: '.9em' }}
								>
									{game.homeTeam.score}
								</Badge>
							</>
						)}

						{!showResults && (
							<Badge bg='warning' className='opacity-75' text='dark'>
								{getStartTime(startDateTime)}
							</Badge>
						)}
					</div>

					<Row>
						<Team
							away={true}
							playersPicked={playersPicked?.filter(
								(player) => player.teamAbbrev === game.awayTeam.abbrev
							)}
							showResults={showResults}
							team={game.awayTeam}
							teamRecord={teamRecordsAway}
						/>
						<Team
							away={false}
							playersPicked={playersPicked?.filter(
								(player) => player.teamAbbrev === game.homeTeam.abbrev
							)}
							showResults={showResults}
							team={game.homeTeam}
							teamRecord={teamRecordsHome}
						/>
					</Row>

					{started && showResults && (
						<GameDetails
							key={game.id}
							game={game}
							playersPicked={playersPicked}
						/>
					)}
				</Card.Body>
			</Card>
		</Col>
	)
}

export default Game
