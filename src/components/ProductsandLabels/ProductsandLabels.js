import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AddProductsandLabels from "./AddProductsandLabels";
import ViewProductsandLabels from "./ViewProductsandLabels";
import LoadingSpinner from "../reusable/LoadingSpinner";

export default function ProductsandLabels() {
  const history = useHistory();
  const styles = {
    container: {
      marginTop: "5rem"
    },
    containerCardHeader: {
      backgroundColor: "#2d543e",
      color: "white",
      textAlign: "center",
      padding: "2%"
    }
  };

  const [products, setProducts] = useState([]);
  const [labels, setLabels] = useState([]);
  const [productState, setProductState] = useState("");
  const [labelState, setLabelState] = useState("");
  const [selectedVal, setSelectedVal] = useState({});
  const [fetching, setFetching] = useState(true);

  const reloadProductsandLabels = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/getProducts`).then(
      (res) => {
        if (res.status === 200) {
          setProducts(res.data);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    axios.get(`${process.env.REACT_APP_API_URL}/api/label/getLabels`).then(
      (res) => {
        if (res.status === 200) {
          setFetching(false);
          setLabels(res.data);
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const setSelectedField = (field) => {
    setSelectedVal(JSON.parse(JSON.stringify(field)));
  };

  const setFieldState = (fs, field) => {
    if (field === "product") setProductState(fs);
    else setLabelState(fs);
  };
  useEffect(() => {
    setFetching(true);
    reloadProductsandLabels();
  }, []);
  useEffect(() => {
    console.log("Component re-rendered");
  }, [products, labels, selectedVal, productState, labelState]);
  return fetching ? (
    <div style={{ marginTop: "5rem" }}>
      <LoadingSpinner />
    </div>
  ) : (
    <Container fluid style={styles.container}>
      <Row>
        <Col md={6} className="mb-3">
          <Card className="pb-3">
            <Card.Header style={styles.containerCardHeader}>
              <Row style={{ alignItems: "center" }}>
                <Col xs={{ span: 8, offset: 1 }} md={{ span: 9, offset: 1 }}>
                  <h4 className="m-0 p-0">Products</h4>
                </Col>
                <Col xs={1}>
                  <Button
                    className="btn-light"
                    onClick={() => {
                      setFieldState("add", "product");
                      setSelectedField({});
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {productState.length > 0 && (
                <AddProductsandLabels
                  type="product"
                  reloadProductsandLabels={reloadProductsandLabels}
                  selectedField={selectedVal}
                  fieldState={productState}
                  setSelectedField={setSelectedField}
                  setFieldState={setFieldState}
                />
              )}
              <ViewProductsandLabels
                type="product"
                values={products}
                setSelectedField={setSelectedField}
                setFieldState={setFieldState}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="pb-3">
            <Card.Header style={styles.containerCardHeader}>
              <Row style={{ alignItems: "center" }}>
                <Col xs={{ span: 8, offset: 1 }} md={{ span: 9, offset: 1 }}>
                  <h4 className="m-0 p-0">Labels</h4>
                </Col>
                <Col xs={1}>
                  <Button
                    className="btn-light"
                    onClick={() => {
                      setFieldState("add", "label");
                      setSelectedVal({});
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {labelState.length > 0 && (
                <AddProductsandLabels
                  type="label"
                  reloadProductsandLabels={reloadProductsandLabels}
                  selectedField={selectedVal}
                  fieldState={labelState}
                  setSelectedField={setSelectedField}
                  setFieldState={setFieldState}
                />
              )}
              <ViewProductsandLabels
                type="label"
                values={labels}
                setSelectedField={setSelectedField}
                setFieldState={setFieldState}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
