const ramp = require('./ramp')

test('ID001: Valid Busines Rule R1', () => {
  const req = {}
  req.body = {
    length: 200,
    width: 156,
    weight: 10
  }

  const res = {}

  expect(ramp(req, res)).toBe(0.49)
})