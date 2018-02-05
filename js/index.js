// var name = null;
var num = Math.floor(Math.random() * 12);
$('.item-2 .qian').css('background-image', 'url(/img/qian/'+ num +'.png)');
$('#next').on('click', function() {
  if($('#name').val() == ''){
    alert('请输入姓名');
    return;
  }
  $('.t span').text($('#name').val());
  
  
  $.fn.fullpage.moveNext(true);
})