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
//                 debugger

//                 var po_number = oEvent.oSource.oParent.oParent.mAggregations.items[0].mAggregations.items[1].mProperties.value
//                 var contract_no = oEvent.oSource.oParent.oParent.mAggregations.items[1].mAggregations.items[1].mProperties.value
//                 var vendor_code = oEvent.oSource.oParent.oParent.mAggregations.items[4].mAggregations.items[1].mProperties.value

//                 debugger
//                 var fname = "getcallfromodata";
//                 let fname1 = this.getView().getModel().bindContext(`/${fname}(...)`);
//                 fname1.setParameter('po_number', po_number);
//                 fname1.setParameter('contract_no', contract_no);
//                 fname1.setParameter('vendor_code', vendor_code);

//                 try {
//                     await fname1.execute();
//                 } catch (error) {
//                     debugger
//                     console.log(error)
//                 }


//                 console.log("func completed");

//             }
//         });
//     });


sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("submitform.controller.form", {
            onInit: function () {

            },
            onBeforeRendering: function (oEvent) {
                debugger
                // var id = sap.ui.getCore().byId('container-advancepaymentform---advancepayment--input-1').mProperties.value;
                // var path = this.byId("table").mBindingInfos.items.binding;
                // path.filter(
                //     new sap.ui.model.Filter({
                //         path: "po_number",
                //         operator: sap.ui.model.FilterOperator.EQ,
                //         value1: ''
                //     })
                // );

                // var path = this.base.getView().mAggregations.content[0].mAggregations.sections[6].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0].mBindingInfos.items.binding;

                // var poLineitempath = this.base.getView().mAggregations.content[0].mAggregations.sections[3].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0].mBindingInfos.items.binding;
                // poLineitempath.filter(
                //     new sap.ui.model.Filter({
                //         path: "po_number",
                //         operator: sap.ui.model.FilterOperator.EQ,
                //         value1: id
                //     })
                // ); 


                // var Addediteminfopath = this.byId("helo").mBindingInfos.items.binding;
                // Addediteminfopath.filter(
                //     new sap.ui.model.Filter({
                //         path: "po_number",
                //         operator: sap.ui.model.FilterOperator.EQ,
                //         value1: id
                //     })
                // ); 


            },
            Submit: async function (oEvent) {

                debugger
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

                debugger
                var fname = "getcallfromodata";
                let fname1 = this.getView().getModel().bindContext(`/${fname}(...)`);
                fname1.setParameter('po_number', po_number);
                fname1.setParameter('contract_no', contract_no);
                fname1.setParameter('vendor_code', vendor_code);

                try {
                    await fname1.execute();
                } catch (error) {
                    debugger
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

            },
            onAfterItemAdded: function (oEvent) {
                debugger;
                var item = oEvent.getParameter("item");
                // var url1 = this._view.getModel().sServiceUrl;
                var url1 = this.oView.getModel().sServiceUrl;
                var _createEntity = function (item) {
                    // var path1 = window.location.href;
                    // 	var regex = /poheader='(\d+)'/;
                    // 	var match = path1.match(regex);
                    	var key = sap.ui.getCore().byId('container-advancepaymentform---advancepayment--input-1').mProperties.value;
                    var data = {
                        mediaType: item.getMediaType(),
                        fileName: item.getFileName(),
                        size: item.getFileObject().size,
                        po_number :key

                    };
                    var settings = {
                        // url: "/odata/v4/my/Files",
                        url: url1 + `Files`,
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        data: JSON.stringify(data)
                    };
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
                _createEntity(item)
                    .then((fileId) => {
                        debugger
                        var url = `/odata/v4/my/Files(${fileId})/content`;
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
                oUploadSet.getBinding("items").refresh();
            },

            onRemovePressed: function (oEvent) {
                oEvent.preventDefault();
                oEvent.getParameter("item").getBindingContext().delete();
                MessageToast.show("Selected file has been deleted");
            },
            onOpenPressed: function (oEvent) {
                debugger;
                oEvent.preventDefault();
                var item = oEvent.getSource();
                var fileName = item.getFileName();

                var _download = function (item) {
                    var settings = {
                        url: item.getUrl(),
                        method: "GET",
                        headers: {
                            "Content-type": "application/octet-stream"
                        },
                        xhrFields: {
                            responseType: 'blob'
                        }
                    };

                    return new Promise((resolve, reject) => {
                        $.ajax(settings)
                            .done((result) => {
                                console.log('Downloaded Blob:', result);
                                resolve(result);
                            })
                            .fail((err) => {
                                console.error('Download Error:', err);
                                reject(err);
                            });
                    });
                };

                _download(item)
                    .then((blob) => {
                        var url = window.URL.createObjectURL(blob);
                        // Open the URL in a new tab
                        window.open(url, '_blank');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
                    size: item.getFileObject().size
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
                debugger

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

            onRowSelected: async function (oEvent) 
            {
                debugger

                var count = oEvent.getSource().getItems();
                for (let i = 0; i < count.length; i++) 
                {
                    if (count[i].getSelected() == true) 
                    {
                        let poNum = sap.ui.getCore().byId('container-advancepaymentform---advancepayment--input-1').mProperties.value;
                        let lineItemId = oEvent.oSource.oParent.mAggregations.content[0].mAggregations.items[0].mAggregations.cells[0].mProperties.text;
                        let funcname = "fm1";
                        var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                        oFunc.setParameter('id', poNum);
                        oFunc.setParameter('content', lineItemId);
                        oFunc.setParameter('type', 'checked');
                        await oFunc.execute();
                    }
                    else 
                    {
                        let poNum = sap.ui.getCore().byId('container-advancepaymentform---advancepayment--input-1').mProperties.value;
                        let lineItemId = oEvent.oSource.oParent.mAggregations.content[0].mAggregations.items[0].mAggregations.cells[0].mProperties.text;
                        let funcname = "fm1";
                        var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                        oFunc.setParameter('id', poNum);
                        oFunc.setParameter('content', lineItemId);
                        oFunc.setParameter('type', 'unchecked');
                        await oFunc.execute();
                    }
                }
                sap.ui.getCore().byId('container-advancepaymentform---advancepayment--helo').mBindingInfos.items.binding.refresh();



                var total_amount = 0;
                var total_Sgst = 0;
                var total_Cgst = 0;
                let count1 = oEvent.oSource.oParent.oParent.mAggregations.items;
                for (let i = 0; i < count1.length; i++) 
                {
                    debugger
                    var amount = parseFloat(count1[i].mAggregations.cells[10].mProperties.text)
                    total_amount = parseFloat(total_amount) + amount;
                    var cgst_percentage = parseFloat(count1[i].mAggregations.cells[6].mProperties.text);
                    var sgst_percentage = parseFloat(count1[i].mAggregations.cells[7].mProperties.text);
                    var res_cgst = JSON.stringify((amount * cgst_percentage) / 100);
                    var res_sgst = JSON.stringify((amount * sgst_percentage) / 100);
                    let funcname = "cgst";
                    var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                    oFunc.setParameter('poNum', poNum);
                    oFunc.setParameter('itemId', count[i].mAggregations.cells[0].mProperties.text);
                    oFunc.setParameter('cgst', res_cgst);
                    oFunc.setParameter('sgst', res_sgst);
                    await oFunc.execute();
                    var Sgst = parseFloat(count1[i].mAggregations.cells[9].mProperties.text)
                    total_Sgst = parseFloat(total_Sgst) + Sgst;
                    var Cgst = parseFloat(count1[i].mAggregations.cells[8].mProperties.text)
                    total_Cgst = parseFloat(total_Cgst) + Cgst;
                }    
                
                // let array = [];
                // let item_array = [];
                // for (let i = 0; i < count.length; i++) {
                //     if (count[i].getSelected() == true) {
                //         debugger
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

            submit: async function (oEvent) {
                debugger
                var quantity = oEvent.mParameters.value;
                var itemId = oEvent.getSource().getParent().mAggregations.cells[0].mProperties.text;
                var unitPrice = oEvent.getSource().getParent().mAggregations.cells[4].mProperties.text;
                var cgst = oEvent.getSource().getParent().mAggregations.cells[6].mProperties.text;
                var sgst = oEvent.getSource().getParent().mAggregations.cells[7].mProperties.text;
                let poNum = sap.ui.getCore().byId('container-advancepaymentform---advancepayment--input-1').mProperties.value;
                let funcname = "fm2";
                var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                oFunc.setParameter('poNum', poNum);
                oFunc.setParameter('itemId', itemId);
                oFunc.setParameter('quantity', quantity);
                oFunc.setParameter('unitPrice', unitPrice);
                oFunc.setParameter('sgst_value', cgst);
                oFunc.setParameter('cgst_value', sgst);
                await oFunc.execute();
                debugger
                sap.ui.getCore().byId('container-advancepaymentform---advancepayment--helo').mBindingInfos.items.binding.refresh()

                var total_amount = 0;
                var total_Sgst = 0;
                var total_Cgst = 0;
                let count = oEvent.oSource.oParent.oParent.mAggregations.items;
                for (let i = 0; i < count.length; i++) {
                    debugger
                    var amount = parseFloat(count[i].mAggregations.cells[10].mProperties.text)
                    total_amount = parseFloat(total_amount) + amount;
                    var cgst_percentage = parseFloat(count[i].mAggregations.cells[6].mProperties.text);
                    var sgst_percentage = parseFloat(count[i].mAggregations.cells[7].mProperties.text);
                    var res_cgst = JSON.stringify((amount * cgst_percentage) / 100);
                    var res_sgst = JSON.stringify((amount * sgst_percentage) / 100);
                    let funcname = "cgst";
                    var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
                    oFunc.setParameter('poNum', poNum);
                    oFunc.setParameter('itemId', count[i].mAggregations.cells[0].mProperties.text);
                    oFunc.setParameter('cgst', res_cgst);
                    oFunc.setParameter('sgst', res_sgst);
                    await oFunc.execute();
                    var Sgst = parseFloat(count[i].mAggregations.cells[9].mProperties.text)
                    total_Sgst = parseFloat(total_Sgst) + Sgst;
                    var Cgst = parseFloat(count[i].mAggregations.cells[8].mProperties.text)
                    total_Cgst = parseFloat(total_Cgst) + Cgst;
                    // var totalval = parseFloat(count[i].mAggregations.cells[7].mProperties.text)
                    // totalval = parseFloat(totalval) + total_amount + total_Sgst + total_Cgst

                }
                sap.ui.getCore().byId('container-advancepaymentform---advancepayment--helo').mBindingInfos.items.binding.refresh()
                this.byId("input-a").setValue(total_amount);
                this.byId("input-9").setValue(total_Cgst);
                this.byId("input-9").setValue(total_Sgst);
                // sap.ui.getCore().byId('advancedpayment::poheaderObjectPage--fe::CustomSection::Totals-innerGrid').oParent.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].oParent.mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[1].mAggregations.items[0].setValue(total_amount);
                // sap.ui.getCore().byId('advancedpayment::poheaderObjectPage--fe::CustomSection::Totals-innerGrid').oParent.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].oParent.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items[1].mAggregations.items[0].setValue(total_Cgst);
                sap.ui.getCore().byId('advancedpayment::poheaderObjectPage--fe::CustomSection::Totals-innerGrid').oParent.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].oParent.mAggregations.content[0].mAggregations.content.mAggregations.items[2].mAggregations.items[1].mAggregations.items[0].setValue(total_Sgst);
                // sap.ui.getCore().byId('advancedpayment::poheaderObjectPage--fe::CustomSection::Totals-innerGrid').oParent.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].oParent.mAggregations.content[0].mAggregations.content.mAggregations.items[3].mAggregations.items[1].mAggregations.items[0].setValue(totalval);
            }



        });
    });
