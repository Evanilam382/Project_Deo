console.log('responsive js');

var INF_eventMethod = window.addEventListener
  ? 'addEventListener'
  : 'attachEvent';
var INF_eventer = window[INF_eventMethod];
var INF_messageEvent =
  INF_eventMethod === 'attachEvent' ? 'onmessage' : 'message';

INF_eventer(INF_messageEvent, function(e) {
  // if (e.origin !== 'http://the-trusted-iframe-origin.com') return;

  // if (e.data === 'myevent' || e.message === 'myevent')
  //   alert('Message from iframe just came!');

  switch (e.data) {
    case 'toggle-chat-on':
      INF_maximize();
      break;
    case 'toggle-chat-off':
      INF_minimize();
      break;

    default:
      break;
  }
});

function INF_minimize() {
  // Get Iframe Element
  var ifrm = document.getElementById('iframe-livechat-widget-inf');

  // Set Iframe width and Height
  ifrm.setAttribute(
    'style',
    'width: 50px !important;height: 50px !important;z-index:9999999'
  );
  console.log('INF_minimize');
}

function INF_maximize() {
  // Get Iframe Element
  var ifrm = document.getElementById('iframe-livechat-widget-inf');

  // Set Iframe width and Height
  ifrm.setAttribute(
    'style',
    'width: 320px !important;height: 525px !important;z-index:9999999'
  );
  console.log('INF_maximize');
}
