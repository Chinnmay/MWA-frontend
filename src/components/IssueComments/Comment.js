import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Container, Row, Col, Card, Badge, Button, Form, Image } from "react-bootstrap";
import pencilImage from "../../assets/images/editPencil.png";
import moment from "moment";
const styles = {
  saveButton: {
    backgroundColor: "#2d543e",
    borderColor: "#2d543e"
  },
  cancelButton: {
    backgroundColor: "red"
  },
  commentBody: {
    paddingTop: "2%",
    paddingBottom: "2%"
  }
};

const Comment = (props) => {
  const [comment, setComment] = useState({});
  const [commentState, setCommentState] = useState("view");
  useEffect(() => {
    setComment(props.comment);
  }, [props]);
  useEffect(() => {}, [comment]);
  return Object.keys(comment).length > 0 && !comment["_id"] > 0 ? (
    <Card>
      <Card.Body style={styles.commentBody}>
        <Row noGutters={true}>
          <Col xs={1}>
            <Avatar name={comment.commentByName} round={true} size="2rem" textSizeRatio={2} />
          </Col>
          <Col xs={11}>
            <Row noGutters={true}>
              <Col xs={{ offset: 1 }} md={{ offset: 0 }}>
                <p style={{ fontWeight: "600" }} className="m-0 p-0">
                  {comment.commentByName}
                </p>
              </Col>
            </Row>
            <Row noGutters={true}>
              <Col xs={{ offset: 1 }} md={{ offset: 0 }}>
                <Form.Control
                  type="text"
                  placeholder="Enter comment"
                  onChange={(e) => {
                    var t = JSON.parse(JSON.stringify(comment));
                    t["comment"] = e.target.value;
                    setComment(t);
                  }}
                  value={comment.comment}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={{ span: 1, offset: 3 }} md={{ span: 1, offset: 5 }}>
            <Button
              style={styles.saveButton}
              size="sm"
              onClick={() => {
                props.saveComment(comment);
              }}
            >
              Save
            </Button>
          </Col>
          <Col md={{ span: 1, offset: 0 }} xs={{ span: 1, offset: 1 }}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                props.popComment();
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  ) : Object.keys(comment).length > 0 && commentState === "view" ? (
    <Card>
      <Card.Body style={styles.commentBody}>
        <Row noGutters={true}>
          <Col xs={1}>
            <Avatar name={comment.commentBy.fullName} round={true} size="2rem" textSizeRatio={2} />
          </Col>
          <Col xs={11}>
            <Row noGutters={true}>
              <Col xs={{ offset: 1, span: 10 }} md={{ offset: 0 }}>
                <p style={{ fontWeight: "600" }} className="m-0 p-0">
                  {comment.commentBy.fullName}
                </p>
              </Col>
              {comment.commentBy.fullName === JSON.parse(localStorage.getItem("user")).fullName && (
                <Col xs={{ span: 1 }}>
                  <Button
                    className="m-0 p-0"
                    size="sm"
                    variant="link"
                    onClick={() => {
                      setCommentState("edit");
                    }}
                  >
                    <Image src={pencilImage} height="18rem" />
                  </Button>
                </Col>
              )}
            </Row>
            <Row noGutters={true}>
              <Col xs={{ offset: 1 }} md={{ offset: 0 }}>
                <p className="m-0 p-0">{moment(comment.createdAt).fromNow()}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={{ offset: "1" }}>
            <p>{comment.comment}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  ) : (
    Object.keys(comment).length > 0 &&
    commentState === "edit" && (
      <Card>
        <Card.Body style={styles.commentBody}>
          <Row noGutters={true}>
            <Col xs={1}>
              <Avatar name={comment.commentBy.fullName} round={true} size="2rem" textSizeRatio={2} />
            </Col>
            <Col xs={11}>
              <Row noGutters={true}>
                <Col xs={{ offset: 1 }} md={{ offset: 0 }}>
                  <p style={{ fontWeight: "600" }} className="m-0 p-0">
                    {comment.commentBy.fullName}
                  </p>
                </Col>
              </Row>
              <Row noGutters={true}>
                <Col xs={{ offset: 1 }} md={{ offset: 0 }}>
                  <Form.Control
                    type="text"
                    placeholder="Enter comment"
                    onChange={(e) => {
                      var t = JSON.parse(JSON.stringify(comment));
                      t["comment"] = e.target.value;
                      setComment(t);
                    }}
                    value={comment.comment}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={{ span: 1, offset: 3 }} md={{ span: 1, offset: 5 }}>
              <Button
                style={styles.saveButton}
                size="sm"
                onClick={() => {
                  props.saveComment(comment);
                  setCommentState("view");
                }}
              >
                Save
              </Button>
            </Col>
            <Col md={{ span: 1, offset: 0 }} xs={{ span: 1, offset: 1 }}>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  props.reloadData();
                  setCommentState("view");
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  );
};

export default Comment;
