
const path = require('path')

module.exports = () => {

	/**
	 * gaia version
	*/
	const packageInfo = require(path.join(__dirname, '../../package.json'))
	console.log(`gaia-cli@${packageInfo.version}\n`)
}