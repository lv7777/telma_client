//定数
var _domain = "https://it2-sotuken.herokuapp.com"

var _user_id = "1";
var _session_id = "g25j1p2ogawik29";
var region_id = ["1","2","3"];
var listCnt = 1;
var locationInfo;

/* 初期化 *****************/
$(function(){
  $('#refresh').on('changestate',function(){
    console.log("aaaaa");
  });
});
function menuOpen() {
  document.querySelector('#mySplitter').left.toggle();
}
function openSlide(page) {
  $("#content").load(page);
  document.querySelector('#mySplitter').left.toggle();
}

function chatOpen(id){
console.log(id);
/*
var sendData = {
keiji_id:id
}
//myNavigator.pushPage("bbs-detail.html", { animation : "slide" , onTransitionEnd:bbsDetailDom(sendData)});/*
$.ajax({
type: "GET",
url: _domain+"/keiji/detail",
//url:_domain+"/postinfo.php?type=bbs-content",
data:sendData,
success: function(msg){
console.log(JSON.stringify(msg));
myNavigator.pushPage("bbs-detail.html", { animation : "slide"})
.then(function(){
ons.ready(
detailLoad(msg,id)
)
});
}
});*/
myNavigator.pushPage("chat.html", { animation : "lift"})
.then(function(){
ons.ready(function(){
$(".chat-title #userName").html("fffff");
})
})
}

//右ページ移動
function slideOpen(page){
  //console.log(this.val());
        var options = {
  animation: 'slide', // What animation to use
  onTransitionEnd: function() {
  alert("aaaa");} // Called when finishing transition animation
};
	myNavigator.pushPage(page,options);
}
//ポップアップ表示
function openDialog(id){
  document.getElementById(id).show();
  //document.getElementById(id).show();
}
//ポップアップ閉
function closeDialog(id){
  document.getElementById(id).hide();
}
var alertMsg = function(target){
  $('#alert-msg').show(target);
}
var showPopover = function(target) {
  document
    .getElementById('popover')
    .show(target);
};

function returnLocation(){
  var options = {};

  function success(tmpinfo) {
  	var info = tmpinfo.coords;
	  console.log('Latitude : ' + info.latitude);
	  console.log('Longitude: ' + info.longitude);
	  //return info.latitude;
	};
	function error(err) {
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	};
	var lat = navigator.geolocation.getCurrentPosition(success, error, options);
	//console.log(lat);
}

/* AlertPage **************************/
function agreeBtn(id){
  var dom = $($(".agreeBtn")[id]);
  if(dom.hasClass('active')){
  //承認
  dom.toggleClass("btn-success");
  dom.toggleClass("btn-secondary");
  dom.html("未承認");
  dom.toggleClass("active");
  }else{
  //未承認
  ons.notification.confirm({message:"本当に承認しますか？",title:null,modifier:"ios"}).then(function(result){
    if(result){
      dom.toggleClass("btn-success");
      dom.toggleClass("btn-secondary");
      dom.html("チャットへ");
      dom.toggleClass("active");
      dom.attr("onclick","chatOpen('chat.html')");
      //チャットボタン作成
      /*var chatDom = dom.clone(true);
      listDom.prependTo($("#bbs-lists"));
      dom.clone()*/
    }else{
      
    }
  });
  }
}
  
/*************************************/



