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
        //配列ごとにfor回す
        var $misyounin=$('<div style="margin:5px 10px 0px 0px" class="right list__item__right"><button type="button" class="btn agreeBtn btn-secondary" onclick="agreeBtn(0)">未承認</button></div>');
        var $go_chat=$('<div style="margin:5px 10px 0px 0px" class="right list__item__right"><button type="button" class="btn agreeBtn btn-success active" onclick="agreeBtn(3)">チャットへ</button></div>');

        for(var item of msg){
            //クローンしてから
            //console.log(item);            
            var listDom = $(".alert-list-seed:first").clone(true);//.html("List"+listCnt)
            //listDom.attr("onclick","");
            //listDom.find(".list__item__title").html(item.title);
            //listDom.find(".list__item__subtitle").html(item.subtitle);
            //TODO:スタイルのclass化
            
            switch(item.alert_type_id){
                case "1":
                    // 掲示板のコメント
                    //onclickの追加
                    listDom.find(".list__item__thumbnail").removeClass().addClass("list__item__thumbnail ons-icon fa-comment-o fa fa-2x");//TODO:
                    listDom.find(".list__item__title").html(item.title);
                    listDom.find(".list__item__subtitle").html(item.subtitle);
                    listDom.attr("onclick","");
                    break; 
                case "2":
                    // チャット（チャット相手の新規発言
                    //TODO:実装しない。仕様にはない。
                    //チャットへボタンの追加
                    
                    
                    break;
                case "3":
                    // 承認（取引相手決定）
                    //(A:貸してください＝＞B:おｋ＝＞A:okを受けますか？)
                    //未承認ボタンの追加
                    //その後チャットへ
                    listDom.find(".list__item__thumbnail").removeClass().addClass("list__item__thumbnail ons-icon ion-android-alert ons-icon--ion fa-2x");//TODO:
                    listDom.find(".list__item__title").html(item.title);
                    listDom.find(".list__item__subtitle").html("");
                    listDom.prepend($misyounin);
                    break;
                case "4":
                    // 貸す側へ承認返答(A:貸してください＝＞B:おｋ(レンタル広場の実装)＝＞A:ok承認(悪質なアレを避けるため。)->B:okok受けました。)
                    //チャットへの追加
                    listDom.find(".list__item__thumbnail").removeClass().addClass("list__item__thumbnail ons-icon ion-android-alert ons-icon--ion fa-2x");//TODO:
                    listDom.find(".list__item__title").html(item.title);
                    listDom.find(".list__item__subtitle").html("");
                    listDom.prepend($go_chat);
                    break;
                case "5":
                    // 評価通知
                    listDom.find(".list__item__thumbnail").removeClass().addClass("list__item__thumbnail ons-icon fa-star-o fa fa-2x");//TODO:
                    listDom.find(".list__item__title").html(item.title);
                    listDom.find(".list__item__subtitle").html("");
                    listDom.attr("onclick","alert('ユーザー評価に遷移')");
                    break;
                case "6":
                    //掲示板新規投稿
                    listDom.find(".list__item__thumbnail").removeClass().addClass("list__item__thumbnail ons-icon fa-pencil fa fa-2x");
                    listDom.find(".list__item__title").html(item.title);
                    listDom.find(".list__item__subtitle").html(item.subtitle);
                    listDom.attr("onclick","");
                    break;
                default:
            }
            listDom.appendTo($("#alert-lists"));
            // item.alert_id
            // item.user_id
            // item.username
            // item.alert_type_id
            // item.any_id
            // item.any_value
            // item.time
            
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