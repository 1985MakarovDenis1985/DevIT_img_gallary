import React, {useEffect, useState, Fragment} from 'react';
import {HashRouter, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import GalleryBox from "./components/GalleryBox";
import AddBox from "./components/AddBox";
import {setImg} from "./redux/actions/actions";
import {dbTrue, dbFalse} from "./redux/actions/actions";
import {createDataBase, getAllImg, db} from "./indexedDB/db";


//----------------------------


function App() {

    const dbStore = useSelector(store => store.indexDB_reducer.db)
    const dispatch = useDispatch()




    createDataBase(dispatch(dbTrue()))

    return (
        <div className="main_container">

            {dbStore == true ?
                <Fragment>
                    <AddBox/>
                    <GalleryBox/>
                </Fragment>
                :
                <Fragment>
                    <h1>Waiting....</h1>
                </Fragment>
            }
        </div>
    );

}

export default App;




