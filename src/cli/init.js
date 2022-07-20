const exec = require('child_process').exec
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')

const {
    walkFile,
    writeFileWithTemplate,
    mkdirpSync
} = require('../modules/utils')

const needToCompile = ['.js', '.json', '.md']

module.exports = async (argv) => {

	/**
	 * gaia init projectName --ts
	*/

    const projectName = argv._[1]

    if (!projectName) {
        console.log(chalk.red(`
        缺少必须的参数（项目名称）

        gaia init projectName
        `))
        return
    }

    const projectPath = path.resolve(argv.cwd, projectName)

    try {
        const stats = fs.statSync(projectPath)
        if (stats.isDirectory()) {
            const files = fs.readdirSync(projectPath)
            if (files.length > 0) {
                console.log(chalk.red(`error：${projectName}目录已存在, 并且不为空`))
                return
            }
        }
        await fs.remove(projectPath)
    } catch (error) { }

    const defaultConfig = {
        projectName,
        createdAt: Date().toString()
    }

    let tempDirPath = path.resolve(__dirname, '../../template/jsTemp')

    if (argv.ts) {
        tempDirPath = path.resolve(__dirname, '../../template/tsTemp')
    }

    mkdirpSync(projectPath)

    console.log(chalk.green(`\n开始初始化${projectName}项目目录...\n`))

    walkFile(tempDirPath, (filePath) => {
        const relativePath = path.relative(tempDirPath, filePath)
        const targetPath = path.join(projectPath, relativePath)
        const { ext } = path.parse(targetPath)
        mkdirpSync(path.dirname(targetPath))
        const data = needToCompile.indexOf(ext.toLowerCase()) === -1 ? null : defaultConfig
        writeFileWithTemplate(targetPath, filePath, data)
        console.log(`==>> ${targetPath}\n`)
    })

    console.log(chalk.green(`\n开始安装项目依赖...\n`));

    const output = exec(`cd ${projectPath} && npm i gaia-core --save && npm i`, (err, stdout, stderr) => {
        if(err) {
            console.log(err);
            console.log(chalk.red(`\n安装依赖失败，请进入项目目录手动安装!\n`));
            return;
        }
        if(stderr) {
            console.log('-----std notice-----');
            console.log(stderr);
        }
        console.log(chalk.green(`\n初始化完成!\n\n项目启动：进入${projectName}目录  npm start\n`));
    });

    output.stdout.on('data', (data) => {
        console.log(data);
    });
}
