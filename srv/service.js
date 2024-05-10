const cds = require('@sap/cds');
const { parseArgs } = require('util');
const axios = require('axios');
const { getAxiosConfigWithDefaults } = require('@sap-cloud-sdk/http-client/dist/http-client');
module.exports = cds.service.impl(async function () {
  
    let {  polineitem,checkedpolineitem} = this.entities;
    //     bank,
    //     account,
    //     customer
    
    this.on('postcall', async (req) => 
    {
        debugger
        var BPA = await cds.connect.to('INVOICE_DEST');
        // var body = 
        let destt = await BPA.post(`/sap/opu/odata/sap/ZMM_ADVANCE_PAY_SRV/AdvancePayRequestSet`);

    });

    this.on('getcallfromodata', async (req) => 
    {
        debugger
         console.log("startttttt")
        var po = req.data.po_number
        var contract = req.data.contract_no
        var vendor = req.data.vendor_code
        console.log("venddddd",vendor)
        var BPA = await cds.connect.to('INVOICE_DEST');
        let destt = await BPA.get(`/sap/opu/odata/sap/ZMM_ADVANCE_PAY_SRV/buyerInfoSet(poNo='${po}',contractNo='${contract}',vendorCode='${vendor}')?$expand=advancePaymentLineItemsSet`);
        console.log("getcalll",destt)

        // let destt = JSON.parse(values);
        console.log("arraylentth",destt.advancePaymentLineItemsSet.length)

        console.log("item no",destt.advancePaymentLineItemsSet[0].ItemNumber)
        console.log("item no",destt.advancePaymentLineItemsSet[1].ItemNumber)
        console.log("item no",destt.advancePaymentLineItemsSet[2].ItemNumber)

        for(var i = 0 ;i < destt.advancePaymentLineItemsSet.length ; i++){

       await INSERT.into(polineitem).entries({ 
          itemno: destt.advancePaymentLineItemsSet[i].ItemNumber,
           po_number:destt.poNo ,
            item_desc: destt.advancePaymentLineItemsSet[i].Itemdescription ,
            plant : destt.advancePaymentLineItemsSet[i].Itemdescription,
            unit_price : parseFloat(destt.advancePaymentLineItemsSet[i].unitPrice),
            quantity : parseFloat(destt.advancePaymentLineItemsSet[i].lineItemQuantity),  
            cgst_percentage :parseFloat(destt.advancePaymentLineItemsSet[i].cgstPerc),
            sgst_percentage :parseFloat(destt.advancePaymentLineItemsSet[i].sgstPerc),
            cgst_value :parseFloat(destt.advancePaymentLineItemsSet[i].cgstValue),
            sgst_value :parseFloat(destt.advancePaymentLineItemsSet[i].sgstValue),
            vendor_code : destt.advancePaymentLineItemsSet[i].vendorCode
            });

        }


        console.log("getcalll",destt)


      });
 });


    



