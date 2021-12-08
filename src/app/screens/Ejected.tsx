import React from "react";

const Ejected = () => (
  <turbo-stream action="replace" target="message">
    <template>
      <div id="message" data-turbo-permanent>Ejected!</div>
    </template>
  </turbo-stream>
);

export default Ejected;
