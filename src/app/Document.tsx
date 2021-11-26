import React from 'react';
import config from 'config';

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

const Document = ({ helmet, markup, assets, css, env }) => {
  const htmlAttributes = helmet.htmlAttributes.toComponent();
  const bodyAttributes = helmet.bodyAttributes.toComponent();

  return (
    <html lang="" {...htmlAttributes}>
      <head>
        <meta char-set='utf-8' />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        {helmet.meta.toComponent()}
        {helmet.title.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <AssetLinks assets={assets} entrypoint={"client"}/>
        {config.MODE !== "server" && 
          config.NODE_ENV !== "production" && 
          <link id="server-side-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>}
        <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }}></style>
        {helmet.meta.toComponent()}
      </head>
      <body {...bodyAttributes}>
        <div id="root" dangerouslySetInnerHTML={{ __html: markup }}></div>
        <script dangerouslySetInnerHTML={{ __html: `
          window.env = ${JSON.stringify(env)};
        `}}></script>
        <AssetScripts assets={assets} entrypoint={"client"} extra={{ defer: null, crossOrigin: null }}/>
      </body>
    </html>
  );
}

export default Document;
