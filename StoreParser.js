var parseLocations = function(xml) {
	var doc = $.parseXML(xml);
	var tree = $(doc);
	
	var raw_locations = tree.find('menu[name="location"]').find("store");
	var times = tree.find('menu[name="schedule"]');
	var locations = [];
	
	var parseHours = function(store) {
		var open = [];
		var hours = store.find("time");
		hours.each(function (index) {
			var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
			var timeString = $(this).attr("t");
			var day1 = parseInt(timeString[0]);
			var day2 = parseInt(timeString[5]);
			var time1 = days[day1] + ": " + timeString.substring(1,3) + ":" + timeString.substring(3,5);
			var time2 = timeString.substring(6,8) + ":" + timeString.substring(8,10);
			if(day1 != day2)
			{
				time2 = days[day2] + ": " + time2;
			}
			open.push(time1 + " - " + time2);
		});
		return open;
	};
	
	raw_locations.each(function (index) {
		var new_loc =  {};
		new_loc.name = $(this).attr("sname");
		new_loc.message = $(this).attr("smsg");
		new_loc.location = {lat:$(this).attr("slat"), long:$(this).attr("slon")};
		new_loc.phone = $(this).attr("sphone");
		new_loc.id = $(this).attr("snum");
		new_loc.hours = parseHours(times.find('store[n="' + new_loc.id +'"]'));
		locations.push(new_loc);
	});
	
	return locations;
};