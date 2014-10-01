$(document).ready(function () {

	// Takes a string representation of xml as requested
	function MenuParser(xml_string) {
		var xmlObject = $.parseXML(xml_string);
		var entreeMenus = EntreeMenus(xmlObject);
		var condimentMenus = CondimentMenus(xmlObject);
		var menuOptions = { entreeMenus: entreeMenus, condimentMenus: condimentMenus }
		
		debugger;
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
				var condimentIds = $(this).attr("icond");
				var longDescription = $(this).attr("ifdesc");
				var iextra = $(this).attr("iextra");
                items.push({ description: description, 
							 id: id,
							 cost: cost,
							 ifat: ifat, 
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
	
	// Test button for test.html (used for debugging and demonstrating)
	$("#button").click(function () {
		MenuParser('<root><menu name="item"><station name="14 inch Godfathers Pizza" id="2" type="sc"><item idesc="Wednesday Special" iid="7577" igroup="ommon/pizzameat1" ifat="15" icond="AAABAC" icost="20.95" ifdesc="Buy any 14 inch 2 Topping pizza and an order of 14 inch Super Sticks only $20.95 " iextra=""/><item idesc="Cheese Pizza" iid="198" igroup="common/phcheesefe" ifat="15" icost="14.50" ifdesc="14 inch Pizza with Mozzarella Cheese" iextra=""/><item idesc="One Topping Pizza" iid="6" igroup="common/pizzameat1" ifat="15" icond="ADAB" icost="15.95" ifdesc="14 inch Pizza with choice of topping" iextra=""/><item idesc="Two Topping Pizza" iid="7" igroup="upl_online_twotopping" ifat="15" icond="AAAB" icost="15.95" ifdesc="14 inch Pizza with two toppings" iextra=""/><item idesc="Three - Five Topping Pizza" iid="8" igroup="common/pizzameat1" ifat="15" icond="AEAB" icost="17.95" ifdesc="14 inch Pizza with three to five toppings" iextra=""/></station><station name="Godfathers Pizza by the Slice" id="171" type="sc"><item idesc="One Slice" iid="4346" igroup="upl_online_tmpphpmSPmXz" ifat="15" icond="AG" icost="2.75" ifdesc="One Slice - Choose from one of our daily selections." iextra=""/><item idesc="Two Slices" iid="4347" igroup="upl_online_tmpphpmSPmXz" ifat="15" icond="AHAG" icost="4.69" ifdesc="Two Slices - Choose from our daily selections. Place message in the notes if you want two of the same slice." iextra=""/></station></menu><menu name="condiment"><cc cclass="ad" cmin="0" cdisp="1" cond="Seasonsings"><cond cid="59" cname="Cajun" /><cond cid="60" cname="Fajita" /><cond cid="61" cname="Greek" /></cc><cc cclass="ae" cmin="1" cdisp="1" cond="Soup Choice"><cond cid="603" cname="Broccoli Cheddar" cdef="1" /></cc></menu></root>');
    });
	
});

