import axios from 'axios'
import ResourceHelper from './restful-resource-utility'

const RestHapiRepository = {
  install (Vue, { httpClient, resources, log }) {
    httpClient = httpClient || axios

    const fakeLogger = {
      log: function () {},
      debug: function () {},
      error: function () {}
    }

    var logger = log ? console : fakeLogger

    const resourceHelper = ResourceHelper(httpClient, logger)
    for (var resourceName in resources) {
      const resource = resources[resourceName]
      const resourceRoute = resource.alias || resourceName
      var repoCalls = resourceHelper.generateCrudCallers(resourceRoute)
      const associations = resource.associations

      for (var associationName in associations) {
        const associationRoute = associations[associationName].alias || associationName
        repoCalls = Object.assign({}, repoCalls, resourceHelper.generateAssociationCallers(resourceRoute, associationName, associationRoute))
      }

      const repoName = '$' + resourceName + 'Repository'
      Vue.prototype[repoName] = repoCalls
    }
  }
}

export default RestHapiRepository
