const config =
  typeof window !== "undefined" ? { 
    NODE_ENV: window.env.NODE_ENV, 
    MODE: window.env.MODE,
  } : { 
    NODE_ENV: process.env.NODE_ENV,
    MODE: process.env.MODE,
  };

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
