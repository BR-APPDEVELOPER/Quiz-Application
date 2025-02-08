import React, { useEffect, useState } from 'react';
import '../../css/exam.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ShowQuestion = () => {
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [allQuestion, setAllQuestion] = useState([]);
    const [noExamFound, setNoExamFound] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("user"));
    const location = useLocation();
    const id = location.state?.examId;

    async function getQuestion() {
        
        try {
            const res = await axios.get(`${process.env.WEB_URL}/api/exam/get-all-question/${id}`);

            if (res.data.success) {
                setNoExamFound(true);
                setAllQuestion(res.data.allQuestion);
                console.log(res.data.allQuestion);
                
            } else {
                setNoExamFound(false);
            }
        } catch (error) {
            console.error("Errro fetching question:", error);
        }
    }

    /*async function edit(exam) {
        const editDetails = {
            isEdit: true,
            id: exam._id,
            name: exam.name,
            duration: exam.duration,
            category: exam.category,
            totalMark: exam.totalMark,
            passingMark: exam.passingMark
        }
        navigate('/exam/add', { state: { editDetails: editDetails } });
    };*/

    async function deleteQuestion(id) {
        try {
            const res = await axios.delete(`${process.env.WEB_URL}/api/exam/delete-question/${id}`);

            if (res.data.success) {
                getQuestion();
            }
        } catch (error) {
            console.error("Errro Deleteing Exam:", error);
        }
    };

    function logout() {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userEmail");
        localStorage.removeItem("token");
        navigate('/login');
    }

    useEffect(() => {
        if (user?.isAdmin) {
            setUserRole("Admin");
        } else {
            setUserRole("User");
        }
        getQuestion();

    }, []);

    return (
        <div>

            <div className='div-box'>
                <div className='left-side-nav-bar'>

                    <div className='nav-bar'>
                        <div className='home-btn' onClick={() => navigate('/home')}>
                            <label>Home</label>
                        </div>

                        <div className='report-btn' onClick={() => navigate('/reports')}>
                            <label>Reports</label>
                        </div>

                        {user.isAdmin && (
                            <div className='exam-btn' onClick={() => navigate('/exam')}>
                                <label>Exam</label>
                            </div>
                        )}

                        <div className='logout-btn' onClick={logout}>
                            <label>Logout</label>
                        </div>
                    </div>

                </div>

                <div className='exam-top-menu'>
                    <label className='title'>Quiz Application</label>
                    <div className='details'>
                        <label className='name'>Name: {user?.username}</label><br />
                        <label className='role'>Role: {userRole}</label>
                    </div>
                </div>

                <button className='add-exam' onClick={() => navigate('/exam/add-question', {state: {examId: id}})} >+Add Question</button>

                <div className='table-exam-div'>
                    <div>
                        <table >
                            <tr >
                                <th>Question</th>
                                <th>Correct Option</th>
                                <th>Options</th>
                                <th>Action</th>
                            </tr>
                            {allQuestion.map((question) => (
                                <tr key={question._id}>
                                    <td>{question.name}</td>
                                    <td>{question.correctOption}</td>
                                    
                                    <td>A: {question.options.A}<br></br> 
                                        B: {question.options.B}<br></br>
                                        C: {question.options.C}<br></br>
                                        D: {question.options.D}<br></br>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteQuestion(question._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </table>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShowQuestion;