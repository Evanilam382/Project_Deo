function LIVECHAT_WIDGET(idElement, handleIframeHeightScript,source) {
  this.idElement = idElement;
  this.handleIframeHeightScript = handleIframeHeightScript;
  this.init = function() {
    // Document
    var chatboxEl = document.getElementById(this.idElement);
    chatboxEl.style.position = 'fixed';
    chatboxEl.style.bottom = '15px';
    chatboxEl.style.right = '15px';

    // IFRAME
    var ifrm = document.createElement('iframe');
    ifrm.style.backgroundColor = 'transparent';
    ifrm.setAttribute('id', 'iframe-' + this.idElement);
    ifrm.setAttribute(
      'src',
      source
    );
    ifrm.setAttribute('frameBorder', 0);

    // ATTACH SCRIPT
    var scriptTagName = 'script';
    var scriptElement = document.createElement(scriptTagName);
    var otherScriptElement = document.getElementsByTagName(scriptTagName)[0];
    scriptElement.src = handleIframeHeightScript || 'http://';

    // inject the script tag before first script tag found within document
    otherScriptElement.parentNode.insertBefore(
      scriptElement,
      otherScriptElement
    );

    // MINIMIZE ON START
    ifrm.setAttribute(
      'style',
      'width: 50px !important;height: 50px !important;z-index:9999999'
    );

    chatboxEl.appendChild(ifrm);
  };
}
