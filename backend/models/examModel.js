const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    name: {type:String, require: true},
    duration: {type: Number, require: true},
    category:  {type: String, require: true},
    totalMark:{type: Number, require: true},
    passingMark:{type: Number, require: true},
    questions:{type: [mongoose.Schema.Types.ObjectId], ref: "questions", require: true}
});

const Exam = mongoose.model("exams", examSchema);
module.exports = Exam;