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

    // 各行タグ化
    let lists = `<${tag}>\n`;
    for (let i = 0; i < strs.length; i++) {
    	// 空行は無視
    	if (strs[i].length > 0) { 
            lists += `${tabs}<li>${strs[i]}</li>\n`;
        }
    }
    lists += `</${tag}>\n`;

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
