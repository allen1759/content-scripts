// ==UserScript==
// @name         Youtuber Masker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Mask some videos produced by Youtubers you don't want to see in trending
// @author       allenyang
// @match        https://www.youtube.com/feed/trending
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let maskYoutuber = ['小玉', '放火 Louis', '人生肥宅x尊', '主頻道【谷阿莫】', '谷阿莫Life', 'Joeman', '黃阿瑪的後宮生活', '科幻FANS']
                        + ['民視戲劇館 Formosa TV Dramas', '新聞面對面', 'WeTV 台灣'];

    let videos = document.getElementById('grid-container').childNodes;

    videos.forEach(function(value, index) {
        let elements = Array.from(value.getElementsByClassName('style-scope ytd-video-meta-block complex-string'));

        elements.forEach(function(e) {
            if (maskYoutuber.includes(e.innerText)) {
                value.style.backgroundColor = 'gray';
            }
        });
    });
})();