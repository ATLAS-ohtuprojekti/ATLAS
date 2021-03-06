const SpeciesDao = require('../main/dao/species_dao')

jest.mock('../main/dao/querier')
const querier = require('../main/dao/querier')

beforeEach(() => {
  querier.mockClear()
})

test('getById calls querier correctly', () => {
  const speciesDao = new SpeciesDao(querier)
  speciesDao.getById(25836)
  speciesDao.getById(25844)

  expect(querier).toHaveBeenCalledTimes(2)
  expect(querier.mock.calls[0][0]).toEqual('get')
  expect(querier.mock.calls[0][2]).toEqual([25836])
  expect(querier.mock.calls[1][0]).toEqual('get')
  expect(querier.mock.calls[1][2]).toEqual([25844])
})

test('getAll calls querier correctly', () => {
  const speciesDao = new SpeciesDao(querier)
  speciesDao.getAll()
  expect(querier).toHaveBeenCalledTimes(1)
  expect(querier.mock.calls[0][0]).toEqual('all')
  expect(querier.mock.calls[0][1]).toContain('SELECT')
})
