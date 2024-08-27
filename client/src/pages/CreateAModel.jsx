import "./styles/CreateAModel.css";
import Question from "./components/Question";
import { useState, useRef, useEffect, Suspense } from "react";
import Navbar from "./components/Navbar";
import SingleModel from "./components/SingleModel";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stats } from '@react-three/drei';
import image1 from "../assets/kartinka1.png";
import image2 from "../assets/kartinka2.png";
import image3 from "../assets/kartinka3.png";

function Model({ url, materialProps,scale  }) {
  const { nodes, materials } = useGLTF(url);

  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} geometry={nodes.Cube.geometry} material={materials.Material} scale={scale}>
      <meshStandardMaterial attach="material" {...materialProps} />
    </mesh>
  );
}

function CreateAModel() {
  const questionData = {
    question: "Изберете вид двигател:",
    answers: ["Редови", "V-Образен", "Боксер"],
    question2: "Материал",
    answers2: ["Излято желязо", "Алуминий", "AlSi", "Магнезий"]
  };
  const [type, setType] = useState("");
  const [count, setCount] = useState(0);
  const [materialAndRoughness, setMatAndRough] = useState({ roughness: 0, metalness: 0 });
  const [pistonWidth, setPistonWidth] = useState(50);
  const [pistonHeight, setPistonHeight] = useState(50);
  const [cc, setCc] = useState(0.00);
  const [subAnswers, setSubAnswers] = useState([]);

  const handleAnswerChange = (selectedAnswer) => {
    switch (selectedAnswer) {
      case "Редови":
        setType('redovi');
        setSubAnswers(["3", "4", "5", "6"]);
        break;
      case "V-Образен":
        setType('vobrazen');
        setSubAnswers(["6", "8", "10", "12", "16"]);
        break;
      case "Боксер":
        setType('boxer');
        setSubAnswers(["4", "6"]);
        break;
      default:
        setType("redovi");
        setSubAnswers([]);
    }
  };

  const cylinderCountChange = (selectedAnswer) => {
    setCount(Number(selectedAnswer));
  }

  const handleMaterialChange = (selectedAnswer) => {
    switch (selectedAnswer) {
      case "Излято Желязо":
        setMatAndRough({ roughness: 0.8, metalness: 0.7 });
        break;
      case "Алуминий":
        setMatAndRough({ roughness: 0.3, metalness: 0.9 });
        break;
      case "AlSi":
        setMatAndRough({ roughness: 0.4, metalness: 0.85 });
        break;
      case "Магнезий":
        setMatAndRough({ roughness: 0.5, metalness: 0.8 });
        break;
      default:
        setMatAndRough({ roughness: 0.5, metalness: 0.5 });
    }
  };

  const modelUrl = `../../public/EngineModels/${type}${count}cilindura.glb`;

  const scale = [1, 1, 5];
  return (
    <>
      <Navbar />
      <div className="pageBackground">
        <div className="sideBar">
          <div className="questionOne">
            <Question
              question={questionData.question}
              answers={questionData.answers}
              onAnswerChange={handleAnswerChange}
            />
            {subAnswers.length > 0 && (
              <Question question="Брой цилиндри:" answers={subAnswers} onAnswerChange={cylinderCountChange} />
            )}
          </div>
          <Question
            question={questionData.question2}
            answers={questionData.answers2}
            onAnswerChange={handleMaterialChange}
          />
          <div className="queWithSliders">
            <div className="sliderDiv">
              <input type="range" min={50} max={120} onChange={(e) => {
                setPistonWidth(e.currentTarget.value); 
                setCc((Math.PI / 4) * Math.pow(e.currentTarget.value, 2) * pistonHeight * count);
              }} orient="vertical" className="slider" /> {/* Bore */}
            </div>
            <div className="icons">
              <div className="pistonData">
                <img src={image1} width={"50px"} alt="image" id="pistonWidthImg" /> 
                <p>{pistonWidth}</p>
                <label htmlFor="pistonWidthImg">mm</label>
              </div>
              <div className="pistonData">
                <img src={image2} width={"50px"} alt="image" id="middleImage" />
                <p className="calculated">{Math.round(cc / 1000)}</p>
                <label htmlFor="middleImage">cc</label>
              </div>
              <div className="pistonData">
                <img src={image3} width={"50px"} alt="image" id="pistonHeightImg" /> 
                <p>{pistonHeight}</p>
                <label htmlFor="pistonHeightImg">mm</label>
              </div>
            </div>
            <div className="sliderDiv">
              <input type="range" min={50} max={120} onChange={(e) => {
                setPistonHeight(e.currentTarget.value); 
                setCc((Math.PI / 4) * Math.pow(pistonWidth, 2) * e.currentTarget.value * count);
              }} orient="vertical" className="slider" /> {/* Stroke */}
            </div>
          </div>

          <button className="createModelBtn">Create</button>
        </div>
        <div className="canvas">
          
            { count && type && <SingleModel MeshToRender={() => <Model url={modelUrl} materialProps={materialAndRoughness} scale={scale} />} />}
          
        </div>
      </div>
    </>
  );
}

export default CreateAModel;
