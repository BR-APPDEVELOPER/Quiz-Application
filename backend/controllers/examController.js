const ExamColloection = require('../models/examModel');
const QuestionCollection = require('../models/questionModel');
const mongoose = require('mongoose');

const addExam = async(req, res)=>{
    const{name, duration, category, totalMark, passingMark} = req.body;
    try {
        const question = await ExamColloection.create({name, duration, category, totalMark, passingMark});
        
        if(!question){
            return res.json({success: false});
        }

        return res.json({success: true});
    } catch (error) {
        
    }
};

const getAllExam = async(req, res)=>{
    try{
        const allExam = await ExamColloection.find({});
        if(allExam.length === 0){
            return res.json({success: false});
        }

        return res.json({success: true, allExam});
    } catch(error){
        console.error("Error fetching exams:", error); // Debugging
        return res.json({success: false});
    }
};

const editExam = async(req, res)=>{
    const id = req.params.id;
    const {name, duration, category, totalMark, passingMark} = req.body;
    try{
        const editExam = await ExamColloection.findByIdAndUpdate(
            id,
            {$set: {name, duration, category, totalMark, passingMark}
        });

        if(!editExam){
            return res.json({success: false});
        }

        return res.json({success: true, editExam});
    } catch(error){
        console.error("Error editing exams:", error); // Debugging
        return res.json({success: false});
    }
};

const deleteExam = async(req, res)=>{
    const id = req.params.id;

    try{
        const deletedExam = await ExamColloection.findByIdAndDelete(id);

        if(!deletedExam){
            return res.json({success: false});
        }

        return res.json({success: true});
    } catch(error){
        console.error("Error deleting exams:", error); // Debugging
        return res.json({success: false});
    }
};

const addQuestion = async(req, res)=>{
    const{name, correctOption, options, exam} = req.body;
    try {
        const question = await QuestionCollection.create({name, correctOption, options, exam});
        
        if(!question){
            return res.json({success: false});
        }

        return res.json({success: true});
    } catch (error) {
        
    }
};

const getQuestion = async(req, res)=>{
    const id = req.params.id;
    try{
        const allQuestion = await QuestionCollection.find({exam:id}, '_id name correctOption options exam');
        if(allQuestion.length === 0){
            return res.json({success: false});
        }

        return res.json({success: true, allQuestion});
    } catch(error){
        console.error("Error fetching questions:", error); // Debugging
        return res.json({success: false});
    }
};

const getStartedExam = async(req, res)=>{
    const id = req.params.examId;

    try{
        const examDetail = await QuestionCollection.find({exam: id});

        if(!examDetail){
            return res.json({success: false});
        }

        return res.json({success: true, examDetail});
    } catch(error){
        console.error("Error examDetail exams:", error); // Debugging
        return res.json({success: false});
    }
};


const getExamDetails = async(req, res)=>{
    const id = req.params.examId;

    try{
        const examDetails = await ExamColloection.findOne({_id: id});

        if(!examDetails){
            return res.json({success: false});
        }

        return res.json({success: true, examDetails});
    } catch(error){
        console.error("Error examDetail exams:", error); // Debugging
        return res.json({success: false});
    }
};

const deleteQuestion = async(req, res)=>{
    const id = req.params.id;

    try{
        const deletedQus = await ExamColloection.findByIdAndDelete(id);

        if(!deletedQus){
            return res.json({success: false});
        }

        return res.json({success: true});
    } catch(error){
        console.error("Error deleting question:", error); // Debugging
        return res.json({success: false});
    }
};

module.exports ={addExam, getAllExam, editExam, deleteExam, addQuestion, getQuestion, deleteQuestion, getStartedExam, getExamDetails};