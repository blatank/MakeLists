$(function() {
  'use strict';
  
  // element
  const $itemArea = $('.itemarea');
  const $text = $('#text');
  const $ulBtn = $('#ulBtn');
  const $olBtn = $('#olBtn');
  const $clrBtn = $('#clrBtn');
  const $confirmBtn = $('#confirm');
  const $tabsEdit = $('#tabs');
  const $anker = $('#anker');
  const $ankerLabel = $('#ankerLabel');
  let resText;

  /**
   * 「番号無しリストを生成」ボタンをクリックしたときの処理
   */
  $ulBtn.on('click', function() {
    copyClipLists('ul');
  });

  /**
   * 「番号付きリストを生成」をクリックしたときの処理
   */
  $olBtn.on('click', function() {
    copyClipLists('ol');
  });

  /**
   * 「テキストクリア」ボタンを押したときの処理
   */
  $clrBtn.on('click', function(event) {
    $text.val("");
  });

  /**
    * リスト生成しクリップボードにコピーする
    * @param {String} tag 
    */
  function copyClipLists(tag) {
    // <textarea>のテキスト取得
    const str = $text.val();

    // テキストを改行単位で分割
    const strs = str.split('\n');
    
    // ダミー挿入位置
    const $top = $('#top');

    // タブ
    const num = parseInt($tabsEdit.val());
    let tabs = '';

    for (let i = 0; i < num; i++) {
      tabs += ' ';
    }

    // アンカー作成準備
    let h_size = 3;
    let makeAnker = $anker.prop("checked");

    if (makeAnker) {
      // ヘッダタグ(h?)設定取得
			let tmp = $('#h_size').val();
      if (!isNaN(tmp)) {
        // 数字に変換する
        h_size = Number(tmp);
      }
    }
    
    // 各行タグ化
    let lists = `<${tag}>\n`;
    let headers = "";
    for (let i = 0; i < strs.length; i++) {
      let ankerBefore = "";
      let ankerAfter = "";

      // アンカー作成
      if (makeAnker) {
        let label = $ankerLabel.val();
        ankerBefore = `<a href="#${label}${i}">`;
        ankerAfter = "</a>";
        headers += `<h${h_size} id="${label}${i}">${strs[i]}</h${h_size}>\n`;
      }

      // 空行は無視
    	if (strs[i].length > 0) { 
            lists += `${tabs}<li>${ankerBefore}${strs[i]}${ankerAfter}</li>\n`;
        }
    }
    lists += `</${tag}>\n${headers}`;

    // コピー用のテキストエリアを作成
    // コピーするリストをtextareaにセット
    // textareaを表示
    const $resText = $('<textarea></textarea>').text(lists);
    $itemArea.append($resText);
    // コピー処理(選択してクリップボードにコピーする)
    $resText.select();
    document.execCommand('copy');
    
    // textareaを消す
    $resText.remove();

    // 半分くらいデバッグ用
    if ($confirmBtn.prop('checked')) {
        alert("コピー完了しました");
    }
  }
});
