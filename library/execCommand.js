/**
 * 非推奨になってしまったexecCommandの代替用として作成(一部互換性なし)
 * @param {*} aComandName
 * @param {*} aShowDefaultUI
 * @param {*} aValueArgument
 */
document.execCommand = function (aComandName, aShowDefaultUI, aValueArgument) {
  aCommandName = aComandName.toLowerCase();
  switch (aCommandName) {
    case "bold":
      /// 太字用のspan要素作成
      const span = document.createElement("span");
      span.style.fontWeight = `bold`;
      /// 現在のテキスト選択を取得
      const userSelection = window.getSelection();
      /// 現在の選択範囲を取得
      const selectedTextRange = userSelection.getRangeAt(0);
      /// その範囲を太字span要素で囲む
      selectedTextRange.surroundContents(span);
      break;
  }
};
