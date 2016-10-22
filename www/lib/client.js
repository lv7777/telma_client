var socket = io.connect('https://it2-sotuken.herokuapp.com/');
var userId = "user_" + Math.floor((Math.random() * 100) + 1);
ons.ready(function () {
    $("#userName").text(userId);
});

jQuery.fn.extend({
    live: function (event, callback) {
        if (this.selector) {
            jQuery(document).on(event, this.selector, callback);
        }
    }
});

socket.on('messageToClient', function (msg) {  
    console.log("get message!!!")
    //myMessage(msg.data, "14");
    partnerMessage(msg.data)
});
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

function updateScrollbar(chatId) {
    // Scroll
    if (chatId) {
        $('.messages-content ').animate({
            scrollTop: $("." + chatId).offset().top
        }, 'slow');
    } else {
        $('.messages-content ').animate({
            scrollTop: $(".loading").offset().top
        }, 'slow');
    }

}

function setDate() {
    d = new Date()
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
}

//自分の発言
function myMessage(msg, chatId) {
    console.log("insert message!!!")
    $('<div class="message message-personal ' + chatId + '">' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar(chatId);
    //setTimeout(function () {
    //    partnerMessage("kmkmkmkmkm");
    //}, 1000 + (Math.random() * 20) * 100);
}


$('.message-submit').live('click', function () {
    var chatId = "chat_" + Math.floor((Math.random() * 100) + 1);
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('.message-input').focus()
    console.log("message  send!")
    socket.emit('messageToServer', { content: $.trim(msg), chatId: chatId, userId: userId });
});


$(window).on('keydown', function (e) {
    var chatId = "chat_" + Math.floor((Math.random() * 200) + 1);
    if (e.which == 13) {
        msg = $('.message-input').val();
        if ($.trim(msg) == '') {
            return false;
        }
        myMessage(msg, chatId)
        console.log("message  send!")
        socket.emit('messageToServer', { content: $.trim(msg), chatId: chatId, userId: userId });
        return false;
    }
})
var timeout;
function timeoutFunction() {
    typing = false;
    socket.emit("messageTyping", false);
}

$('.message-input').live('keyup', function (e) {
    if (e.which != 13) {
        typing = true;
        socket.emit('messageTyping', { type: 1, userId: userId });
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 1000);
    }
});

socket.on('messageTypingClient', function (data) {
    if (data.type) {
        if (data.userId != userId) {
            if (!$.trim($('.loading').html()).length)
                $('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.messages-content'));
        }
    } else {
        $('.message.loading').remove();
    }
});

//相手側の発言欄
function partnerMessage(msg) {

    $('<div class="message new ' + 3 + '"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    //updateScrollbar(chatIdFake);
}

function chat_init(p_uid=22){
  $.ajax({
   type: "GET",
   url:"https://it2-sotuken.herokuapp.com/chat_init?partner_user_id="+p_uid,
   success: function(data){
       console.log(data)
       //TODO:icon
       
       //name
       $(".chat-title #userName").html(data[0].fullname);
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
     });
}

