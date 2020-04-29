import {
  Schema, Document, Model, model,
} from 'mongoose';

export interface ParticipantData extends Document {
  name: string,
  points: number
}

const ParticipantSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
);

export default model<ParticipantData>('Participant', ParticipantSchema);
