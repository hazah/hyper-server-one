import index from "@server/routes";
import login from "@server/routes/login";
import logout from "@server/routes/logout";
import register from "@server/routes/register";

function routes(_x: any) {
  return [index, login, logout, register];
}

export default routes(({ root, resource, authenticated, unauthenticated }) => {
  root('index');
  
  unauthenticated(() => {
    resource('register', { only: ['get', 'post'] });
    resource('login', { only: ['get', 'post'] });
  });

  authenticated(() => {
    resource('logout', { only: 'delete' });
  });
});
