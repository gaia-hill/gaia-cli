import GaiaApp from 'gaia-core';
import { DEV } from './configs/const';

export const gaia = new GaiaApp(__dirname, process.env.NODE_ENV === DEV ? 'ts' : 'js');

export default gaia.start().then((server) => {
  server.on('close', () => {});
  server.on('error', (e) => {
    console.error(e);
  });
  return server;
});
