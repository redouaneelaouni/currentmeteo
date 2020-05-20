$("#prevision").hide();

$("#submitwheather").click(function () {
    var city = $("#city").val();
    if (city != '') {

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=a4578e39643716894ec78b28a71c7110',
            type: "GET",
            success: function (data) {
                previsions(city);
                var result = show(data);
                $("#show").html(result);
                $("#city").val('');
                $("#prevision").show();
            }
        })

    } else {
        $("#alert").html("<div class=\"alert alert-danger text-center alert-dismissible\">\n" +
            "  <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
            "  <strong>Wrong!</strong> field cannot be empty.\n" +
            "</div>");
    }
})

function show(data) {
    return "<h2 style='font-size: 40px; font-weight: bold; margin-bottom: 30px'>Current weather for " + data.name + "," + data.sys.country + " </h2>"
        + "<h5><strong> weather</strong>: " + data.weather[0].main + " </h5> "
        + "<h5> <strong> description</strong>: " + data.weather[0].description +
        "<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'> </h5> "
        + "<h5> <strong> Temperature</strong>: " + data.main.temp + "&deg;C </h5> "
        + "<h5> <strong> Pressure</strong>: " + data.main.pressure + " hPa </h5> "
        + "<h5> <strong> humidity</strong>: " + data.main.humidity + "% </h5> "
        + "<h5> <strong> Min. Temperature</strong>: " + data.main.temp_min + "&deg;C </h5> "
        + "<h5> <strong> Max. Temperature</strong>: " + data.main.temp_max + "&deg;C </h5> "
        + "<h5> <strong> Wind speed</strong>: " + data.wind.speed + " </h5> ";
}

function calculTime(unixTimeStamp) {
    var a = new Date(unixTimeStamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var time = date + '/' + month + '/' + year;
    return time;
}

function previsions(city) {


    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&APPID=a4578e39643716894ec78b28a71c7110',
        type: 'GET',
        success: function (result, statut) {
            $.each(result.list, function (k, result) {
                var i = 1;

                var time= calculTime(result.dt);
                console.log(time);
                var current = prevision(result, time);
                $(".col-md-1").eq(k).html(current);
                $("#city").val('');
                i++;
            })
        }
    })


    function prevision(data , time) {
        console.log("show function");
        return "<h6 style='font-size:small'>  " + time + "</h6> "
       + "<h6> <strong> Min. </strong>: " + data.temp.min + "&deg;C </h6> "
        + "<h6 ><img width='' src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'> </h6> "

        + "<h6> <strong> Max. </strong>: " + data.temp.max + "&deg;C </h6> "

    }
}

