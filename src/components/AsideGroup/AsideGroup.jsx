import React from "react";
import NotesCard from "../NotesCard/NotesCard";

export default function AsideGroup(props) {
    const { groupData, groupDate, activeNote, handleActiveData, checkNullData, notesData, setNotesData, setIsNew, searchedArray, isSearch, isList, selectedData, setSelectedData } = props;
    let newDate = new Date();
    let currentDate = newDate.toLocaleDateString();
    let dateText = currentDate == groupDate ? "Today" : groupDate;


    let card = groupData[groupDate].map((card, id) => {
        let findID = searchedArray.map(searchObj => { return searchObj.id });
        // let findGroup = data[groupDate].filter(obj => findID.includes(obj.id));

        return isSearch == "searching" ? (findID.length > 0 && findID.includes(card.id) && <NotesCard key={id} cardData={card} activeNote={activeNote} setNotesData={setNotesData} notesData={notesData} handleActiveData={handleActiveData} checkNullData={checkNullData} setIsNew={setIsNew} searchedArray={searchedArray} isList={isList} selectedData={selectedData} setSelectedData={setSelectedData} />) : <NotesCard key={id} cardData={card} activeNote={activeNote} setNotesData={setNotesData} notesData={notesData} handleActiveData={handleActiveData} checkNullData={checkNullData} setIsNew={setIsNew} searchedArray={searchedArray} isList={isList} selectedData={selectedData} setSelectedData={setSelectedData} />
    });

    let findCard = card.filter(arrData =>  arrData);

    return (
        <div className="aside-group">
            {findCard.length > 0 && groupData[groupDate].length > 0 && <h2 className="aside-title">{dateText}</h2>}

            <div className="aside-cards">
                {card}
            </div>
        </div>
    );
}