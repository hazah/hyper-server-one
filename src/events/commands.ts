import PouchDB from "pouchdb";

let commands: { [key: string]: PouchDB.Database<{}> } = {};

function replayCommand(command: PouchDB.Core.ChangesResponseChange<{}>) {
}

function handleCommand(command: PouchDB.Core.ChangesResponseChange<{}>) {
}

export default async (userDBName: string) => {
  if (commands[userDBName] === undefined || commands[userDBName] === null) {
    commands[userDBName] = new PouchDB(`http://localhost:5984/${userDBName}-commands`, {
      auth: {
        username: "admin",
        password: "admin"
      }
    });

    commands[userDBName].changes({
      since: 0,
      include_docs: true
    }).on('change', async (change) => replayCommand(change)
    ).on('complete', () => {}
    ).on('error', (err) => console.error('commands replay: ', err));

    commands[userDBName].changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', async (change) => handleCommand(change)
    ).on('complete', () => {}
    ).on('error', (err) => console.error('commands handle: ', err));
  }

  return commands[userDBName];
};
