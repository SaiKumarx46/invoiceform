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

        let poline_items = await SELECT.from(polineitem).where({po_number: req.data.po_number});
        // let itemCount = 5; // For example, you can replace this with the actual count you want
        
        // Assuming poline_items is an array containing the line items data fetched from the database
        // Assuming itemCount represents the count of line items you want
        
        const data = {
            "poNo": `${req.data.po_number}`,
            "regId": "",
            "advancePayNo": "",
            "contractNo": `${req.data.contract_no}`,
            "vendorName": "Guru",
            "vendorGstin": "234",
            "companyCode": "",
            "purchasingOrg": "'POVJ",
            "advancePayValue": "654",
            "advancePayDate": "12032024",
            "status": "",
            "comment": "working",
            "supplierNo": `${req.data.vendor_code}`,
            "curr": "INR",
            "advancePaymentLineItemsSet": poline_items.slice(0, poline_items.length).map(item => ({
                "ItemNumber": item.itemno, // Assuming the database column name is ItemNumber
                "Itemdescription": item.item_desc, // Assuming the database column name is Itemdescription
                "ItemCondnDesc": item.item_desc_cond, // Assuming the database column name is ItemCondnDesc
                "plant": item.plant, // Assuming the database column name is plant
                "lineItemQuantity": item.quantity, // Assuming the database column name is lineItemQuantity
                "unitPrice": item.unit_price, // Assuming the database column name is unitPrice
                "TotalValue": item.amount, // Assuming the database column name is TotalValue
                "cgstPerc": item.cgst_percentage, // Assuming the database column name is cgstPerc
                "sgstPerc": item.sgst_percentage, // Assuming the database column name is sgstPerc
                "cgstValue": item.cgst_value, // Assuming the database column name is cgstValue
                "sgstValue": item.sgst_value, // Assuming the database column name is sgstValue
                "poNo": `${req.data.po_number}`,
                "contractNo": `${req.data.contract_no}`,
                "vendorCode": `${req.data.vendor_code}`
            }))
        };
        
        // Now the advancePaymentLineItemsSet array is populated dynamically with data from the database query, limited to the specified itemCount
        
          
          const body = JSON.stringify(data);
          console.log(body);
          
        var BPA = await cds.connect.to('INVOICE_DEST');
        let destt = await BPA.post(`/sap/opu/odata/sap/ZMM_ADVANCE_PAY_SRV/AdvancePayRequestSet`,body);


    });

    this.on('getcallfromodata', async (req) => 
    {
        debugger

        let poline_items = await SELECT.from(polineitem).where({po_number: req.data.po_number});

        if(poline_items.length == 0){

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

    }


      });
    
 });


    



