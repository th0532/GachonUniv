import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectCode } from "../Common";
import SelectCollege from "./CouncilSelect";
import CouncilChart from "./CouncilChart";
import CouncilListButton from "./CouncilListButton";
import CouncilCarousel from "./CouncilCarousel";
import CouncilButton from "./CouncilButton";
import "../css/HeaderPoster.css";
import "../css/CouncilSelect.css";

const CouncilPoster = require("../../../img/Council.png");

const Council = (props) => {
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState([""]);
    const [carouselData, setCarouselData] = useState([""]);
    const voteCandidate = useSelector((state) => state.voteCandidate);
  
    const [authority, setAuthority] = useState("");
    const [collegeId, setCollegeId] = useState("");
    const [deptId, setDeptId] = useState("");


    useEffect(() => {
        dispatch({
            type: "UPDATE_MENU",
            id: 1,
            name: "학생회",
        });
        fetchSelectCode(dispatch);
    });

    const dataDispatch = (collegeData, majorData) => {
        fetchDataApi(collegeData, majorData);
    };

    const fetchDataApi = async (collegeData, majorData) => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/${collegeData}/${majorData}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setChartData(data.council[0][0]);
                    setCarouselData(data.council[1]);
                });
            } else {
                console.log("server error");
            }
        });
    };
    useEffect(() => {
        fetchDataApi(0, 0);
        setAuthority(window.sessionStorage.getItem("authority"));
        setCollegeId(window.sessionStorage.getItem("collegeId"));
        setDeptId(window.sessionStorage.getItem("deptId"));
    }, []);

    const state = useSelector((state) => state.voteMenu);

    return (
        <div>
            <img id="NoticePoster" src={CouncilPoster} alt="학생회 이미지"></img>
            <br></br>
            <div>
                <SelectCollege dataDispatch={dataDispatch} />
            </div>
            <br></br>
            <div>
                <CouncilChart chartData={chartData} />
            </div>
            <br></br>
            <div>
                <CouncilListButton collegeData={chartData.collegeId} majorData={chartData.deptId} authority={authority} collegeId={collegeId} deptId={deptId}/>
            </div>
            <div>
                <CouncilCarousel carouselData={carouselData} />
            </div>
            {authority == 0 || authority == 1 && collegeId == chartData.collegeId && deptId == chartData.deptId ?
                <div>
                    <CouncilButton collegeData={chartData.collegeId} majorData={chartData.deptId} />
                </div>
                :
                ""
            }
        </div>
    );
};

export default Council;
