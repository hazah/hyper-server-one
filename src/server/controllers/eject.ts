import authDB from "@server/auth/db";
import eventsDB from "events/db";
import getUserDBName from "@util/user_db_name";

export { theme } from "theme";

export async function erase({ format, redirect }) {
  const users = await authDB();
  
  const { userCtx: { name }} = await users.session();
  const email = atob(name);
  
  const response = await users.logOut();
  
  if (response.ok) {
    const events = await eventsDB(getUserDBName(email));

    await events.post({
      name: 'logout',
      timestamp: Date.now(),
    });
  }

  format({
    "text/html": () => redirect("/"),
  });
}
