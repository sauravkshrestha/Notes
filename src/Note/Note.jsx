import React, { useEffect, useState } from "react";
import NotesHeader from "../components/NotesHeader/NotesHeader";
import NotesMain from "../components/NotesMain/NotesMain";
import NotesLeft from "../components/NotesLeft/NotesLeft";

// TO DO:
// Make the cardnt even after there is multiple new line 
// Feature:
// when shift is pressed and clicked select all the card that is clicked and when it is clicked again unselect


/**
 * TODO: Add database integration
 * - Choose a database (e.g., MySQL, PostgreSQL, MongoDB, Firebase)
 * - Set up database connection
 * - Implement CRUD operations
 * - Secure the database connection
 * 
 * 
 * 
 * - maybe add login
 */



export default function Note() {
    const [notesData, setNotesData] = useState([]);
    const [activeNote, setActiveNotes] = useState({});
    const [isNew, setIsNew] = useState(false);
    const [isList, setIsList] = useState(true);
    const [isSearch, setIsSearch] = useState("first-load");
    const [searchedArray, setSearchedArray] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    function checkNullData(data) {
        let returArray = [];

        data.forEach(groupObj => {
            let filterGroupObj = {};
            let groupKey = Object.keys(groupObj);
            let filterGroupArr = groupObj[groupKey].filter(obj => obj.isContent).map((obj, i) => { (obj.id = obj.id.split("-")[0] + "-" + (i + 1)); return obj; });

            filterGroupObj[groupKey] = filterGroupArr;

            if(filterGroupObj[groupKey].length > 0) {
                returArray.push(filterGroupObj);
            }
        });

        return returArray;
    }

    useEffect(() => {
        async function fetchData() {
            let data = await localStorage.getItem("notesData");

            if(data && data.length > 0) {
                let objData = await JSON.parse(data);
                let filterData = checkNullData(objData);
                let groupDate = filterData.length > 0 ? Object.keys(filterData[0])[0] : false;

                setNotesData(filterData.length > 0 ? filterData : []);
                setActiveNotes(groupDate ? filterData[0][groupDate][0] : {});
                setSelectedData(groupDate ? [filterData[0][groupDate][0].id] : []);

                localStorage.setItem("notesData", JSON.stringify(filterData));
            } else {
                setNotesData([]);
                setActiveNotes({});
            }
        }

        fetchData();
    }, []);

    return (
        <div className="body-wrapper">
            <NotesHeader isNew={isNew} handleIsNew={setIsNew} notesData={notesData} setNotesData={setNotesData} activeNote={activeNote} setActiveNotes={setActiveNotes} isList={isList} setIsList={setIsList} setSearchedArray={setSearchedArray} isSearch={isSearch} setIsSearch={setIsSearch} />

            <div className="body-main">
                <NotesLeft notesData={notesData} setNotesData={setNotesData} handleActiveData={setActiveNotes} isNew={isNew} setIsNew={setIsNew} activeNote={activeNote} checkNullData={checkNullData} isList={isList} searchedArray={searchedArray} isSearch={isSearch} selectedData={selectedData} setSelectedData={setSelectedData} />
                <NotesMain activeNote={activeNote} setActiveNotes={setActiveNotes} notesData={notesData} setNotesData={setNotesData} setIsNew={setIsNew} isSearch={isSearch} searchedArray={searchedArray} selectedData={selectedData} setSelectedData={setSelectedData} />
            </div>
        </div>
    );
}