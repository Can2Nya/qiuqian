// var name = null;

$('#next').on('click', function() {
  if($('#name').val() == ''){
    alert('请输入姓名');
    return;
  }
  $('.t span').text($('#name').val());
  var num = Math.floor(Math.random() * 13);
  $('.item-2 .qian img').attr('src', '/img/qian/'+ num +'.png');
  $.fn.fullpage.moveNext(true);
})