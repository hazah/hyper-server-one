import home from "@server/routes/home";
import about from "@server/routes/about";
import authenticate from "@server/routes/authenticate";
import eject from "@server/routes/eject";
import register from "@server/routes/register";

function routes(_x: any) {
  // for now just hard coded to return all the screens we have
  return [home, about, authenticate, eject, register];
}

// NOTE: verb choce is based on avoiding conflicts with keywords (cannot use 'new' or 'delete' for example.)

// resource verbs: index, display, fresh, make, revise, amend, erase
export default routes(({ root, resource, authenticated, unauthenticated }) => {
  root('home', 'display');
  resource('about', { only: 'display' });
  
  unauthenticated(() => {
    resource('register', { only: ['fresh', 'make'] });
    resource('authenticate', { only: ['fresh', 'make'] });
  });

  authenticated(() => {
    resource('eject', { only: 'erase' });
  });
});
