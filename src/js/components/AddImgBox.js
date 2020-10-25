import React from 'react';
import {addImgToShow, getAllImg, addImgToDB, db} from "../indexedDB/db";
import {setImg,} from "../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";


//----------------------------

function AddImgBox() {

    const images = useSelector(state => state.imgReducer.images)
    const dispatch = useDispatch()

    function selectImg(e) {
        e.preventDefault()
        addImgToShow()
    }


    function addImgToCollection(e) {
        e.preventDefault()
        let inputImgValue = document.getElementById("file")
        let errorTextToAdd = document.getElementById("add_error")
        let temp = true
        images.map(el => {
            el.name == inputImgValue.dataset.name ? temp = false : temp = temp
        })

        /// lite validation
        if (inputImgValue.value && temp == true) {
            errorTextToAdd.innerText = ""
            addImgToDB()
                getAllImg()
                    .then((data) => {
                        setTimeout(() => {
                            dispatch(setImg(data[data.length - 2]))
                        }, 50)
                    }).then(() => {
                })
            //// error text appear
        } else if (!inputImgValue.value) {
            errorTextToAdd.style.animationName = "nothing"
            setTimeout(()=>{
                errorTextToAdd.style.animationName = "error_text_appear"
            }, 0)
            errorTextToAdd.innerText = "nothing to add"
        } else {
            errorTextToAdd.style.animationName = "nothing"
            setTimeout(()=>{
                errorTextToAdd.style.animationName = "error_text_appear"
            }, 0)
            errorTextToAdd.innerText = "sorry, gallery has already has this image"
        }

    }

    return (
        <div className="add_box">
            <div className="label_input_wrapper">
                <form className="form_add_items" action="submit">
                    <label className="select_img" htmlFor="file">SELECT IMAGE</label>
                    <input onChange={selectImg} name="file" className="file" id="file" type="file"
                           multiple="multiple"/>
                    <img style={{width: "100px", height: "80px"}} className="img_template" id="img"
                         src="img/bg/absent_img.jpg" alt=""/>
                </form>
            </div>


            <div className="btn_box">
                <select onChange={selectImg} name="" id="format">
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

                <textarea onChange={selectImg} name="" id="description"
                          placeholder="description..."></textarea>

                <form action="">
                    <p id="add_error"></p>
                    <button onClick={addImgToCollection} id="addImgBtn">Add Img</button>
                </form>
            </div>
        </div>
    );

}

export default AddImgBox;