import '@babel/polyfill';
import GaiaApp from 'gaia-core';

export const gaia = new GaiaApp(__dirname, 'js');

export default gaia.start().then((server) => {
  server.on('close', () => {
    gaia.app.rainbow.instance.exit();
    gaia.app.polaris.consumer.dispose();
  });
  server.on('error', (e) => {
    console.error(e);
  });
  return server;
});
