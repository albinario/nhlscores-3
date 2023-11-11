import type { ScoringGoal } from '../types'

export const getGoalTypes = (goal: ScoringGoal) => {
	const goalTypes: string[] = []

	if (goal.strength === 'pp') {
		goalTypes.push('PP')
	} else if (goal.strength === 'sh') {
		goalTypes.push('SH')
	}
	if (goal.goalModifier === 'empty-net') {
		goalTypes.push('EN')
	}

	return goalTypes
}