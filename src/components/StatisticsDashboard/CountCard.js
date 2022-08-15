import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedNumber from "react-animated-number";
import { faCheckCircle, faHourglassHalf, faExclamationTriangle, faTractor } from "@fortawesome/free-solid-svg-icons";

export default function CountCard(props) {
  const getHeaderColor = (heading) => {
    if (heading.includes("Completed")) return "#8dea8d";
    if (heading.includes("In Progress")) return "#a4ccec";
    if (heading.includes("On Hold")) return "#ea9677";
    if (heading.includes("Total Farmers")) return "#fff981";
  };
  const getIcon = (heading) => {
    if (heading.includes("Completed")) return [faCheckCircle, "green"];
    if (heading.includes("In Progress")) return [faHourglassHalf, "blue"];
    if (heading.includes("On Hold")) return [faExclamationTriangle, "#bf202f"];
    if (heading.includes("Total Farmers")) return [faTractor, "#8B4513"];
  };

  const styles = {
    header: {
      textAlign: "center",
      paddingTop: "5%",
      paddingBottom: "5%",
      paddingLeft: "0",
      paddingRight: "0",
      backgroundColor: getHeaderColor(props.heading)
    },
    body: {
      textAlign: "center",
      paddingTop: "1%",
      paddingBottom: "1%"
    }
  };

  return (
    <Card className="mb-2">
      <Card.Header style={styles.header}>
        <h6>{props.heading}</h6>
        <FontAwesomeIcon icon={getIcon(props.heading)[0]} color={getIcon(props.heading)[1]} size="lg" />
      </Card.Header>
      <Card.Body style={styles.body}>
        <AnimatedNumber component="h1" value={props.count} duration={500} stepPrecision={0} />
      </Card.Body>
    </Card>
  );
}
