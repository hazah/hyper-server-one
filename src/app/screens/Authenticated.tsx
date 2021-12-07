import React from "react";

const Authenticated = () => (
  <turbo-stream action="replace" target="message">
    <template>
      <div id="message" data-turbo-permanent>Authenticated!</div>
    </template>
  </turbo-stream>
);

export default Authenticated;
