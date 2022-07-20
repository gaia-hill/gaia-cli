
const chalk = require('chalk')

module.exports = ()=>{

	/**
	 * gaia help
	*/

	console.log(`
命令：

${chalk.green('gaia init')} projectName [--ts]   =>   初始化项目，添加--ts参数后，会初始化为ts项目

${chalk.green('gaia help')}                        =>   显示帮助信息

${chalk.green('gaia version')}                     =>   显示版本

	`)
}