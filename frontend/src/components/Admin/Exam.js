import React, { useEffect, useState } from 'react';
import '../../css/exam.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Exam = () => {
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [exam, setExam] = useState([]);
    const [noExamFound, setNoExamFound] = useState(false);

    async function getExam() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_WEB_URL}/api/exam/get-all-exam`);

            if (res.data.success) {
                setNoExamFound(true);
                setExam(res.data.allExam);

            } else {
                setNoExamFound(false);
            }
        } catch (error) {
            console.error("Errro fetching Exam:", error);
        }
    }

    async function edit(exam) {
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
    };

    async function deleteExam(id) {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_WEB_URL}/api/exam/delete-exam/${id}`);

            if (res.data.success) {
                getExam();
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

    function addQuestion(examId){
        navigate('/exam/show-question', {state: {examId: examId}});
    }

    useEffect(() => {
        if (user?.isAdmin) {
            setUserRole("Admin");
        } else {
            setUserRole("User");
        }
        getExam();

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

                <button className='add-exam' onClick={() => navigate('/exam/add')} >+Add Exam</button>

                <div className='table-exam-div'>
                    <div>
                        <table >
                            <tr >
                                <th>Exam Name</th>
                                <th>Duration</th>
                                <th>Category</th>
                                <th>Total Marks</th>
                                <th>Passing Marks</th>
                                <th>Action</th>
                            </tr>
                            {exam.map((exam) => (
                                <tr key={exam._id}>
                                    <td>{exam.name}</td>
                                    <td>{exam.duration}</td>
                                    <td>{exam.category}</td>
                                    <td>{exam.totalMark}</td>
                                    <td>{exam.passingMark}</td>
                                    <td>
                                        <button onClick={() => edit(exam)}>Edit</button>&emsp;
                                        <button onClick={() => deleteExam(exam._id)}>Delete</button>&emsp;
                                        <button onClick={() => addQuestion(exam._id)}>Add Qustion</button>
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

export default Exam;