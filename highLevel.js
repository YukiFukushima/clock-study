//答え合わせのボタンと答えを最初隠しておく
$('.answer_text').hide();
$('.answer_img img').hide();
$('.answer_box_check').hide();

//答え(時・分)の保存
var hour_for_answer_check=0;
var minutes_for_answer_check=0;

//selecboxの選択肢の生成
function createTimeSelctBox(start, end){                //SelectBox生成関数
    var num="";

    for(var i=start; i<end; i++){
        num +=`<option>${i}</option>`;
    }

    return num;
}
$('#input_hour').html(createTimeSelctBox(1, 13));       //"時"の選択肢生成
$('#input_minutes').html(createTimeSelctBox(0, 60));    //"分"の選択肢生成

//クリックイベント(STARTボタン)
$('.start_box_text').on("click",function(){
    var hour=0;
    var minutes=0;
    var hour_deg=-90;
    var minutes_deg=-90;
    
    //答え合わせのボタンを表示
    $('.answer_box_check').show();

    //リトライの為に開始時にも答えを隠す
    $('.answer_text').hide();
    $('.answer_img img').hide();

    // 時、分の元となる数字をランダムに取得
    hour = Math.floor( Math.random() *12);
    minutes = Math.floor( Math.random() *60);
    if( hour==0 ){
        hour_for_answer_check = 12;
    }else{
        hour_for_answer_check = hour;
    }
    minutes_for_answer_check = minutes;

    //角度を産出
    var calc_minutes = 60*hour + minutes;
    hour_deg = hour_deg + calc_minutes*0.5;
    minutes_deg = minutes_deg + calc_minutes*6;
    
    //！！数字と文字列の連結はどう書くのがいいのだろうか？！！
    //短針の設定
    /*方法1
    $('.hour_hand').css({
        transform: 'rotate(' + (hour_deg) + 'deg)'
    });
    */
    //方法2(rotate命令を文字列として扱うことが必要みたい)
    $('.hour_hand').css('transform','rotate(' + hour_deg +'deg)');

    //長針の設定
    $('.minutes_hand').css({
        transform: 'rotate(' + (minutes_deg) + 'deg)'
    });

    //ページを少し下に移動
    var scroll_pos = $(window).scrollTop();
    $(window).scrollTop( scroll_pos+100 );
});

//クリックイベント(答え合わせボタン)
$('.answer_box_check').on("click",function(){
    //答えの取得
    var answer_hour = $('#input_hour').val();           //答え（時）の取得
    var answer_minutes = $('#input_minutes').val();     //答え（分）の取得

    if( (answer_hour==hour_for_answer_check)
    &&  (answer_minutes==minutes_for_answer_check) ){
        $('.answer_text').show();
        $('.answer_img img').show();

        $('.answer_text').text('せいかい！');
        $('.answer_text').css('color', 'red');
        $('.answer_img img').attr('src','https://yukifukushima.github.io/clock-study/shufu-ok.png');
    }
    else{
        $('.answer_text').show();
        $('.answer_img img').show();

        $('.answer_text').text('ほんとう？');
        $('.answer_text').css('color', 'black');
        $('.answer_img img').attr('src','https://yukifukushima.github.io/clock-study/shufu-gimon.png');
    }

    //ページを少し下に移動
    var scroll_pos = $(window).scrollTop();
    $(window).scrollTop( scroll_pos+100 );
});
