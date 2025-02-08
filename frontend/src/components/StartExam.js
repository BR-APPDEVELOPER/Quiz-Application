import React, { useEffect, useState } from 'react';
import '../css/startExam.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const StartExam = () => {
    const [userRole, setUserRole] = useState('');
    const [exam, setExam] = useState([]);
    const [examDetail, setExamDetail] = useState([]);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState({});
    const [count, setCount] = useState(10);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [scoreArray, setScoreArray] = useState([]);


    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const location = useLocation();
    const examId = location.state?.examId;

    async function getExamQuesion() {
        try {
            const res = await axios.get(`${process.env.WEB_URL}/api/users/exam/${examId}`);
            if (res.data.success) {
                setExam(res.data.examDetail);
                setScoreArray(new Array(res.data.examDetail.length).fill(0));
            }
        } catch (error) {
            console.error("Error fetching Exam question: ", error);
        }
    };

    async function getExamDetails() {
        try {
            const res = await axios.get(`${process.env.WEB_URL}/api/users/exam-detail/${examId}`);
            if (res.data.success) {
                setExamDetail(res.data.examDetails);
                //setCount(Number(res.data.examDetails.duration) || 0);
            } else {
                console.log("Error fetching exam details");
            }
        } catch (error) {
            console.error("Error fetching exam details: ", error);
        }
    };

    const handleOptionChange = (questionIndex, selectedOption) => {

        setAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption
        }));

        if (exam[questionIndex]?.correctOption === selectedOption) {
            setScoreArray(scoreArray.map((num, i) => (i === questionIndex ? 1 : num)));
            console.log(scoreArray);
        } else {
            setScoreArray(scoreArray.map((num, i) => (i === questionIndex ? 0 : num)));
            console.log(scoreArray);
        }
    };

    const handleNext = () => {
        if (currentQuestion < exam.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        let totalScore = 0;
        scoreArray.map((num, index) => (
            totalScore += num
        ));
        setScore(totalScore);
        setShowResult(true);
    };

    useEffect(() => {
        if (user?.isAdmin) {
            setUserRole("Admin");
        } else {
            setUserRole("User");
        }
        getExamQuesion();
        getExamDetails();
    }, []);

    useEffect(() => {
        if (count > 0) {
            const interval = setInterval(() => {
                setCount(prevCount => prevCount - 1);
            }, 1000);

            return () => clearInterval(interval); // Cleanup on unmount or re-render
        }
    }, [count]); // Runs when count change

    useEffect(() => {
        if (count === 0) {
            handleSubmit(); // Execute only when count reaches 0
        }
    }, [count]); // Runs when count changes


    return (
        <div className='div-box'>
            <div className='left-side-nav-bar'>
                <div className='nav-bar'>
                    <div className='home-btn' onClick={() => navigate('/home')}><label>Home</label></div>
                    <div className='report-btn' onClick={() => navigate('/reports')}><label>Reports</label></div>
                    {user?.isAdmin && (
                        <div className='exam-btn' onClick={() => navigate('/exam')}>
                            <label>Exam</label>
                        </div>
                    )}
                </div>
            </div>

            <div className='top-menu'>
                <label className='title'>Quiz Application</label>
                <div className='details'>
                    <label className='name'>Name: {user?.username}</label><br />
                    <label className='role'>Role: {userRole}</label>
                </div>
            </div>

            <div className="quiz-container">

                {!showResult && (
                    <div>
                        <h2>Test name: {examDetail.name}</h2>
                        <div className="question">
                            <span className="question-number">{currentQuestion + 1} :</span>
                            <span className="question-text">{exam[currentQuestion]?.name}</span>
                            <div className="timer">{count}</div>
                        </div>
                        <div className="options">
                            {exam[currentQuestion]?.options &&
                                Object.keys(exam[currentQuestion].options).map((key) => {
                                    const value = exam[currentQuestion].options[key];
                                    return (
                                        <label key={key} className={`option ${answers[currentQuestion] === key ? "selected" : ""}`}>
                                            <input
                                                type="radio"
                                                name={`option-${currentQuestion}`}
                                                checked={answers[currentQuestion] === key}
                                                onChange={() => handleOptionChange(currentQuestion, key)}
                                            />
                                            {`${key}: ${value}`}
                                        </label>
                                    );
                                })}
                        </div>
                        <div className="buttons">
                            <button
                                className="previous-button"
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                            >
                                Previous
                            </button>
                            {currentQuestion === exam.length - 1 ? (
                                <button className="submit-button" onClick={handleSubmit}>
                                    Submit
                                </button>
                            ) : (
                                <button className="next-button" onClick={handleNext}>
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {showResult && (


                    <div className="result-container">
                        <h2 className="result-title">RESULT</h2>
                        <hr className="result-divider" />
                        <div className="result-details">
                            <p>Total Marks : {examDetail.totalMark}</p>
                            <p>Obtained Marks : {score}</p>
                            <p>Wrong Answers : {exam.length - score}</p>
                            <p>Passing Marks : {examDetail.passingMark}</p>
                            <p>VERDICT : {score >= examDetail.passingMark ? "Pass" : "Fail"}</p>
                        </div>
                        <div className="result-actions">
                            <button className="btn btn-retake" onClick={() => setShowResult(false)}>
                                Retake Exam
                            </button>
                            <button className="btn btn-review" onClick={() => navigate("/home")}>
                                Done
                            </button>
                        </div>
                    </div>


                )}

            </div>
        </div>
    );
};

export default StartExam;
