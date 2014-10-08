
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


