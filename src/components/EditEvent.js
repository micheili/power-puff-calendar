import React, { useState, useEffect, useContext, useParams } from "react";
import moment from "moment";
import { Context } from "../App";
import Select from "react-select";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

const EditEvent = (props) => {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(false);
  const [invitesList, setinvitesList] = useState([]);
  const [context, updateContext] = useContext(Context);

  console.log("i edit event ", props.editEvent);
  let { id, userId, title, description, start, stop } = props.editEvent;

  useEffect(() => {
    setFormData({
      editedTitle: title,
      editedDescription: description,
      editedStartDate: start.split(" ")[0],
      editedStartTime: start.split(" ")[1],
      editedStopDate: stop.split(" ")[0],
      editedStopTime: stop.split(" ")[1],
    });
  }, []);

  let {
    editedTitle,
    editedDescription,
    editedStartDate,
    editedStartTime,
    editedStopDate,
    editedStopTime,
  } = formData;

  const loggedInUser = context.user.id;
  const usersData = context.allUsers.filter((u) => u.id !== loggedInUser);

  const handleInputChange = (e) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const options = usersData.map((user) => ({
    value: user.id,
    label: user.email,
  }));

  const handleInvites = (e) => {
    setinvitesList(e);
  };

  const cancel = () => {
    updateContext({ showEditEvent: false });
  };

  const getStart = new Date(editedStartDate + " " + editedStartTime);
  const editedStart = moment(getStart).format("YYYY-MM-DD HH:mm");

  const getStop = new Date(editedStopDate + " " + editedStopTime);
  const editedStop = moment(getStop).format("YYYY-MM-DD HH:mm");


  const validate = () => {
    let isValid = true;

    if (editedStart && editedStop !== undefined) {
      let startParse = Date.parse(editedStart);
      let stopParse = Date.parse(editedStop);
      let diff = (stopParse - startParse) / 1000;

      if (!(diff >= 900 && diff < 604800)) {
        isValid = false;
        setAlert("Sorry, the date and time interval you entered is invalid!");
      }
    }

    return isValid;
  };

  async function save(e) {
    e.preventDefault();

    if (validate()) {
      let result = await (
        await fetch("/api/Event/" + id, {
          method: "PUT",
          body: JSON.stringify({
            title: editedTitle,
            description: editedDescription,
            start: editedStart,
            stop: editedStop
          }),
          headers: { "Content-Type": "application/json" },
        })
      ).json();

      //error msg handling
      if (result.error === 403) {
        setAlert("Sorry, the date and time interval you entered is invalid!");
        return;
      } else if (result.error) {
        setAlert("You are not logged in ");
        return;
      }

      if (!result.error && invitesList.length) {
        const eventId = result.lastInsertRowid;
        for (var i = 0; i < invitesList.length; i++) {
          const invitedUser = invitesList[i].value;
          let inviteresult = await (
            await fetch("/api/Invite", {
              method: "POST",
              body: JSON.stringify({ eventId, invitedUser }),
              headers: { "Content-Type": "application/json" },
            })
          ).json();
        }
      }

      if (!result.error) {
        let events = await (await fetch("/api/myEvents/" + userId)).json();
        updateContext({ showEditEvent: false, myEvents: events });
      }

      setinvitesList("");

      return result;
    }
  }

  return (
    <Form onSubmit={save}>
      <Alert
        color="danger"
        isOpen={alert}
        toggle={() => {
          setAlert(false);
        }}
      >
        {alert}
      </Alert>
      <FormGroup>
        <Label for="eventTitle" className="event_label">
          Title
        </Label>
        <Input
          type="text"
          name="editedTitle"
          id="eventTitle"
          onChange={handleInputChange}
          value={editedTitle}
          required
          placeholder="Title"
        />
      </FormGroup>
      <FormGroup>
        <Label for="eventDescription">Description</Label>
        <Input
          type="textarea"
          name="editedDescription"
          id="eventDescription"
          onChange={handleInputChange}
          value={editedDescription}
          placeholder="Description"
        />
      </FormGroup>
      <Row>
        <Col xs="12" lg="7">
          <FormGroup>
            <Label for="eventStartDate">Start Date:</Label>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              name="editedStartDate"
              id="eventStartDate"
              placeholder="date placeholder"
              format="yyyy/MM/dd"
              onChange={handleInputChange}
              value={editedStartDate}
              required
              placeholder="start date"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup xs="12" lg="5">
            <Label for="eventStartTime">Start Time:</Label>
            <Input
              type="time"
              name="editedStartTime"
              id="eventStartTime"
              placeholder="startTime"
              onChange={handleInputChange}
              value={editedStartTime}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12" lg="7">
          <FormGroup>
            <Label for="eventEndDate">End Date:</Label>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              name="editedStopDate"
              id="eventEndDate"
              placeholder="date placeholder"
              onChange={handleInputChange}
              value={editedStopDate}
              required
              placeholder="stop date"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup xs="12" lg="5">
            <Label for="eventEndTime">End Time:</Label>
            <Input
              type="time"
              name="editedStopTime"
              id="eventEndTime"
              placeholder="time placeholder"
              onChange={handleInputChange}
              value={editedStopTime}
              required
              placeholder="stoptime"
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
      <Label for="eventEndTime">Invite:</Label>
        <Select options={options} onChange={handleInvites} isMulti />
      </FormGroup>

      <Button color="danger" onClick={cancel}>
        Cancel
      </Button>

      <Button className="button-submit" type="submit" value="save" >
        Submit
      </Button>
    </Form>
  );
};

export default EditEvent;
