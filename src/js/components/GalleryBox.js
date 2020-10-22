import React, {useEffect, useState} from 'react';
import {HashRouter, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {removeItem, getAllImg, db, getAll, createDataBase} from "../indexedDB/db";
import {setImg, removeImg, dbTrue, dbFalse} from "../redux/actions/actions";
import {indexDB_reducer} from "../redux/reducers/indexDB_reducer";

//----------------------------

function GalleryBox() {

    const images = useSelector(state => state.imgReducer.images)
    const dbStore = useSelector(store => store.indexDB_reducer.db)
    const dispatch = useDispatch()


    useEffect(() => {
        setTimeout(() => {
            getAllImg()
                .then((data) => {
                    setTimeout(() => {
                        data.map(el => {
                            if (el != data[data.length - 1]) {
                                dispatch(setImg(el))
                            }
                        })
                    }, 130)
                })
        }, 100)
    }, [])


    let copyArrOfImage;

    function remEl(e) {
        let arrImgBox = Array.from(document.getElementsByClassName("img_box"))
        arrImgBox.reverse().map((el, index)=>{
            el.setAttribute("data-id", index)
        })
        arrImgBox.map((el, index) => {
            if (e.target.dataset.name == el.dataset.name) {
                removeItem(el.dataset.name)
                dispatch(removeImg(index))
                console.log(el.dataset.name)
            } else {
                console.log("error")
            }
        })
    }

    // function imgLoad

    return (
        <div className="images_gallery_box">
            {console.log(copyArrOfImage = JSON.parse(JSON.stringify(images)))}
            {copyArrOfImage.reverse().map((el, index) => (
                <div className="img_box" data-name={el.name}
                     key={el.name + el.email + (Math.floor(Math.random() * Math.floor(1000)))}>
                    <img src={el.url} alt="" className="image"/>
                    <h5>{el.name}</h5>
                    <span>{el.size}</span>
                    <span>{el.type}</span>
                    <button className="btn_remove" data-name={el.name} onClick={remEl}>remove
                    </button>
                </div>
            ))}
        </div>
    );

}

export default GalleryBox;