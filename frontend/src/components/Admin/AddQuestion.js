import React, { useEffect, useState } from 'react';
import '../../css/addExam.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddQuestion = () => {
    const location = useLocation();
    const examId = location.state?.examId;
    const edit = location.state?.editDetails || { isEdit: false };

    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [correctOption, setCorrectOption] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    

    const user = JSON.parse(sessionStorage.getItem("user"));

    /*function setEditDeatils() {
        setExamName(edit.name);
        setExamDuration(edit.duration);
        setExamCategory(edit.category);
        setTotalMark(edit.totalMark);
        setPassingMark(edit.passingMark);
        setBtnValue("Edit");
    };*/

    async function addQuestion(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.WEB_URL}/api/exam/add-question`, {
                name: question,
                correctOption: correctOption,
                options: {
                    A: optionA,
                    B: optionB,
                    C: optionC,
                    D: optionD
                },
                exam:examId
            });
            
            if (res.data.success) {
                alert("Question Added Successfully");
            } else {
                alert("Exam not added");
            }
        } catch (error) {
            console.error("Question not added",error);

        }
    };

   /* async function editExam() {
        
        try {
            const res = await axios.patch(`http://localhost:5000/api/exam/edit-exam/${edit.id}`, {
                name: examName,
                duration: examDuration,
                category: examCategory,
                totalMark: totalMark,
                passingMark: passingMark
            });

            if (res.data.success) {
                navigate('/exam');
            }
        } catch (error) {
            console.error("Errro Editing Exam:", error);
        }
    };*/

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

        // if (edit.isEdit) {
        //     setEditDeatils();
        // }

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

                <label className='add-exam-label'>Add Question</label>

                <div className="form-container">

                    <form className="exam-form" onSubmit={addQuestion}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Question</label>
                                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter Question" />

                            </div>

                            <div className="form-group">
                                <label>Correct Option</label>
                                <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
                                    <option value="">Select Option</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>

                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Option A</label>
                                <input type="text" value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Enter Option A" />
                            </div>

                            <div className="form-group">
                                <label>Option B</label>
                                <input type="text" value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Enter Option B" />
                            </div>

                            <div className="form-group">
                                <label>Option C</label>
                                <input type="text" value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Enter Option C" />
                            </div>

                            <div className="form-group">
                                <label>Option D</label>
                                <input type="text" value={optionD} onChange={(e) => setOptionD(e.target.value)} placeholder="Enter Option D" />
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button type="button" className="btn-cancel" onClick={() => navigate('/exam/show-question')}>Cancel</button>
                            <button type="submit" className="btn-save">Save</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;