import React from "react";

const Shell = ({ html, htmlAttributes, bodyAttributes, title, meta, style, script, link, sheets }) => (
  <html {...htmlAttributes}>
    <head>
      {title}
      {meta}
      {link}
      {style}
      {sheets}
      {script}
    </head>
    <body {...bodyAttributes} dangerouslySetInnerHTML={{ __html: html }}/>
  </html>
);

export default Shell;
