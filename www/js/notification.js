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
        console.log(typeof msg);
        console.log(msg);
        //配列ごとにfor回す
        for(var item in msg){
            //クローンしてから
            
            
            var listDom = $(".alert-list-seed:first").clone(true);//.html("List"+listCnt)
            listDom.attr("onclick","bbsDetail("+val.keiji_id+")");
            listDom.find(".list__item__title").html(item.title);
            listDom.find(".list__item__subtitle").html(item.subtitle);
            listDom.prependTo($("#bbs-lists"));

            switch(item.alert_type_id){
                case 1:
                    // 掲示板のコメント
                    //onclickの追加
                    
                    break;
                case 2:
                    // チャット（チャット相手の新規発言
                    //TODO:実装しない。仕様にはない。
                    //チャットへボタンの追加
                    
                    
                    break;
                case 3:
                    // 承認（取引相手決定）
                    //(A:貸してください＝＞B:おｋ＝＞A:okを受けますか？)
                    //未承認ボタンの追加
                    //その後チャットへ
                    
                    break;
                case 4:
                    // 貸す側へ承認返答(A:貸してください＝＞B:おｋ(レンタル広場の実装)＝＞A:ok承認(悪質なアレを避けるため。)->B:okok受けました。)
                    //チャットへの追加
                    
                    
                    break;
                case 5:
                    // 評価通知
                    break;
                case 6:
                    //掲示板新規投稿
                    
                    
                    break;
                default:
            }
            
            item.alert_id
            item.user_id
            item.username
            item.alert_type_id
            item.any_id
            item.any_value
            item.time
            
        }
        //タイトルとサブタイトル、タイム、alert_id,user_id,username,alerttype
        
    },
    error: function (xhr,status,error){

        console.log("error occurred...")
        console.log(xhr);
        console.log(status);
        console.log(error);
    
    }
  });
     
}