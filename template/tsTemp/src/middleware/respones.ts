import { Next } from 'koa';
import { Gaia } from 'gaia-core';

export default {
  weight: 9,  // 优先级为9，数字越高中间件绑定的顺序越靠前
  run: async (ctx: Gaia.GaiaContext, next: Next) => {
    ctx.ajax = (data: any, msg = 'success') => {
      const body = { code: 0, data, msg };
      ctx.status = 200;
      ctx.body = body;
    };

    ctx.error = (msg = '请求失败') => {
      const body = { code: -1, data: {}, msg };
      ctx.status = 200;
      ctx.body = body;
    };
    await next();
  },
};
