$(function() {
  'use strict';
  
  // element
  const $itemArea = $('#itemarea');
  const $text = $('#text');
  const $makeBtn = $('#makeBtn');
  const $clrBtn = $('#clrBtn');
  const $resetBtn = $('#resetBtn');
  const $confirm = $('#confirm');
  const $pasteLinkInPage = $('#pasteLinkInPage');
  const $header = $("#headerForLinkInPage");
  const $label = $("#labelForLinkInPage");
  const $listTag = $("#outputList");
  const $indent = $("#indent");
  const $saveCookie = $("#save");
  let resText;
  let indentSel = 0;
  let save;
  // cookie
  /** cookieに保存が必要な項目
   *  - リストタグ選択内容
   *  - インデント
   *  - ページ内リンクを貼るかどうか
   *  - ページ内リンクのラベル名
   *  - 「コピー後に確認」チェック
   *  - cookieに設定を保存するかどうかの設定(しない場合は以上の設定を削除)
   *  <更新するタイミング>
   *  1.「リスト作成」ボタンをクリックしたとき
   *  2. cookieに設定を保存するようにしたとき
   *  <cookieデータを読み出して反映するタイミング>
   *  1. ページ読み込み時
   *  <cookieをクリアするタイミング>
   *  1. cookieに設定を保存しないようにしたとき
   *  2. 設定リセットボタンをクリックとき
   */ 
  const cookieLimit = { expires: 20, path: '' }; // 今のページだけで有効、20日間
  const saveCookieName = "saveCookie";
  const indentCookieName = "indent";
  const listTagCookieName = "listTag";
  const pasteLinkCookieName = "pasteLink";
  const headerSizeCookieName = "headerSize";
  const labelNameCookieName = "labelName";
  const confirmCookieName = "confirm";
  let listTag = "ul";
  let pasteLink = 0;
  let headerSize = "h2";
  let labelName = "";
  let confirm = false;
  
  /**
   * 「リストタグ選択」設定を取得
   */
  function getOutputListTag() {
    return $listTag.find(":selected").attr("value");
  }
  
  function cookieRemove() {
    Cookies.remove(saveCookieName, {path: ''});
    Cookies.remove(indentCookieName, {path: ''});
    Cookies.remove(listTagCookieName, {path: ''});
    Cookies.remove(pasteLinkCookieName, {path: ''});
    Cookies.remove(headerSizeCookieName, {path: ''});
    Cookies.remove(labelNameCookieName, {path: ''});
    Cookies.remove(confirmCookieName, {path: ''});
  }

  function cookieSave() {
    Cookies.set(saveCookieName, true, cookieLimit);
    Cookies.set(indentCookieName, $('#indent :selected').attr("value"), cookieLimit);
    Cookies.set(listTagCookieName, getOutputListTag(), cookieLimit);
    Cookies.set(pasteLinkCookieName, $pasteLinkInPage.find(":selected").attr("value"), cookieLimit);
    Cookies.set(headerSizeCookieName, $header.find(":selected").attr("value"), cookieLimit);
    Cookies.set(labelNameCookieName, $label.val(), cookieLimit);
    Cookies.set(confirmCookieName, confirm, cookieLimit);
  }

  function cookieLoad() {
    if (Cookies.get(saveCookieName) !== undefined) {
      save = 1;
      listTag = Cookies.get(listTagCookieName);
      indentSel = Number(Cookies.get(indentCookieName));
      pasteLink = Number(Cookies.get(pasteLinkCookieName));
      headerSize = Cookies.get(headerSizeCookieName);
      labelName = Cookies.get(labelNameCookieName);
      confirm = Number(Cookies.get(confirmCookieName));
    }
    else {
      initSetting();
    }
  }

  function initSetting() {
    save = 0;
    listTag = "ul";
    indentSel = 0;
    pasteLink = 0;
    headerSize = "h2";
    labelName = "";
    confirm = false;
  }

  function initForm() {
    // 「cookieに設定を保存する」チェックボックス
    $saveCookie.prop("checked", save);

    // リストタグ
    $listTag.find("option").each(function() {
      if ($(this).attr("value") === listTag) {
        $(this).prop("selected", true);
      }
    });

    // インデント
    $indent.find("option").each(function() {
      if (Number($(this).attr("value")) === indentSel) {
        $(this).prop("selected", true);
      }
    });

    // ページ内のリンク
    $pasteLinkInPage.find("option").each(function() {
      if (Number($(this).attr("value")) === pasteLink) {
        $(this).prop("selected", true);
      }
    });

    disableSetting();

    // ページ内リンクのヘッダ
    $header.find("option").each(function() {
      if ($(this).attr("value") === headerSize) {
        $(this).prop("selected", true);
      }
    });
    // ページ内リンクのラベル名
    $label.attr("value", labelName);

    // コピー後に確認
    $confirm.prop("checked", confirm);
  }

  // 初期化
  cookieLoad();
  initForm();


  /**
   * 「リスト作成」ボタンをクリックしたときの処理
   */
  $makeBtn.on('click', function() {
    listTag = $("#outputList :selected").attr("value");
    copyClipLists(listTag);
  });

  /**
   * 「内容クリア」ボタンを押したときの処理
   */
  $clrBtn.on('click', function(event) {
    $text.val("");
  });

  /**
   * 「設定リセット」ボタン を押したときの処理
   */
  $resetBtn.on('click', function() {
    initSetting();
    initForm();
    cookieRemove();
  });



  $saveCookie.on('change', function() {
    if ($(this).prop("checked")) {
      save = true;
      cookieSave();
    }
    else {
      save = false;
      cookieRemove();
    }
  })

  $confirm.on('click', function() {
    if ($confirm.prop('checked')) {
      confirm = 1;
    }
    else { 
      confirm = 0;
    }
  })

  $pasteLinkInPage.on('change', function() {
    pasteLink = Number($pasteLinkInPage.find(":selected").attr("value"));
    disableSetting();
  });

  function disableSetting() {
    if (pasteLink === 0) {
      $header.prop("disabled", true);
      $label.prop("disabled", true);
    }
    else {
      $header.prop("disabled", false);
      $label.prop("disabled", false);
    }
  }

  /**
   * インデント取得
   */
  function getIndent() {
    let indent;
    indentSel = Number($('#indent :selected').attr("value"));
  
    if (indentSel === 0) {
      indent = "\t";
    }
    else if (indentSel === 1) {
      // 半角スペース2個
      indent = '  ';
    }
    else {
      // 半角スペース4個
      indent = '    ';
    }
    return indent;
  }

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

    // タブ;
    let tabs = getIndent();

    // アンカー作成準備
    let makeAnker = Number($pasteLinkInPage.find(":selected").attr("value"));
    let label = "";
    if (makeAnker) {
      // ヘッダタグ(h?)設定取得
      headerSize = $header.find(":selected").attr("value");
      label = $label.val();
    }
    
    // 各行タグ化
    let lists = `<${tag}>\n`;
    let headers = "";
    for (let i = 0; i < strs.length; i++) {
      let ankerBefore = "";
      let ankerAfter = "";

      // 空行は無視
      if (strs[i].length > 0) { 
        // アンカー作成
        if (makeAnker) {
          ankerBefore = `<a href="#${label}${i}">`;
          ankerAfter = "</a>";
          headers += `<${headerSize} id="${label}${i}">${strs[i]}</${headerSize}>\n`;
        }
        // リスト作成
        lists += `${tabs}<li>${ankerBefore}${strs[i]}${ankerAfter}</li>\n`;
      }
    }
    // 貼り付ける文字列を作成
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
    if (confirm) {
        alert("コピー完了しました");
    }

    // cookie保存
    // とりあえずインデントの設定を保存
    if (save) {
      cookieSave();
    }
  }
});
