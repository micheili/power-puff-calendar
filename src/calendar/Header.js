import React, {useEffect, useContext} from 'react';
import { Button, Container, Row } from 'reactstrap';
import FallImage from "./images/fall.jpg";
import WinterImage from "./images/winter.jpg";
import SpringImage from "./images/spring.jpg";
import SummerImage from "./images/summer.jpg";
import { Context } from "../App";


export default function Header(){
    const [context, updateContext] = useContext(Context);
    const header = context.header;

    
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
        updateContext({
            header:{background : background, font : font }
          });
          localStorage.setItem("header", JSON.stringify(header) );
    };

     console.log('context', context.header)
  


    return(
        <div>
            <Container className="">
                <Row className="justify-content-center">
                    <img className="image-header" src={context.header.background} ></img>
                    <h1 className="title-header">{context.header.font}</h1>
                </Row>
                <Row className="button-container justify-content-center justify-content-between ">
                        <Button onClick={()=> setHeader(FallImage, "Fall")} color="secondary">Fall</Button>{' '}
                        <Button onClick={()=> setHeader(WinterImage, "Winter")} color="secondary">Winter</Button>{' '}
                        <Button onClick={()=> setHeader(SpringImage, "Spring")} color="success">Spring</Button>{' '}
                        <Button onClick={()=> setHeader(SummerImage, "Summer")} color="success">Summer</Button>{' '}     
                </Row>
            </Container>
        </div>
    )
}