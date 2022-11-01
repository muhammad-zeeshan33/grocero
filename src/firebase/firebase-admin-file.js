const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const deleteUserById = async (uid) => {
  try {
    const res = await admin.auth().deleteUser(uid);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// const getAllUsers = async () => {
//   try {
//     const res = await getAuth().listUsers();
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getAllUsers();
