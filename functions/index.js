const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// https://bigcodenerd.org/create-user-profile-firestore-authentication/
const db = admin.firestore();
/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
    const { email, phoneNumber, uid } = userRecord;

    var emailSplit = email.split("@");
  
    return db
      .collection("users")
      .doc(uid)
      .set({ "Clinic":"PhysioBioMetrics", "Role":"Client","name":emailSplit[0]})
      .catch(console.error);
  };
  
  module.exports = {
    authOnCreate: functions.auth.user().onCreate(createProfile),
  };