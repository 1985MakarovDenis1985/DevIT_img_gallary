import {useDispatch} from "react-redux";

//// v3.0
////  V 1.0
export var db;

function indexedDBOk() {
    return "indexedDB" in window;
}

//// CREATED DB
export function createDataBase(callback) {
    return new Promise((resolve, reject) => {
        //     let db

        document.addEventListener("DOMContentLoaded", function () {

            //No support? Go in the corner and pout.
            if (!indexedDBOk) return;
            var openRequest = indexedDB.open("imagesDB", 1);

            openRequest.onupgradeneeded = function (e) {
                var thisDB = e.target.result;
                if (!thisDB.objectStoreNames.contains("images")) {
                    // thisDB.createObjectStore("people", {autoIncrement: true});
                    //// --- test ---
                    let objectStore = thisDB.createObjectStore("images", {autoIncrement: true})
                    objectStore.createIndex("name", "name", {unique: false});
                    objectStore.createIndex("email", "email", {unique: true});
                    //// --- test ---
                }
            },


                openRequest.onsuccess = function (e) {
                    console.log("running onsuccess");
                    db = e.target.result;
                    callback
                    resolve(db)
                },
                openRequest.onerror = function (e) {
                    console.log("Do something for the error")
                }
        }, false);
    })
}


let objectImg;

export function addImgToShow() {
    let transaction = db.transaction(["images"], "readwrite")
    let store = transaction.objectStore("images");
    let inpImg = document.getElementById("file")
    store.put(inpImg.files[0], "image");

    store.get("image").onsuccess = (e) => {
        let imgFile = e.target.result;
        let imgURL, titleImg, image
        if (imgFile) {
            imgURL = URL.createObjectURL(imgFile);
            titleImg = imgFile.name
            // name without type
            // console.log(imgFile.name)
            // titleImg.split("").map((el, index) => {
            //     if (el == ".") {
            //         return titleImg = titleImg.slice(0, index)
            //     }
            // }).join("")
            image = document.getElementById("img");
            image.setAttribute("src", imgURL);
        }

        let date = new Date()
        let img = new Image();
        img.src = imgURL;
        img.onload = function () {

            let fullTime;
            if (date.getMinutes() < 10) {
                fullTime = `${date.getHours()}:0${date.getMinutes()}`
            } else {
                fullTime = `${date.getHours()}:${date.getMinutes()}`
            }


            let obj = {
                name: imgFile.name,
                // name: titleImg, // name without type
                size: imgFile.size,
                type: imgFile.type,
                date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                time: fullTime,
                url: imgURL,
                naturalSize: this.width + 'x' + this.height,
                format: document.getElementById("format").value,
                desc: document.getElementById("description").value
            }
            objectImg = JSON.parse(JSON.stringify(obj))
            document.getElementById("img_name").innerText = titleImg
            document.getElementById("img_weight").innerText = imgFile.size
            document.getElementById("img_type").innerText = imgFile.type
            document.getElementById("img_size").innerText = this.width + 'x' + this.height
            document.getElementById("img_date").innerText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            document.getElementById("img_time").innerText = fullTime
            document.getElementById("file").setAttribute("data-name", titleImg)

        }
    }
}

export function addImgToDB() {
    var transaction = db.transaction(["images"], "readwrite")
    var store = transaction.objectStore("images");

    store.get("image").onsuccess = (e) => {
        store.add(objectImg)
    }
    // console.log(objectImg)

    // var transaction = db.transaction(["images"], "readwrite")
    // var store = transaction.objectStore("images");
    // let inpImg = document.getElementById("file")
    // store.put(inpImg.files[0], "image");
    //
    // store.get("image").onsuccess = (e) => {
    //     let imgFile = e.target.result;
    //     let imgURL, titleImg, image
    //     if (imgFile) {
    //         imgURL = URL.createObjectURL(imgFile);
    //         titleImg = imgFile.name
    //         titleImg.split("").map((el, index) => {
    //             if (el == ".") {
    //                 return titleImg = titleImg.slice(0, index)
    //             }
    //         }).join("")
    //         image = document.getElementById("img");
    //         image.setAttribute("src", imgURL);
    //     }
    //
    //     let date = new Date()
    //
    //     let img = new Image();
    //     img.src = imgURL;
    //     img.onload = function () {
    //         console.log("asd")
    //     }
    //
    //         let obj = {
    //             name: titleImg,
    //             size: imgFile.size,
    //             type: imgFile.type,
    //             date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    //             time: `${date.getHours()}:${date.getMinutes()}`,
    //             url: imgURL,
    //             format: document.getElementById("format").value,
    //             desc: document.getElementById("description").value
    //         }
    //         console.log(obj)
    //         store.add(obj)
    //
    //
    // }
}

