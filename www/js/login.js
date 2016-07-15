
function newUserPage(){
  myNavigator.pushPage('page/login/user-regi.html');
}
function modoru1(){
  myNavigator.popPage();
}
function modoru2(){
  myNavigator.pushPage('page/login/pw-remake.html');
}

function login() {
  myNavigator.replacePage("splitter.html",{animation:"fade"});
  console.log("hello")
}
function newlogin() {
  var name = $("#input-name").val();
  var email = $("#input-Email").val();
  var password = $("#input-Password").val();
  var tel = $("#input-tel").val();
   var sendData = {
    fullname:name,
    email:email,
    password:password,
    tel:tel,
    image:"image.jpg",
    google_id:"",
    facebook_id:"",
    twitter_id:""
  };
  $.ajax({
    type: "POST",
    url: _domain+"/login",
    data:sendData,
    success: function (msg) {
      //alert(msg);
      console.log(JSON.stringify(msg));
    }
  });
}
function newlogin_me() {

  var email = $("#inputEmail").val();
  var password = $("#inputPassword").val();
   var data = {
    email:email,
    password:password
  };

  $.ajax({
    type: "POST",
    url: _domain+"/login",
    data:data,
    success: function (msg) {
      if(msg.status=="ok"){
        myNavigator.replacePage("splitter.html",{animation:"fade"});
      }else{
        console.log("/login is success,but data.status is bug...");
      }
    },
    error:function(xhr,status,error){
        console.log("error!");
        console.log(xhr);
        console.log(status);
        console.log(error);
      ons.notification.alert({
        title:"login error!",
        message:"login failed. please try agein.",
        animation:"default"
      });
    }
  });
}
function newpass() {
  var email = $("#input-Email").val();
  //alert(email+"/"+password);
  $.ajax({
    type: "POST",
    url: "http://exout.net/~kashima_dollars/postinfo.php",
    data:
            "email=" + email,
    success: function (msg) {
      alert(msg);
    }
  });
}
/*function upload(form) {
 $form = $('#upload-form');
 fd = new FormData($form[0]);
 $.ajax(
 'http://exout.net/~kashima_dollars/postinfo.php',
 {
 type: 'post',
 processData: false,
 contentType: false,
 data: fd,
 dataType: "json",
 success: function(data) {
 alert( data.message );
 console.log(data);
 },
 error: function(XMLHttpRequest, textStatus, errorThrown) {
 alert( "ERROR" );
 alert( textStatus );
 alert( errorThrown );
 }
 });
 return false;
 }
 */

function onSuccess(imageURI) {
  //    alert('An error occured: ' + imageURI);
  var largeImage = document.getElementById('image');
  largeImage.src = imageURI;
}

function getPhoto() {
  //Specify the source to get the photos.
  navigator.camera.getPicture(onSuccess, onFail,
          {quality: 50, destinationType: Camera.DestinationType.FILE_URL,allowEdit: true,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY, });
document.getElementById("dialog-2.html").hide();
}
function getPhoto2() {
  //Specify the source to get the photos.
  navigator.camera.getPicture(onSuccess, onFail,
          {quality: 50, destinationType: Camera.DestinationType.FILE_URL,
            sourceType: navigator.camera.PictureSourceType.CAMERA, });
document.getElementById("dialog-2.html").hide();
}

function onFail(message) {
  alert('An error occured: ' + message);
}
function showDialog(id) {
  document.getElementById(id).show();
}



