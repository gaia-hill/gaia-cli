
const path = require('path')
const fs = require('fs-extra')
const ejs = require('ejs')
const chalk = require('chalk')
const readline = require('readline')

const ignoreFiles = ['.DS_Store']

function mkdirpSync(dirPath) {
	if (!path.isAbsolute(dirPath)) {
		throw new Error('参数必须是绝对路径')

	}

	if (fs.existsSync(dirPath)) {
		if (fs.statSync(dirPath).isDirectory()) return
		console.log(chalk.red(`${dirPath} 已经存在，且不是文件夹`))
	}
	mkdirpSync(path.dirname(dirPath))
	fs.mkdirSync(dirPath, '777')
}

function writeFileWithTemplate(filePath, templatePath, data) {

	if (!path.isAbsolute(templatePath)) {
		throw new Error('参数必须是绝对路径')
	}
	if (data) {
		const file = fs.readFileSync(templatePath, 'utf8')
		const content = ejs.compile(String(file))(data)
		fs.writeFileSync(filePath, content, 'utf8')
	} else {
		fs.createReadStream(templatePath).pipe(fs.createWriteStream(filePath))
	}
}

function walkFile(dirPath, callback) {

	let stat
	try { stat = fs.statSync(dirPath) } catch (e) { return }
	if (!stat.isDirectory()) return
	fs.readdirSync(dirPath).forEach(file => {

		if (ignoreFiles.indexOf(file) >= 0) return

		const filePath = path.join(dirPath, file)
		const stat = fs.statSync(filePath)

		if (stat.isFile()) callback(filePath)
		if (stat.isDirectory()) walkFile(filePath, callback)
	})
}

function handlerProgress() {
	let startTime = null
	let isReBuild = false
	return (percentage, message, ...args) => {
		if (percentage === 0) {
			startTime = Date.now()
		} else {
			let time = startTime ? ((Date.now() - startTime) / 1000).toFixed(3) : 0
			let desc = percentage < 1 ? (isReBuild ? '更新中' : '构建中') : '构建完成'
			let outputMessage = `[${chalk.green(`${Math.ceil(percentage * 100)}%`)}] --- ${desc} 时长：${time}s`
			try {
				// process.stdout.clearLine()
				// process.stdout.cursorTo(0)
				readline.clearLine(process.stdout)
				readline.cursorTo(process.stdout, 0)
			} catch (error) { }
			process.stdout.write(outputMessage)
			if (percentage === 1) {
				isReBuild = true
				console.log('\n\n')
			}
		}
	}
}

module.exports = {
	writeFileWithTemplate,
	walkFile,
	mkdirpSync,
	handlerProgress
}