import PouchDB from "pouchdb";

let queries: { [key: string]: PouchDB.Database<{}> } = {};

function replayQuery(query: PouchDB.Core.ChangesResponseChange<{}>) {
}

function handleQuery(query: PouchDB.Core.ChangesResponseChange<{}>) {
}

export default async (userDBName: string) => {
  if (queries[userDBName] === undefined || queries[userDBName] === null) {
    queries[userDBName] = new PouchDB(`http://localhost:5984/${userDBName}-queries`, {
      auth: {
        username: "admin",
        password: "admin"
      }
    });

    queries[userDBName].changes({
      since: 0,
      include_docs: true
    }).on('change', async (change) => replayQuery(change)
    ).on('complete', () => {}
    ).on('error', (err) => console.error('queries replay: ', err));

    queries[userDBName].changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', async (change) => handleQuery(change)
    ).on('complete', () => {}
    ).on('error', (err) => console.error('queries handle: ', err));
  }

  return queries[userDBName];
};
