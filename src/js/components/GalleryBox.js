import React, {Fragment, useEffect, useState} from 'react';
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
                    }, 350)
                })
        }, 200)
    }, [])

    let copyArrOfImage = []

    function remEl(e) {
        let arrImgBox = Array.from(document.getElementsByClassName("img_item"))
        // arrImgBox.reverse().map((el, index) => {
        //     el.setAttribute("data-id", index)
        // })
        arrImgBox.map((el, index) => {
            if (e.target.dataset.name == el.dataset.name) {
                el.setAttribute("data-id", index)
                removeItem(el.dataset.name)
                dispatch(removeImg(index))
            } else {
                console.log("error")
            }
        })
    }

    function imgLoad(e) {
        function download(url, filename) {
            // Request
            fetch(url, {
                mode: 'no-cors' /*{mode:'cors'}*/
                // Callback
            }).then((transfer) => {
                // Return blob
                return transfer.blob();
                // Return data
            }).then((bytes) => {
                // Create an element
                let elm = document.createElement('a');
                // Add blob data to element
                elm.href = URL.createObjectURL(bytes);
                // Download blob data with certain extension
                elm.setAttribute('download', filename);
                elm.click()
            }).catch((error) => {
                console.log(error);
            })
        }

        // images.map((el, index)=>{
            // if (el.url == e.target.dataset.url){
                console.log(e.target.dataset.src)
                download(e.target.dataset.src, e.target.dataset.name);
            // }
        // })
    }

    function createInfoImg(e){
        images.map(el=>{
            if (el.name == e.target.dataset.name){

                document.getElementById("img_info_name").innerText = el.name
                document.getElementById("img_info_type").innerText = el.type
                document.getElementById("img_info_weight").innerText = el.size
                document.getElementById("img_info_size").innerText = el.naturalSize
                document.getElementById("img_info_date").innerText = el.date
                document.getElementById("img_info_time").innerText = el.time
                document.getElementById("img_info_desc").innerText = el.desc
                document.getElementById("img_info_format").innerText = el.format
                document.getElementById("img_info_src").src = el.url

            }
        })
    }


    return (
        <div className="images_gallery_container">
            <p className="gallery_box_title">GALLERY BOX</p>
            {/*{console.log(copyArrOfImage = JSON.parse(JSON.stringify(images)))}*/}
            <input className="search" type="text"/>
            <div className="images_gallery_box">
                {/*{console.log(images)}*/}
                {images.map((el, index) => (
                    <div className="img_item" data-name={el.name}
                         key={el.name + el.email + (Math.floor(Math.random() * Math.floor(1000)))}>
                        <img onClick={createInfoImg} data-weigth={el.naturalSize} data-mimetype={el.type} data-name={el.name} data-size={el.size}  src={el.url}  alt="" className="image"/>
                        <button onClick={imgLoad} data-name={el.name} data-src={el.url} id="download">download</button>
                        <button className="btn_remove" data-name={el.name} onClick={remEl}>remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default GalleryBox;