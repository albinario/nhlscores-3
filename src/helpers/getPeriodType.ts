import { getPeriodTypeEnd } from './getPeriodTypeEnd'
import type { PeriodDescriptor } from '../types'

export const getPeriodType = (periodDescriptor: PeriodDescriptor) => 
	periodDescriptor.periodType !== 'REG' ?
	periodDescriptor.periodType :
	periodDescriptor.number + getPeriodTypeEnd(periodDescriptor.number)
