import React, { useEffect } from "react";
import AsideGroup from "../AsideGroup/AsideGroup";


export default function NotesLeft(props) {
    const { notesData, handleActiveData, isNew, activeNote, checkNullData, setNotesData, setIsNew, isList, searchedArray, isSearch, selectedData, setSelectedData } = props;

    // let findID = searchedArray.map(searchObj => {return searchObj.id});

    let asideGroup = notesData.map((data, id) => {
        let groupDate = Object.keys(data)[0];

        return <AsideGroup key={id} groupData={data} setNotesData={setNotesData} notesData={notesData} setIsNew={setIsNew} groupDate={groupDate} activeNote={activeNote} handleActiveData={handleActiveData} checkNullData={checkNullData} searchedArray={searchedArray} isSearch={isSearch} isList={isList} selectedData={selectedData} setSelectedData={setSelectedData} />;
    });

    let gridClass = isList ? " list" : " grid";

    return (
        <aside className="aside">
            {isSearch && <div className={`aside-wrapper${gridClass}`}>
                {asideGroup}
            </div>}
        </aside>
    );
}