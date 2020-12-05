import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
/** I was not sure on what was the use of index, and I renamed the prop names used in schema to match the prop names used in the data set. **/
/** Encapsulates state and variable values for this collection. */
class DatasCollection {
  constructor() {
    // The name of this collection.
    this.name = 'DatasCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      Device: { type: String, unique: true },
      Unique: { type: String }, // the people category displays the amount of people in a building
      Building: { type: String },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Datas = new DatasCollection();