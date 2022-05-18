// Code to do client side is adapted from a COMP 1537 assignment.
"use strict";
ready(function () {
    console.log("Client script loaded.");

    function ajaxGET(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    function ajaxPOST(url, callback, data) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');
        console.log("params in ajaxPOST", params);

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            } else {
                console.log(this.status);
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }

    document.querySelector("#submit").addEventListener("click", function (e) {
        e.preventDefault();
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let queryString = "email=" + email.value + "&password=" + password.value;
        const vars = {
            "email": email,
            "password": password
        }
        ajaxPOST("/login", function (data) {
            if (data) {
                let dataParsed = JSON.parse(data);
                console.log(dataParsed);
                if (dataParsed.status == "fail") {
                    document.getElementById("incorrect").innerHTML = dataParsed.msg;
                } else {
                    window.location.replace("/main");
                }
            }
        }, queryString);
    });
});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}

document.getElementById("logo").addEventListener("click", myFunction);
  
function myFunction() {
    document.getElementById("logo").style.transform = "rotate(360deg)";

}

