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
        console.log(images)
        setTimeout(() => {
        getAllImg()
            .then((data) => {
                setTimeout(() => {
                    // console.log(data[data.length - 2])
                    dispatch(setImg(data[data.length - 2]))
                }, 50)
            }).then(() => {
        })
        }, 0)
    }

    function getImagesRedux() {
        console.log(images)
    }

    function getI() {

    }

    return (
        <div className="images_form_box">

            <div className="add_box">
                <div className="label_input_wrapper">

                    <form className="form_add_items" action="submit">
                        <label className="select_img" htmlFor="file">SELECT IMAGE</label>
                        <input onChange={selectImg} name="file" className="file" id="file" type="file"
                               multiple="multiple"/>
                        <img style={{width: "100px", height: "80px"}} className="img_template" id="img"
                             src="img/absent_img.jpg" alt=""/>
                    </form>
                </div>


                <div className="btn_box">
                    <select name="" id="format">
                        <option defaultValue="portrait">portrait</option>
                        <option value="landscape">landscape</option>
                        <option value="abstraction">abstraction</option>
                    </select>
                    <div className="clearfix"></div>
                    <p className="desc_text">name: <span id="img_name">...</span></p>
                    <p className="desc_text">weight: <span id="img_weight">...</span></p>
                    <p className="desc_text">type: <span id="img_type">...</span></p>
                    <p className="desc_text">size: <span id="img_size">...</span></p>
                    <p className="desc_text">date: <span id="img_date">...</span></p>
                    <p className="desc_text">time: <span id="img_time">...</span></p>

                    <textarea name="" id="description" placeholder="description"></textarea>

                    <form action="">
                        <button onClick={addImg} id="addImgBtn">Add Img</button>
                    </form>
                    {/*<button onClick={getStore} id="check">get db</button>*/}
                    {/*<button onClick={getImagesRedux} id="check">get redux</button>*/}
                </div>
            </div>

            <div className="inform_item_box">
                <span onClick={getI} id="a" href="">image</span>
            </div>

        </div>
    );

}

export default AddBox;