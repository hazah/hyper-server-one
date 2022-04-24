import authDB from "@server/auth/db";
import eventsDB from "@app/events/db";
import getUserDBName from "@util/user_db_name";

export { theme } from "theme";

export async function erase({ format, render }) {
  const users = await authDB();
  
  const { userCtx: { name }} = await users.session();
  const email = atob(name);
  
  const response = await users.logOut();
  
  if (response.ok) {
    const events = await eventsDB(getUserDBName(email));

    events.post({
      name: 'logout',
      timestamp: Date.now(),
    });
  }

  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Ejected" }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
