import React from 'react';
import BoxInfo from "./BoxInfo";
import AddImgBox from "./AddImgBox";


//----------------------------

function AddImgAndInformationBox() {

    return (
        <div className="images_form_box">
            <AddImgBox/>
            <BoxInfo/>
        </div>
    );

}

export default AddImgAndInformationBox;