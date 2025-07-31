import React from "react";
import img0 from "../Hangman-img/0.png";
import img1 from "../Hangman-img/1.png";
import img2 from "../Hangman-img/2.png";
import img3 from "../Hangman-img/3.png";
import img4 from "../Hangman-img/4.png";
import img5 from "../Hangman-img/5.png";
import img6 from "../Hangman-img/6.png";
import '../styles/Hangman.css'

function Hangman({ addPart }) {
    const images = [img0, img1, img2, img3, img4, img5, img6];
    const shownParts = addPart > 0 ? images.slice(0, addPart + 1) : [img0];
    
    return (
        <div className="flex flex-column items-center w-100 h-100 hang-container">
            <div className="relative w-100 h-100 flex items-center justify-center hang">
                {shownParts.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Hangman part ${index}`}
                        className="absolute top-0 left-0 parts"
                    />
                ))}
            </div>
        </div>
    );
}

export default Hangman;