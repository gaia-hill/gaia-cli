import fs from 'fs';
import path from 'path';

const packageConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')).toString());
const version = packageConfig.version;
const name = packageConfig.name;
const nodeEnv = process.env.NODE_ENV;

export default async (ctx) => {
  await ctx.render('index', {
    nodeEnv,
    version,
    name,
  });
};
