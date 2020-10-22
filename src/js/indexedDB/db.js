import {useDispatch} from "react-redux";

//// v3.0
////  V 1.0
export var db;

function indexedDBOk() {
    return "indexedDB" in window;
}

//// CREATED DB
export function createDataBase(callback) {
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
                // console.log("running onsuccess");
                db = e.target.result;
                callback
            }
        openRequest.onerror = function (e) {
            //Do something for the error
        }
    }, false);
}


//// WRITE IN TO DB
export function addPerson(person) {

    var transaction = db.transaction(["people"], "readwrite")
    var store = transaction.objectStore("people");
    var request = store.add(person);

    // request.onerror = function (e) {
    //     console.log("Error", e.target.error.name);
    //     //some type of error handler
    // }
    //
    // request.onsuccess = function (e) {
    //     // console.log("Woot! Did it");
    // }
}

export function addImgToShow() {
    var transaction = db.transaction(["images"], "readwrite")
    var store = transaction.objectStore("images");
    let inpImg = document.getElementById("file")
    store.put(inpImg.files[0], "image");

    store.get("image").onsuccess = (e) => {
        var imgFile = e.target.result;

        var imgURL = URL.createObjectURL(imgFile);

        var imgElephant = document.getElementById("img");
        imgElephant.setAttribute("src", imgURL);
        // console.log(imgURL)

        // let obj = {
        //     name: imgFile.name,
        //     size: imgFile.size,
        //     type: imgFile.type,
        //     date: imgFile.lastModifiedDate,
        //     url: imgURL
        // }
        // store.add(obj)
    }
}

export function addImgToDB() {
    var transaction = db.transaction(["images"], "readwrite")
    var store = transaction.objectStore("images");
    let inpImg = document.getElementById("file")
    // store.put(inpImg.files[0], "image");
    store.put(inpImg.files[0], "image");

    store.get("image").onsuccess = (e) => {
        var imgFile = e.target.result;

        var imgURL = URL.createObjectURL(imgFile);

        var imgElephant = document.getElementById("img");
        imgElephant.setAttribute("src", imgURL);
        // console.log(imgURL)
        let obj = {
            name: imgFile.name,
            size: imgFile.size,
            type: imgFile.type,
            date: imgFile.lastModifiedDate,
            url: imgURL
        }
        store.add(obj)
    }
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
// export function getAll() {
//     var transaction = db.transaction(["images"], "readonly")
//     var store = transaction.objectStore("images");
//     let inpImg = document.getElementById("file")
//     // store.put(inpImg.files[0], "image");
// }

export function getAllImg() {
    let temp = []
    return new Promise(resolve => {
        if (db) {
            db.transaction(["images"], "readonly").objectStore("images").openCursor().onsuccess = function (e) {
                let cursor = e.target.result;
                if (cursor) {
                    temp.push(cursor.value)
                    cursor.continue();
                    resolve(temp)
                }
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

//// REMOVE ITEM
    export function removeItem(keyPathName) {

        let transaction = db.transaction(["images"], "readwrite");
        let store = transaction.objectStore("images");

        let index = store.index("name")
        let request = index.getKey(keyPathName);

        request.onsuccess = function (e) {
            var result = request.result;
            let deleteRequest = store.delete(result)
            // console.log(result)
        }
    }
}
