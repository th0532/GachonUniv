import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../css/CouncilButton.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    buttondiv: {
        width: "51%",
        margin: "0 auto",
        padding: "1%",
    },
    button: {
        backgroundColor: "#5CACF2",
        color: "white",
    },
}));

function CouncilButton(props) {
    const classes = useStyles();

    let collegeData = props.collegeData;
    let majorData = props.majorData;

    return (
        <div id="buttondiv" className={classes.buttondiv}>
            <Link to={`/councileditor/${collegeData}/${majorData}`}>
                <Button id="Button" className={classes.button} variant="contained">
                    이행 인증
                </Button>
            </Link>
        </div>
    );
}

export default CouncilButton;
