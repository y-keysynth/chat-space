$(document).on('turbolinks:load', function(){
  $(function(){
    function buildMessage(message) {
      var content = (message.content) ? `${message.content} ` : "";
      var image = (message.image.url === null) ? '' : `<img src="${message.image.url}">`;

      var html = `<div class="message" data-message-id="${message.id}"> 
                    <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${message.name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.created_at}
                    </p>
                    </div>
                    <p class="message__text">
                    ${content}
                    </p>
                    <p class="lower-message__content">
                    ${image}
                    </p>
                    <p></p>
                  </div>`
      return html;
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function(message){
        var html = buildMessage(message);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('.messages').append(html);
        $('#new_message')[0].reset();
        $('.form__submit').removeAttr('disabled');
      })
      .fail(function(){
        alert('メッセージを入力してください');
        $('.form__submit').removeAttr('disabled');
      })
    })
  });
  
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: '/groups/${id:last}/api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      // var rul = api/messages#index {:format=>"json"} して↑のurl: urlがいいかも？

      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる

      //メッセージが入ったHTMLを取得

      //メッセージを追加

    })
    .fail(function() {
      console.log('error');
    });
  };
});