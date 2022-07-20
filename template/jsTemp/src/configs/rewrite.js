
export default () => {
  // 对以下前缀开头的请求路径，不进行重定向
  const rewriteRules = [
    { from: /^(?!\/favicon.ico)(?!\/api)(?!\/ajax)(?!\/static)(?!\/public)(?!\/_logout).*?$/, to: '/', break: true },
  ];
  return rewriteRules;
};
