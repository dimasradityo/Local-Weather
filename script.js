$(document).ready(function() {
    var tempC = 0;
    var tempF = 0;    
    
    function digitalClock(){
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime (m);
        s = checkTime (s);
        $('#time').html(h +':'+ m +':'+ s);  
        console.log('oi');      
    }
    function checkTime(t){
        if (t < 10){
            t = "0"+t;
            return t;
        }
    }

    $.getJSON('http://ipinfo.io', function(data){
        var city = data.city;
        var country = data.country;        
        var unit = '&units=metric';    
        var sign;
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' +city+ '&APPID=51ca7bd15b048d96ecd82cd1f8c38434'+unit;
        $('strong').html(city+ ', ' +country);        
        console.log(url);

        $.getJSON(url, function(json){
            $('#weather').html(json.weather[0].description);
            tempC = Math.round(json.main.temp);            
            $('#temp').html( tempC+ '&#8451');            
            $('#pic').attr('src', 'http://openweathermap.org/img/w/' +json.weather[0].icon+ '.png');

            switch (json.weather[0].icon) {
                case '01d':
                    $('.wi').addClass('wi-day-sunny animated pulse');
                    break;
                case '02d':
                    $('.wi').addClass('wi-day-cloudy animated pulse');
                    break;    
                case '03d':
                    $('.wi').addClass('wi-cloud animated pulse');
                    break;
                case '04d':
                    $('.wi').addClass('wi-cloudy animated pulse');
                    break;
                case '09d':
                    $('.wi').addClass('wi-day-showers animated pulse');
                    break;
                case '10d':
                    $('.wi').addClass('wi-day-rain animated pulse');
                    break;
                case '11d':
                    $('.wi').addClass('wi-day-thunderstorm animated pulse');
                    break;
                case '13d':
                    $('.wi').addClass('wi-day-snow animated pulse');
                    break;
                case '50d':
                    $('.wi').addClass('wi-fog animated pulse');
                    break;

                    case '01n':
                    $('.wi').addClass('wi-night-clear animated pulse');
                    break;
                case '02n':
                    $('.wi').addClass('wi-night-alt-cloudy animated pulse');
                    break;    
                case '03n':
                    $('.wi').addClass('wi-cloud animated pulse');
                    break;
                case '04n':
                    $('.wi').addClass('wi-cloudy animated pulse');
                    break;
                case '09n':
                    $('.wi').addClass('wi-night-showers animated pulse');
                    break;
                case '10n':
                    $('.wi').addClass('wi-night-rain animated pulse');
                    break;
                case '11n':
                    $('.wi').addClass('wi-night-thunderstorm animated pulse');
                    break;
                case '13n':
                    $('.wi').addClass('wi-night-snow animated pulse');
                    break;
                case '50n':
                    $('.wi').addClass('wi-night-fog animated pulse');
                    break;
            
                default:
                    break;
            }
            console.log(json);
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