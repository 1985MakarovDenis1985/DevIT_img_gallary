
////  V 1.0
export var db;

function indexedDBOk() {
    return "indexedDB" in window;
}

//// CREATED DB
export function createDataBase(callback) {
    return new Promise((resolve, reject) => {
        document.addEventListener("DOMContentLoaded", function () {

            //No support? Go in the corner and pout.
            if (!indexedDBOk) return;
            var openRequest = indexedDB.open("imagesDB", 1);

            openRequest.onupgradeneeded = function (e) {
                var thisDB = e.target.result;
                if (!thisDB.objectStoreNames.contains("images")) {
                    let objectStore = thisDB.createObjectStore("images", {autoIncrement: true})
                    objectStore.createIndex("name", "name", {unique: false});
                    objectStore.createIndex("email", "email", {unique: true});
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

export function removeAllCollection(){
    let transaction = db.transaction(["images"], "readwrite")
    let store = transaction.objectStore("images");
    store.clear()
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
}

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



//// REMOVE ITEM
    export function removeItem(keyPathName) {

        var transaction = db.transaction(["images"], "readwrite");
        var store = transaction.objectStore("images");

        let index = store.index("name")
        var request = index.getKey(keyPathName);

        request.onsuccess = function (e) {
            var result = request.result;
            let deleteRequest = store.delete(result)
        }
    }


