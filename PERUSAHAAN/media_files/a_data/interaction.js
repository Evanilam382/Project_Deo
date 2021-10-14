
(function () {
  // Toggle Chat Widget -------
  var popup = false;
  // Add click listener
  var toggleChat = document.getElementsByClassName('tb-toggle-chat-btn')[0];
  toggleChat.addEventListener('click', function () {
    popup = !popup;
    if (popup) {
      parent.postMessage('toggle-chat-on', '*');
    }
    if (!popup) {
      parent.postMessage('toggle-chat-off', '*');
    }
  });
  // Toggle Chat Widget -------

})();

let INF_readyChat = false;
// Start Chat ------
// Add submit listener
//validate
const INF_isNumberKey = (evt) => {
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

const INF_isChar = (evt) => {
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return true;
  return false;
}

$('#form-start-chat').submit(function (event) {
  event.preventDefault();
  const data = $(this).serializeArray()
  let postData = {}
  $.each(data, function (index, value) {
    postData[value.name] = value.value
  });
  //HIT API
  $.ajax({
    type: "POST",
    url: `${INF_host}/createSession`,
    data: JSON.stringify(postData),
    contentType: 'application/json',
    dataType: "json",
    success: function (response) {
      INF_loading_end();
      if (!response.error) {
        localStorage.setItem("INF_token", response.session);
        localStorage.setItem("INF_data", postData);
        INF_afterInput()
        connect(response.session)
      } else {
        INF_notifView(response.message, "warning")
      }
    },
    beforeSend: function (d) {
      INF_loading_start();
    },
    error: function (xhr, status, error) {
      INF_loading_end();
      INF_error_view(xhr, error)
    }
  });
  //

});
// Start Chat ------

// Close Chat ------
$('#end-chat-button').click(function (event) {
  event.preventDefault();
  $(".tb-toggle-chat-btn").click()
  // let token = localStorage.getItem("INF_token");
  // let postData = {}
  // postData.token = token;
  // $.ajax({
  //   type: "POST",
  //   url: `${INF_host}/endSession`,
  //   data: JSON.stringify(postData),
  //   contentType: 'application/json',
  //   dataType: "json",
  //   success: function (response) {
  //     INF_loading_end();
  //     if (!response.error) {
  //       INF_reset()
  //     } else {
  //       INF_notifView(response.message, "warning")
  //     }
  //   },
  //   beforeSend: function (d) {
  //     INF_loading_start();
  //   },
  //   error: function (xhr, status, error) {
  //     INF_loading_end();
  //     INF_error_view(xhr, error)
  //   }
  // });
});
// Close Chat ------

//reply
$('#input-chat').keypress(function (ev) {
  if (!INF_readyChat) {
    return
  }
  if (ev.keyCode == 13 && !ev.shiftKey) {
    var p = ev.which;
    var chatText = $(this).html();
    if (p == 13) {
      INF_sendEvent()
      // if (chatText == '') {
      //   alert('Empty Field');
      // } else {
      //   INF_send(chatText)
      //   reverseScroll();
      // }
      // $(this).html('');
      // return false;
      // ev.epreventDefault();
      // ev.stopPropagation();
    }
    return false;
  }
});

$('[contenteditable]').on('paste', function (e) {

  e.preventDefault();

  var text = '';

  if (e.clipboardData || e.originalEvent.clipboardData) {
    text = (e.originalEvent || e).clipboardData.getData('text/plain');
  } else if (window.clipboardData) {
    text = window.clipboardData.getData('Text');
  }
  text = text.replace(/<[^>]*>?/gm, '');

  if (document.queryCommandSupported('insertText')) {
    document.execCommand('insertText', false, text);
  } else {
    document.execCommand('paste', false, text);
  }
  $(this).html($(this).html().replace(/<div>/gi, '<br>').replace(/<\/div>/gi, ''));
});

$("#send-button").click(function (e) {
  e.preventDefault();
  if (!INF_readyChat) {
    return
  }
  INF_sendEvent()
});
//reply

//reply attachment
document.querySelector("#attachment").addEventListener('change', function () {
  console.log(this.files[0])
  INF_sendAttachmentV2(this.files[0]);
  $("#attachment").val(null);
});

const INF_sendAttachmentV2 = (file) => {
  const token = localStorage.getItem("INF_token");
  let formData = new FormData
  formData.append('files', file);
  formData.append('folder', INF_tenant)
  formData.append('directory', `Livechat/${token}`)
  formData.append('token', `${token}`)

  $.ajax({
    type: "POST",
    url: `${INF_host}/client/upload/media`,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (response) {
      INF_loading_end();
      console.log("INF_sendMediaToAgent", response)
      if (!response.isError) {
        INF_sendMediaToAgentV2(response.data[0])
      } else {
        INF_notifView(response.data, "warning")
      }
    },
    beforeSend: function (d) {
      INF_loading_start();
    },
    error: function (xhr, status, error) {
      INF_loading_end();
      INF_error_view(xhr, error)
    }
  });
}

const INF_sendMediaToAgentV2 = (imageData) => {
  const token = localStorage.getItem("INF_token");
  let message = {
    url: imageData.url,
    fileName: imageData.fileName,
    mimeType: imageData.mimeType,
    fileSize: imageData.size,
  }

  let postData = {}
  postData.token = token;
  postData.message = message

  $.ajax({
    type: "POST",
    url: `${INF_host}/client/reply/media`,
    data: JSON.stringify(postData),
    contentType: 'application/json',
    dataType: "json",
    success: function (response) {
      INF_loading_end();
      console.log("INF_sendMediaToAgent", response)
      if (!response.error) {
        INF_addMessage("out", null, message, "media", new Date())
      } else {
        INF_notifView(response.message, "warning")
      }
    },
    beforeSend: function (d) {
      INF_loading_start();
    },
    error: function (xhr, status, error) {
      INF_loading_end();
      INF_error_view(xhr, error)
    }
  });
}

//reply attachment
function reverseScroll() {
  var height = 0;
  $('.tb-reverse-scroll')
    .children()
    .each(function (i, value) {
      height += parseInt($(this).height());
    });

  height += '';
  $('.tb-reverse-scroll').animate({ scrollTop: height });
}

//reply

//socket
const connect = (token) => {
  const socketUrl = `${INF_host}`
  let error = null;

  socket = io(socketUrl, {
    autoConnect: false,
  });

  socket.on('connect', () => {
    console.log('Connected');

    socket.emit('authentication', {
      token: token,
    });
  });

  socket.on('unauthorized', (reason) => {
    console.log('Unauthorized:', reason);
    if (reason.message == "USER_NOT_FOUND") {
      INF_reset()
    } else {
      INF_unauthorized()
    }

    error = reason.message;

    socket.disconnect();
  });

  socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${error || reason}`);
    error = null;
  });

  socket.on("agent:message:text", (data) => {
    console.log("agent:message:text", data)
    INF_notifSound()
    INF_ready()
    INF_addMessage("in", data.from, data.message, "text", new Date())
  })

  socket.on("agent:message:media", (data) => {
    console.log("agent:message:media", data)
    INF_notifSound()
    INF_ready()
    INF_addMessage("in", data.from, data.message, "media", new Date())
  })

  socket.on("agent:event:endSession", (data) => {
    console.log("agent:event:endSession", data)
    INF_end()
  })
  socket.open();
};

const disconnect = () => {
  socket.disconnect();
}
//socket

const INF_loading_start = () => {
  $(".btn-livechat").attr("disabled", true);
}

const INF_loading_end = () => {
  $(".btn-livechat").attr("disabled", false);
}

const INF_notifSound = () => {
  let src = './assets/sound/soft_notification.mp3';
  let audio = new Audio(src);
  audio.play();
}

const INF_notifView = (message, type) => {
  $.notify({
    message: message
  }, {
    placement: {
      from: "bottom",
      align: "right"
    },
    type: type
  });
}

const INF_error_view = (xhr, error) => {
  console.error(xhr)
  console.error(error)

  if (typeof xhr.responseJSON !== "undefined") {
    const message = xhr.responseJSON.message
    INF_notifView(message, "warning")
  } else {
    const message = `${xhr.status} : ${xhr.statusText}`
    INF_notifView(message, "danger")
  }
}

const INF_formatDate = (dateSend) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = dateSend.toLocaleDateString(undefined, options);
  const time = dateSend.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time}`;
}

const INF_convertMessage = (msg, messageType) => {
  let message = "";
  if (messageType == "text") {
    message = `<span>${msg}</span>`;
  } else if (messageType == 'media') {
    if (typeof msg.data !== "undefined") {
      $.each(msg.data, function (index, value) {
        message += INF_convertAttachment(value);
      });
    } else {
      message += INF_convertAttachment(msg);
    }
    message = `<span>${message}</span>`;
  } else if (messageType == 'location') {
    const mapId = msg.mapId;
    message = `<span id="${mapId}" style="height: 200px;width: 200px;"></span>`
  }
  return message;
}

const INF_isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const INF_convertAttachment = (data) => {
  let message = ""
  const separator = "&#x2F;"

  //CHECK IF JSON
  if (INF_isJson(data)) {
    data = JSON.parse(data);
  }

  //CHECK IF ARRAY
  if (Array.isArray(data)) {
    data = data[0]
  }

  const mimeTypeObject = data.mimeType.split(separator)
  let mimeType
  if (mimeTypeObject.length == 1) {
    const separatorV2 = "/"
    const mimeTypeObjectV2 = data.mimeType.split(separatorV2)
    mimeType = mimeTypeObjectV2[0]
  } else {
    mimeType = mimeTypeObject[0]
  }

  switch (mimeType) {
    case "image":
      message = `<img target="_blank" src="${data.url}" alt="" />`
      break;
    case "audio":
      message = `<audio controls width="50">
                    <source src="${data.url}" type="${mimeTypeObject[0]}/${mimeTypeObject[1]}">
                    Your browser does not support the audio element.
                  </audio>`;
      break;
    case "video":
      message = `<video controls>
                    <source src="${data.url}" type="${mimeTypeObject[0]}/${mimeTypeObject[1]}">
                    Your browser does not support the video element.
                  </video>`;
      break;
    default:
      message = `<a style="color:blue" target="_blank" href="${data.url}">${data.fileName}</a>`
      break;
  }
  return message
}

const INF_addMessage = (type, from, msg, messageType, dateSend) => {

  //TYPE
  let kelasHeader = "";
  if (type == "in") {
    kelasHeader = 'class="tb-another-side"'
  }

  //DATE
  let date
  if (dateSend) {
    date = new Date(dateSend)
  } else {
    date = new Date()
  }

  //MESSAGE
  const message = INF_convertMessage(msg, messageType)
  let time = `<small>${INF_formatDate(date)}</small>`
  let html = `<li ${kelasHeader}>
                <div class="tb-conversation-text">
                  <p style="padding-top: 8px;">
                    ${message}
                    <span>${time}</span>
                  </p>
                </div>
              </li>`


  $("#conversation-list").append(html);
  reverseScroll()
}

const INF_afterInput = () => {
  $('.tb-live-chat-wrap').toggleClass('tb-active');
  $('#end-chat-button').css('display', 'inline-block');
}

const INF_waiting = () => {
  $("#waiting-mode").show();
  $("#busy-mode").hide();
  $("#unauthorized-mode").hide();
  $("#input-group").hide()
  $("#conversation-list").children("li").hide()
  document.getElementById("input-chat").contentEditable = "false";
  $("#attachment").prop("disabled", true);
}

const INF_ready = () => {
  $("#waiting-mode").hide();
  $("#busy-mode").hide();
  $("#unauthorized-mode").hide();
  $("#input-group").show()
  $("#conversation-list").children("li").show()
  document.getElementById("input-chat").contentEditable = "true";
  $("#attachment").prop("disabled", false);
  INF_readyChat = true
}

const INF_busy = () => {
  $("#waiting-mode").hide();
  $("#busy-mode").show();
  $("#unauthorized-mode").hide();
  $("#input-group").hide()
  $("#conversation-list").children("li").hide()
  document.getElementById("input-chat").contentEditable = "false";
  $("#attachment").prop("disabled", true);
}

const INF_unauthorized = () => {
  $("#waiting-mode").hide();
  $("#busy-mode").hide();
  $("#unauthorized-mode").show();
  $("#input-group").hide()
  $("#conversation-list").children("li").hide()
  document.getElementById("input-chat").contentEditable = "false";
  $("#attachment").prop("disabled", true);
}

const INF_end = () => {
  // disconnect();
  const token = localStorage.getItem("INF_token");
  const html = `<div class="notif-end">
                  <div class="rating">
                    <input type="radio" name="rating" value="5" id="5"><label for="5">☆</label>
                    <input type="radio" name="rating" value="4" id="4"><label for="4">☆</label>
                    <input type="radio" name="rating" value="3" id="3"><label for="3">☆</label>
                    <input type="radio" name="rating" value="2" id="2"><label for="2">☆</label>
                    <input type="radio" name="rating" value="1" id="1"><label for="1">☆</label>
                  </div>
                  <button onclick="INF_rating('${token}')" class="btn btn-danger btn-livechat"><b>End Chat</b></button>
                </div>`;
  $("#conversation-list").append(html);
  localStorage.clear()
  INF_readyChat = false;
  $("#attachment").prop("disabled", true);
  document.getElementById("input-chat").contentEditable = "false";
}

const INF_rating = (token) => {
  const val = $("[name=rating]:checked").val()
  let postData = {}
  postData.token = token
  postData.rating = val
  $.ajax({
    type: "POST",
    url: `${INF_host}/client/rating`,
    data: JSON.stringify(postData),
    contentType: 'application/json',
    dataType: "json",
    success: function (response) {
      console.log(response)
      INF_loading_end();
      INF_reload()
    },
    beforeSend: function (d) {
      INF_loading_start();
    },
    error: function (xhr, status, error) {
      INF_loading_end();
      INF_error_view(xhr, error)
    }
  });

}

const INF_reload = () => {
  window.location.reload();
}

const INF_reset = () => {
  localStorage.clear()
  window.location.reload()
}

const INF_getHistoryChat = (token) => {
  let postData = {}
  postData.token = token
  $.ajax({
    type: "POST",
    url: `${INF_host}/client/getChatHistory`,
    data: JSON.stringify(postData),
    contentType: 'application/json',
    dataType: "json",
    success: function (response) {
      INF_loading_end();
      console.log(response)
      if (!response.error) {
        if (response.data) {
          INF_ready();
          $.each(response.data, function (index, value) {
            if (value.direction == 'agent') {
              INF_addMessage("in", value.from, value.message, value.messageType, value.dateSend)
            } else {
              if (value.messageType == "location") {
                INF_renderLocation(value.message)
              } else {
                INF_addMessage("out", value.from, value.message, value.messageType, value.dateSend)
              }

            }
          });
        }
      } else {
        INF_notifView(response.message, "warning")
      }
    },
    beforeSend: function (d) {
      INF_loading_start();
    },
    error: function (xhr, status, error) {
      INF_loading_end();
      INF_error_view(xhr, error)
    }
  });
}

const INF_sendEvent = () => {
  var chatText = $('#input-chat').text();
  if (chatText == '') {
    alert('Empty Field');
  } else {
    INF_sendText(chatText)
  }
  $("#input-chat").html('');
  return false;
}

const INF_sendText = (message) => {
  message = message.replace(/<[^>]+>/g, '');
  let token = localStorage.getItem("INF_token");
  let postData = {}
  postData.token = token;
  postData.message = message
  $.ajax({
    type: "POST",
    url: `${INF_host}/client/reply/text`,
    data: JSON.stringify(postData),
    contentType: 'application/json',
    dataType: "json",
    success: function (response) {
      INF_loading_end();
      console.log(response)
      if (!response.error) {
        INF_addMessage("out", null, message, "text", new Date())
      } else {
        INF_notifView(response.message, "warning")
      }
    },
    beforeSend: function (d) {
      INF_loading_start();
    },
    error: function (xhr, status, error) {
      INF_loading_end();
      INF_error_view(xhr, error)
    }
  });
}

const INF_sendMap = (message, callback) => {
  // message = message.replace(/<[^>]+>/g, '');
  // return callback(message);
  let token = localStorage.getItem('INF_token');
  let postData = {};
  postData.token = token;
  postData.message = message;
  $.ajax({
    type: 'POST',
    url: `${INF_host}/client/reply/location`,
    data: JSON.stringify(postData),
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      INF_loading_end();
      console.log(response);
      if (!response.error) {
        callback(message);
      } else {
        INF_notifView(response.message, 'warning');
      }
    },
    beforeSend: function (d) {
      INF_loading_start();
    },
    error: function (xhr, status, error) {
      INF_loading_end();
      INF_error_view(xhr, error);
    },
  });
};

let token = localStorage.getItem("INF_token")

if (token) {
  INF_afterInput()
  INF_getHistoryChat(token)
  connect(token)
}

