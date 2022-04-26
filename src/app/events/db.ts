import PouchDB from "pouchdb";
import queriesDB from "@app/events/queries";
import commandsDB from "@app/events/commands";

let events: { [key: string]: PouchDB.Database<{}> } = {};

function replayEvent(event: PouchDB.Core.ChangesResponseChange<{}>) {
}

async function handleEvent(userDBName: string, event: PouchDB.Core.ChangesResponseChange<{}>) {
  const { doc } = event;
  const { name } = (doc as any);

  switch ((doc as any).type) {
    case 'query':
      const queries = await queriesDB(userDBName);

      await queries.post({
        name: name,
        timestamp: Date.now(),
      });
      break;
    case 'command':
      const commands = await commandsDB(userDBName);

      await commands.post({
        name: name,
        timestamp: Date.now(),
      });
      break;
  }
  if (name === 'register') {
    const commands = await commandsDB(userDBName);

    await commands.post({
      name: 'insert_user',
      timestamp: Date.now(),
    });
  }
  if (name === 'login') {
    const queries = await queriesDB(userDBName);

    await queries.post({
      name: 'user',
      timestamp: Date.now(),
    });
    const commands = await commandsDB(userDBName);

    await commands.post({
      name: 'start_session',
      timestamp: Date.now(),
    });
  }
  if (name === 'logout') {
    const commands = await commandsDB(userDBName);

    await commands.post({
      name: 'stop_session',
      timestamp: Date.now(),
    });
  }
}

export default async (userDBName: string) => {
  if (events[userDBName] === undefined || events[userDBName] === null) {
    events[userDBName] = new PouchDB(`http://localhost:5984/${userDBName}`, {
      skip_setup: true,
      auth: {
        username: "admin",
        password: "admin"
      }
    });

    events[userDBName].changes({
      since: 0,
      include_docs: true
    }).on('change', async (change) => replayEvent(change)
    ).on('complete', () => {}
    ).on('error', (err) => console.error('replay: ', err));

    events[userDBName].changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', async (change) => handleEvent(userDBName, change)
    ).on('complete', () => {}
    ).on('error', (err) => console.error('handle: ', err));
  }

  return events[userDBName];
};
