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

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message:last').data("message-id");
        var href = 'api/messages#index {:format=>"json"}'

        $.ajax({
          url:  href,
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function(message){
            insertHTML = buildMessage(message);
          $('.messages').append(insertHTML)
          });
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function () {
          alert('自動更新に失敗');
        });
      }
    };
    setInterval(reloadMessages, 5000);
  });
});