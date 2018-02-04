// var name = null;

$('#next').on('click', function() {
  if($('#name').val() == ''){
    alert('请输入姓名');
    return;
  }
  $('.t span').text($('#name').val());
  $.fn.fullpage.moveNext(true);
})