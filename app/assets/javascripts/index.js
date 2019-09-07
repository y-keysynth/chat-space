$(document).on('turbolinks:load', function(){
  $(function(){
    var search_list = $("#user-search-result");
    var member_list = $("#member-append");

    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`
      search_list.append(html);
    }

    function appendUserToMemberList(name, user_id) {
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
  　　 member_list.append(html);
    }

    function appendErrMsgToHTML(msg) {
      var html = `<div class="chat-group-user clearfix">
                    <div class='user-search-result'>${ msg }</div>
                  </div>`
      search_list.append(html);
    }

    $('#user-search-field').on('keyup', function(e){
      e.preventDefault();
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    })
    
    $(function(){
      $(document).on('click', '.user-search-add', function() {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendUserToMemberList(name, user_id);
      });

      $(document).on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    })
  })
});