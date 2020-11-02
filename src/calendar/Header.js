import React, {useEffect, useState} from 'react';
import { Button, Container, Row } from 'reactstrap';
import FallImage from "./images/fall.jpg";
import WinterImage from "./images/winter.jpg";
import SpringImage from "./images/spring.jpg";
import SummerImage from "./images/summer.jpg";


export default function Header(){
    const [background, setBackground] = useState([]);
    const [font, setFont] = useState("");

    const setHeader = (background, font) =>{
        setBackground(background);
        setFont(font);
    };

    

    return(
        <div>
            <Container className="">
                <Row className="justify-content-center">
                    <img className="image-header" src={FallImage} alt="Header"></img>
                    <h1 className="title-header">{font}</h1>
                </Row>
                <Row className="justify-content-center ">
                        <Button onClick={()=> setHeader({FallImage}, "Fall")} color="secondary">Fall</Button>{' '}

                        <Button onClick={()=> setHeader({WinterImage}, "Winter")} color="secondary">Winter</Button>{' '}
                   
                        <Button onClick={()=> setHeader({SpringImage}, "Spring")} color="success">Spring</Button>{' '}
                   
                        <Button onClick={()=> setHeader({SummerImage}, "Summer")} color="success">Summer</Button>{' '}     
                </Row>
            </Container>
         
        </div>
    )
}