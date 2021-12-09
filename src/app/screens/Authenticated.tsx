import React from "react";

const Authenticated = ({ user }) => (
  <turbo-stream action="replace" target="message">
    <template>
      <div id="message" data-turbo-permanent>{JSON.stringify(user)}</div>
    </template>
  </turbo-stream>
);

export default Authenticated;
