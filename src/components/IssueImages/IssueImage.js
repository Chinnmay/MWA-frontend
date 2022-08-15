import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Badge, Button, Image, Modal, Spinner } from "react-bootstrap";
import S3 from "react-aws-s3";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SRLWrapper } from "simple-react-lightbox";
import ModalAlert from "../reusable/ModalAlert";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const styles = {
  imagesCardHeader: {
    backgroundColor: "#2d543e",
    color: "white",
    textAlign: "center",
    paddingTop: "2%",
    paddingBottom: "2%"
  },
  badgePill: { marginTop: "0.5rem" },
  commentsCardBody: {
    textAlign: "center",
    align: "center"
  },
  saveButton: {
    backgroundColor: "#2d543e",
    borderColor: "#2d543e"
  }
};

const IssueImages = (props) => {
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);
  const [viewAddImage, setViewAddImage] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteFileName, setDeleteFileName] = useState(null);
  const [issueImages, setIssueImages] = useState([]);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [showImageDangerAlert, setShowImageDangerAlert] = useState(false);
  const [showImageDangerAlert2, setShowImageDangerAlert2] = useState(false);
  const [showImageAlert2, setShowImageAlert2] = useState(false);
  const [showImageAlert3, setShowImageAlert3] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY
  };
  const ReactS3Client = new S3(config);
  const handleShow = (id, fileName) => {
    setShow(true);
    setDeleteID(id);
    setDeleteFileName(fileName.split(".com/")[1]);
  };
  useEffect(() => {
    setIssueImages(props.issueDetails.images);
  }, [props]);
  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = uuidv4();
    if (file != null) {
      setLoading(true);
      ReactS3Client.uploadFile(file, newFileName).then((data) => {
        setLoading(false);
        setViewAddImage(false);
        if (data.status === 204) {
          axios
            .post(`${process.env.REACT_APP_API_URL}/api/image/addImage`, {
              imageURL: data.location,
              issueID: props.issueDetails._id
            })
            .then(
              (res) => {
                if (res.data.message === "Image added successfully") {
                  props.reloadData();
                  setShowImageAlert(true);
                } else {
                  console.log(res);
                  setShowImageDangerAlert(true);
                }
              },
              (err) => {
                console.log(err.Message);
                setShowImageDangerAlert(true);
              }
            );
          console.log("success");
        } else {
          console.log("fail");
          setShowImageDangerAlert(true);
        }
      });
    } else {
      setShowImageAlert3(true);
    }
  };
  const handleDelete = (event) => {
    ReactS3Client.deleteFile(deleteFileName)
      .then((response) => {
        //console.log(response)
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/image/deleteImage`, {
            data: { imageID: deleteID, issueID: props.issueDetails._id }
          })
          .then(
            (res) => {
              if (res.data.message === "Image deleted successfully") {
                props.reloadData();
                setShowImageAlert2(true);
              } else {
                console.log(res);
                setShowImageDangerAlert2(true);
              }
            },
            (err) => {
              console.log(err.Message);
              setShowImageDangerAlert2(true);
            }
          );
      })
      .catch((err) => {
        console.error(err);
      });
    setDeleteID(null);
    handleClose();
  };

  return (
    <div>
      <Card>
        <Card.Header style={styles.imagesCardHeader}>
          <Row style={{ alignItems: "center" }}>
            <Col md={{ span: 3 }} xs={{ span: 6 }}>
              <h4 className="m-0 p-0">Images</h4>
            </Col>
            <Col xs={1}>
              <Badge pill variant="light" style={styles.badgePill}>
                {issueImages.length}
              </Badge>
            </Col>
            <Col md={{ span: 1, offset: 6 }} xs={{ span: 1, offset: 2 }}>
              <Button
                className="btn btn-light"
                onClick={() => {
                  setViewAddImage(true);
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={styles.commentsCardBody}>
          {viewAddImage ? (
            <Card>
              <Card.Body style={styles.commentsCardBody}>
                <div>
                  {loading ? (
                    <div>
                      <h3>Uploading</h3>
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <form className="upload-steps" onSubmit={handleClick}>
                      <label>
                        Upload file :
                        <input type="file" accept="image/*" ref={fileInput} />
                      </label>
                      <br />
                      <Row className="mt-2">
                        <Col xs={{ span: 1, offset: 3 }} md={{ span: 1, offset: 4 }}>
                          <Button style={styles.saveButton} size="sm" type="submit">
                            Upload
                          </Button>
                        </Col>
                        <Col md={{ span: 1, offset: 1 }} xs={{ span: 1, offset: 2 }}>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              setViewAddImage(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  )}
                </div>{" "}
              </Card.Body>
            </Card>
          ) : (
            <div></div>
          )}
          <div>
            <SRLWrapper>
              <Carousel responsive={responsive}>
                {issueImages &&
                  issueImages.map((eachImage) => (
                    <div>
                      <a href={eachImage.imageURL} rel="noopener noreferrer" target="_blank">
                        <Image
                          src={eachImage.imageURL}
                          style={{ width: "300px", height: "300px", objectFit: "cover" }}
                          fluid
                          thumbnail
                        ></Image>
                      </a>
                      <Button
                        style={{ align: "center", topMargin: "2%" }}
                        variant="danger"
                        size="sm"
                        onClick={() => handleShow(eachImage._id, eachImage.imageURL)}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ))}
              </Carousel>
            </SRLWrapper>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#2d543e", color: "white" }} closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Image will be deleted permanently. Please confirm!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete({});
            }}
          >
            Delete Permanently
          </Button>
        </Modal.Footer>
      </Modal>
      {showImageAlert && (
        <ModalAlert size="lg" variant="success" message="Image added successfully" resetCallback={setShowImageAlert} />
      )}
      {showImageDangerAlert && (
        <ModalAlert
          size="lg"
          variant="danger"
          message="Image not added! Please try again."
          resetCallback={setShowImageDangerAlert}
        />
      )}
      {showImageDangerAlert2 && (
        <ModalAlert
          size="lg"
          variant="danger"
          message="Image not deleted! Please try again."
          resetCallback={setShowImageDangerAlert2}
        />
      )}
      {showImageAlert2 && (
        <ModalAlert
          size="lg"
          variant="success"
          message="Image has been deleted permanently"
          resetCallback={setShowImageAlert2}
        />
      )}
      {showImageAlert3 && (
        <ModalAlert
          size="lg"
          variant="danger"
          message="Image cannot be empty. Please select a image!"
          resetCallback={setShowImageAlert3}
        />
      )}
    </div>
  );
};

export default IssueImages;
