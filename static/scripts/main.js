$(document).ready(function () {

  var data = [];
  var activeIdx = -1;

  // kick off getting the shoutouts
  getShoutouts();
  // now do it  every 2.5 seconds
  setInterval(getShoutouts, 2500);

  function getShoutouts() {
    $.ajax({
      url: '/api/getShoutouts',
      type: 'GET',
      success: function (res) {
        data = res.shoutouts;
        renderPreviews();
        renderActive();
      }
    })
  }


  function renderPreviews() {
    $('#shoutouts').html(
        data.map((i) => '<li data-sid="' + i._id + '">' + i.shoutoutText + '</li>').join('')
    )
  }

  function renderActive() {
    if (activeIdx > -1) {
      var active = data[activeIdx];
      $('#show-shoutout').css('display', 'block');
      $('#shoutout').text(active.shoutoutText ? active.shoutoutText: '');
      $('#author').text(active.author ? active.author: '');
      $('#comment-text').text(active.comment ? active.comment : '');
    } else {
      $('#show-shoutout').css('display', 'none');
    }
  }

  $('#shoutouts').on('click', 'li', function () {
    var _id = $(this).data('sid');
    for (i = 0; i < data.length; i++) {
      if (data[i]._id === _id) {
        activeIdx = i;
      }
    }
    renderActive();
  })

  $('#show-shoutout').on('click', '#submitComment', function () {
    var comment = $('#comment').val();
    var sid = data[activeIdx]._id
    $.ajax({
      url: 'api/addComment',
      data: {comment, sid},
      type: 'POST',
      success: function(res) {
        console.log(res);
      }
    })
  })

 
  $('#new-shoutout').on('click', function () {
    $('.modal').css('display', 'block');
  })

  $('#close-modal').on('click', function () {
    $('.modal').css('display', 'none');
  })

  $('#submit-shoutout').on('click', function () {
    var sText = $('#shoutout-text').val();
    $.ajax({
      url: '/api/updateShoutout',
      data: { shoutoutText: sText },
      type: 'POST',
      success: function(res) {
        console.log(res);
        $('.modal').css('display', 'none');
      }
    })
  })
})
