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
                    }, 130)
                })
        }, 100)
    }, [])

    let copyArrOfImage=[]


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
                console.log(el.dataset.name)
            } else {
                console.log("error")
            }
        })
    }

    function imgLoad(e){
        // e.target.dataset.url

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

        download(e.target.dataset.url, e.target.dataset.name);

        //// ------------------
        // let url = window.location.href
        // // let myFile = this.href;
        // console.log();
        // let img = document.createElement("a")
        // img.href = "https://images.wallpaperscraft.ru/image/klen_list_osen_190739_1920x1080.jpg"
        // img.download = window.location.href
        // img.click()


        //// ------------------- ////
        // var xhr = new XMLHttpRequest();
        // var url = e.target.dataset.url;
        // xhr.responseType = 'blob'; //Set the response type to blob so xhr.response returns a blob
        // xhr.open('GET', url , true);
        //
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == xhr.DONE) {
        //         //When request is done
        //         //xhr.response will be a Blob ready to save
        //         saveAs(xhr.response, 'image.jpeg');
        //     }
        // };
        //
        // xhr.send()
    }



    return (
        <div className="images_gallery_container">
            <p className="gallery_box_title">GALLERY BOX</p>
            {/*{console.log(copyArrOfImage = JSON.parse(JSON.stringify(images)))}*/}
            <input className="search" type="text"/>
            <div className="images_gallery_box">

                {images.map((el, index) => (
                    <div className="img_item" data-name={el.name}
                         key={el.name + el.email + (Math.floor(Math.random() * Math.floor(1000)))}>
                        <img src={el.url} alt="" className="image"/>
                        {/*<h5>{el.name}</h5>*/}
                        {/*<span>{el.size}</span>*/}
                        {/*<a href={el.url}>click</a>*/}
                        <button onClick={imgLoad} data-name={el.name} data-url={el.url} id="download">download</button>
                        <button className="btn_remove" data-name={el.name} onClick={remEl}>remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default GalleryBox;