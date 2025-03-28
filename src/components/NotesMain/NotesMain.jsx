import React, { useEffect, useState } from "react";
import NotesText from "../NotesText/NotesText";

let monthsObj = {
    "1": "Januaru",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
}

export default function NotesMain(props) {
    const { activeNote, setActiveNotes, notesData, setNotesData, setIsNew, isSearch, searchedArray, setSelectedData } = props;
    let [monthName, setMonthName] = useState();
    let [day, setDay] = useState(1);
    let [year, setYear] = useState(new Date().getFullYear());
    let [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        let activeDate = activeNote.editDate && activeNote.editTime ? new Date(activeNote.editDate + ", " + activeNote.editTime) : new Date(activeNote.createDate + ", " + activeNote.createTime);
        setMonthName(monthsObj[activeDate.getMonth()]);
        setDay(activeDate.getDate());
        setYear(activeDate.getFullYear());
        setCurrentTime(activeDate.toLocaleTimeString());
    }, [activeNote]);

    return (
        <main className="main" id="main">
            <div className="notes-main">
                <div className="notes-main-wrapper">
                    {/* <p className="notes-main-date">Created: 5th Aug, 2024</p> */}
                    {Object.keys(activeNote).length > 0 && <p className="notes-main-date">{`${monthName} ${day}, ${year} at ${currentTime}`}</p>}

                    <div className="notes-main-body">

                        {((isSearch != "searching" || searchedArray.length > 0)) && activeNote && Object.keys(activeNote).length > 0 && <NotesText activeNote={activeNote} setActiveNotes={setActiveNotes} notesData={notesData} setNotesData={setNotesData} setIsNew={setIsNew} isSearch={isSearch} searchedArray={searchedArray} setSelectedData={setSelectedData} />}
                    </div>
                </div>
            </div>
        </main >
    );
}