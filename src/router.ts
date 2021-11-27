import index from "@server/routes";
import about from "@server/routes/about";
import authenticate from "@server/routes/authenticate";
import eject from "@server/routes/eject";
import register from "@server/routes/register";

function routes(_x: any) {
  return [index, about, authenticate, eject, register];
}

export default routes(({ root, resource, authenticated, unauthenticated }) => {
  root('index');
  
  unauthenticated(() => {
    resource('register', { only: ['get', 'post'] });
    resource('authenticate', { only: ['get', 'post'] });
  });

  authenticated(() => {
    resource('eject', { only: 'delete' });
  });
});
