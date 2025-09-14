import React, { useEffect, useState } from "react";
import gridIcon from "/img/icons/grid.svg";
import listIcon from "/img/icons/list.svg";
import trashIcon from "/img/icons/trash.svg";
import createIcon from "/img/icons/create.svg";

export default function NotesHeader(props) {
    let [serachValue, setSearchValue] = useState("");
    let [isDelete, setIsDelete] = useState(false);

    // create note
    function handleCreate() {
        const date = new Date();
        const dateID = date.toLocaleDateString();
        const timeID = date.toLocaleTimeString();

        let notesObj = {
            id: dateID,
            isNew: true,
            isContent: false,
            createTime: timeID,
            createDate: dateID,
            reopen: false,
            editTime: "",
            editDate: "",
            title: "",
            subtitle: "",
            desc: ""
        };

        if(!props.isNew) { // check if the note is present or note like if i click the note
            props.setNotesData(prevData => {
                if(prevData.length > 0) {
                    let matchID = "";
                    let matchedArr = [];
                    let unmatchedGroupArr = [];

                    prevData.forEach(groupObj => {
                        let groupKey = Object.keys(groupObj)[0];

                        if(groupKey === dateID) {
                            matchID = groupKey;
                            matchedArr = groupObj[groupKey].map((obj, i) => {
                                obj.id = `${dateID}-${i + 2}`;
                                return obj;
                            });
                        } else {
                            unmatchedGroupArr.push(groupObj);
                        }
                    });

                    notesObj.id = `${dateID}-1`;
                    props.setActiveNotes(notesObj);

                    if(matchID) {
                        return [
                            {
                                [matchID]: [
                                    notesObj,
                                    ...matchedArr
                                ]
                            },
                            ...unmatchedGroupArr
                        ]
                    } else {
                        return [
                            {
                                [dateID]: [
                                    notesObj
                                ]
                            },
                            ...prevData
                        ];
                    }

                } else {
                    let groupArray = [];
                    notesObj.id = `${dateID}-1`;
                    groupArray.push(notesObj);

                    let groupObj = {
                        [dateID]: groupArray
                    }

                    localStorage.setItem("notesData", JSON.stringify([groupObj]));

                    props.setNotesData([groupObj]);
                    props.setActiveNotes(notesObj);
                    console.log("groupObj: ", groupObj);

                    return [groupObj];
                }
            });

            props.handleIsNew(true);
        }
    }

    // delete the selected notes and update the notes id from 1
    function handleDelete() {
        let updatedArray = [];
        setIsDelete(true);

        props.setNotesData((prevData) => {
            let oldData = prevData;

            updatedArray = oldData.map(dataGroup => { // map through all the date groups

                let dataGroupKey = Object.keys(dataGroup)[0]; // get all objects keys

                // in that group fiter out the note that is selected and deleted which removes the selected note
                let data = dataGroup[dataGroupKey].filter(dataObj => dataObj.id != props.activeNote.id).map((dataObj, i) => {
                    let ID = dataObj.id;
                    let newID = ID.split("-")[0] + "-" + (i + 1);
                    let obj = { ...dataObj, id: newID };

                    return obj;
                });

                return { [dataGroupKey]: data };
            });

            return updatedArray;
        });
    }

    function handleListView() {
        props.setIsList(true);
    }

    function handleGridView() {
        props.setIsList(false);
    }

    function handleSearch(event) {
        let val = event.target.value
        setSearchValue(val);

        if(val) {
            props.setIsSearch("searching");

            let findArray = [];

            props.notesData.forEach(groupDate => {
                let groupKey = Object.keys(groupDate)[0];

                let b = groupDate[groupKey].forEach(objData => {
                    if(objData.desc.indexOf(val) >= 0) {
                        findArray.push(objData);
                    }
                });
            });

            props.setSearchedArray(findArray);
        } else {
            props.setIsSearch(false);
            props.setIsSearch("not-searching");
        }
    }


    useEffect(() => {
        if(props.notesData.length > 0) {
            let newActiveNote = props.notesData[0][Object.keys(props.notesData[0])[0]][0]; // after deleting the top make the first note active
            localStorage.setItem("notesData", JSON.stringify(props.notesData)); // save the note to staorage/database
            props.setActiveNotes(newActiveNote); // after deleting the top make the first note active
            props.setSelectedData([newActiveNote.id]); // set the selected note to be first
            setIsDelete(false);
        }
    }, [isDelete])

    return (
        <header className="header" id="header">
            <div className="header__wrapper">
                <div className="header__left">
                    <h1 className="header-title">Notes</h1>

                    <nav className="nav-left">
                        <div className="nav-view">
                            <button className={`nav-btn__list${props.isList ? " active" : ""}`} title="List view" onClick={handleListView}>
                                <img src={listIcon} alt="LIST VIEW" width={18} height={18} />
                            </button>
                            <button className={`nav-btn__grid${props.isList ? "" : " active"}`} title="Grid view" onClick={handleGridView}>
                                <img src={gridIcon} alt="GRID VIEW" width={18} height={18} />
                            </button>
                        </div>

                        <button className="nav-del" onClick={handleDelete}>
                            <img src={trashIcon} alt="DELETE ICON" title="Delete" width={18} height={18} />
                        </button>
                    </nav>
                </div>

                <div className="header__right">
                    <nav className="nav-right">
                        <button className="nav-create" title="New notes" onClick={handleCreate}>
                            <img src={createIcon} alt="NEW NOTES" width={18} height={18} />
                        </button>

                        <div className="nav-search">
                            <input type="search" className="nav-search__input" name="find" id="find" placeholder="Search" onChange={handleSearch} value={serachValue} />
                        </div>
                    </nav>

                </div>
            </div>
        </header>
    );
}