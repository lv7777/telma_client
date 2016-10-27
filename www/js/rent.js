/*Rental**************/



//詳細表示
function rentDetail(id){
  myNavigator.pushPage("page/rent/rent-detail.html", { animation : "slide"})
  /*console.log(id);
  var sendData = {
    kashikari_id:id
  }
  $.ajax({
    type: "GET",
    url: _domain+"/kashikari/detail",
    //url:_domain+"/postinfo.php?type=rent-content",
    data:sendData,
    success: function(msg){
      console.log(JSON.stringify(msg));
      myNavigator.pushPage("rent-detail.html", { animation : "slide"})
      .then(function(){
        ons.ready(function(){
          //画像読み込み
          //var detailImg = new Image();
          //detailImage.onload=function() {
            //ロード完了で画像を表示
          //  $("#image-box").children("img").attr({'src':url});
          //}
          //detailImage.src = url;
          $("#rent-detail-var").html(msg.title);
          $("#rent-detail-title").html(msg.title);
          $("#rent-detail-content").html(msg.content);
          switch(reply_flg){
            case 2:
              $("#rent-reply").html("申請中");
              break;
            case 3:
              $("#rent-reply").html("チャットへ");
              break;
            default:
              $("#rent-reply").attr("onclick","rentReply("+id+")");
              break;
          }
        })
      });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
  });*/
}


//詳細表示
function rentContent(id){
  console.log(id);
  myNavigator.pushPage("page/rent/rent-content.html", { animation : 'pop' } );
}

//貸す提案
function rentContentReply(){
  ons.notification.confirm({message:"本当に貸しますか？",title:null,modifier:"ios"}).then(function(result){
    if(result){
      ons.notification.alert({messageHTML:"申請が承認されるまで<br>少々お待ちください。",title:null,modifier:"ios"})
      $("#rent-reply").html("申請中")
      console.log("true");
    }else{
      console.log("false");
    }
  });
}

function rentServerAgree(){
  
}

//記事投稿
function rentWrite(){
  var title = $("#rent-title").val();
  var content = $("#rent-content").val();
  
  var sendData = {
    title:title,
    content:content,
    ido:"100",
    keido:"200",
    image:"bbs.img"
  };
  
    $.ajax({
        type: "POST",
        url:"https://it2-sotuken.herokuapp.com/kashikari/post",
        data:sendData,
        success: function(msg){
            ons.notification.confirm({
            title:"投稿成功！",
            message:"投稿に成功しました！掲示板に戻ります。",
            callback:function(idx){
                if(idx){
                    myNavigator.popPage();
                }
            }
            })
         }
     });
}

/*******************/

//記事リスト
//list-allする。最初の一回で呼び出すだけ。
function listfirst(){
    //allclear();
  $("#load-dialog").show();
  console.log("listfirst in rent");
  var sendData = {
    ido:"300",keido:"300"
  };
  $.ajax({
   type: "get",
   url:"https://it2-sotuken.herokuapp.com/kashikari/list-all",
   data:sendData,
   success: function(msg){

    
    $(".rent-list:visible").remove()
    $.each(msg,function(key,val){
    var listDom = $(".rent-list-seed:hidden").clone(true);
    listDom.attr("onclick","rentDetail("+val.kashikari_id+")");
    listDom.find(".list__item__title").html(val.title);
    listDom.find(".date").html(formatDate(new Date(val.time)));
    listDom.fadeIn().css("display","");
    listDom.prependTo($("#rent-lists"));
     });

    console.log("success!");
    console.log(JSON.stringify(msg));
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
     });
  /******/
}

	
function formatDate(date, format) {						
if (!format) format = 'YYYY年MM月DD日 hh時mm分';						
format = format.replace(/YYYY/g, date.getFullYear());						
format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));						
format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));						
format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));						
format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));						
format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));						
if (format.match(/S/g)) {						
var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);						
var length = format.match(/S/g).length;						
for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));						
}						
return format;						
};						
						


