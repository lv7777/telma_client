/*BBS****************/

//記事投稿
function bbsWrite(){
  var title = $("#bbs-title").val();
	var content = $("#bbs-content").val();
	//var location = getLocation();
	//alert(location.ido);
  console.log("bbsWrite");
  var sendData = {
    title:title,
    content:content,
    ido:"300",
    keido:"300",
    image:"hanabi1.jpg"
  };
  
	$.ajax({
   type: "POST",
   url:"https://it2-sotuken.herokuapp.com/keiji/post",
   data:sendData,
   success: function(msg){
     console.log("bbswriteSuccess!");
      console.log(JSON.stringify(msg));
    }
 	});
  myNavigator.popPage();
  bbsList();
}

function bbsReply(id){
  $.ajax({
     type: "GET",
     url: _domain+"/keiji/detail",
     //url:_domain+"/postinfo.php?type=bbs-content",
    data:{keiji_id:id},
    success: function(msg){
      myNavigator.pushPage("page/bbs/bbs-reply.html", { animation : "slide"}).then(function(){
        ons.ready(function(){
          console.log(JSON.stringify(msg));
          $("#bbs-reply-var").html(msg.title);
          $("#bbs-reply-content").html(msg.content);
          $("#bbs-reply-btn").attr("onclick","bbsReplyPost("+id+")");
          //var cloneDom = listDom.clone(true);
        })
      })
    }
  });
}


//記事リスト
//最初にlist-all,update更新ボタンではupdate
function bbsList(){
    
/*
  var listDom = $(".bbs-list:first").clone(true);//.html("List"+listCnt)
  listDom.attr("onclick","bbsContent("+listCnt+")");
  listDom.find(".keijiban_id").attr('id',listCnt);
  listDom.find(".list__item__title").html("title"+listCnt);
  listDom.find(".list__item__subtitle").html("content"+listCnt);
  listDom.prependTo($("#bbs-lists"));
  return listCnt++;*/
  
  //最新のidを取得する。
  const leastest_id=0;
  
  $("#load-dialog").show();
  console.log("update");
  var sendData = {
    ido:"300",keido:"300"
  };
  $.ajax({
   type: "POST",
   url:"https://it2-sotuken.herokuapp.com/keiji/list-all",
   data:sendData,
   success: function(msg){
       allclear()
    console.log("success!");
    console.log(JSON.stringify(msg));
    $.each(msg,function(key,val){
      var listDom = $(".bbs-list-seed:first").clone(true);//.html("List"+listCnt)
      //listDom.attr("hidden","false");
      listDom.attr("onclick","bbsDetail("+val.keiji_id+")");
      listDom.find(".list__item__title").html(val.title);
      listDom.find(".list__item__subtitle").html(val.content);
      //var cloneDom = listDom.clone(true);
      listDom.prependTo($("#bbs-lists"));
    });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
 	});
  /******/
}

//記事リスト
//list-allする。最初の一回で呼び出すだけ。
function listfirst(){
    allclear();
  $("#load-dialog").show();
  console.log("listfirst");
  var sendData = {
    ido:"300",keido:"300",mock:false
  };
  $.ajax({
   type: "POST",
   url:"https://it2-sotuken.herokuapp.com/keiji/list-all",
   data:sendData,
   success: function(msg){
        
    console.log("success!");
    console.log(JSON.stringify(msg));
    $.each(msg,function(key,val){
      var listDom = $(".bbs-list-seed:first").clone(true);//.html("List"+listCnt)
      listDom.attr("onclick","bbsDetail("+val.keiji_id+")");
      listDom.find(".list__item__title").html(val.title);
      listDom.find(".list__item__subtitle").html(val.content);
       listDom.prependTo($("#bbs-lists"));

    });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
     });
  /******/
}

function allclear(){
    console.log("delete");
      var currentDom = $(".bbs-list-seed[onclick]")
      console.log(currentDom)
      console.log("deleted!")
      currentDom.remove()
      console.log("deleteded!")
}

//詳細表示
function bbsDetail(id){
  console.log(id);
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
  }); 
}

function detailLoad(msg,id){
  $("#bbs-detail-var").html(msg.title);
  $("#bbs-detail-title").html(msg.title);
  $("#bbs-detail-content").html(msg.content);
  $("#bbs-reply").attr("onclick","bbsReply("+id+")");
  //画像読み込み
  //var detailImg = new Image();
  //detailImage.onload=function() {
    //ロード完了で画像を表示
  //  $("#image-box").children("img").attr({'src':url});
  //}
  //detailImage.src = url;
  
  $.each(msg['comment'],function(key,val){
    var listDom = $(".bbs-cmt-list:first").clone(true);//.html("List"+listCnt)
    //listDom.attr("hidden","false");
    //listDom.find(".image").html(val.image);
    listDom.find(".bbs-cmt-cmt").html(val.comment);
    //var cloneDom = listDom.clone(true);
    listDom.prependTo($("#bbs-cmt-lists"));
  }); 
};


function bbsReplyPost(id){
  var comment = $("#bbs-reply-cmt").val();
  console.log("start!");
  var sendData = {
    keiji_id:id,
    comment:comment
  };
	$.ajax({
    type: "POST",
    //url: _domain+"postinfo.php",
    url:"https://it2-sotuken.herokuapp.com/keiji/comment",
    data:sendData,
    success: function(msg){
      console.log("Success!");
      console.log(JSON.stringify(msg));
      myNavigator.popPage().then(function(){
        $.ajax({
          type: "GET",
          url: _domain+"/keiji/detail",
          //url:_domain+"/postinfo.php?type=bbs-content",
          data:{keiji_id:id},
          success: function(data){
            console.log(JSON.stringify(data));
                detailLoad(data,id)     
          }
        });
      });
    },
    error: function(msg){
      console.log("error/".msg);
    }
 	});
}

function bbsDetailDom(data){
  ons.ready(function(){
  console.log("eee");
  //console.log($("#bbs-detail").find("#bbs-detail-var").html());
  console.log($("#bbs-detail-var").html());
  })
}


//地点登録
function locationRegi(id){/*
  var region_id = ["1","2","3"];
  var region_name = ["友人","学校","実家"];
  var ido = ["100","200","300"];
  var keido = ["300","200","100"];
  
  var sendData = {
    session_id:_session_id,
    user_id:_user_id,
    region1:{
      region_id:region_id,
      name:region_name,
      ido:ido,
      keido:keido
    }
  };
	
  $.ajax({
   type: "POST",
   url: "http://exout.net/~kashima_dollars/postinfo.php",
   data:sendData,
   success: function(msg){
     alert(msg);
 	 }
 	});*/
  closeDialog(id);
}
//Refresh
function bbdRefresh(event){
  console.log('change');/*
  var pullHook = $('#refresh');
  var message = '';
  switch (event.state) {
    case 'initial':
      message = 'Pull to refresh';
      break;
    case 'preaction':
      message = 'Release';
      break;
    case 'action':
      message = 'Loading...';
      break;
  }
  pullHook.innerHTML = message;

  pullHook.onAction = function(done) {
    setTimeout(done, 1000);
  }*/
}
function locationEdit(){
  $("#location-edit").html
}


/*********************/