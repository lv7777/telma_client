/*Rental**************/

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
        
    console.log("success!");
    console.log(JSON.stringify(msg));
//     $.each(msg,function(key,val){
//       var listDom = $(".bbs-list-seed:first").clone(true);//.html("List"+listCnt)
//       listDom.attr("onclick","bbsDetail("+val.keiji_id+")");
//       listDom.find(".list__item__title").html(val.title);
//       listDom.find(".list__item__subtitle").html(val.content);
//        listDom.prependTo($("#bbs-lists"));
// 
//     });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
     });
  /******/
}