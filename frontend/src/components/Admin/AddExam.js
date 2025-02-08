import React, { useEffect, useState } from 'react';
import '../../css/addExam.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddExam = () => {
    const location = useLocation();
    const edit = location.state?.editDetails || { isEdit: false };

    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [examName, setExamName] = useState('');
    const [examDuration, setExamDuration] = useState('');
    const [examCategory, setExamCategory] = useState('');
    const [totalMark, setTotalMark] = useState('');
    const [passingMark, setPassingMark] = useState('');
    const [btnValue, setBtnValue] = useState('Save');

    const user = JSON.parse(sessionStorage.getItem("user"));

    function setEditDeatils() {
        setExamName(edit.name);
        setExamDuration(edit.duration);
        setExamCategory(edit.category);
        setTotalMark(edit.totalMark);
        setPassingMark(edit.passingMark);
        setBtnValue("Edit");
    };

    async function addExam() {
        
        try {
            const res = await axios.post("http://localhost:5000/api/admin/exam/add", {
                name: examName,
                duration: examDuration,
                category: examCategory,
                totalMark: totalMark,
                passingMark: passingMark
            });

            if (res.data.success) {
                alert("Exam Added Successfully");
            } else {
                alert("Exam not added");
            }
        } catch (error) {
            console.error(error);

        }
    };

    function editOrSave(e) {
        e.preventDefault();
        if (edit.isEdit) {
            editExam();
        } else {
            addExam();
        }
    }

    async function editExam() {
        
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

        if (edit.isEdit) {
            setEditDeatils();
        }

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

                <label className='add-exam-label'>Add Exam</label>

                <div className="form-container">

                    <form className="exam-form" onSubmit={editOrSave}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Exam Name</label>
                                <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="Enter Exam Name" />

                            </div>

                            <div className="form-group">
                                <label>Exam Duration</label>
                                <input type="number" value={examDuration} onChange={(e) => setExamDuration(e.target.value)} placeholder="Enter Duration (mins)" />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select value={examCategory} onChange={(e) => setExamCategory(e.target.value)}>
                                    <option value="">Select Category</option>
                                    <option value="Math">Math</option>
                                    <option value="Science">Science</option>
                                    <option value="History">History</option>
                                </select>
                            </div>

                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Total Marks</label>
                                <input type="number" value={totalMark} onChange={(e) => setTotalMark(e.target.value)} placeholder="Enter Total Marks" />
                            </div>

                            <div className="form-group">
                                <label>Passing Marks</label>
                                <input type="number" value={passingMark} onChange={(e) => setPassingMark(e.target.value)} placeholder="Enter Passing Marks" />
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button type="button" className="btn-cancel" onClick={() => navigate('/exam')}>Cancel</button>
                            <button type="submit" className="btn-save">{btnValue}</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExam;