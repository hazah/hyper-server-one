import React from "react";

const AssetLinks = ({assets, entrypoint}: {assets: any, entrypoint: string}) => {
  if (assets[entrypoint] && assets[entrypoint].css) {
    return (
      <>
        {assets[entrypoint].css.map((asset: string) => <link rel="stylesheet" href={asset} key={asset}/>)}
      </>
    );
  } else {
    return null;
  }
};

const AssetScripts = ({assets, entrypoint, extra = {}}: {assets: any, entrypoint: string, extra: any}) => {
  if (assets[entrypoint] && assets[entrypoint].js) {
    return (
      <>
        {assets[entrypoint].js.map((asset: string) => <script src={asset} {...extra} key={asset}></script>)}
      </>
    );
  } else {
    return null;
  }
}

const Document = ({ markup, assets, css, env }) => (
  <html lang="">
    <head>
      <meta char-set='utf-8' />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      
      <AssetLinks assets={assets} entrypoint="client"/>
      <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }}></style>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: markup }}></div>
      <script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(env)};`}}></script>
      <AssetScripts assets={assets} entrypoint={"client"} extra={{ defer: null, crossOrigin: null }}/>
    </body>
  </html>
);

export default Document;
