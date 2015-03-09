var listTemplate = _.template($('#friend-listing').html(), { variable: 'm' });

refreshList();

function refreshList() {
  $.getJSON('/api/friends').done(function (data) {
    $('.friends-list').html(listTemplate({ friends: data }));
  });
}

$('.new-friend-form').submit(function(e) {
  e.preventDefault();

  var newFriend = {
    name: $('.friend-name').val(),
    sex: $('input[name=sex]:checked').val()
  };

  $.ajax({
    type: "POST",
    url: '/api/friends',
    data: JSON.stringify(newFriend),
    contentType : 'application/json',
    dataType: 'json'
  }).done(refreshList);

});
