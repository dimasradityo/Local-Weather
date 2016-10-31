var long, lat, url;


$(document).ready(function() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(pos){
            lat = pos.coords.latitude;
            long = pos.coords.longitude;       
            url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +lat+ '&lon=' +long+ '&APPID=51ca7bd15b048d96ecd82cd1f8c38434';$.getJSON(url, function(data){
            console.log(data);     
        });   
        
    });
    }
    
    
});