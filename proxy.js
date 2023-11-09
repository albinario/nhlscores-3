import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

const instance = axios.create({
	baseURL: 'https://api-web.nhle.com/v1',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

app.get('/games/:teamAbbrev', async (req, res) => {
	const teamAbbrev = req.params.teamAbbrev

	try {
		const response = await instance.get(
			'/club-schedule-season/' + teamAbbrev + '/now'
		)
		res.json(response.data.games)
	} catch (error) {
		res.status(500).json({
			error: 'Server error when fetching schedule',
		})
	}
})

app.get('/standings', async (req, res) => {
	try {
		const response = await instance.get('/standings/now')
		res.json(response.data.standings)
	} catch (error) {
		res.status(500).json({
			error: 'Server error when fetching standings',
		})
	}
})

// Start the proxy server
app.listen(port, () => {
	console.log('Proxy server is running on port ' + port)
})
