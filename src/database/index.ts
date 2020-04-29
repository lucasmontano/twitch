import mongoose from 'mongoose';

class DataBase {
  mongoConnection: typeof mongoose;

  constructor() {
    this.mongo();
  }

  private async mongo(): Promise<void> {
    try {
      this.mongoConnection = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DataBase();
