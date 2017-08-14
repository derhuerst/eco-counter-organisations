'use strict'

const {counters} = require('eco-counter-client')
const createQueue = require('queue')

const showError = (err) => {
	if (!err) return
	console.error(err)
	process.exit(1)
}

const queue = createQueue({
	concurrency: 8,
	timeout: 30 * 1000,
	autostart: true
})
const orgs = []

queue
.on('error', showError)
.on('end', () => {
	const data = JSON.stringify(orgs)
	process.stdout.write(data + '\n')
})

const checkId = (id) => (cb) => {
	counters(id)
	.then((counters) => {
		const withName = counters.find(c => c.organisation.name)
		if (withName) {
			const name = withName.organisation.name
			orgs.push([id, name])
			console.error('✓', id, name)
		}
		cb()
	}, (err) => {
		// ignore HTTP errors
		if (!err.statusCode) cb(err)
		else cb()
	})
	.catch(cb)
}

for (let id = 0; id < 6000; id++) queue.push(checkId(id))