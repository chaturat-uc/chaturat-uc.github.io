$(document).ready(function(){ 
    $("#email").hide();
    $("#showEmail").click(function(){
        $("#email").toggle();
    });

    
    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var timeString = hours + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
        $('#clock').text(timeString);
    }
    setInterval(updateClock, 1000);

    
    function updateAnalogClock() {
        var now = new Date();
        var seconds = now.getSeconds();
        var minutes = now.getMinutes();
        var hours = now.getHours();
        var secDeg = ((seconds / 60) * 360) + 90;
        var minDeg = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
        var hourDeg = ((hours / 12) * 360) + ((minutes/60)*30) + 90;
        $('.second').css('transform', 'rotate(' + secDeg + 'deg)');
        $('.minute').css('transform', 'rotate(' + minDeg + 'deg)');
        $('.hour').css('transform', 'rotate(' + hourDeg + 'deg)');
    }
    setInterval(updateAnalogClock, 1000);
    updateAnalogClock(); // Initialize clock immediately

    // Joke API Integration
    function fetchJoke() {
        $.getJSON('https://v2.jokeapi.dev/joke/Any', function(data) {
            var joke = data.setup ? `${data.setup} - ${data.delivery}` : data.joke;
            $('#joke').text(joke);
        });
    }
    setInterval(fetchJoke, 60000); 
    fetchJoke(); 

 
    function fetchWeather() {
        $.getJSON('https://api.weatherbit.io/v2.0/current?lat=35.7721&lon=-78.63861&key=XXX&units=I', function(data) {
            var weather = data.data[0].weather.description;
            $('#weather').text(weather);
        });
    }
    fetchWeather();

    // JavaScript cookies to remember the client
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function formatDate(date) {
        var d = new Date(date);
        var day = ('0' + d.getDate()).slice(-2);
        var month = ('0' + (d.getMonth() + 1)).slice(-2);
        var year = d.getFullYear();
        var hours = ('0' + d.getHours()).slice(-2);
        var minutes = ('0' + d.getMinutes()).slice(-2);
        var seconds = ('0' + d.getSeconds()).slice(-2);
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    $(document).ready(function(){
        var lastVisit = getCookie("lastVisit");
        if (lastVisit) {
            $('#welcome').text("Welcome back! Your last visit was " + formatDate(lastVisit));
        } else {
            $('#welcome').text("Welcome to my homepage for the first time!");
        }
        setCookie("lastVisit", new Date(), 365);
    });
});
