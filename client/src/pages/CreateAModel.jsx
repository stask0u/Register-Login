import "./styles/CreateAModel.css";
import Question from "./components/Question";
import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import SingleModel from "./components/SingleModel";
import { Canvas, useFrame } from "@react-three/fiber";
import image1 from "../assets/kartinka1.png";
import image2 from "../assets/kartinka2.png";
import image3 from "../assets/kartinka3.png";


function Box({color, size, roughness, metalness}) {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[size/2,size/2,size/2]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function CreateAModel() {
  const questionData = {
    question: "Изберете вид двигател:",
    answers: ["Редови", "V-Образен", "Боксер"],
    question2:"Материал",
    answers2:["Излято желязо","Алуминий", "AlSi","Магнезий"]
  };
  const [color, setColor] = useState("orange");
  const [count, setCount] = useState(0);
  const [materialAndRoughness, setMatAndRough] = useState({roughness:0,metalness:0});
  const [pistonWidth, setPistonWidth] = useState(50) 
  const [pistonHeight, setPistonHeight] = useState(50)
  const [cc,setCc] = useState(0.00);

  const [subAnswers, setSubAnswers] = useState([]);

  const handleAnswerChange = (selectedAnswer) => {
    switch (selectedAnswer) {
      case "Редови":
        setColor('orange')
        setSubAnswers(["3", "4", "5", "6"]);
        break;
      case "V-Образен":
        setColor('yellow')
        setSubAnswers(["6", "8", "10", "12", "16"]);
        break;
      case "Боксер":
        setColor('blue')
        setSubAnswers(["4", "6"]);
        break;
      default:
        setColor("orange")
        setSubAnswers([]);
    }
  };

  const cylinderCountChange = (selectedAnswer)=>{
    setCount(selectedAnswer)
  }

  const handleMaterialChange = (selectedAnswer) =>{
    switch(selectedAnswer){
      case "Излято Желязо":setMatAndRough({roughness:0.8, metalness:0.7});break;
      case "Алуминий":setMatAndRough({roughness:0.3, metalness:0.9});break;
      case "AlSi":setMatAndRough({roughness:0.4, metalness:0.85});break;
      case "Магнезий":setMatAndRough({roughness:0.5, metalness:0.8});break;
    }
  }
  return (
    <>
      <Navbar/>
      <div className="pageBackground">
        
      <div className="sideBar">
        <div className="questionOne">
          <Question
            question={questionData.question}
            answers={questionData.answers}
            onAnswerChange={handleAnswerChange}
          />
          {subAnswers.length > 0 && (
            <Question question="Брой цилиндри:" answers={subAnswers} onAnswerChange={cylinderCountChange}/>
          )}
        </div>
        <Question
            question={questionData.question2}
            answers={questionData.answers2}
            onAnswerChange={handleMaterialChange}
          />
          <div className="queWithSliders">
            <div className="sliderDiv">
                <input type="range" min={50} max={120} onChange={(e)=>{setPistonWidth(e.currentTarget.value); setCc((Math.PI / 4) * Math.pow(e.currentTarget.value, 2) * pistonHeight * count)}} orient="vertical" className="slider" /> {//bore
                }
            </div>
            <div className="icons">
                  <div className="pistonData">
                      <img src={image1} width={"50px"} alt="image" id="pistonWidthImg" /> 
                      <p>{pistonWidth}</p>
                      <label htmlFor="pistonWidthImg">mm</label>
                  </div>
                  <div className="pistonData">
                  <img src={image2} width={"50px"} alt="image" id="middleImage" />
                      <p className="calculated">{Math.round(cc/1000)}</p>
                      <label htmlFor="middleImage">mm</label>
                  </div>
                  <div className="pistonData">
                    <img src={image3} width={"50px"} alt="image" id="pistonHeightImg" /> 
                      <p>{pistonHeight}</p>
                      <label htmlFor="pistonHeightImg">mm</label>
                      {//stroke
}
                  </div>
            </div>
            <div className="sliderDiv"> <input type="range" min={50} max={120} onChange={(e)=>{setPistonHeight(e.currentTarget.value); setCc((Math.PI / 4) * Math.pow(pistonWidth, 2) * e.currentTarget.value * count);console.log(cc)}} orient="vertical" className="slider" /></div>
          </div>

          <button className="createModelBtn">Create</button>
      </div>
      <div className="canvas">
        {
          color &&  <SingleModel MeshToRender={Box} meshProps={{ color: color, size:count, roughness:materialAndRoughness.roughness, metalness:materialAndRoughness.metalness }} />
        }
      </div>
    
    </div>
    </>
  );
}

export default CreateAModel;