// This is a JavaScript file

//通知リスト
//list-allする。最初の一回で呼び出すだけ。
function notification_list(type){
    var type="3"
  console.log("notiflist");

$.ajax({
    type: "GET",
    url: _domain+"/notification/list?type="+type,
    success: function (msg) {
        console.log("success!");
        console.log(JSON.stringify(msg));
    },
    error: function (xhr,status,error){

        console.log("error occurred...")
        console.log(xhr);
        console.log(status);
        console.log(error);
    
    }
  });
     
}