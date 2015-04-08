var listTemplate = _.template($('#friend-listing').html(), { variable: 'm' });

refreshList();

function refreshList() {
  $.getJSON('/api/friends').done(function (data) {
    $('.friends-list').html(listTemplate({ friends: data }));
    $('.main-edit-button').on('click', activateEdit);
    $('.edit-button').click(function(e) {
      var self = $(e.target);
      self.toggle();
      self.nextAll('.edit-input').toggle();
    });
    $('.favorite-button').on('click', toggleFavorite);
    $('.delete-button').on('click', function(e) {
      var id = $(e.target).closest('li').attr('data');
      $.ajax({
        type: "DELETE",
        url: '/api/friends/' + id,
      }).done(refreshList());
    })
  });
};

function toggleFavorite(e) {
  self = $(e.target);
  var id = $(e.target).closest('li').attr('data');

  if (self.hasClass('favorite')) {
    $.ajax({
      type: "PUT",
      url: '/api/friends/' + id + '/favorite',
      data: JSON.stringify({ isFavorite: false }),
      contentType : 'application/json',
      dataType: 'json'
    }).done(refreshList());
  } else {
    $.ajax({
      type: "PUT",
      url: '/api/friends/' + id + '/favorite',
      data: JSON.stringify({ isFavorite: true }),
      contentType : 'application/json',
      dataType: 'json'
    }).done(refreshList());
  }
}

function activateEdit(e) {
  var self = $(e.target);
  self.closest('li').find('.edit-button').toggle();
  self.nextAll('.listing-button').toggle();
  self.text('y');
  self.off('click', activateEdit);
  self.on('click', submitEdit);
}

function submitEdit(e) {
  var self = $(e.target).closest('li');
  var id = self.attr('data');
  var friend = {
    _id: id,
    firstName: self.find('.first-name-edit').val() || self.find('.first-name-display').text(),
    lastName: self.find('.last-name-edit').val() || self.find('.last-name-display').text(),
    hometown: self.find('.hometown-edit').val() || self.find('.hometown-display').text(),
    occupation: self.find('.occupation-edit').val() || self.find('.occupation-display').text(),
    email: self.find('.email-edit').val() || self.find('.email-display').text(),
    phone: self.find('.phone-edit').val() || self.find('.phone-display').text(),
    isFavorite: self.find('.favorite-button').hasClass('favorite'),
    sex: self.find('h2').data()
  }

  $.ajax({
    type: "PUT",
    url: '/api/friends/' + id,
    data: JSON.stringify(friend),
    contentType : 'application/json',
    dataType: 'json'
  }).done(refreshList());
}

$('.new-friend-form').on('submit', addFriend);


function addFriend(e) {
  e.preventDefault();

  if (!validateInput()) {
    alert('all fields required');
    return;
  }

  var newFriend = {
    firstName : $('.friend-first-name').val(),
    lastName : $('.friend-last-name').val(),
    hometown : $('.friend-hometown').val(),
    occupation : $('.friend-occupation').val(),
    email : $('.friend-email').val(),
    phone : $('.friend-phone').val(),
    sex: $('input[name=sex]:checked').val()
  };

  $.ajax({
    type: "POST",
    url: '/api/friends',
    data: JSON.stringify(newFriend),
    contentType : 'application/json',
    dataType: 'json'
  }).done(refreshList());

  $('.friend-input').val('');
  $('input[name=sex]').attr('checked', false);

}

function validateInput() {
  var result = true;
  $('.friend-input').each(function (i) {
    if ($(this).val() === '') {
      result = false;
      return;
    }
  });

  // if (!$('input[name=sex]:checked').length) {
  //   result = false;
  // }

  return result;
}

$('.main-edit-button').click(function(e) {
  var self = $(e.target);
  self.closest('li').find('.edit-button').toggleClass('visible');
})
