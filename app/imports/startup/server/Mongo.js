import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Datas } from '../../api/dataDensity/Datas';
/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
// eslint-disable-next-line no-unused-vars
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.Building} (${data.Unique})`);
  Datas.insert(data);
}

/** Initialize the collection if empty. */
if (Datas.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Datas.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  // eslint-disable-next-line no-unused-vars
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.densityData.map(data => addData(data));
}
