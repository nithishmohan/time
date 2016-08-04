var timeZone= {
	 um12 : -12.00,//(utC - 12:00,// Enitwetok, Kwajalien
	 um11 : -11.00,// Nome, Midway Island, Samoa
	 um10 : -10.00,//  Hawaii
	 um9  : -9.00,// Alaska
	 um8  : -8.00,//Pacific Time
	 um7  : -7.00,// Mountain Time
	 um6  : -6.00,// Central Time, Mexico City
	 um5  : -5.00,// Eastern Time, Bogota, Lima, Quito
	 um4  : -4.00,// Atlantic Time, Caracas, La Paz
	 um25 : -3.50, // Newfoundland
	 um3  : -3.00, // Brazil, Buenos Aires, Georgetown, Falkland Is.
	 um2  : -2.00, // Mid-Atlantic, Ascention Is., St Helena
	 um1  : -1.00, // Azores, Cape Verde Islands
	 utc  :  0.00, // Casablanca, Dublin, Edinburgh, London, Lisbon, Monrovia
	 up1  :  1.00, //Berlin, Brussels, Copenhagen, Madrid, Paris, Rome
	 up2  :  2.00, // Kaliningrad, South Africa, Warsaw
	 up3  :  3.00, //Baghdad, Riyadh, Moscow, Nairobi
	 up25 :  3.50,// Tehran
	 up4  :  4.00,// Adu Dhabi, Baku, Muscat, Tbilisi
	 up35 :  4.50,// Kabul
	 up5  :  5.00,// Islamabad, Karachi, Tashkent
	 up45 :  5.30,// Bombay, Calcutta, Madras, New Delhi
	 up6  :  6.00,// Almaty, Colomba, Dhaka
	 up7  :  7.00,// Bangkok, Hanoi, Jakarta
	 up8  :  8.00,// Beijing, Hong Kong, Perth, Singapore, Taipei
	 up9  :  9.00,// Osaka, Sapporo, Seoul, Tokyo, Yakutsk
	 up85 :  9.50,// Adelaide, Darwin
	 up10 :  10.00,// Melbourne, Papua New Guinea, Sydney, Vladivostok
	 up11 :  11.00,// Magadan, New Caledonia, Solomon Islands
	 up12 :  12.00,// Auckland, Wellington, Fiji, Marshall Island

}
module.exports = {

	parseTime: function(req, res){
		var unixTime=req.query.time;
		var tz=req.query.tz.toLowerCase();
		actualTime(unixTime, tz, function(err, result){
			if(err)
				res.status(500).send(err);
			else
				res.status(200).send(JSON.stringify({time: result}));
		});		
	}

}

function actualTime(unixTime,tz, callback){
		if(unixTime.length==10){
			unixTime=unixTime*1000;
			var timestamp=new Date(Number(unixTime)*1000);
		}else if(unixTime.length==13){
			var timestamp=new Date(Number(unixTime));
		}
		else{
			callback("Invalid Date");
			return;
		}
		if ( Object.prototype.toString.call(timestamp) !== "[object Date]" || isNaN( timestamp.getTime() )) {
		     callback("Invalid Date");
		     return;
		}
		if(timeZone[tz]!=null){
			var time=new Date(Number(unixTime)+Math.floor(timeZone[tz])*60*60*1000+Math.ceil((timeZone[tz]-Math.floor(timeZone[tz]))*100*60*1000)).toISOString().substr(0, 19).replace('T', ' ');
			callback(null, time);
		}
		else
			callback("Invalid timzone");
};


