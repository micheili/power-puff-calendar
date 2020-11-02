import React from "react";
import {
  CardHeader,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const Infobox = (props) => {
  // const props = { date, title, invitedGuests };

  return (
    <Row>
      <Col sm="6" lg="3">
        <Card>
          <CardHeader>
            <div className="float-left">The Date You've chosen</div>
            <div>
              <span href="#" id="addEventHover">
                <Button className="float-right" color="warning">
                  +
                  <UncontrolledTooltip
                    placement="right"
                    target="addEventHover"
                  >
                    Add new event
                  </UncontrolledTooltip>
                </Button>{" "}
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <CardTitle>Here you can see events and stuff</CardTitle>
            <CardSubtitle>
              maybe create your own event and invite people?
            </CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Infobox;
