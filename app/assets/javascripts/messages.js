$(document).on('turbolinks:load', function(){
  $(function(){
    function buildMessage(message) {
      var imagejudg = (message.image.url === null) ? '' : `<img src="${message.image.url}">`;
      var html = `<div class="message">
                    <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${message.name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.created_at}
                    </p>
                    </div>
                    <p class="message__text">
                    ${message.content}
                    </p><p class="lower-message__content">
                    ${imagejudg}
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
});