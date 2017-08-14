'use strict'

const test = require('tape')

const orgs = require('.')

test('seems to work', (t) => {
	t.ok(orgs.length > 0)
	for (let o of orgs) {
		t.ok(o)

		t.equal(typeof o.id, 'number')
		t.ok(o.id >= 0)

		t.equal(typeof o.name, 'string')
		t.ok(o.name)
	}

	t.end()
})

test('Berlin exists', (t) => {
	const berlin = orgs.find(o => o.id === 4728)
	t.ok(berlin, 'failed to find Berlin org by ID')
	t.equal(berlin.name.toLowerCase(), 'verkehrslenkung berlin')

	t.end()
})
