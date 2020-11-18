// ==UserScript==
// @name         SYNOIS - Auto Reapply Punch Time
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://https://synois.synology.com/app/Leave-Taking/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Date.prototype.YYYYMMDD = function() {
        let mm = this.getMonth() + 1;
        let dd = this.getDate();

        return [ this.getFullYear(), "-",
                 (mm > 9 ? '' : '0') + mm, "-",
                 (dd > 9 ? '' : '0') + dd ].join('');
    };


    async function get_ids(from, to) {
        let res = await fetch("https://synois.synology.com/app/Leave-Taking/scripts/attendance.php", {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            "body": `action=enum&e_id=0&date_start=${from.YYYYMMDD()}&date_end=${to.YYYYMMDD()}`,
            "method": "POST"
        });
        let resobj = await res.json()
        return resobj.data;
    }

//     async function reapply_punch_rec(id, type, hour, min) {
//         await fetch("https://synois.synology.com/app/Leave-Taking/scripts/attendance.php", {
//             "headers": {
//                 "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//             },
//             "body": `action=reapply_punch_time&id=${id}&date=2020-06-05&type=${type}&hour=${hour}&min=${min}&time=${hour}%3A${min}`,
//             "method": "POST"
//         });
//     }

    async function apply_too_reason(id, type, reason_id, reason) {
        await fetch("https://synois.synology.com/app/Leave-Taking/scripts/attendance.php", {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "body": `action=apply_too_reason&id=${id}&type=${type}&reason_id=${reason_id}&reason=${reason}`,
            "method": "POST"
        });
    }

    let toolbar = document.querySelector("#app-panel-content .x-panel-tbar.x-panel-tbar-noheader");
    let right_toolbar = toolbar.querySelector(".x-toolbar-right .x-toolbar-right-row");
    let candidate = toolbar.querySelectorAll(".x-toolbar-left-row .x-toolbar-cell:not(.x-hide-display)");
    let template = candidate[candidate.length - 1];

    let new_button = template.cloneNode(true);
    let items = new_button.getElementsByTagName("*");
    for (let i=0; i<items.length; ++i) {
        items[i].removeAttribute("id");
    }
    new_button.addEventListener("mouseenter", function(e) {
        e.target.querySelector("table").classList.add('x-btn-over');
    })
    new_button.addEventListener("mouseleave", function(e) {
        e.target.querySelector("table").classList.remove('x-btn-over');
    })
    new_button.addEventListener("mousedown", function(e) {
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('x-btn-click');
    })
    new_button.addEventListener("mouseup", function(e) {
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('x-btn-click');
    })
    //new_button.querySelector("button").textContent = "Reapply The Damn Punch Time";
    new_button.querySelector("button").textContent = "Apply The Damn Too Reason";

    right_toolbar.appendChild(new_button);




})();