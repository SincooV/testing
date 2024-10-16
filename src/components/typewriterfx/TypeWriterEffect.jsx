import { useEffect, useState } from 'react';
import './typefx.css'
const TypewriterEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentText = ""; 
    for (let index = 0; index < text.length; index++) {
      setTimeout(() => {
        currentText += text[index];
        setDisplayedText(currentText); 
      }, speed * index);
    }

    return () => setDisplayedText(""); 
  }, [text, speed]);

  return <div><h1>{displayedText}</h1></div>;
};

export default TypewriterEffect;
