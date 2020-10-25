import React, {Fragment, useEffect, useState} from 'react';
import {HashRouter, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {removeItem, db, createDataBase, getAllImg} from "../indexedDB/db";
import {setImg, removeImg, dbTrue, dbFalse, addCollection} from "../redux/actions/actions";
import {indexDB_reducer} from "../redux/reducers/indexDB_reducer";


//----------------------------

function GalleryBox() {

    const images = useSelector(state => state.imgReducer.images)
    const dbStore = useSelector(store => store.indexDB_reducer.db)
    const copyGallery = useSelector(store => store.copyGalleryForSearch.images)
    const dispatch = useDispatch()

    const [gallery, setGallery] = useState([])

    useEffect(() => {
        getAllImg()
            .then((data) => {
                data.map(el => {
                    if (el != data[data.length - 1]) {
                        dispatch(setImg(el))
                    }
                })
                return data
            })
    }, [])

    useEffect(()=>{
        dispatch(addCollection(images))
    }, [images])


    function remEl(e) {
        let arrImgBox = Array.from(document.getElementsByClassName("img_item"))

        arrImgBox.map((el, index) => {
            if (e.target.dataset.name == el.dataset.name) {
                // el.setAttribute("data-id", el.dataset.name)
                removeItem(el.dataset.name)
                // console.log(el.dataset.name)
                dispatch(removeImg(el.dataset.name))
                console.log(images)
            }
            // else {
            //     console.log("error")
            // }
        })

        // arrImgBox.map((el, index) => {
        //     if (e.target.dataset.name == el.dataset.name) {
        //         el.setAttribute("data-id", index)
        //         removeItem(el.dataset.name)
        //         dispatch(removeImg(index))
        //     } else {
        //         console.log("error")
        //     }
        // })
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

    function activeImg_activeLine(e) {
        Array.from(document.getElementsByClassName("active_line")).map((el, index) => {
            el.style.background = "transparent"
            if (el.dataset.id == e.target.dataset.id) {
                el.style.background = "red"
            }
        })
    }

    function activeImg_moveLine(e) {
        Array.from(document.getElementsByClassName("move_line")).map((el, index) => {
            el.style.background = "transparent"
            if (el.dataset.id == e.target.dataset.id) {
                el.style.background = "grey"
            }
        })
    }

    function createInfoImg(e) {
        activeImg_activeLine(e)
        images.map(el => {
            if (el.name == e.target.dataset.name) {
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


    function search(e) {
        e.preventDefault()
        dispatch(addCollection(images))
        console.log(copyGallery)
        // let galleryDOM = Array.from(document.getElementsByClassName("img_item"))
        // galleryDOM.map(el => el.style.display = "block")
        // // gall.map(el=>el.style.display = "none")
        let searchForm = document.getElementById("search");
        let searchRegExp = new RegExp(searchForm.value, ["i"]);
        let products = images.filter(el => searchRegExp.test(el.name));
        // // x = products
        dispatch(addCollection(products))
        // return x
        // console.log(x)
    }


    function z(){
        console.log(copyGallery)
    }

    return (
        <div className="images_gallery_container">
            <p className="gallery_box_title">GALLERY BOX</p>
            {/*{console.log(copyArrOfImage = JSON.parse(JSON.stringify(images)))}*/}
            <div className="search_removeAll_box">
                <form action="">
                    <input onChange={search} id="search" name="search" type="text"/>
                    <label htmlFor="search" style={{marginLeft: "10px"}}>SEARCH</label>
                </form>
                <button onClick={z}>click</button>
                <p id="p"></p>
            </div>
            <div className="images_gallery_box">
                {/*{console.log(gallery)}*/}
                {copyGallery.map((el, index) => (
                    <div className="img_item" data-name={el.name}
                         key={el.name + el.email + (Math.floor(Math.random() * Math.floor(1000)))}>
                        <img className="image" onClick={createInfoImg} onMouseOver={activeImg_moveLine}
                             data-weigth={el.naturalSize} data-mimetype={el.type} data-id={index} data-name={el.name}
                             data-size={el.size} src={el.url} alt=""/>
                        {/*<button onClick={imgLoad} data-name={el.name} data-src={el.url} id="download">download</button>*/}
                        <div className="active_line" data-id={index}></div>
                        <div className="move_line" data-id={index}></div>
                        <button className="btn_remove" data-name={el.name} onClick={remEl}>remove</button>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default GalleryBox;