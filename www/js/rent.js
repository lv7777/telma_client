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
    session_id:_session_id,
    user_id:_user_id,
    title:title,
    content:content,
    ido:"100",
    keido:"200",
    limit:"3",
    image:"bbs.img"
  };
  
	$.ajax({
   type: "POST",
   url:domain+"/postinfo.php",
   data:sendData,
   success: function(msg){
     alert(msg);
 	 }
 	});
}


/*******************/