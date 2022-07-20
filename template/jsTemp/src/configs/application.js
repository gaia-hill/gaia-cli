// 应用配置
export default async () => {
  const port = Number(process.env.NODE_PORT || 3005);
  return {
    port,
    routeType: 'dir',
    cors: false,
    static: {
      public: '/public',
      staticPath: './static',
      maxAge: 30 * 24 * 60 * 60,
    },

    view: {
      type: 'ejs',
      cache: true,
      data: {},
    },
  };
};
