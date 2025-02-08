import React, { useEffect, useState } from 'react';
import '../css/home.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [exam, setExam] = useState([]);
    const [noExamFound, setNoExamFound] = useState(false);
    const navigate = useNavigate();

    const email = sessionStorage.getItem("userEmail");

    async function getUserData() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_WEB_URL}/api/users/${email}`);

            if (res.data.success) {
                setUser(res.data.user);
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                if(res.data.user.isAdmin){
                    setUserRole("Admin");
                } else{
                    setUserRole("User");
                }
                
            } else {

                console.error("Error fecting data");
            }
        } catch (error) {

        }
    };


    async function getExam() {
        try {
            //console.log(process.env.WEB_LINK);
            
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

    function logout(){
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userEmail");
        localStorage.removeItem("token");
        navigate('/login');
    }

    useEffect(() => {
        if (email === null) {
            navigate("/login"); // Redirect to login if no user
        }
        getUserData();
        getExam();
        //getAllExams();
    }, []);

    return (
        <div>

            <div className='div-box'>
                <div className='left-side-nav-bar'>

                    <div className='nav-bar'>
                        <div className='home-btn'>
                            <label>Home</label>
                        </div>

                        <div className='report-btn' onClick={()=>navigate('/reports')}>
                            <label>Reports</label>
                        </div>
                        
                        {user.isAdmin &&(
                            <div className='exam-btn' onClick={()=>navigate('/exam')}>
                                <label>Exam</label>
                            </div>
                        )}

                        <div className='logout-btn' onClick={logout}>
                            <label>Logout</label>
                        </div>
                    </div>

                </div>

                <div className='top-menu'>
                    <label className='title'>Quiz Application</label>
                    <div className='details'>
                        <label className='name'>Name: {user?.username}</label><br />
                        <label className='role'>Role: {userRole}</label>
                    </div>
                </div>

                <div className='main-exam-div'>
                    {/* Grid Container */}
                    <div className='grid-div-exam'>
                        {exam.map((exam) => (
                            <div className='item'
                             key={exam._id}>
                                <label id='exam-title'>{exam.name}</label><br/>
                                <div>
                                
                                <label>Category: {exam.category}</label><br/>
                                <label>Duration Marks: {exam.duration}</label><br/>
                                <label>Total Marks: {exam.totalMark}</label><br/>
                                <label>Passing Marks: {exam.passingMark}</label><br/>
                                <button onClick={()=>navigate('/user/start-exam', {state: {examId: exam._id}})}>Start Exam</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;