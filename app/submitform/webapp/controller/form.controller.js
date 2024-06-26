// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
//     /**
//      * @param {typeof sap.ui.core.mvc.Controller} Controller
//      */
//     function (Controller) {
//         "use strict";

//         return Controller.extend("submitform.controller.form", {
//             onInit: function () {

//             },
//             onPress: async function (oEvent) {
//                 //

//                 var po_number = oEvent.oSource.oParent.oParent.mAggregations.items[0].mAggregations.items[1].mProperties.value
//                 var contract_no = oEvencds t.oSource.oParent.oParent.mAggregations.items[1].mAggregations.items[1].mProperties.value
//                 var vendor_code = oEvent.oSource.oParent.oParent.mAggregations.items[4].mAggregations.items[1].mProperties.value

//                 //
//                 var fname = "getcallfromodata";
//                 let fname1 = this.getView().getModel().bindContext(`/${fname}(...)`);
//                 fname1.setParameter('po_number', po_number);
//                 fname1.setParameter('contract_no', contract_no);
//                 fname1.setParameter('vendor_code', vendor_code);

//                 try {
//                     await fname1.execute();
//                 } catch (error) {
//                     //
//                     console.log(error)
//                 }


//                 console.log("func completed");

//             }
//         });
//     });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";
        var total_amount = 0;
        var total_Sgst = 0;
        var total_Cgst = 0;
        var pokey;
        var fname1;
        var fname11;
        var funname1;
        return Controller.extend("submitform.controller.form", {
            onInit: async function () {
                   

              

            },


            onSuggest: function (oEvent) {
                debugger
                var sTerm = oEvent.getParameter("suggestValue");
                var aFilters = [];
                if (sTerm) {
                    var oFilterName = new Filter("po_number", FilterOperator.Contains, sTerm);
                    var oFilterDescription = new Filter("contract_number", FilterOperator.Contains, sTerm);
                    aFilters.push(new Filter({
                        filters: [oFilterName, oFilterDescription],
                        and: false
                    }));
                }
    
                oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
            },
    
            onSelectionChange: function (oEvent) {
                debugger
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    this.byId("input-1").setValue(oSelectedItem.mProperties.Text);
                    this.byId("input-b").setValue(oSelectedItem.mProperties.additionalText);
                    
                }
                

                        
            },
    
    
            onBeforeRendering: async function (oEvent) {
                debugger
                    var vencode = this.byId("input-e").mProperties.value;
                    var funname = "advancepayment";
                    funname1 = this.getView().getModel().bindContext(`/${funname}(...)`);
                    var fname = "getcallfromodata";
                    fname1 = this.getView().getModel().bindContext(`/${fname}(...)`);
                    var fname = "postcall";
                    fname11 = this.getView().getModel().bindContext(`/${fname}(...)`);
					// let funcname = "valuehelp1";
                    // var oFunc = this.getView().getModel().bindContext(`/${funcname}(...)`);
                    // oFunc.setParameter('vencode', vencode);
                    // await oFunc.execute();
                    // let context = oFunc.getBoundContext();
                    // let getdata = context.getValue();
                    // let res = getdata.value;
                    // let result = JSON.parse(res)
                    
                //     let valuehe = result.map(item => ({
                //         po_number: `${item.po_number}`,
                //         contract_number:`${item.contract_number}`,
                        
                        
                //     }));


        
                //     var val = {
                //     "valuehelp": valuehe
                // };
    
                // var oModel = new JSONModel(val);
                // this.getView().setModel(oModel);

                var id = this.byId("input-1").mProperties.value;
                //FILTER FOR LINE ITEMS
                var path = this.byId("table").mBindingInfos.items.binding;
                path.filter(
                    new sap.ui.model.Filter({
                        path: "po_number",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: ''
                    })
                );
                this.byId("table").mBindingInfos.items.binding.refresh()
                
                var path2 = this.byId("helo").mBindingInfos.items.binding;
                path2.filter(
                    new sap.ui.model.Filter({
                        path: "po_number",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: ''
                    })
                );

                this.byId("helo").mBindingInfos.items.binding.refresh();

                //FILTER FOR ADDED ITEM INFO
                var path1 = this.byId("uploadSet").mBindingInfos.items.binding;

                path1.filter(
                  new sap.ui.model.Filter({
                      path: "registration_id",
                      operator: sap.ui.model.FilterOperator.EQ,
                      value1: 'test'
                  })
              );

              this.byId("uploadSet").mBindingInfos.items.binding.refresh();


                
                //     // var path = this.base.getView().mAggregations.content[0].mAggregations.sections[6].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0].mBindingInfos.items.binding;

                //     // var poLineitempath = this.base.getView().mAggregations.content[0].mAggregations.sections[3].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0].mBindingInfos.items.binding;
                //     // poLineitempath.filter(
                //     //     new sap.ui.model.Filter({
                //     //         path: "po_number",
                //     //         operator: sap.ui.model.FilterOperator.EQ,
                //     //         value1: id
                //     //     })
                //     // ); 


                //     // var Addediteminfopath = this.byId("helo").mBindingInfos.items.binding;
                //     // Addediteminfopath.filter(
                //     //     new sap.ui.model.Filter({
                //     //         path: "po_number",
                //     //         operator: sap.ui.model.FilterOperator.EQ,
                //     //         value1: id
                //     //     })
                //     // ); 


            },

            ///////////////////valiadations/////////////////////////
          
            ponumber: async function (oEvent) {
                debugger
                var po_number = this.byId("input-1").getValue()
                if(po_number){
                    this.byId("input-1").setValueState("None");
                    this.byId("input-1").setValueStateText("");
                   
                }
                
            },

            // Conid: async function (oEvent) {
            //     debugger
            //     var Conid = this.byId("input-b").getValue()
            //     if(Conid){
            //         this.byId("input-b").setValueState("None");
            //         this.byId("input-b").setValueStateText("");
                
            //     }
            // },

            // Vencode: async function (oEvent) {
            //     debugger
            //     var Vencode = this.byId("input-e").getValue()
            //     if(Vencode){
            //         this.byId("input-e").setValueState("None");
            //         this.byId("input-e").setValueStateText("");
                   

            //     }
            // },

        
            advceno: async function (oEvent) {
                debugger
                var advanceno = this.byId("advanceno").getValue()
                if(advanceno){
                    this.byId("advanceno").setValueState("None");
                    this.byId("advanceno").setValueStateText("");
                   

                }
            },

            // advnadate: async function (oEvent) {
            //     debugger
            //     var advancedate = this.byId("advancedate").mProperties.value
            //     if(advancedate){
            //         this.byId("advancedate").setValueState("None");
            //         this.byId("advancedate").setValueStateText("");
                   

            //     }
            // },


            advancevaluechange: async function (oEvent) {
                debugger
                var advanceval =  this.byId("advancevalue").getValue()
                var totalvalueamt = this.byId("input-12").getValue()

                if(parseFloat(advanceval) > parseFloat(totalvalueamt)){
                    this.byId("advancevalue").setValueState("Error");
                    this.byId("advancevalue").setValueStateText("Amont should be less than total value");
                    this.byId("submit").setVisible(false);
                   

                }
                else if(parseFloat(advanceval) <= parseFloat(totalvalueamt)){
                    this.byId("advancevalue").setValueState("None");
                    this.byId("advancevalue").setValueStateText("");
                    this.byId("submit").setVisible(true);

                }
            },







             ///////////////////valiadations/////////////////////////

            Submit: async function (oEvent) {


                debugger
                var advanceno = this.byId("advanceno").mProperties.value
                var advancedate = this.byId("advancedate").mProperties.value
                var advanceval =  this.byId("advancevalue").mProperties.value

                var po_number = this.byId("input-1").getValue()
                var contract_no =  this.byId("input-b").getValue()
                var vendor_code =  this.byId("input-e").getValue()
                var vendor_name =  this.byId("input-c").getValue()
                var textArea = this.byId("ta").mProperties.value
                var email = this.byId("input-f").mProperties.value
                var vendorGstin = this.byId("input-d").mProperties.value

                
             


                debugger
           
                fname11.setParameter('po_number', po_number);
                fname11.setParameter('contract_no', contract_no);
                fname11.setParameter('vendor_code', vendor_code);
                fname11.setParameter('advancePayValue', advanceval);
                fname11.setParameter('venname', vendor_name);
                fname11.setParameter('textArea', textArea);
                fname11.setParameter('email', email);
                fname11.setParameter('vendorGstin', vendorGstin);

                try {
                    await fname11.execute();
                } catch (error) {
                    //
                    console.log(error)
                }

                console.log("func completed");

                   
               

                let context = fname11.getBoundContext();
                let getdata = context.getValue();
                let registerid = getdata.value;

               
                funname1.setParameter('advancePayNo', advanceno);
                funname1.setParameter('regid', registerid);
                funname1.setParameter('ponumber', po_number);
                funname1.setParameter('advancePayDate', advancedate);
                funname1.setParameter('advancePayValue', advanceval);

                try {
                    await funname1.execute();
                } catch (error) {
                    //
                    console.log(error)
                }
                
                let d = new sap.m.Dialog
                ({
                    title: "Success",
                    type: "Message",
                    content: new sap.m.Text
                        ({
                            text: `Advance Payment request created successfully,Referece-ID : ${registerid}`
                        }),
                    beginButton: new sap.m.Button
                        ({
                            type: "Accept",
                            text: "OK",
                            press: async function (oEvent, oPath) {
                                //
                                d.close();
                                window.history.back();

                            }
                        }),
                });
                //
             d.open();
        
        //
    

               
                // var href_For_Product_display = await sap.ushell.Container.getServiceAsync("Navigation");
                // href_For_Product_display.navigate({
                //     target: { semanticObject: "advance", action: "display" },
                // });

               



            },
            onPress: async function (oEvent) {
                
                debugger
                var po_number = oEvent.oSource.oParent.oParent.mAggregations.items[0].mAggregations.items[1].mProperties.value
                var contract_no = oEvent.oSource.oParent.oParent.mAggregations.items[1].mAggregations.items[1].mProperties.value
                var vendor_code = oEvent.oSource.oParent.oParent.mAggregations.items[4].mAggregations.items[1].mProperties.value
                // var venname = oEvent.oSource.oParent.oParent.mAggregations.items[2].mAggregations.items[1].mProperties.value
               
                fname1.setParameter('po_number', po_number);
                fname1.setParameter('contract_no', contract_no);
                fname1.setParameter('vendor_code', vendor_code);

                try {
                    await fname1.execute();
                    let context = fname1.getBoundContext();
                    let getdata = context.getValue();
                    let headerdata = getdata.value;
                    this.byId("input-c").setValue(headerdata.vendorName)
                    this.byId("input-f").setValue(headerdata.email)
                    this.byId("input-d").setValue(headerdata.vendorGstin)

                } catch (error) {
                    //
                    console.log(error)
                }


                console.log("func completed");

                var path = this.byId("table").mBindingInfos.items.binding;
                
                path.filter(
                    new sap.ui.model.Filter({
                        path: "po_number",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: po_number
                    })
                );

                this.byId("table").mBindingInfos.items.binding.refresh()

                var path1 = this.byId("helo").mBindingInfos.items.binding;

                path1.filter
                (
                  new sap.ui.model.Filter({
                      path: "po_number",
                      operator: sap.ui.model.FilterOperator.EQ,
                      value1: po_number
                  })
                );
                this.byId("helo").mBindingInfos.items.binding.refresh();

                var path1 = this.byId("uploadSet").mBindingInfos.items.binding;

                path1.filter(
                  new sap.ui.model.Filter({
                      path: "registration_id",
                      operator: sap.ui.model.FilterOperator.EQ,
                      value1: 'test'
                  })
              );
              this.byId("uploadSet").mBindingInfos.items.binding.refresh();
             
                


            },
            onAfterItemAdded: function (oEvent) {
                debugger
                var item = oEvent.getParameter("item");
                var sServiceUrl = this.getOwnerComponent().oModels.undefined.sServiceUrl;
                if (sServiceUrl) {
                   var url1 = sServiceUrl;
                }
                else
                {
                    url1 = '/odata/v4/Files'
                }
                // var url1 = this._view.getModel().sServiceUrl;
                // var url1 = this.oView.getModel().sServiceUrl;
                pokey = this.byId("input-1").getValue()
                
                debugger
                var _createEntity = function (item) {
                   
                    debugger
                    var data = {
                        mediaType: item.getMediaType(),
                        fileName: item.getFileName(),
                        size: item.getFileObject().size,
                        po_number : pokey,
                        registration_id : 'test'

                    };
                    
                    debugger
                    var settings = {
                        // url: "/odata/v4/my/Files",
                        url: url1 + `Files`,
                        method: "POST", 
                        headers: {
                            "Content-type": "application/json"
                        },
                        data: JSON.stringify(data)
                    };

                    debugger
                    return new Promise((resolve, reject) => {
                        $.ajax(settings)
                            .done((results, textStatus, request) => {
                                resolve(results.fileId)
                            })
                            .fail((err) => {
                                reject(err);
                            });
                    });
                };
                debugger
                _createEntity(item)
                    .then((fileId) => {
                        // var url = `/odata/v4/my/Files(${fileId})/content`;
                        var url = url1 + `Files(${fileId})/content`
                        // var url = url1 + `Files(ID=${ids[1]},fileId=${ids[0]})/content`;
                        item.setUploadUrl(url);
                        var oUploadSet = this.byId("uploadSet");
                        oUploadSet.setHttpRequestMethod("PUT");
                        oUploadSet.uploadItem(item);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },

            onUploadCompleted: function (oEvent) {
                debugger
                var oUploadSet = this.byId("uploadSet");
                oUploadSet.removeAllIncompleteItems();
                // var po = this.byId("input-1").mProperties.value;
                var path1 = this.byId("uploadSet").mBindingInfos.items.binding;

                path1.filter(
                  new sap.ui.model.Filter({
                      path: "registration_id",
                      operator: sap.ui.model.FilterOperator.EQ,
                      value1: 'test'
                  })
              );


                oUploadSet.getBinding("items").refresh();
            },

            onRemovePressed: function (oEvent) {
                oEvent.preventDefault();
                oEvent.getParameter("item").getBindingContext().delete();
                // MessageToast.show("Selected file has been deleted");
            },
            onOpenPressed: function(oEvent) {
				debugger;
				// oEvent.preventDefault();
				// var item = oEvent.getSource();
				// var fileName = item.getFileName();
			
				// var _download = function(item) {
				// 	var settings = {
				// 		url: item.getUrl(),
				// 		method: "GET",
				// 		headers: {
				// 			"Content-type": "application/octet-stream"
				// 		},
				// 		xhrFields: {
				// 			responseType: 'blob'
				// 		}
				// 	};
			
				// 	return new Promise((resolve, reject) => {
				// 		$.ajax(settings)
				// 			.done((result) => {
				// 				console.log('Downloaded Blob:', result);
				// 				resolve(result);
				// 			})
				// 			.fail((err) => {
				// 				console.error('Download Error:', err);
				// 				reject(err);
				// 			});
				// 	});
				// };
			
				// _download(item)
				// 	.then((blob) => {
				// 		var url = window.URL.createObjectURL(blob);
				// 		// Open the URL in a new tab
				// 		window.open(url, '_blank');
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	});
			},
            _download: function (item) {
                var settings = {
                    url: item.getUrl(),
                    method: "GET",
                    headers: {
                        "Content-type": "application/octet-stream"
                    },
                    xhrFields: {
                        responseType: 'blob'
                    }
                }

                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((result) => {
                            resolve(result)
                        })
                        .fail((err) => {
                            reject(err)
                        })
                });
            },
            _createEntity: function (item) {
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName(),
                    size: item.getFileObject().size,
                };

                var settings = {
                    url: "/my/Files",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }

                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            resolve(results.fileId);
                        })
                        .fail((err) => {
                            reject(err);
                        })
                })
            },

            _uploadContent: function (item, id) {
                // 
                var url = `/my/Files(${fileId})/content`;
                // var url = `/my/Files(ID=${ids[1]},fileId=${ids[0]})/content`
                item.setUploadUrl(url);
                var oUploadSet = this.byId("uploadSet");
                oUploadSet.setHttpRequestMethod("PUT")
                oUploadSet.uploadItem(item);
            },

            //formatters
            formatThumbnailUrl: function (mediaType) {
                var iconUrl;
                switch (mediaType) {
                    case "image/png":
                        iconUrl = "sap-icon://card";
                        break;
                    case "text/plain":
                        iconUrl = "sap-icon://document-text";
                        break;
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        iconUrl = "sap-icon://excel-attachment";
                        break;
                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        iconUrl = "sap-icon://doc-attachment";
                        break;
                    case "application/pdf":
                        iconUrl = "sap-icon://pdf-attachment";
                        break;
                    default:
                        iconUrl = "sap-icon://attachment";
                }
                return iconUrl;
            },

            onRowSelected: async function (oEvent) {
                //
                debugger
                var count = oEvent.getSource().getItems();
                for (let i = 0; i < count.length; i++) {
                    if (count[i].getSelected() == true) {
                        let poNum = this.byId("input-1").mProperties.value;
                        // let lineItemId = oEvent.oSource.oParent.mAggregations.content[0].mAggregations.items[0].mAggregations.cells[0].mProperties.text;
                        let lineItemId = count[i].mAggregations.cells[0].mProperties.text;
                        let funcname = "fm1";//Updating true or false for a field named checked in line
                        var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                        oFunc.setParameter('id', poNum);
                        oFunc.setParameter('content', lineItemId);
                        oFunc.setParameter('type', 'checked');
                        await oFunc.execute();

                        // sap.ui.getCore().byId('container-submitform---form--table').mBindingInfos.items.binding.refresh();
                        this.byId("helo").mBindingInfos.items.binding.refresh();
                        this.byId("table").mBindingInfos.items.binding.refresh();
                        // sap.ui.getCore().byId('container-submitform---form--helo').mBindingInfos.items.binding.refresh();
                        if (oFunc.getBoundContext().getValue().value == "true") {
                            var amount = count[i].mAggregations.cells[12].mProperties.text;
                            if (amount.includes(',')) {
                                amount = parseFloat(amount.replace(/,/g, ''));
                            } else {
                                amount = parseFloat(amount);
                            }
                            total_amount = parseFloat(total_amount) + amount;
                            var cgst_percentage = parseFloat(count[i].mAggregations.cells[6].mProperties.text);
                            var sgst_percentage = parseFloat(count[i].mAggregations.cells[7].mProperties.text);
                            var res_cgst = parseFloat((amount * cgst_percentage) / 100);
                            var cgst_string = JSON.stringify(res_cgst);
                            var res_sgst = parseFloat((amount * sgst_percentage) / 100);
                            var sgst_string = JSON.stringify(res_sgst);
                            let funcname = "cgst";
                            var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                            oFunc.setParameter('poNum', this.byId("input-1").mProperties.value);
                            oFunc.setParameter('itemId', count[i].mAggregations.cells[0].mProperties.text);
                            oFunc.setParameter('cgst', cgst_string);
                            oFunc.setParameter('sgst', sgst_string);
                            await oFunc.execute();
                            this.byId("helo").mBindingInfos.items.binding.refresh();
                        this.byId("table").mBindingInfos.items.binding.refresh();
                            // sap.ui.getCore().byId('container-submitform---form--helo').mBindingInfos.items.binding.refresh();
                            // sap.ui.getCore().byId('container-submitform---form--table').mBindingInfos.items.binding.refresh();
                            var Sgst = parseFloat(count[i].mAggregations.cells[9].mProperties.text)
                            total_Sgst = parseFloat(total_Sgst) + res_sgst;
                            var Cgst = parseFloat(count[i].mAggregations.cells[8].mProperties.text)
                            total_Cgst = parseFloat(total_Cgst) + res_cgst;
                        }

                    }
                    else {
                        let poNum = this.byId("input-1").mProperties.value;
                        let lineItemId = count[i].mAggregations.cells[0].mProperties.text;
                        let funcname = "fm1";
                        var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                        oFunc.setParameter('id', poNum);
                        oFunc.setParameter('content', lineItemId);
                        oFunc.setParameter('type', 'unchecked');
                        await oFunc.execute();
                        this.byId("helo").mBindingInfos.items.binding.refresh();
                        this.byId("table").mBindingInfos.items.binding.refresh();
                        // sap.ui.getCore().byId('container-submitform---form--helo').mBindingInfos.items.binding.refresh();
                        // sap.ui.getCore().byId('container-submitform---form--table').mBindingInfos.items.binding.refresh();
                    }
                }
                total_amount = parseFloat(total_amount.toFixed(2));
                this.byId("input-a").setValue(total_amount);
                total_Cgst = parseFloat(total_Cgst.toFixed(2));
                this.byId("input-9").setValue(total_Cgst);
                total_Sgst = parseFloat(total_Sgst.toFixed(2));
                this.byId("input-11").setValue(total_Sgst);
                var result = total_amount + total_Cgst + total_Sgst;
                result = parseFloat(result.toFixed(2));
                this.byId("input-12").setValue(result);
                total_amount = 0;
                total_Sgst = 0;
                total_Cgst = 0;

                // let array = [];
                // let item_array = [];
                // for (let i = 0; i < count.length; i++) {
                //     if (count[i].getSelected() == true) {
                //         //
                //         // array.push(count[i]);
                //         var data = [];
                //         let array_length = count[i].mAggregations.cells;

                //         item_array.push({

                // "itemno": array_length[0].getText(),
                // "po_number": array_length[1].getText(),
                // "item_desc": array_length[2].getText(),
                // "item_desc_cond": array_length[3].getText(),
                // "plant": array_length[4].getText(),
                // "unit_price": array_length[5].getText(),
                // "quantity": array_length[6].getText(),
                // "cgst_percentage": array_length[7].getText(),
                // "sgst_percentage": array_length[8].getText(),
                // "cgst_value": array_length[9].getText(),
                // "sgst_value": array_length[10].getText(),
                // "amount": array_length[11].getText(),
                // })
                // }
                // var funcname = "fm1";
                // let oFunc = sap.ui.getCore().byId('advancedpayment::poheaderObjectPage--fe::ObjectPage').getModel().bindContext.getModel().bindContext(`/${funcname}(...)`);
                // let oFunc = sap.ui.getCore().byId('advancedpayment::poheaderObjectPage').getModel().bindContext(`/${funcname}(...)`);


                // }

            },

            clear: async function (oEvent) {
                debugger
                location.reload()
            },

            submit: async function (oEvent) {
                //
                debugger
                var poNum = this.byId("input-1").mProperties.value;
                var itemId = oEvent.getSource().getParent().mAggregations.cells[0].mProperties.text;
                var quantity = parseFloat(oEvent.mParameters.value);
                let func = "fm3";
                var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${func}(...)`);
                oFunc.setParameter('poNum', poNum);
                oFunc.setParameter('itemId', itemId);
                await oFunc.execute();
                var table = oFunc.getBoundContext().getValue().value;
                var parse = JSON.parse(table);
                if(quantity > parseFloat(parse[0].quantity_static))
                {
                    oEvent.getSource().setValueState("Error")
                    oEvent.getSource().setValueStateText(`Quantity is more than ${parse[0].quantity_static}`);
                }
                else if(quantity <= parseFloat(parse[0].quantity_static))
                {
                    oEvent.getSource().setValueState("None")
                    var itemId = oEvent.getSource().getParent().mAggregations.cells[0].mProperties.text;
                var unitPrice = oEvent.getSource().getParent().mAggregations.cells[4].mProperties.text;
                var cgst = oEvent.getSource().getParent().mAggregations.cells[6].mProperties.text;
                var sgst = oEvent.getSource().getParent().mAggregations.cells[7].mProperties.text;
                let funcname = "fm2";
                var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                oFunc.setParameter('poNum', poNum);
                oFunc.setParameter('itemId', itemId);
                oFunc.setParameter('quantity', quantity);
                oFunc.setParameter('unitPrice', unitPrice);
                oFunc.setParameter('sgst_value', cgst);
                oFunc.setParameter('cgst_value', sgst);
                await oFunc.execute();
                //;
                var table = oFunc.getBoundContext().getValue().value;
                var parse = JSON.parse(table);
                this.byId("helo").mBindingInfos.items.binding.refresh();
                        this.byId("table").mBindingInfos.items.binding.refresh();
                //Updates cgst value and sgst value after changing quantity;
                // sap.ui.getCore().byId('container-submitform---form--helo').mBindingInfos.items.binding.refresh();
                // this.byId("helo").mBindingInfos.items.binding.refresh();
                // sap.ui.getCore().byId('container-submitform---form--table').mBindingInfos.items.binding.refresh();
                // sap.ui.getCore().byId('container-submitform---form--table').mBindingInfos.items.binding.refresh();
                var total_amount = 0;
                var total_Sgst = 0;
                var total_Cgst = 0;
                let count = oEvent.oSource.oParent.oParent.mAggregations.items;
                for (let i = 0; i < count.length; i++) {
                    //
                    if (parse[0].itemno == count[i].mAggregations.cells[0].mProperties.text) {
                        total_amount = parseFloat(total_amount) + parseFloat(parse[0].amount);
                        total_Sgst = parseFloat(total_Sgst) + parseFloat(parse[0].sgst_value);
                        total_Cgst = parseFloat(total_Cgst) + parseFloat(parse[0].cgst_value);
                        continue;
                    }
                    var amount = count[i].mAggregations.cells[10].mProperties.text;
                    if (amount.includes(',')) {
                        amount = parseFloat(amount.replace(/,/g, ''));
                    } else {
                        amount = parseFloat(amount);
                    }
                    total_amount = parseFloat(total_amount) + amount;
                    // var cgst_percentage = parseFloat(count[i].mAggregations.cells[6].mProperties.text);
                    // var sgst_percentage = parseFloat(count[i].mAggregations.cells[7].mProperties.text);
                    // var res_cgst = JSON.stringify((amount * cgst_percentage) / 100);
                    // var res_sgst = JSON.stringify((amount * sgst_percentage) / 100);
                    // let funcname = "cgst";
                    // var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                    // oFunc.setParameter('poNum', poNum);
                    // oFunc.setParameter('itemId', count[i].mAggregations.cells[0].mProperties.text);
                    // oFunc.setParameter('cgst', res_cgst);
                    // oFunc.setParameter('sgst', res_sgst);
                    // await oFunc.execute();
                    var Sgst = parseFloat(count[i].mAggregations.cells[9].mProperties.text)
                    total_Sgst = parseFloat(total_Sgst) + Sgst;
                    var Cgst = parseFloat(count[i].mAggregations.cells[8].mProperties.text)
                    total_Cgst = parseFloat(total_Cgst) + Cgst;
                    // var totalval = parseFloat(count[i].mAggregations.cells[7].mProperties.text)
                    // totalval = parseFloat(totalval) + total_amount + total_Sgst + total_Cgst

                }
                // sap.ui.getCore().byId('container-submitform---form--helo').mBindingInfos.items.binding.refresh();
                this.byId("helo").mBindingInfos.items.binding.refresh();
                        // this.byId("table").mBindingInfos.items.binding.refresh();
                total_amount = parseFloat(total_amount.toFixed(2));
                this.byId("input-a").setValue(total_amount);
                total_Cgst = parseFloat(total_Cgst.toFixed(2));
                this.byId("input-9").setValue(total_Cgst);
                total_Sgst = parseFloat(total_Sgst.toFixed(2));
                this.byId("input-11").setValue(total_Sgst);
                var result = total_amount + total_Cgst + total_Sgst;
                result = result.toFixed(2);
                this.byId("input-12").setValue(result);
                // total_amount = 0;
                // total_Sgst = 0;
                // total_Cgst = 0;
            }


                }
                

        });
    });
