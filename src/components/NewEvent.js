import React, { useState, useContext, useEffect, useMemo } from "react";
import moment from "moment";
import { Context } from "../App";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes,  faCheck } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

const NewEvent = () => {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(false); 
  const [alertCategory, setAlertCategory] = useState(false); 
  const [invitesList, setinvitesList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [catName, setCatName] = useState([]);
  const [listOfColor, setListOfColor] = useState([]);
  const [context, updateContext] = useContext(Context);


  const userId = context.user.id;
  const usersData = context.allUsers.filter((u) => u.id !== userId);
  const categories = context.myCategories;

  console.log("Categories", categories);
  console.log("context categories", context.myCategories)

  const handleInputChange = (e) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    const   handleCatChange = (e) =>
    setCatName({
      ...catName,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const options = usersData.map((user) => ({
    value: user.id,
    label: user.email,
  }));

 
 const allCategories = useMemo(() => (    
    categories.map((category) => ({
      value: category.id,
      label: category.name,
      color: category.color
    })) 
),[categories]);


  

  /*  $blue: #3C69E7;
      $green: #5AC18E;
      $purple: #8A2BE2;
      $yellow: #FFFF66;
      $orange: #FFA500;
      $red: #FF4040;
      $pink: #F7347A;
      $burgundy: #420420;
      $turquoise: #008080;
      $grey: #808080;*/

    const colorList = useMemo(() => [
    { value: "blue", label: "Blue", color: '#3C69E7' },
    { value: "green", label: "Green", color: '#5AC18E' },
    { value: "purple", label: "Purple", color: "#8A2BE2" },
    { value: "yellow", label: "Yellow", color: "#FFFF66" },
    { value: "orange", label: "Orange", color: "#FFA500" },
    { value: "red", label: "Red", color: "#FF4040" },
    { value: "pink", label: "Pink", color: "#F7347A" },
    { value: "burgundy", label: "Burgundy", color: "#420420" },
    { value: "turquoise", label: "Turquoise", color: "#008080" },
    { value: "grey", label: "Grey", color: "#808080" }    
  ],[]);

 
  const customStyles = useMemo(
    () => ({
      option: (provided, state) => ({
        ...provided,      
        color: "white" ,
        fontWeigth: "bold", 
        padding: 10,
        background: state.data.color,  
        	     
      }),
      control: (provided) => ({
        ...provided,  
        color: "white" ,
        fontWeigth: "bold",  
        background: "white",
        border: "3px solid #fbc5b8",
        borderRadius: "10px",
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color: "white" ,
        fontWeigth: "bold", 
        width: "80%",
        padding: 2, 
        textAlign: "center",       
        height: "80%",
        borderRadius: "10px",
        background: state.data.color,
      }),
    }),
    []
  );
  


  const handleCategories = (e) => {
    setCategoryList(e);
  };

  const handleInvites = (e) => {
    setinvitesList(e);
  };

  const handleColorList = (e) => {
    setListOfColor(e);
  };


 
  const cancel = () => {    
    updateContext({ showNewEvent: false });
  }

  let {
    title,
    description,
    startDate,
    stopDate,
    startTime,
    stopTime,
  } = formData;

  let {
    name
  } = catName;

  const getStart = new Date(startDate + " " + startTime);
  const start = moment(getStart).format("YYYY-MM-DD HH:mm");

  const getStop = new Date(stopDate + " " + stopTime);
  const stop = moment(getStop).format("YYYY-MM-DD HH:mm");

  

  //get category from selectlist
  const categoryId = () => {   
     if(!categoryList){
       return null} else {
         return categoryList.value
       }
  };

 
  const validate = () => {
    let isValid = true;

    if (start && stop !== undefined) {
      let startParse = Date.parse(start);
      let stopParse = Date.parse(stop);
      let diff = (stopParse - startParse) / 1000;

      if (!(diff >= 900 && diff < 604800)) {
        isValid = false;
        setAlert("Sorry, the date and time interval you entered is invalid!");
      }
    }

    return isValid;
  };

  

  const validateCategory = () => {
    let isValid = true;

    if (name && listOfColor.color  == undefined) {      
        isValid = false;        
        setAlertCategory("The name and the color are required");      
    }

    const categoryName = allCategories.filter((c) => c.label === name);
    console.log("catName", categoryName);
    
    if (categoryName.length > 0) {      
      isValid = false;        
      setAlertCategory("The name: " + name + " already exists.");      
    }

       

    return isValid;
  };

  async function createCategory(e) {
    e.preventDefault();
    

    if (validateCategory()) {
      let result = await (
        await fetch("/api/Category", {
          method: "POST",
          body: JSON.stringify({ name, color: listOfColor.color, className: listOfColor.value, userId,}),
          headers: { "Content-Type": "application/json" },
        })
      ).json();

      let fetchCategories = await (await fetch("/api/myCategories/" + userId)).json();
      updateContext({        
        myCategories: fetchCategories
      });

      return result;

    }
    
  }


  async function save(e) {
    e.preventDefault();
    

    if (validate()) {
      let result = await (
        await fetch("/api/Event", {
          method: "POST",
          body: JSON.stringify({ userId, title, description, start, stop, categoryId:categoryId() }),
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

      if(!result.error){
        let events = await (await fetch("/api/myEvents/" + userId)).json();        
        updateContext({ showNewEvent: false, myEvents: events });        
      }
      
      setinvitesList('');
      setFormData({
        title: '',
        description: '',
        startDate: '',
        stopDate: '',
        startTime: '',
        stopTime: '',
      });

      
      return result;
    }
  }

  

  return (
    <Form onSubmit={save}>
      <Breadcrumb>
        <BreadcrumbItem active>New Event</BreadcrumbItem>
      </Breadcrumb>
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
        <Label for="eventTitle" className="event_label">Title</Label>
        <Input
          type="text"
          name="title"
          id="eventTitle"
          onChange={handleInputChange}
          value={title}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="eventDescription">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="eventDescription"
          onChange={handleInputChange}
          value={description}
        />
      </FormGroup>
      <Row>
        <Col xs="12" lg="7">
          <FormGroup>
            <Label for="eventStartDate">Start Date:</Label>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              name="startDate"
              id="eventStartDate"
              placeholder="date placeholder"
              format="yyyy/MM/dd"
              onChange={handleInputChange}
              value={startDate}
              required
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup xs="12" lg="5">
            <Label for="eventStartTime">Start Time:</Label>
            <Input
              type="time"
              name="startTime"
              id="eventStartTime"
              placeholder="time placeholder"
              onChange={handleInputChange}
              value={startTime}
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
              name="stopDate"
              id="eventEndDate"
              placeholder="date placeholder"
              onChange={handleInputChange}
              value={stopDate}
              required
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup xs="12" lg="5">
            <Label for="eventEndTime">End Time:</Label>
            <Input
              type="time"
              name="stopTime"
              id="eventEndTime"
              placeholder="time placeholder"
              onChange={handleInputChange}
              value={stopTime}
              required
            />
          </FormGroup>
        </Col>
      </Row>      
      <Row className="d-flex justify-content-end">
        <Col xs="10" md="8" lg="10" className="align-self-end">
          <FormGroup>
            <Label>Category:</Label>
            <Select isClearable options={allCategories} styles={customStyles} onChange={handleCategories}/>
          </FormGroup>
        </Col>
        <Col xs="2" md="4" lg="2" className="align-self-end">                 
           <Button color="danger" className="newCategory float-right"><FontAwesomeIcon icon={faPlus}/></Button>
        </Col>
      </Row>     
      <hr></hr>
      <Alert
        color="danger"
        isOpen={alertCategory}
        toggle={() => {
          setAlertCategory(false);
        }}
      >
        {alertCategory}
      </Alert>
      <Row>        
          <Col xs="12" md="12" lg="6">
            <FormGroup>
              <Label for="category-name">Category Name</Label>
              <Input
                type="text"
                name="name"
                id="catName"
                onChange={handleCatChange}
                value={name}                       
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="12" lg="6">
            <FormGroup >          
              <Label>Color:</Label>
              <Select isClearable options={colorList} styles={customStyles} onChange={handleColorList}/>          
            </FormGroup>
          </Col>
        </Row>
        <Row>
        <Col xs="6"  lg="6" >                 
            <Button color="success" className="w-100" type="submit" onClick={createCategory}><FontAwesomeIcon icon={faCheck}/> Create Category</Button>
          </Col>
          <Col xs="6"  lg="6">                 
            <Button color="danger" className="w-100"><FontAwesomeIcon icon={faTimes}/> Cancel</Button>
          </Col>
      </Row> 
      <hr></hr>    
      <FormGroup>
        <Label>Invite:</Label>
        <Select  options={options} onChange={handleInvites} isMulti />
      </FormGroup>

      <Button color="danger" onClick={cancel}>
        Cancel
      </Button>

      <Button className="button-submit" type="submit" value="save">
        Submit
      </Button>
    </Form>
  );
};
export default NewEvent;
