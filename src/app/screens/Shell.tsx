import React from "react";

const Shell = ({ html, htmlAttributes, bodyAttributes, title, meta, style, script, link, sheets }) => (
  <html {...htmlAttributes}>
    <head>
      {title}
      {meta}
      {link}
      {process.env.NODE_ENV === 'development' && 
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap" rel="stylesheet"/>}
      {style}
      {sheets}
      {script}
    </head>
    <body {...bodyAttributes}>
      <div id="root" dangerouslySetInnerHTML={{ __html: html }}/>
    </body>
  </html>
);

export default Shell;
