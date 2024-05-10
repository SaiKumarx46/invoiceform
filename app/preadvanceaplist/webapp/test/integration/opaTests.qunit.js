sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'preadvanceaplist/test/integration/FirstJourney',
		'preadvanceaplist/test/integration/pages/poheaderList',
		'preadvanceaplist/test/integration/pages/poheaderObjectPage',
		'preadvanceaplist/test/integration/pages/polineitemObjectPage'
    ],
    function(JourneyRunner, opaJourney, poheaderList, poheaderObjectPage, polineitemObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('preadvanceaplist') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThepoheaderList: poheaderList,
					onThepoheaderObjectPage: poheaderObjectPage,
					onThepolineitemObjectPage: polineitemObjectPage
                }
            },
            opaJourney.run
        );
    }
);