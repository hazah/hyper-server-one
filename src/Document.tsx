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

const Document = ({ markup, assets }) => (
  <html lang="">
    <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta charSet='utf-8' />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <AssetLinks assets={assets} entrypoint="client"/>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: markup }}></div>
      <AssetScripts assets={assets} entrypoint={"client"} extra={{ defer: null, crossOrigin: null }}/>
    </body>
  </html>
);

export default Document;
