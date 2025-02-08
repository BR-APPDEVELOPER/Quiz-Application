const express = require('express');
const { createUser, loginUser, getUserData} = require('../controllers/userController');
const { addExam, getAllExam, editExam, deleteExam, addQuestion, getQuestion, getStartedExam, getExamDetails} = require('../controllers/examController');

const router = express.Router();

//user request
router.post('/users/signup', createUser);
router.post('/users/login', loginUser);
router.get('/users/:email', getUserData);

//admin and exam request
router.post('/admin/exam/add', addExam);
router.get('/exam/get-all-exam', getAllExam);
router.patch('/exam/edit-exam/:id', editExam);
router.delete('/exam/delete-exam/:id', deleteExam);

//add question
router.post('/exam/add-question', addQuestion);
router.get('/exam/get-all-question/:id', getQuestion);

//start exam
router.get('/users/exam/:examId', getStartedExam);
router.get('/users/exam-detail/:examId', getExamDetails);

module.exports = router;