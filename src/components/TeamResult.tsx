import { useEffect, useState } from 'react'
import { Team } from '../types'
import { logos } from '../util/config'

const TeamResult = (
	props: {
		team: Team
		away: boolean
		showResults: boolean
		startTime?: Date
	}) => {
	const [startTime, setStartTime] = useState('')

	useEffect(() => {
		if (props.away && !props.showResults && props.startTime) {
			setStartTime(
				('0'+props.startTime.getHours()).slice(-2)
				+':'+
				('0'+props.startTime.getMinutes()).slice(-2)
			)
		}
	}, [])

	return (
		<div className='d-flex justify-content-between'>
			<div>
				<img
					src={`${logos}/${props.team.team.id}.svg`}
					alt={props.team.team.name}
				/> {props.team.team.name}
			</div>
			<div>
				{props.showResults && props.team.score}
				{props.away && !props.showResults && startTime}
			</div>
		</div>
	)
}

export default TeamResult
