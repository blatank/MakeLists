(function() {
    'use strict';
    // element
    const text = document.getElementById('text');
    const ulBtn = document.getElementById('ulBtn');
    const olBtn = document.getElementById('olBtn');
    const clrBtn = document.getElementById('clrBtn');
    const reCopyBtn = document.getElementById('reCopy');
    let hasResult = false;
    let resText;
    let resHead;

    /**
     * 「番号無しリストを生成」ボタンをクリックしたときの処理
     */
    ulBtn.onclick = (event) => {
        copyClipLists('ul');
    }

    /**
     * 「番号付きリストを生成」をクリックしたときの処理
     */
    olBtn.onclick = (event) => {
        copyClipLists('ol');
    }

    /**
     * 「テキストクリア」ボタンを押したときの処理
     */
    clrBtn.onclick = (event) => {
        text.value = "";
    }

     /**
      * リスト生成しクリップボードにコピーする
      * @param {String} tag 
      */
    function copyClipLists(tag) {
        // <textarea>のテキスト取得
        const str = text.value;

        // テキストを改行単位で分割
        const strs = str.split('\n');

        // 各行タグ化
        let lists = `<${tag}>\n`;
        for (let i = 0; i < strs.length; i++) {
            lists += '  <li>' + strs[i] + "</li>\n";
        }
        lists += `</${tag}>\n`;

        // 1度だけ
        if (hasResult === false) {
            // ヘッダ
            resHead = document.createElement('h2');
            resHead.innerText = '以下をコピーしました';

            // コピー用のテキストエリアを作成しそこにテキストをセット
            resText = document.createElement('textarea');
        }

        // コピーするリストをtextareaにセット
        resText.value = lists;

        // 初回のみ
        if (hasResult === false) {
            document.getElementById('result').appendChild(resHead);
            document.getElementById('result').appendChild(resText);
        }

        // コピー処理(選択してクリップボードにコピーする)
        doCopy();
        hasResult = true;
    }

    /**
     * 「テキストクリア」ボタンを押したらテキストクリアする
     */
    clrBtn.onclick = (event) => {
        text.value = "";
    }

    /**
     * 再コピーボタンを押したときの処理
     */
    reCopyBtn.onclick = (event) => {
        doCopy();      
    }

    function doCopy() {
        // スマホでうまく出来ないのでいったんフォーカス移す
        resText.focus();
        
        resText.select();
        document.execCommand("copy"); 
    }

})();
