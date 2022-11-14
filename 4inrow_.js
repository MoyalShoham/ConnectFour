var p1Color = "rgb(85, 151, 255)";
var p2Color = "rgb(237, 45, 73)";

var p1 = prompt("player one: enter your name:");
var p2 = prompt("player two: enter your name:");
var game_on = true;
var table = $('table tr');

function report_win(){
  alert("win!");
}
function change_color(row, col, color){
  return table.eq(row).find('td').eq(col).find('button').css('background-color', color);
}
function return_color(row, col){
  return table.eq(row).find('td').eq(col).find('button').css('background-color');
}
function check_buttom(col){
  var color_report = return_color(5, col);
  for(var row = 5; row > -1; row--){
    color_report = return_color(row, col);
    if(color_report === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}
function color_match_check(one, two, three, four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}
function horizontal_win_check(){
  for(var row = 0; row < 6; row++){
    for(var col = 0; col < 4; col++){
      if(color_match_check(return_color(row, col), return_color(row, col+1), return_color(row, col+2), return_color(row, col+3))){
        report_win();
        return true;

      }else{
        continue;
      }
    }
  }

}
function vertical_win_check(){
  for(var col = 0; col < 7; col++){
    for(var row = 0; row < 3; row++){
      if(color_match_check(return_color(row, col), return_color(row+1, col), return_color(row+2, col), return_color(row+3, col))){
        report_win();
        return true;

      }else{
        continue;
      }
    }
  }
}
function diagonal_win_check(){
  for(var col = 0; col < 5; col++){
    for(var row = 0; row < 7; row++){
      if(color_match_check(return_color(row, col), return_color(row+1, col+1), return_color(row+2, col+2), return_color(row+3, col+3))){
        report_win();
        return true;

      }else if(color_match_check(return_color(row, col), return_color(row-1, col+1), return_color(row-2, col+2), return_color(row-3, col+3))){
        report_win();
        return true;

      }else{
        continue;
      }
    }
  }
}


var current_name = p1;
var current_player = 1;
var current_color = p1Color;
$('h3').text(current_name + ' it\'s your turn, pick a column to drop in!').css('color', current_color);
$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  var bottom_avail = check_buttom(col);
  change_color(bottom_avail, col, current_color);
  if(horizontal_win_check() || vertical_win_check() || diagonal_win_check()){
    $('h1').text(current_name + " You have Won!").css('color', current_color);
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }
  current_player = current_player * -1;
  if(current_player === 1){
    current_name = p1;
    current_color = p1Color;
    $('h3').text(current_name +' it is your turn.').css('color', current_color);


  }else{
    current_name = p2;
    current_color = p2Color;
    $('h3').text(current_name+' it is your turn.').css('color', current_color);

  }
})
