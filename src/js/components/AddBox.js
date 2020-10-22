import React, {useEffect, useState} from 'react';
import {addImgToShow, getAllImg, addImgToDB, db} from "../indexedDB/db";
import {setImg,} from "../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";


//----------------------------

function AddBox() {
    function getStore() {
        console.log(dbStore)
    }

    const images = useSelector(state => state.imgReducer.images)
    const dbStore = useSelector(store => store.indexDB_reducer.db)
    const dispatch = useDispatch()

    function selectImg(e) {
        e.preventDefault()
        addImgToShow()
    }


    function addImg(e) {
        e.preventDefault()
        addImgToDB()
        // console.log(images)
        // setTimeout(() => {
        getAllImg()
            .then((data) => {
                setTimeout(() => {
                    // console.log(data[data.length - 2])
                    dispatch(setImg(data[data.length-2]))
                }, 50)
            }).then(() => {
        })
        // }, 0)
    }

    function getImagesRedux() {
        console.log(images)
    }

    return (
        <div className="images_form_box">

            <form action="submit">
                <h2>FILE</h2>
                <input onChange={selectImg} name="file" id="file" type="file" placeholder="Name" multiple="multiple"/>
                <button onClick={addImg} id="addImg">Add Img</button>
                {/*<label htmlFor="file">FILE</label>*/}
            </form>

            <img style={{width: "100px", height: "80px"}} id="img" src="" alt=""/>

            <button onClick={getStore} id="check">get db</button>
            <button onClick={getImagesRedux} id="check">get redux</button>

        </div>
    );

}

export default AddBox;