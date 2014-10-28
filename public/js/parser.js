(function(root) {
  var jQuery = root.jQuery || {};
  var $ = root.$ || {};
  var Parser = (function(){
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
        new_loc.location = {l1: $(this).attr("saddr"), l2: $(this).attr("saddr2"), l3: $(this).attr("scity") + ", " + $(this).attr("sstate")};
        new_loc.phone = $(this).attr("sphone");
        new_loc.id = $(this).attr("snum");
        new_loc.hours = parseHours(times.find('store[n="' + new_loc.id +'"]'));
        locations.push(new_loc);
      });

      return locations;
    };

    // Takes a string representation of xml as requested
      function MenuParser(xml_string) {
        var xmlObject = $.parseXML(xml_string);
        var entreeMenus = EntreeMenus(xmlObject);
        var condimentMenus = CondimentMenus(xmlObject);
        var menuOptions = { entreeMenus: entreeMenus, condimentMenus: condimentMenus }
        return menuOptions;
      }

    // Takes an DOM xml object and returns entree menus
      function EntreeMenus(xml) {
        var entreeMenus = [];
        var stations = $(xml).find("station");
        stations.each(function (stationIndex) {
          // Get properties of current menu
          var menuName = $(this).attr("name");
          var id = $(this).attr("id");
          var type = $(this).attr("type");
          // Iterates children and adds corresponding item to menu
          var items = [];
          var children = $(this).find("item");
          children.each(function (itemIndex) {
            var description = $(this).attr("idesc");
            var id = $(this).attr("iid");
            var cost = $(this).attr("icost");
            var imageName = $(this).attr("igroup");
            var ifat = $(this).attr("ifat");

            var condimentStr = $(this).attr("icond");
            var condimentIds = [];
            if(typeof condimentStr !== 'undefined') {
              var i;
              for(i = 0; i < condimentStr.length; i = i+2) {
                condimentIds.push(condimentStr.substring(i, i+2));
              }
            }

            var longDescription = $(this).attr("ifdesc");
            var iextra = $(this).attr("iextra");
            items.push({ description: description,
              id: id,
              cost: cost,
              ifat: ifat,
              imageName: imageName,
              condimentIds: condimentIds,
              longDescription: longDescription,
              iextra: iextra });
          });
          entreeMenus.push({ menuName: menuName,
            id: id,
            type: type,
            items: items });
        });
        return entreeMenus;
      }

    // Takes an DOM xml object and returns condiment menus
      function CondimentMenus(xml) {
        var condimentMenus = [];
        var condimentSection = $(xml).find("cc");
        condimentSection.each(function (condimentMenuIndex) {
          // Gets properties of current condiment menu
          var id = $(this).attr("cclass");
          var min = $(this).attr("cmin");
          var disp = $(this).attr("cdisp");
          var description = $(this).attr("cond");
          // Iterates children and adds corresponding condiments to menu
          var condiments = [];
          var children = $(this).find("cond");
          children.each(function (condimentIndex) {
            var id = $(this).attr("cid");
            var name = $(this).attr("cname");
            condiments.push({ id: id, name: name });
          });
          condimentMenus.push({ id: id,
            min: min,
            disp: disp,
            description: description,
            condiments: condiments });
        });
        return condimentMenus;
      }

    return {
      parseLocations: parseLocations,
      parseMenu: MenuParser
    };
  })();
  // Detect node vs browser
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS (nodejs)
    var jsdom = require('jsdom');
    var window = jsdom.jsdom().parentWindow;
    window.DOMParser = require('xmldom').DOMParser;
    global.DOMParser = window.DOMParser;
    var jquery = require('jquery')(window);
    $ = jquery;

    module.exports = Parser;
  }
  else {
    // Browser detected, make Parser global
    root.Parser = Parser;
  }
})(this);
