import set from "@babel/runtime/helpers/esm/set";

var db;

function indexedDBOk() {
    return "indexedDB" in window;
}

//// CREATED DB
document.addEventListener("DOMContentLoaded", function() {

    //No support? Go in the corner and pout.
    if(!indexedDBOk) return;

    var openRequest = indexedDB.open("idarticle_people",1);

    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
        if(!thisDB.objectStoreNames.contains("people")) {
            thisDB.createObjectStore("people", { autoIncrement: true});
        }
    }

    openRequest.onsuccess = function(e) {
        console.log("running onsuccess");

        db = e.target.result;

        //Listen for add clicks
        document.querySelector("#addButton").addEventListener("click", addPerson, false);
    }

    openRequest.onerror = function(e) {
        //Do something for the error
    }

},false);

//// WRITE IN TO DB
function addPerson(e) {
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;

    console.log("About to add "+name+"/"+email);

    var transaction = db.transaction(["people"],"readwrite");
    var store = transaction.objectStore("people");

    //Define a person
    var person = {
        name:name,
        email:email,
        created:new Date()
    }

    //Perform the add
    var request = store.add(person);

    request.onerror = function(e) {
        console.log("Error",e.target.error.name);
        //some type of error handler
    }

    request.onsuccess = function(e) {
        console.log("Woot! Did it");
    }
}


//// READ DB
export function getPerson(e) {
    var key = document.querySelector("#key").value;
    if(key === "" || isNaN(key)) return;

    var transaction = db.transaction(["people"],"readonly");
    var store = transaction.objectStore("people");

    // var request = store.get(Number(key));
    var request = store.get(Number(key));

    request.onsuccess = function(e) {

        var result = e.target.result;
        console.log(result);
    }
}

//// READ ALL
export function getPeople(e) {

    // return new Promise((resolve, reject)=>{
    let x =[]
    db.transaction(["people"], "readonly").objectStore("people").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        if(cursor) {
            for(var field in cursor.value) {
                console.log(cursor.value[field]);
            }

            console.log(cursor.value)
            x.push(cursor.value)
            cursor.continue();
            // resolve(x)
        }
    }
    // }).then((x)=>{
    setTimeout(()=>{
        console.log(x)
    }, 10)

    // })


    // setTimeout(()=>{
    //
    //     return x
    // }, 0)



    // setTimeout(()=>{
    //     console.log(x)
    // }, 0)
}