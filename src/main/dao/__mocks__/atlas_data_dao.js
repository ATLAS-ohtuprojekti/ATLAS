class AtlasDataDao {
  #data

  constructor() {
    this.#data = [
      {
        'id': 725693,
        'species_mxcode': 25836,
        'grid_id': 664329,
        "atlas_id":3,
        'breedingIndex': 10,
        'breedingCategory': 1,
      },
      {
        'id': 725694,
        'species_mxcode': 25836,
        'grid_id': 664331,
        "atlas_id":3,
        'breedingIndex': 10,
        'breedingCategory': 1,
      },
      {
        'id': 725695,
        'species_mxcode': 25836,
        'grid_id': 666328,
        "atlas_id":3,
        'breedingIndex': 20,
        'breedingCategory': 2,
      },
      {
        'id': 726848,
        'species_mxcode': 25837,
        'grid_id': 664328,
        "atlas_id":3,
        'breedingIndex': 75,
        'breedingCategory': 4,
      },
      {
        'id': 726849,
        'species_mxcode': 25837,
        'grid_id': 664329,
        "atlas_id":3,
        'breedingIndex': 30,
        'breedingCategory': 2,
      },
      {
        'id': 726850,
        'species_mxcode': 25837,
        'grid_id': 664331,
        "atlas_id":3,
        'breedingIndex': 20,
        'breedingCategory': 2,
      },
      {
        'id': 729270,
        'species_mxcode': 25844,
        'grid_id': 666324,
        "atlas_id":3,
        'breedingIndex': 40,
        'breedingCategory': 3,
      },
      {
        'id': 729271,
        'species_mxcode': 25844,
        'grid_id': 666331,
        "atlas_id":3,
        'breedingIndex': 40,
        'breedingCategory': 3,
      },
      {
        'id': 729272,
        'species_mxcode': 25844,
        'grid_id': 667337,
        "atlas_id":3,
        'breedingIndex': 40,
        'breedingCategory': 3,
      },
      {
        "id": 767775,
        "species_mxcode": 27697,
        "grid_id": 664318,
        "atlas_id":3,
        "breedingIndex": 10,
        "breedingCategory": 1,
      },
      {
        "id":767776,
        "species_mxcode":27697,
        "grid_id":667317,
        "atlas_id":3,
        "breedingIndex":10,
        "breedingCategory":1,
      },
      {
        "id":767777,
        "species_mxcode":27697,
        "grid_id":667318,
        "atlas_id":3,
        "breedingIndex":10,
        "breedingCategory":1,
      },
      {
        "id":767778,
        "species_mxcode":27697,
        "grid_id":683319,
        "atlas_id":3,
        "breedingIndex":10,
        "breedingCategory":1,
      },
      {
        "id":767779,
        "species_mxcode":27697,
        "grid_id":766327,
        "atlas_id":3,
        "breedingIndex":73,
        "breedingCategory":4,
      },
      {
        "id":767780,
        "species_mxcode":27697,
        "grid_id":768326,
        "atlas_id":3,
        "breedingIndex":74,
        "breedingCategory":4,
      },
      {
        "id":767781,
        "species_mxcode":27697,
        "grid_id":769326,
        "atlas_id":3,
        "breedingIndex":20,
        "breedingCategory":2,
      },
      {
        "id":767782,
        "species_mxcode":27697,
        "grid_id":769327,
        "atlas_id":3,
        "breedingIndex":73,
        "breedingCategory":4,
      },
      {
        "id":767783,
        "species_mxcode":27697,
        "grid_id":773352,
        "atlas_id":3,
        "breedingIndex":20,
        "breedingCategory":2,
      }
    ]
  }

  getDataForSpeciesAndAtlas(mxcode, atlasId) {
    return Promise.resolve(this.#data.filter((x) => x.species_mxcode == mxcode && x.atlas_id == atlasId))
  }

  getDataForGrid(gridId) {
    return Promise.resolve(this.#data.filter((x) => x.grid_id == gridId))
  }

  getDataForGridAndAtlas(gridId, atlasId) {
    return Promise.resolve(this.#data.filter((x) => x.grid_id == gridId && x.atlas_id == atlasId))
  }

  getGridAndBreedingdataForSpeciesAndAtlas(speciesId, atlasId) {
    return Promise.resolve(this.#data.filter((x) => x.species_mxcode == speciesId && x.atlas_id == atlasId).map((d) => ({...d, id: d.grid_id})))
  }


  getBreedingCategorySumForSpecies(speciesId, atlasId) {
    return Promise.resolve(this.#data.filter((x) => x.species_mxcode == speciesId && x.atlas_id == atlasId))
  }
  
  getListOfDistinctBirdsForGridAndAtlas(gridId, atlasId) {
    return Promise.resolve(this.#data.filter((x) => x.grid_id == gridId && x.atlas_id == atlasId))
  }
  
  getAtlasesForSpecies(speciesId) {
    return Promise.resolve(this.#data.filter((x) => x.species_mxcode == speciesId).map(d => d.atlas_id))
  }
  getAllData() {
    return Promise.resolve(this.#data)
  }
}

module.exports = AtlasDataDao
