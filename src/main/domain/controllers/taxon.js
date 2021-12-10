const Querier = require('../../dao/querier')
const SpeciesDao = require('../../dao/species_dao')
const AtlasDataDao = require('../../dao/atlas_data_dao')
const querier = Querier()
const atlasDataDao = new AtlasDataDao(querier)
const speciesDao = new SpeciesDao(querier)

class Taxon {
  /**
   * A method that returns all species in the database.
   * @returns {JSON}
   */
  getAll() {
    return (req, res) => speciesDao.getAll()
        .then((data) => res.json(data), () => res.send(null))
  }

  /**
   * Returns all observations of the given species in given atlas.
   * @returns {JSON}
   */
  getAllDataForSpeciesAndAtlas() {
    return (req, res) => {
      return atlasDataDao.getDataForSpeciesAndAtlas(req.params.speciesId, req.param('atlasId'))
          .then((data) => res.json(data), () => res.send(null))
    }
  }

  /**
   * Returns all atlas data of the given species.
   * @returns {JSON}
   */
  getAllDataForSpecies() {
    return (req, res) => {
      return atlasDataDao.getDataForSpecies(req.params.speciesId)
          .then((data) => res.json(data), () => res.send(null))
    }
  }

  /**
     * Returns atlas data of the given species.
     * @returns {JSON}
     */
  getGridAndBreedingdataForBird() {
    return (req, res) => {
      return atlasDataDao.getGridAndBreedingdataForSpecies(req.params.speciesId)
          .then((data) => res.send(JSON.stringify(data)), () => res.send(null))
    }
  }

  /**
   * Returns the species with given id (MX.code).
   * @returns {Array}
   */
  getSpeciesById() {
    return (req, res) => speciesDao.getById(req.params.speciesId)
        .then((data) => res.json(data), () => res.send(null))
  }

  /**
   * Returns the statistics of the given species in given atlas.
   * @returns {Array}
   */
  getStatsForTaxon() {
    return async (req, res) => {
      const {speciesId, atlasId} = req.params
      const stats = await atlasDataDao.getBreedingCategorySumForSpecies(speciesId, atlasId).catch((e) => [])
      const link = `/area?speciesId=${speciesId}&atlasId=${atlasId}`
      const categories = {statistics: {stats}, link: link}
      return res.json(categories)
    }
  }

  /**
   * Returns a list of species with the given search term in their name.
   * @returns {JSON}
   */
  findTaxon() {
    return (req, res) => speciesDao.searchForSpecies(req.params.species)
          .then((data) => res.json(data), () => res.send(null))
  }

  // countByGroup() {
  //   return (req, res) => speciesDao.countByGroup(req.params.speciesId)
  //       .then((data) => res.json(data), () => res.send(null))
  // }
}

module.exports = Taxon
