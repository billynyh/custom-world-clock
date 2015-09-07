var data = [
    { name:"London", tz:"Europe/London" },
    { name:"MPK", tz:"America/Los_Angeles" },
    { name:"Hong Kong", tz:"Asia/Hong_Kong" },
    { name:"Maryland", tz:"America/New_York" },
];

function initView() {
    var mainView = $("#main");
    var container = $("#right");

    container.empty();

    var i,n;
    var now = new Date();

    var timeViews = [];

    for (i=0, n=data.length; i<n; i++) {
        var itemView = $("<div class='item'></div>");
        var nameView = $("<span class='name'></span>");
        var timeView = $("<span class='time'></span>");
        var abbrView = $("<span class='abbr'></span>");

        nameView.text(data[i].name);

        var tz = moment(now).tz(data[i].tz);
        abbrView.text(tz.format('z'));

        itemView.append(nameView);
        itemView.append(timeView);
        itemView.append(abbrView);

        container.append(itemView);
        timeViews.push({ view:timeView, data:data[i]});
    }


    updateTime(mainView, timeViews);
    loadBackground();
    resizeBackground();

    setInterval(function() {
        updateTime(mainView, timeViews);
    }, 1000);
}

function updateTime(mainView, timeViews) {
    var now = new Date();
    for (var i=0, n=timeViews.length; i<n; i++) {
        timeViews[i].view.text(moment(now).tz(timeViews[i].data.tz).format('HH:mm'));
    }
    mainView.text(moment(now).format("HH:mm:ss"));
}

function resizeBackground() {
    var body = $("body");
    var overlay = $("#overlay");
    var bg = $("#bg");

    overlay.width(body.width());
    overlay.height(body.height());
    
    bg.width(body.width());
    bg.height(body.height());

}

var API_URL = "https://api.500px.com/v1/photos?feature=popular&sort=created_at&image_size=2048&consumer_key=xMbXs0VPu7xmKdfxcYFi4Ft9vHayus81OmdmlLwJ";
function loadBackground() {
    var bg = $("#bg");
        
    $.get(API_URL, function(data) {
        var n = data.photos.length;
        var x = Math.floor(Math.random() * n);
        var image_url = data.photos[x].image_url;

        $("#image-info").html("<a target='_blank' href='http://500px.com" + data.photos[x].url + "'>" + data.photos[x].name + "@500px</a>");

        var imageObj = new Image();
        imageObj.addEventListener('load', function(){
            bg.hide();
            bg.css("background-image", "url(" + image_url + ")");
            bg.fadeIn();
        }, false);
        imageObj.src = image_url;
        

    });

}


$(document).ready(function(){
    initView();
});  

$(window).resize(function(){
    resizeBackground();
});