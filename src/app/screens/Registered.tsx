import React from "react";

const Registered = () => (
  <turbo-stream action="replace" target="message">
    <template>
      <div id="message">Registered!</div>
    </template>
  </turbo-stream>
);

export default Registered;
