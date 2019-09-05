$(function(){
  function buildMessage(message) {
    var html = `<div class="message">
                  <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                  ${message.name[:user_id]}
                  </p>
                  <p class="message__upper-info__date">
                  ${message.created_at}
                  </p>
                  </div>
                  <p class="message__text">
                  </p><p class="lower-message__content">
                  ${message.content}
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
      $('.messages').append(html);
    })
    .fail(function(message){
    })
  })
});
