import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Datas = new Mongo.Collection('Datas');

/** Create a schema to constrain the structure of documents associated with this collection. */
const DataSchema = new SimpleSchema({
  dateTime: String,
  Unique: Number,
  Building: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Datas.attachSchema(DataSchema);

/** Make the collection and schema available to other code. */
export { Datas, DataSchema };
