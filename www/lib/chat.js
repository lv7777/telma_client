

function chat_init(p_uid=22){
  $.ajax({
   type: "GET",
   url:"https://it2-sotuken.herokuapp.com/chat_init?partner_user_id="+p_uid,
   success: function(data){
       console.log(data)
       //TODO:icon
       
       //name
       //$(".chat-title #userName").html(data[0].fullname);
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
     });
}