import React from "react";

const Shell = ({ htmlAttributes, title, meta, link, style, ids, css, script, bodyAttributes, html }) => (
  <html {...htmlAttributes}>
    <head>
      {title}
      {meta}
      {link}
      {style}
      <style data-emotion={`css ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }}/>
      {script}
    </head>
    <body {...bodyAttributes} dangerouslySetInnerHTML={{ __html: html }}/>
  </html>
);

export default Shell;
