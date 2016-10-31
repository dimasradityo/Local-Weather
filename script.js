$(document).ready(function() {
    $.getJSON('http://ipinfo.io', function(data){
        var city = data.city;
        var country = data.country;
        var unit = '&units=metric';
        var sign;
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' +city+ '&APPID=51ca7bd15b048d96ecd82cd1f8c38434'+unit;
        $('#loc').html(city+ ', ' +country);
        console.log(url);

        $.getJSON(url, function(json){
            $('#weather').html(json.weather[0].description);
            $('#temp').html(Math.round(json.main.temp) + '&#8451');
            console.log(Math.round(json.main.temp) + '&#8451;');
            $('#pic').attr('src', 'http://openweathermap.org/img/w/' +json.weather[0].icon+ '.png');
        });


    });
    
    
});