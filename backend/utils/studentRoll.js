
const Counter = require("../models/Counter");

const getNextRollNo = async () => {
  const counter = await Counter.findOneAndUpdate(
    { id: "studentRoll" },       // the counter document
    { $inc: { seq: 1 } },        // increment by 1
    { new: true, upsert: true }  // create if doesn't exist
  );
  return counter.seq;            // this is the new roll number
};

module.exports = getNextRollNo;