import Players from './Players'
import Scoring from './Scoring'
import { useGetGame } from '../hooks/useGetGame'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import type { Game, PlayerPicked } from '../types'

interface IProps {
	game: Game
	playersPicked?: PlayerPicked[]
}

const GameDetails: React.FC<IProps> = ({ game, playersPicked }) => {
	const { data: gameDetails, isError, isFetching } = useGetGame(game.id)

	if (isFetching)
		return (
			<div className='d-flex justify-content-center'>
				<Spinner animation='grow' size='sm' variant='warning' />
			</div>
		)

	if (isError)
		return <Alert variant='warning'>Error loading game details</Alert>

	if (!gameDetails)
		return <Alert variant='secondary'>No game details available</Alert>

	const ended = gameDetails.landing.gameState === 'OFF'
	const endTypeDesc = ended
		? gameDetails.boxscore.gameOutcome.lastPeriodType
		: ''
	const endType = endTypeDesc !== 'REG' ? endTypeDesc : ''

	return (
		<>
			{endType && (
				<Badge
					bg='warning'
					className='position-absolute translate-middle start-50 opacity-75'
					pill
					style={{ fontSize: '.6em', marginTop: '-18px' }}
					text='dark'
				>
					{endType}
				</Badge>
			)}

			<div className='mt-2'>
				{gameDetails.landing.summary.scoring
					.filter((s) => !!s.goals.length)
					.map((scoring) => (
						<Scoring
							key={scoring.periodDescriptor.number}
							scoring={scoring}
							playersPicked={playersPicked}
							teamAbbrevAway={gameDetails.landing.awayTeam.abbrev}
						/>
					))}
			</div>

			<Players
				playersAway={gameDetails.boxscore.boxscore.playerByGameStats.awayTeam}
				playersHome={gameDetails.boxscore.boxscore.playerByGameStats.homeTeam}
				playersPicked={playersPicked}
				teamAbbrevAway={gameDetails.landing.awayTeam.abbrev}
				teamAbbrevHome={gameDetails.landing.homeTeam.abbrev}
				winningGoalieId={game.winningGoalie?.playerId}
				winningGoalScorerId={game.winningGoalScorer?.playerId}
			/>
		</>
	)
}

export default GameDetails
