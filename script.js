$(document).ready(function() { 
    var tempC = 0;
    var tempF = 0;
    var more = false;    

    $('.well').hide();
    $('.follow').hide();  
    $('#loc').hide();
    $('.foot').hide();
    $('#weather').hide();
    $('.btn').hide();
    CurTime();
    

    function CurTime(){
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var today = new Date();
        var dateNow = today.getDate();
        var month = today.getMonth();
        var year = today.getFullYear();                
        var d = today.getDay();
        var h = today.getHours();
        var m = checkTime(today.getMinutes());
        var s = checkTime(today.getSeconds());
        $('#curDate').html(days[d]+ ', ' +dateNow+ ' ' +months[month]+ ' ' +year);
        $('#time').html(h +':'+ m +':'+ s);  
        var t = setTimeout(CurTime, 500);     
    }
    function checkTime(t){
        if (t < 10){
            t = "0"+t;
        }
        return t;
    }    
    function UnixTime(unix) {
        var date = new Date(unix * 1000);
        var h = date.getHours();
        var m = checkTime(date.getMinutes());        
        var format = h+ ':' +m;        
        return format;
    }

    $.getJSON('http://ipinfo.io', function(data){
        var city = data.city;
        var country = data.country;        
        var unit = '&units=metric';    
        var sign;
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' +city+ '&APPID=51ca7bd15b048d96ecd82cd1f8c38434'+unit;
        $('strong').html(city+ ', ' +country);        

        $.getJSON(url, function(json){
            console.log(url);
            $('#weather').html(json.weather[0].description);
            tempC = Math.round(json.main.temp);
            tempCMin = Math.round(json.main.temp_min);
            tempCMax = Math.round(json.main.temp_max);            
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
            $('#hum').html("Humidity: " +json.main.humidity+ '%');
            $('#temp_min').html(tempCMin+ '&#8451');
            $('#temp_max').html(tempCMax+ '&#8451');
            $('#sunrise').html('Sunrise: ' +UnixTime(json.sys.sunrise));
            $('#sunset').html('Sunset: ' +UnixTime(json.sys.sunset));

            $('#loc').show().addClass('animated fadeInDown');
            $('#weather').show().addClass('animated fadeInDown');
            $('.well').show(3000).addClass('animated slideIn');
            $('.btn').show(4000).addClass('animated slideInUp');
            $('.foot').show(8000).addClass('animated slideInUp')
        });

    });

    $('#more').on('click', function(){        
        if (!more){
            $(this).html('<');
            $('.follow').show(1000);
            more = true;            
        }
        else{        
            $(this).html('>');
            $('.follow').hide(1000);
            more = false;            
        }
    });

    $('#fah').on('click', function(){
        $(this).prop('disabled', true).css({
            'background-color': '#73877B' 
        });        
        $('#cel').prop('disabled', false).css({
            'background-color': 'ghostwhite' 
        });      
        tempF = Math.round(ConvertC(tempC));
        tempFMin = Math.round(ConvertC(tempCMin));
        tempFMax = Math.round(ConvertC(tempCMax));

        $('#temp').fadeOut(300, function () {
            $(this).html( tempF+ '&#8457')
        }).fadeIn(300);
        $('#temp_min').html( tempFMin+ '&#8457');
        $('#temp_max').html( tempFMax+ '&#8457');
    });

    $('#cel').on('click', function(){
        $(this).prop('disabled', true).css({
            'background-color': '#73877B' 
        });        
        $('#fah').prop('disabled', false).css({
            'background-color': 'ghostwhite' 
        });    
        $('#temp').fadeOut(300, function () {  
            $(this).html( tempC+ '&#8451')
        }).fadeIn(300);
        $('#temp_min').html( tempCMin+ '&#8451');
        $('#temp_max').html( tempCMax+ '&#8451');        
    });
    
    function ConvertC(c){
        return c * (9/5) + 32;        
    }
    
});