const BirdGridDao = require('../main/dao/bird_grid_dao')

jest.mock('../main/dao/querier_factory')
const querier = require('../main/dao/querier_factory')

beforeEach(() => {
    querier.mockClear()
})

test('getById calls querier correctly', () => {
    const birdGridDao = new BirdGridDao(querier)
    birdGridDao.getById(1)
    birdGridDao.getById(15)

    expect(querier).toHaveBeenCalledTimes(2)
    expect(querier.mock.calls[0][0]).toEqual('get')
    expect(querier.mock.calls[0][2]).toEqual([1])
    expect(querier.mock.calls[1][0]).toEqual('get')
    expect(querier.mock.calls[1][2]).toEqual([15])
})

test('getAll calls querier correctly', () => {
    const birdGridDao = new BirdGridDao(querier)
    birdGridDao.getAll()
    expect(querier).toHaveBeenCalledTimes(1)
    expect(querier.mock.calls[0][0]).toEqual('all')
    expect(querier.mock.calls[0][1]).toContain('SELECT * FROM')
})
