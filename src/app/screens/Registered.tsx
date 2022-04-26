import React from "react";

const Registered = () => (
  <turbo-stream action="replace" target="message">
    <template>
      <div id="message" data-turbo-permanent>Registered!</div>
    </template>
  </turbo-stream>
);

export default Registered;
