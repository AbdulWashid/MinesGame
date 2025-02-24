// array of images
var arr = [
    ["img/bomb.jpg","bomb"],
    ["img/five.jpg",5],
    ["img/nfour.jpg",-4],
    ["img/none.jpg",-1],
    ["img/nseven.jpg",-7],
    ["img/nthree.jpg",-3],
    ["img/ntwo.jpg",-2],
    ["img/one.jpg",1],
    ["img/seven.jpg",7],
    ["img/three.jpg",3],
    ["img/two.jpg",2],
    ["img/zero.jpg",0],
    ["img/zero.jpg",0],
    ["img/seven.jpg",7],
    ["img/bomb.jpg","bomb"],
    ["img/ntwo.jpg",-2]
];
// suffle function start
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}
shuffle(arr);
// suffle function end
// backgroun image in every box
$(".box").each(function(index1){
    $(this).css('background-image','url(' + arr[index1][0] + ')');
});
// jquery start
var playerscore;
var playerName;
var currentScore=0;
$(document).ready(function(){
    var currentPlayer = localStorage.getItem("currentPlayer");
    if(currentPlayer==null){
        window.location.href = "form.html";
    }
    currentPlayer = JSON.parse(currentPlayer);
    playerscore = currentPlayer.score; 
    playerName = currentPlayer.name;
    $("#userName").html(playerName+"<br>"+"Previous Score: "+playerscore +"<br>"+"Current Score: "+currentScore);//*
    var mobile = currentPlayer.number;
    var playerIndexInList;
    var player = localStorage.getItem("player");
    player = JSON.parse(player);
    for (const index in player) {
        if (player[index].number==mobile) {
            playerIndexInList =index;
        }
    }
    // box layer hide on click
    $(".layer").click(function(){
        $(this).css("backgroundColor","transparent");
        var currentIndex = $(this).parent().prevAll().length;
        if(arr[currentIndex][1] != undefined){
            if(arr[currentIndex][1]=="bomb"){
                arr.forEach(element => {
                    delete element[1];
                });
                var audio = {};
                audio["sound"] = new Audio();
                audio["sound"].src = "outbtn.wav";
                audio["sound"].play();
                $("#outbox").css("visibility","visible");
                $("#outbox").html("Game Over!");
                setTimeout(function(){
                    location.reload();
                },2000);
                currentScore = 0;
            }else{
                var audio = {};
                audio["sound"] = new Audio();
                audio["sound"].src = "clicksound.wav";
                audio["sound"].play();
                currentScore = currentScore + arr[currentIndex][1];
            }
        }
        $("#userName").html(playerName+"<br>"+"Previous Score: "+playerscore +"<br>"+"Current Score: "+currentScore);
        delete arr[currentIndex][1];
    });
    // out function
    $("#out").click(function(){
        playerscore = playerscore + currentScore;
        currentPlayer.score = playerscore;
        player[playerIndexInList].score = playerscore;
        player = JSON.stringify(player);
        localStorage.setItem("player",player);
        currentPlayer = JSON.stringify(currentPlayer);
        localStorage.setItem("currentPlayer",currentPlayer);
        $("#outbox").css("visibility","visible");
        $("#outbox").html("Your Score is " + playerscore);
        arr.forEach(element => {
            delete element[1];
        });
        var audio = {};
        audio["sound"] = new Audio();
        audio["sound"].src = "outbtn.wav";
        audio["sound"].play();
        setTimeout(function(){
            location.reload();
        },2000);
    });
    // log out fuction 
    $("#logOut").click(function(){
        window.location.href = "form.html";
        localStorage.removeItem("currentPlayer");
    });
});
