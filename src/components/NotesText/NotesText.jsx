import React, { useEffect, useState } from "react";

// TO DO:
// update the original object when the textarea text is change --->> DONE

export default function NotesText(props) {
    const { activeNote, setActiveNotes, notesData, setNotesData, setIsNew, isSearch, searchedArray, setSelectedData } = props;
    const [textareaValue, setTextareaValue] = useState(activeNote.desc);

    function handleChange(event) {
        let desc = event.target.value
        setTextareaValue(desc);
        setIsNew(false);

        let date = new Date();
        let dateID = date.toLocaleDateString();
        let timeID = date.toLocaleTimeString();

        let [title, subtitle] = desc.trim().split("\n").filter(item => item.trim() != "");

        let newActiveObj = {
            ...activeNote,
            id: `${dateID}-1`,
            editDate: dateID,
            editTime: timeID,
            desc: desc,
            isContent: desc ? true : false,
            isNew: true,
            title: title ? title : "",
            subtitle: subtitle ? subtitle : ""
        }

        let updatedArray = []

        setNotesData(prevData => {
            let matchedGroupID = "";
            let matchedGroupObj = {};
            let newGroupArray = [];
            let dataArray = [];

            prevData.forEach(groupObj => {
                let groupKey = Object.keys(groupObj)[0];

                if(groupKey == dateID) {
                    matchedGroupID = groupKey;

                    let unmatchedArray = groupObj[groupKey].filter(obj => activeNote.id != obj.id);
                    let filterUnmatchedArray = unmatchedArray.map((obj, i) => { return { ...obj, id: `${groupKey}-${i + 2}` } })

                    newGroupArray = [newActiveObj, ...filterUnmatchedArray];
                    matchedGroupObj[groupKey] = newGroupArray;

                } else {
                    let unmatchedArray = groupObj[groupKey].filter(obj => activeNote.id != obj.id);
                    dataArray.push({ [groupKey]: unmatchedArray });
                }
            });

            if(!matchedGroupID) {
                dataArray = [
                    { [dateID]: [newActiveObj] },
                    ...dataArray
                ];
            } else {
                dataArray = [
                    matchedGroupObj,
                    ...dataArray
                ]
            }

            updatedArray = [...dataArray];
            localStorage.setItem("notesData", JSON.stringify(updatedArray));
            return dataArray;
        });

        setActiveNotes(newActiveObj);
    }

    function handleOnFocus() {
        setSelectedData([]);
    }

    useEffect(() => {
        setTextareaValue(activeNote.desc);
    }, [activeNote])

    return (
        <>
            {(isSearch != "not-found") && <textarea className="notes-main-area" name="notes-area" id="notes-area" rows={40} cols={50} onChange={handleChange} onFocus={handleOnFocus} value={textareaValue}></textarea>}
        </>
    );
}