//// READ DB
export function getPersonByKey(e) {
    var key = document.querySelector("#key").value;
    if (key === "" || isNaN(key)) return;

    var transaction = db.transaction(["images"], "readonly");
    var store = transaction.objectStore("images");

    // var request = store.get(Number(key));
    var request = store.get(Number(key));

    request.onsuccess = function (e) {
        var result = e.target.result;
        console.log(result);
    }
}

export function getPersonByName(e) {
    var key = document.querySelector("#key").value;
    // if (key === "" || isNaN(key)) return;

    var transaction = db.transaction(["images"], "readonly");
    var store = transaction.objectStore("images");

    let index = store.index("name")
    var request = index.get(key);

    request.onsuccess = function (e) {

        var result = e.target.result;
        console.log(result)
    }
}

//// READ ALL

// export function getAllImg() {
//     let temp = []
//     return new Promise(resolve => {
//         if (db) {
//             db.transaction(["images"], "readonly").objectStore("images").openCursor().onsuccess = function (e) {
//                 let cursor = e.target.result;
//                 if (cursor) {
//                     temp.push(cursor.value)
//                     cursor.continue();
//                     resolve(temp)
//                 }
//             }
//         }
//     })
// }

export function getAllImg() {
    let temp = []
    return new Promise(resolve => {
        if (db) {
            var transaction = db.transaction(["images"], "readonly")
            var store = transaction.objectStore("images");
            store.getAll().onsuccess = (e) => {
                resolve(e.target.result)
            }
        }
    })
}

// export function getAllImg() {
//     let temp = []
//     return new Promise(resolve => {
//         db.transaction(["people"], "readonly").objectStore("people").openCursor().onsuccess = function (e) {
//             let cursor = e.target.result;
//             if (cursor) {
//                 temp.push(cursor.value)
//                 cursor.continue();
//             }
//             resolve(temp)
//         }
//     }).then((temp) => {
//         console.log(temp)
//         return temp
//     })
// }


    export function getPeopleByIDBKeyRangeНа() {
        var name = document.querySelector("#nameSearch").value;

        var endname = document.querySelector("#nameSearchEnd").value;

        if (name == "" && endname == "") return;

        var transaction = db.transaction(["people"], "readonly");
        var store = transaction.objectStore("people");
        var index = store.index("name");

        //Make the range depending on what type we are doing
        var range;
        if (name != "" && endname != "") {
            range = IDBKeyRange.bound(name, endname);
        } else if (name == "") {
            range = IDBKeyRange.upperBound(endname);
        } else {
            range = IDBKeyRange.lowerBound(name);
        }

        var s = "";

        index.openCursor(range).onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                s += "&lt;h2>Key " + cursor.key + "&lt;/h2>&lt;p>";
                for (var field in cursor.value) {
                    s += field + "=" + cursor.value[field] + "&lt;br/>";
                }
                s += "&lt;/p>";
                cursor.continue();
            }
            document.querySelector("#status").innerHTML = s;
        }

//// ----- Key Range
//Values over 39
        var oldRange = IDBKeyRange.lowerBound(39);
//Values 40a dn over
        var oldRange2 = IDBKeyRange.lowerBound(40, true);
//39 and smaller...
        var youngRange = IDBKeyRange.upperBound(40);
//39 and smaller...
        var youngRange2 = IDBKeyRange.upperBound(39, true);
//not young or old... you can also specify inclusive/exclusive
        var okRange = IDBKeyRange.bound(20, 40)
    }

//// REMOVE ITEM
    export function removeItem(keyPathName) {
        // var key = document.querySelector("#remItemDb").value;

        var transaction = db.transaction(["images"], "readwrite");
        var store = transaction.objectStore("images");

        let index = store.index("name")
        var request = index.getKey(keyPathName);

        request.onsuccess = function (e) {
            var result = request.result;
            let deleteRequest = store.delete(result)
            // console.log(result)
        }
    }

//// V 2.0

