import React, { useEffect, useState } from "react";

export default function NotesCard(props) {
    const { cardData, activeNote, handleActiveData, checkNullData, notesData, setNotesData, setIsNew, searchedArray, isList, selectedData, setSelectedData } = props;
    const [isShiftPressed, setIsShiftPressed] = useState(false);

    let classOnActive = activeNote.id == cardData.id ? " active" : "";
    let classOnSelected = selectedData.includes(cardData.id) ? " selected" : "";

    function handleClick(data) {

        if(isShiftPressed) {
            setSelectedData([data.id])
        }else {
            handleActiveData(data);
            setSelectedData([data.id])
            if(data.id != activeNote.id) {
                setIsNew(false);
                let filteredData = checkNullData(notesData);
                setNotesData(filteredData);
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", function () {
            setIsShiftPressed(true);
        });
        document.addEventListener("keypress", function () {
            setIsShiftPressed(true);
        });
        document.addEventListener("keyup", function () {
            setIsShiftPressed(false);
        });
    }, []);

    return (

        <div className={`notes-card${classOnActive}${classOnSelected}`} onClick={() => handleClick(cardData)}>
            {isList && <h2 className="notes-card__title">{cardData.title ? cardData.title : "New Note"}</h2>}

            {isList && <div className="notes-card__desc">
                <span className="notes-card__time">{cardData.editDate ? cardData.editDate : cardData.createDate}</span>
                <p className="notes-card__text">{cardData.subtitle ? cardData.subtitle : "No additional text"}</p>
            </div>}

            {!isList && <div className="notes-card__report">
                {cardData.desc}
            </div>}
        </div>
    );
}