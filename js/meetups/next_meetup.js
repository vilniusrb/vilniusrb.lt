jQuery.noConflict();

var Next = (function($) {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  var call = function(path, params) {
    var url = "http://api.meetup.com" + path + "?callback=?&" + $.param(jQuery.extend({ key: $api_key }, params))
    $.getJSON(url, function(response) {
      meetup = response.results[0]
      console.log(meetup)
      var out =
        "<span class='next_meetup date'>" + formattedDate(meetup.time) + "</span>"
        + "<span class='next_meetup title'>" + meetup.name + "</span>"
        + "<span class='next_meetup link'> <a href='" + meetup.event_url + "'>Register here</a></span>"
        + "<div class='next_meetup description'>" + meetup.description + "</div>"
      $('#next').html(out)
    })
  }

  var formattedDate = function(millis) {
    var date = new Date( millis );
    return months[date.getMonth()] + ' ' + addLeadingZero(date.getDate()) + ', ' + date.getFullYear().toString();
  }

  var addLeadingZero = function(num) { return (num < 10) ? ('0' + num) : num }

  return {
    call: call
  }
})(jQuery);
