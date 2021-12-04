import React from "react";

const Shell = ({ html, htmlAttributes, bodyAttributes, title, meta, style, script, link }) => (
  <html {...htmlAttributes}>
    <head>
      {title}
      {meta}
      {link}
      {style}
      {script}
    </head>
    <body {...bodyAttributes}>
      <div id="root"  dangerouslySetInnerHTML={{ __html: html }}/>
    </body>
  </html>
);

export default Shell;
