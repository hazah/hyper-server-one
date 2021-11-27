import routes from "@infra/http/router";

// NOTE: verb choce is based on avoiding conflicts with keywords (cannot use 'new' or 'delete' for example.)

// resource verbs: index, display, fresh, make, revise, amend, erase
export default routes(({ root, resource, authenticated, unauthenticated, verbs }) => {
  const { display } = verbs;

  root('home', display);
  resource('about', { only: display });
  
  unauthenticated(({ resource, verbs }) => {
    const { fresh, make } = verbs;
    resource('register', { only: [fresh, make] });
    resource('authenticate', { only: [fresh, make] });
  });

  authenticated(({ resource, verbs }) => {
    const { erase } = verbs;
    resource('eject', { only: erase });
  });
});
