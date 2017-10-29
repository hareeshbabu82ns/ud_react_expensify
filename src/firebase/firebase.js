import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBhbyrGZol7KPZ3pePHxwPOlLkV6GETQaM",
  authDomain: "testgcdatastore.firebaseapp.com",
  databaseURL: "https://testgcdatastore.firebaseio.com",
  projectId: "testgcdatastore",
  storageBucket: "testgcdatastore.appspot.com",
  messagingSenderId: "383606851904"
};
firebase.initializeApp(config);

const databaseRef = firebase.database().ref("udemy-expensify");

export { firebase, databaseRef as default };

// const expensesRef = databaseRef.child("expenses");

// // subscription on firebse data
// expensesRef.on("child_removed", snapshot => {
//   console.log(snapshot.key);
// });
// expensesRef.on("child_changed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
// expensesRef.on("child_added", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// //subscribe for data changes
// expensesRef.on("value", snapshot => {
//   const expenses = [];
//   snapshot.forEach(expense => {
//     expenses.push({
//       id: expense.key,
//       ...expense.val()
//     });
//   });
//   console.log(expenses);
// });

// //fetch data once
// expensesRef.once("value").then(snapshot => {
//   const expenses = [];
//   snapshot.forEach(expense => {
//     expenses.push({
//       id: expense.key,
//       ...expense.val()
//     });
//   });
//   console.log(expenses);
// });

// //add entries
// expensesRef.push({
//   description: "Electricity Bill",
//   amount: "5000",
//   note: "bill for jan",
//   createdAt: Date.now()
// });

// //full update
// expensesRef.child("-KxbfXdYd5hoqb1lQJxj").set({
//   description: "Electricity Bill Chg"
// });

// //partial update
// expensesRef.child("-KxbfXddhlkifaoa3g8j").update({
//   note: "for Oct"
// });

// //remove data
// expensesRef
//   .child("-KxbfXddhlkifaoa3g8j")
//   .remove()
//   .then(() => {
//     console.log("removed");
//   });
