import React from "react";

const Shell = ({ html, htmlAttributes, bodyAttributes, Title, Meta, Style, Script, Link }) => (
  <html {...htmlAttributes}>
    <head>
      <Meta/>
      <Title/>
      <Link/>
      <Style/>
      <Script/>
    </head>
    <body {...bodyAttributes}>
      <div id="root"  dangerouslySetInnerHTML={{ __html: html }}/>
    </body>
  </html>
);

export default Shell;
