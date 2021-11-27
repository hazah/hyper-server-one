export default function routes(builder: (methods: any) => void) {
  let implementation;

  if (typeof window === "undefined") {
    implementation = require("@infra/http/router").default;
    return implementation(builder);
  }
}
