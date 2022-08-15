import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import Comment from "./Comment";
const styles = {
  commentsCardHeader: {
    backgroundColor: "#2d543e",
    color: "white",
    textAlign: "center"
  },
  badgePill: { marginTop: "0.5rem" },
  commentsCardBody: {
    maxHeight: "30rem",
    overflowY: "scroll",
    margin: "0px",
    padding: "0px"
  }
};

const IssueComments = (props) => {
  const [issueComments, setIssueComments] = useState([]);

  useEffect(() => {
    setIssueComments(props.issueDetails.comments);
    console.log("From IssueComments----------------->", props.issueDetails);
  }, [props]);

  const popComment = (comment) => {
    var t = JSON.parse(JSON.stringify(issueComments));
    t.shift();
    setIssueComments(t);
  };

  const saveComment = (comment) => {
    comment["issueID"] = props.issueDetails._id;
    if (comment["commentByName"]) {
      delete comment["commentByName"];
    }
    console.log(comment);
    if (comment._id) {
      //edit flow
      axios.post(`${process.env.REACT_APP_API_URL}/api/comment/editComment`, comment).then(
        (res) => {
          if (res.status === 200) {
            console.log("Comment edited successfully");
            props.reloadData();
          } else {
            console.log(res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/api/comment/addComment`, comment).then(
        (res) => {
          if (res.status === 200) {
            console.log("Comment added successfully");
            props.reloadData();
          } else {
            console.log(res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  useEffect(() => {
    console.log("Issue Comments Rerendered");
  }, [issueComments]);
  return (
    <Card>
      <Card.Header style={styles.commentsCardHeader}>
        <Row style={{ alignItems: "center" }}>
          <Col md={{ span: 3 }} xs={{ span: 6 }}>
            <h4 className="m-0 p-0">Comments</h4>
          </Col>
          <Col xs={1}>
            <Badge pill variant="light" style={styles.badgePill}>
              {issueComments ? issueComments.length : 0}
            </Badge>
          </Col>
          <Col md={{ span: 1, offset: 6 }} xs={{ span: 1, offset: 2 }}>
            <Button
              className="btn btn-light"
              onClick={() => {
                var t = JSON.parse(JSON.stringify(issueComments));
                var newArr = [];
                newArr.push({
                  comment: "",
                  commentBy: JSON.parse(localStorage.getItem("user"))._id,
                  commentByName: JSON.parse(localStorage.getItem("user")).fullName //TODO: get localStorage name
                });
                t.map((eachOld) => newArr.push(eachOld));
                setIssueComments(newArr);
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body style={styles.commentsCardBody}>
        {issueComments &&
          issueComments.map((eachComment) => (
            <Comment
              comment={eachComment}
              popComment={popComment}
              saveComment={saveComment}
              reloadData={props.reloadData}
            />
          ))}
      </Card.Body>
    </Card>
  );
};

export default IssueComments;
