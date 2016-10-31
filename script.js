$(document).ready(function() {
    var tempC = 0;
    var tempF = 0;

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
            tempC = Math.round(json.main.temp);
            $('#temp').html( tempC+ '&#8451');            
            $('#pic').attr('src', 'http://openweathermap.org/img/w/' +json.weather[0].icon+ '.png');
        });

    });

    $('#fah').on('click', function(){
        $(this).prop('disabled', true);        
        $('#cel').prop('disabled', false);      
        tempF = Math.round(ConvertC(tempC));
        $('#temp').html( tempF+ '&#8457');      
    });

    $('#cel').on('click', function(){
        $(this).prop('disabled', true);        
        $('#fah').prop('disabled', false);      
        $('#temp').html( tempC+ '&#8451');
    });
    
    function ConvertC(c){
        return c * (9/5) + 32;        
    }
    
});