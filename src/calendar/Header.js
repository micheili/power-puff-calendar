import React, {useEffect, useContext} from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import FallImage from "./images/fall.jpg";
import WinterImage from "./images/winter.jpg";
import SpringImage from "./images/spring.jpg";
import SummerImage from "./images/summer.jpg";
import { Context } from "../App";
import ThemeChanger from "../components/ThemeChanger"


export default function Header(){
    const [context, updateContext] = useContext(Context);
        
    useEffect(() => {
      const currentHeader = localStorage.getItem("header");
      let currentHeaderJson = JSON.parse(currentHeader)
  
      if (currentHeaderJson) {
        updateContext({
          header: currentHeaderJson,
        });
      }
    }, []);
  
      const setHeader = (background, font) =>{
        const currentHeaderFromPage = {background : background, font : font }        
          updateContext({
              header:{background : background, font : font }
            });
          localStorage.setItem("header", JSON.stringify(currentHeaderFromPage));
      };
  
    return(
        <div>
            <Container>
              {localStorage.getItem("header") !==null ? 
                <Row className="justify-content-center">
                    <img className="image-header" src={context.header.background} ></img>
                    <h1 className="title-header">{context.header.font}</h1>
                </Row>
              :
                <Row>
                  <div className="speach-bubble float-left mb-3">
                    <p className="speach-bubble-text ml-2 mt-2">Choose a header that you like</p>
                  </div>
                </Row>
              }
          
                <Row className="button-container mt-2 mb-2">
                  <Col className="col-lg-8 d-flex justify-content-between  d-flex justify-content-center">
                    <Button className={`header-btn ${context.colorTheme}`} onClick={()=> setHeader(FallImage, "Fall")} color="secondary">Fall</Button>
                    <Button className={`header-btn ${context.colorTheme}`} onClick={()=> setHeader(WinterImage, "Winter")} color="secondary">Winter</Button>
                    <Button className={`header-btn ${context.colorTheme}`} onClick={()=> setHeader(SpringImage, "Spring")} color="secondary">Spring</Button>
                    <Button className={`header-btn ${context.colorTheme}`} onClick={()=> setHeader(SummerImage, "Summer")} color="secondary">Summer</Button>
                  </Col>
                  <Col className="col-lg-4 d-flex justify-content-center">
                    <ThemeChanger/> 
                  </Col>
                </Row>
            </Container>
        </div>
    )
}