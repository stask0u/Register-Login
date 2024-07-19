import "./styles/CreateAModel.css";
import Question from "./components/Question";
import { useState } from "react";
import Navbar from "./components/Navbar";

function CreateAModel() {
  const questionData = {
    question: "Изберете вид двигател:",
    answers: ["Редови", "V-Образен", "Боксер"],
    onhover:"",
    question2:"Материал",
    answers2:["Излято желязо","Алуминий", "AlSi","Магнезий"]
  };
  

  const [subAnswers, setSubAnswers] = useState([]);

  const handleAnswerChange = (selectedAnswer) => {
    switch (selectedAnswer) {
      case "Редови":
        setSubAnswers(["3", "4", "5", "6"]);
        break;
      case "V-Образен":
        setSubAnswers(["6", "8", "10", "12", "16"]);
        break;
      case "Боксер":
        setSubAnswers(["4", "6"]);
        break;
      default:
        setSubAnswers([]);
    }
  };
  return (
    <div className="pageBackground">
        <Navbar/>
      <div className="sideBar">
        <div className="questionOne">
          <Question
            question={questionData.question}
            answers={questionData.answers}
            onAnswerChange={handleAnswerChange}
          />
          {subAnswers.length > 0 && (
            <Question question="Брой цилиндри:" answers={subAnswers} />
          )}
        </div>
        <Question
            question={questionData.question2}
            answers={questionData.answers2}
          />
      </div>
      <div className="canvas"></div>
      <button className="createModelBtn">Create</button>
    </div>
  );
}

export default CreateAModel;
