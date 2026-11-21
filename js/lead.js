(function () {
  'use strict';
  var form = document.getElementById('lead-form');
  if (!form) return;
  var LINE_URL = 'https://line.me/ti/p/4NoEgf4THl';
  var MAIL_TO = 'shangli.hr@gmail.com';
  var err = document.getElementById('lead-error');
  var result = document.getElementById('lead-result');
  var msgBox = document.getElementById('lead-msg');
  var mail = document.getElementById('lead-mail');
  var lineBtn = document.getElementById('lead-line');
  var tip = document.getElementById('lead-tip');
  var message = '';

  function val(id) {
    var el = document.getElementById(id);
    return el ? String(el.value).trim().slice(0, 80) : '';
  }

  function showError(text) {
    err.textContent = text;
    err.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.hidden = true;
    var required = ['f-company', 'f-industry', 'f-staff', 'f-foreign', 'f-name', 'f-phone'];
    for (var i = 0; i < required.length; i++) {
      if (!val(required[i])) {
        showError('請完整填寫所有欄位。');
        document.getElementById(required[i]).focus();
        return;
      }
    }
    if (!/^[0-9+\-\s()]{8,20}$/.test(val('f-phone'))) {
      showError('請填寫正確的聯絡電話。');
      document.getElementById('f-phone').focus();
      return;
    }
    if (!document.getElementById('f-consent').checked) {
      showError('請勾選同意個人資料蒐集告知。');
      return;
    }
    message = [
      '【上力國際｜移工名額評估需求】',
      '公司名稱：' + val('f-company'),
      '行業別：' + val('f-industry'),
      '本國員工人數：' + val('f-staff'),
      '目前移工人數：' + val('f-foreign'),
      '聯絡人：' + val('f-name'),
      '聯絡電話：' + val('f-phone')
    ].join('\n');
    msgBox.textContent = message;
    mail.href = 'mailto:' + MAIL_TO +
      '?subject=' + encodeURIComponent('移工名額評估需求－' + val('f-company')) +
      '&body=' + encodeURIComponent(message);
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  lineBtn.addEventListener('click', function () {
    function open() { window.open(LINE_URL, '_blank', 'noopener'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message).then(function () {
        tip.textContent = '訊息已複製，請在 LINE 聊天室貼上後送出。';
        open();
      }, function () {
        tip.textContent = '無法自動複製，請手動複製上方訊息後，在 LINE 聊天室貼上送出。';
        open();
      });
    } else {
      tip.textContent = '請手動複製上方訊息後，在 LINE 聊天室貼上送出。';
      open();
    }
  });
})();
