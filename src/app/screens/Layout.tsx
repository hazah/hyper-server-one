import React from "react";

const Layout = ({ html }) => (
  <html>
    <body dangerouslySetInnerHTML={{ __html: html }}/>
  </html>
);

export default Layout;
