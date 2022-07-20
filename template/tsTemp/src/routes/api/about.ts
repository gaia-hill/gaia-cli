import { Gaia } from 'gaia-core';
export default async (ctx: Gaia.GaiaContext) => {
  ctx.ajax("hello gaia");
};
