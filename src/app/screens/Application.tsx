import React from "react";

const Application = ({ html }) => (
  <html>
    <body dangerouslySetInnerHTML={{ __html: html }}/>
  </html>
);

export default Application;
