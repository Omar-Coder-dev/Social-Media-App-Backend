import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.resolve("firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

// Use admin.messaging.Messaging to get the type correctly
export const messaging: admin.messaging.Messaging = admin.messaging();

export default admin;