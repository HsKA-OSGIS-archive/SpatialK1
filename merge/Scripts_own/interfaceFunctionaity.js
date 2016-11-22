var begin, end, residence, ageGroup, stadiumFoetus, result;
var actions = [];

$(function(){	
			$('.daterangepickerCon').daterangepicker({
    			locale : {
					"format": "DD.MMM.YYYY HH:MM",
        			"separator": " - ",
        			"applyLabel": "Übernehmen",
       				"cancelLabel": "Abbrechen",
        			"fromLabel": "Von",
        			"toLabel": "Bis",
        			"customRangeLabel": "Custom",
        			"weekLabel": "W",
        			"daysOfWeek": [
            			"So",
            			"Mo",
            			"Di",
            			"Mi",
            			"Do",
            			"Fr",
            			"Sa"
        			],
        			"monthNames": [
            			"Januar",
            			"Februar",
            			"März",
            			"April",
            			"Mai",
            			"Juni",
            			"Juli",
            			"August",
            			"September",
            			"Oktober",
            			"November",
            			"Dezember"
        			],
        			"firstDay": 1
    			},
				"timePicker": true,
    			"timePicker24Hour": true/*,
    			"startDate": "10/04/2016",
   			 	"endDate": "01/24/2017"*/
			}, function(start, end, label) {
				end = end.format('DD.MM.YYYY HH:MM');
				start = start.format('DD.MM.YYYY HH:MM');
				alert('Start: ' + start + ', End: ' + end);
			});;
		})
		//$('#start').keyup($.debounce(addr_search(), 300))