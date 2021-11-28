export default function routes(builder: (methods: any) => void) {
  return (type: "server" | "client") => {
    let implementation: (builder: (methods: any) => void) => any;

    switch (type) {
    case "server":
      implementation = require("@infra/http/router").default;
      break;
    case "client":
      implementation = require("@infra/react/router").default;
      break;
    }
    return implementation(builder);
  };
}
