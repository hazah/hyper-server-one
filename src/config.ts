const config =
  typeof window !== "undefined" ? { ...window.env } : { ...process.env };

export default config;

const clientWhiteList = ["NODE_ENV", "MODE"];

export const filterConfigForClient = (config: {
  [envVariable: string]: string | number;
}) => {
  return Object.keys(config)
    .filter((key) => clientWhiteList.includes(key))
    .reduce((obj, key) => {
      obj[key] = config[key];
      return obj;
    }, {});
};
