import routes from "@infra/router";

// NOTE: verb choce is based on avoiding conflicts with
// keywords (cannot use 'new' or 'delete' for example.)

// resource verbs:
//
// index, display, fresh, make, revise, amend, erase

export default routes(
  ({ root, resource, authenticated, unauthenticated, verbs: { display } }) => {
    root("home", display);
    resource("about", { only: display });

    unauthenticated(({ resource, verbs: { fresh, make } }) => {
      resource("register", { only: [fresh, make] });
      resource("authenticate", { only: [fresh, make] });
    });

    authenticated(({ resource, verbs: { erase, display } }) => {
      resource("profile", { only: display });
      resource("eject", { only: erase });
    });
  }
);
