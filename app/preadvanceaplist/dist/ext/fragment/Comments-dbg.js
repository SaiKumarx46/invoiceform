sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress: async function (oEvent) {
           
            debugger
            var cdialog = new sap.m.Dialog({
                title: "Comments",
                endButton: new sap.m.Button({
                    text: "Close",  
                    press: async function () {
                        cdialog.close();
                    },
                    layoutData: new sap.m.FlexItemData({
                        // Add layoutData for flexible item behavior
                        growFactor: 5,
                        alignSelf: "End" // Align the button to the end (right)
                    })
                })
            });
            cdialog.addContent(new sap.m.VBox({
                width: "60vw"
            }));

            function generateUniqueId() {
                // Generate a random number
                var randomNumber = Math.floor(Math.random() * 1000000);

                // Get the current timestamp
                var timestamp = new Date().getTime();

                // Combine timestamp and random number to create a unique ID
                var uniqueId = timestamp + '-' + randomNumber;

                return uniqueId;
            }
            debugger
            var path = window.location.href;
            const parts = path.split("'");

            // Find the index of the substring "reimbursmentId="
            const index = parts.findIndex(part => part.includes("registration_id="));
            const number = parts[index + 1];
            var funcname = "getcallcomment";
            let oFunc = this.getModel().bindContext(`/${funcname}(...)`);
            oFunc.setParameter('registration_id', number);
            await oFunc.execute();
            let context = oFunc.getBoundContext(); 
            let getdata = context.getValue();
            let result = getdata.value;
            result = JSON.parse(result);
            var i1 = result.length;
            // var len = commentshistory.length;
            for (var i = 0; i < result.length; i++){
            var oTimelineItem = new sap.suite.ui.commons.TimelineItem(("thisuniqid1" + generateUniqueId()), {
                dateTime: "12/3/34",
                // title: "demo title1",
                userNameClickable: false,
                // userNameClicked: "onUserNameClick",
                // select: "onPressItems",
                // userPicture: "Photo",
                text: result[i].textArea,
                // userName: "Comments"
            
            });
            cdialog.addContent(oTimelineItem);
        }
            // var oTimelineItem1 = new sap.suite.ui.commons.TimelineItem(("thisuniqid2"+generateUniqueId()),{
            //     dateTime: "12/3/34",
            //     // title: "demo title1",
            //     userNameClickable: false,
            //     // userNameClicked: "onUserNameClick",
            //     // select: "onPressItems",
            //     // userPicture: "Photo",
            //     text: 'Demo Comment Decision & MOM of Forum',
            //     userName: "Decision & MOM of Forum"
            // });
            // var oTimelineItem2 = new sap.suite.ui.commons.TimelineItem(("thisuniqid2"+generateUniqueId()),{
            //     dateTime: "12/3/34",
            //     // title: "demo title1",
            //     userNameClickable: false,
            //     // userNameClicked: "onUserNameClick",
            //     // select: "onPressItems",
            //     // userPicture: "Photo",
            //     text: 'Demo Comment Tooling Agreement signed',
            //     userName: "Tooling Agreement signed"                
            // });

            
            // cdialog.addContent(oTimelineItem1);
            // cdialog.addContent(oTimelineItem2);

            cdialog.open(); // Open the dialog

        }
    };
});
