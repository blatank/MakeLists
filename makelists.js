(function() {
    'use strict';
    // element
    const text = document.getElementById('text');
    const ulBtn = document.getElementById('ulBtn');
    const olBtn = document.getElementById('olBtn');
    
    // 初期値
    text.value = "え\nる\nし\nっ\nて\nい\nる\nか";

    ulBtn.onclick = (event) => {
        // テキストを取得する
        // 各行を<li>タグで囲む
        // 全体を<ul>タグで囲む
        // クリップボードにコピーする
    }

    olBtn.onclick = (event) => {
        // テキストを取得する
        // 各行を<li>タグで囲む
        // 全体を<ol>タグで囲む
        // クリップボードにコピーする
    }

    /**
     * 「テキストクリア」ボタンを押したらテキストクリアする
     */
    clrBtn.onclick = (event) => {
        text.value = "";
    }

})();
