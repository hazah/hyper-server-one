import PouchDB from "pouchdb";

let events: { [key: string]: PouchDB.Database<{}> } = {};

function replayEvent(event: PouchDB.Core.ChangesResponseChange<{}>) {
}

function handleEvent(event: PouchDB.Core.ChangesResponseChange<{}>) {
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
    }).on('change', async (change) => handleEvent(change)
    ).on('complete', () => {}
    ).on('error', (err) => console.error('handle: ', err));
  }

  return events[userDBName];
};
