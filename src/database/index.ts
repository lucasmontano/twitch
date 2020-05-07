import { MongoClient, Collection } from 'mongodb';

import { ConnectionOptions } from '../types/database';

class DatabaseClient extends MongoClient {
  public database!: string;

  constructor({ url, database }: ConnectionOptions) {
    super(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.database = database;
  }

  public getCollection<T>(collection: string): Collection<T> {
    return this.db(this.database).collection<T>(collection);
  }
}

export default DatabaseClient;
