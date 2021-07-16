const path = require("path")
const createExpoWebpackConfigAsync = require("@expo/webpack-config")

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  config.resolve.alias["@constants"] = path.resolve(__dirname, "src/constants/")
  config.resolve.alias["@components"] = path.resolve(__dirname, "src/components/")
  config.resolve.alias["@screens"] = path.resolve(__dirname, "src/screens/")
  config.resolve.alias["@store"] = path.resolve(__dirname, "src/store/")
  config.resolve.alias["@services"] = path.resolve(__dirname, "src/services/")
  config.resolve.alias["@utils"] = path.resolve(__dirname, "src/utils/")

  return config
}
