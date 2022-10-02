let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();
export const render = (_req, res) => {
  const html = "";
  res.json({ html });
};

export const routes = () => {
  return ["/", "/about"];
};
