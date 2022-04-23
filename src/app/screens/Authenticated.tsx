import React from "react";
import { useAuth } from "@infra/AuthProvider";

const Authenticated = () => {
  const auth = useAuth();
  
  return (
    <turbo-stream action="replace" target="message">
      <template>
        <div id="message" data-turbo-permanent>{JSON.stringify(auth.user)}</div>
      </template>
    </turbo-stream>
  )
};

export default Authenticated;
