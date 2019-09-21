(function() {
    'use strict';
    // element
    const text = document.getElementById('text');
    const ulBtn = document.getElementById('ulBtn');
    const olBtn = document.getElementById('olBtn');
    const clrBtn = document.getElementById('clrBtn');
    let resText;

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
        
        // ダミー挿入位置
        const top = document.getElementById('top');

        // 目次生成用のアンカー出力する
        const makeAnker = document.getElementById('anker').checked;

		// <a name="">用
        let names = "";
        let h_size;

        if (makeAnker) {
			h_size = document.getElementById('h_size').value;
            if (!isNaN(h_size)) {
                // 数字じゃなかったらh2ということにする
                h_size = 2;
            }
		}

        // 各行タグ化
        let lists = `<${tag}>\n`;
        for (let i = 0; i < strs.length; i++) {
        	// 空行は無視
        	if (strs[i].length > 0) { 

                // 目次生成用のアンカー出力する場合
                if (makeAnker) {
                    lists += `    <li><a href=\"\#${strs[i]}\">${strs[i]}</a></li>\n`;
	                names += `<h${h_size}><a name=\"${strs[i]}\">${strs[i]}</a></h${h_size}>\n`; 
                }
                else {
                    lists += `    <li>${strs[i]}</li>\n`;
                }
            }
        }
        lists += `</${tag}>\n`;

        if (makeAnker) {
        	lists += `\n\n${names}`;
        }


        // コピー用のテキストエリアを作成
        resText = document.createElement('textarea');

        // コピーするリストをtextareaにセット
        resText.value = lists;

        // textareaを表示
        top.appendChild(resText);

        // コピー処理(選択してクリップボードにコピーする)
        resText.focus();
        document.execCommand('selectAll');
        document.execCommand('copy');
        resText.blur();
        
        // textareaを消す
        top.removeChild(resText);

        // 半分くらいデバッグ用
        if (document.getElementById('confirm').checked) {
            alert("コピー完了しました");
        }
    }

    /**
     * 「テキストクリア」ボタンを押したらテキストクリアする
     */
    clrBtn.onclick = (event) => {
        text.value = "";
    }
})();
