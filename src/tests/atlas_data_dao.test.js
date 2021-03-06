const AtlasDataDao = require('../main/dao/atlas_data_dao')

jest.mock('../main/dao/querier')
const querier = require('../main/dao/querier')

beforeEach(() => {
  querier.mockClear()
})

test('getDataForGrid calls querier correctly', () => {
  const atlasDataDao = new AtlasDataDao(querier)
  atlasDataDao.getDataForGrid(1)
  atlasDataDao.getDataForGrid(2)

  expect(querier).toHaveBeenCalledTimes(2)
  expect(querier.mock.calls[0][1]).toContain('atlas')
  expect(querier.mock.calls[0][2]).toEqual([1])
  expect(querier.mock.calls[1][1]).toContain('atlas')
  expect(querier.mock.calls[1][2]).toEqual([2])
})

test('getAllAtlasData calls querier correctly', () => {
  const atlasDataDao = new AtlasDataDao(querier)
  atlasDataDao.getAllData()
  expect(querier).toHaveBeenCalledTimes(1)
  expect(querier.mock.calls[0][0]).toEqual('all')
  expect(querier.mock.calls[0][1]).toContain('bird_data')
})

test('getGridAndBreedingdataForSpecies calls querier correctly', () => {
  const atlasDataDao = new AtlasDataDao(querier)
  atlasDataDao.getGridAndBreedingdataForSpecies(1)

  expect(querier).toHaveBeenCalledTimes(1)
  expect(querier.mock.calls[0][0]).toEqual('all')
  expect(querier.mock.calls[0][1]).toContain('bird_data')
})

test('getDataForGrid calls querier correctly', () => {
  const atlasDataDao = new AtlasDataDao(querier)
  atlasDataDao.getDataForGrid(1)

  expect(querier).toHaveBeenCalledTimes(1)
  expect(querier.mock.calls[0][0]).toEqual('all')
  expect(querier.mock.calls[0][1]).toContain('atlas')
})

test('getBreedingCategorySumForSpecies calls querier correctly', () => {
  const atlasDataDao = new AtlasDataDao(querier)
  atlasDataDao.getBreedingCategorySumForSpecies(25836)

  expect(querier).toHaveBeenCalledTimes(1)
  expect(querier.mock.calls[0][0]).toEqual('all')
  expect(querier.mock.calls[0][1]).toContain('bird_data')
})

test('getListOfDistinctBirdsForGridAndAtlas calls querier correctly', () => {
  const atlasDataDao = new AtlasDataDao(querier)
  atlasDataDao.getListOfDistinctBirdsForGridAndAtlas(664329)

  expect(querier).toHaveBeenCalledTimes(1)
  expect(querier.mock.calls[0][0]).toEqual('all')
  expect(querier.mock.calls[0][1]).toContain('bird_data')
})

test('getNumOfBreedingCategoriesForGridAndAtlas calls querier correctly', () => {
  const atlasDataDao = new AtlasDataDao(querier)
  atlasDataDao.getNumOfBreedingCategoriesForGridAndAtlas(664329)

  expect(querier).toHaveBeenCalledTimes(1)
  expect(querier.mock.calls[0][0]).toEqual('all')
  expect(querier.mock.calls[0][1]).toContain('bird_data')
})
