import React from 'react';

function BoxInfo() {

    return (
        <div className="inform_item_box">
            <p className="desc_text desc_text_name">name: <span id="img_info_name">...</span></p>
            <p className="desc_text desc_text_type">type: <span id="img_info_format">...</span></p>

            <div className="img_box">
                <img className="img_info" id="img_info_src" src="img/bg/bg_img_info_box.jpg" alt=""/>
            </div>
            <div className="desc_box">
                <div className="left_block">
                    <p className="desc_text">type: <span id="img_info_type">...</span></p>
                    <p className="desc_text">weight: <span id="img_info_weight">...</span></p>
                    <p className="desc_text desc_text_desc">description: <span id="img_info"></span></p>

                </div>
                <div className="right_block">
                    <p className="desc_text">size: <span id="img_info_size">...</span></p>
                    <p className="desc_text">date: <span id="img_info_date">...</span></p>
                    <p className="desc_text">time: <span id="img_info_time">...</span></p>
                </div>
                <div className="bottom_box_desc">
                    <p className="desc_text"><span id="img_info_desc">...</span></p>
                </div>
            </div>
        </div>
    );

}

export default BoxInfo;