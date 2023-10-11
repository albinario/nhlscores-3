import { logosUrl } from '../util/config'

const teamsAbbr: {[key: number]: string} = {
	24: 'ANA',
	53: 'ARI',
	6: 'BOS',
	7: 'BUF',
	20: 'CGY',
	12: 'CAR',
	16: 'CHI',
	21: 'COL',
	29: 'CBJ',
	25: 'DAL',
	17: 'DET',
	22: 'EDM',
	13: 'FLA',
	26: 'LAK',
	30: 'MIN',
	8: 'MTL',
	1: 'NJD',
	2: 'NYI',
	3: 'NYR',
	18: 'NSH',
	9: 'OTT',
	4: 'PHI',
	5: 'PIT',
	55: 'SEA',
	28: 'SJS',
	19: 'STL',
	14: 'TBL',
	10: 'TOR',
	23: 'VAN',
	54: 'VGK',
	15: 'WSH',
	52: 'WPG'
}

export const getLogo = (id: number) => logosUrl + teamsAbbr[id] + '_dark.svg'