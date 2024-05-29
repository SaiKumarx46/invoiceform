const cds = require('@sap/cds');
const { parseArgs } = require('util');
const axios = require('axios');
const { getAxiosConfigWithDefaults } = require('@sap-cloud-sdk/http-client/dist/http-client');
const { json } = require('express/lib/response');
module.exports = cds.service.impl(async function () {



  let { checkeditem, valuehelp, Files, polineitem, poheader, invoice, comment, checkedpolineitem } = this.entities;
  //     bank,
  //     account,
  //     customer

  this.before('CREATE', 'Files', req => {
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `https://b2a369b5trial-dev-invoiceform-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Files(${req.data.fileId})/content`
  })

  this.on('getcallcomment', async (req) => {

    debugger

    let commentshistory = await SELECT.from(comment).where({ registration_id: req.data.registration_id });
    return JSON.stringify(commentshistory)


  });
  this.on('UPDATE', 'poheader', async (req, next) => {
    debugger

    console.log("updaete", req)
    console.log("fdgsd", req.data)
    var status = req.data.comment;
    console.log("STATUS", status);

    let comm = await INSERT.into(comment).entries({

      registration_id: req.data.registration_id,
      textArea: req.data.status

    });

    if (status == "1") {
      let approve = await UPDATE(poheader).set({ status: 'Approved', status_criticality: 3 }).where({ registration_id: req.data.registration_id });
      console.log("approve", approve)
    }
    else {
      let reject = await UPDATE(poheader).set({ status: 'Rejected', status_criticality: 1 }).where({ registration_id: req.data.registration_id });
      console.log("reject", reject)
    }
  });

  this.on('postcall', async (req) => {

    debugger
    const currentDate = new Date();
    const year1 = currentDate.getFullYear();
    const month1 = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const day1 = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate1 = `${year1}${month1}${day1}`;

    console.log("formattedDate1", formattedDate1)
    console.log("req.data.po_number", req.data.po_number)
    console.log("req.data.contract_no", req.data.contract_no)
    console.log("req.data.venname", req.data.venname)
    console.log("req.data.vendor_code", req.data.vendor_code)
    console.log("req.data.advancePayValue", req.data.advancePayValue)
    let poline_items =  await SELECT.from(polineitem).where({ po_number: req.data.po_number, checked: 'true' });

    let advancePaymentLineItemsSet = poline_items.map(item => ({
      ItemNumber: `${item.itemno}`,
      Itemdescription: `${item.item_desc}`,
      ItemCondnDesc: `${item.item_desc_cond}`,
      plant: `${item.plant}`,
      lineItemQuantity: `${item.quantity}`,
      unitPrice: `${item.unit_price}`,
      TotalValue: `${item.amount_value_static}`,
      cgstPerc: `${item.cgst_percentage}`,
      sgstPerc: `${item.sgst_percentage}`,
      cgstValue: `${item.cgst_value}`,
      sgstValue: `${item.sgst_value}`,
      poNo: `${req.data.po_number}`,
      contractNo: `${req.data.contract_no}`

    }));

    const data =
    {
      "poNo": `${req.data.po_number}`,
      "regId": "",
      "advancePayNo": "",
      "contractNo": `${req.data.contract_no}`,
      "vendorName": `${req.data.venname}`,
      "vendorGstin": "",
      "companyCode": "",
      "purchasingOrg": "",
      "advancePayValue": `${req.data.advancePayValue}`,
      "advancePayDate": `${formattedDate1}`,
      "status": "",
      "comment": "",
      "supplierNo": `${req.data.vendor_code}`,
      "curr": "INR",
      "advancePaymentLineItemsSet": advancePaymentLineItemsSet
    };


    // const data = 
    // {
    //     "poNo": `${req.data.po_number}`,
    //     "regId": "",
    //     "advancePayNo": "",
    //     "contractNo": `${req.data.contract_no}`,
    //     "vendorName":  `${req.data.venname}`,
    //     "vendorGstin": "",
    //     "companyCode": "",
    //     "purchasingOrg": "",
    //     "advancePayValue":  `${req.data.advancePayValue}`,
    //     "advancePayDate": `${formattedDate1}`,
    //     "status": "",
    //     "comment": "",
    //     "supplierNo": `${req.data.vendor_code}`,
    //     "curr": "INR",
    //     "advancePaymentLineItemsSet": poline_items.slice(0, poline_items.length).map(item => ({
    //         "ItemNumber": `${item.itemno}`, // Assuming the database column name is ItemNumber
    //         "Itemdescription": `${item.item_desc}`, // Assuming the database column name is Itemdescription
    //         "ItemCondnDesc": `${item.item_desc_cond}`, // Assuming the database column name is ItemCondnDesc
    //         "plant": `${item.plant}`, // Assuming the database column name is plant
    //         "lineItemQuantity": `${item.quantity}`, // Assuming the database column name is lineItemQuantity
    //         "unitPrice": `${item.unit_price}`, // Assuming the database column name is unitPrice
    //         "TotalValue": `${item.amount}`, // Assuming the database column name is TotalValue
    //         "cgstPerc": `${item.cgst_percentage}`, // Assuming the database column name is cgstPerc
    //         "sgstPerc": `${item.sgst_percentage}`, // Assuming the database column name is sgstPerc
    //         "cgstValue": `${item.cgst_value}`, // Assuming the database column name is cgstValue
    //         "sgstValue": `${item.sgst_value}`, // Assuming the database column name is sgstValue
    //         "poNo": `${req.data.po_number}`,
    //         "contractNo": `${req.data.contract_no}`,

    //     }))
    // };

    //   const data = {

    //     "poNo": "6000005891",
    //     "regId": "",
    //     "advancePayNo": "",
    //     "contractNo": "98753",
    //     "vendorName": "Guru",
    //     "vendorGstin": "234",
    //     "companyCode": "",
    //     "purchasingOrg": "'POVJ",
    //     "advancePayValue": "654",
    //     "advancePayDate": "12032024",
    //     "status": "",
    //     "comment": "working",
    //     "supplierNo": "1234",
    //     "curr": "INR",
    //     "advancePaymentLineItemsSet": [
    //         {
    //             "ItemNumber": "itm",
    //             "Itemdescription": "sa",
    //             "ItemCondnDesc": "dds",
    //             "plant": "fd",
    //             "lineItemQuantity": "23",
    //             "unitPrice": "1",
    //             "TotalValue": "",
    //             "cgstPerc": "12",
    //             "sgstPerc": "13",
    //             "cgstValue": "90",
    //             "sgstValue": "78",
    //             "poNo": "6000005891",
    //             "contractNo": "98753",
    //             "vendorCode": "34"
    //         }
    //     ]
    // }

    console.log("datadss", data)

    var BPA = await cds.connect.to('INVOICE_DEST');
    let destt = await BPA.post(`/sap/opu/odata/sap/ZMM_ADVANCE_PAY_SRV/AdvancePayRequestSet`, data);
    console.log("desttttt", destt)
    console.log("regId", destt.regId)
    console.log("poheader", destt.poNo)
    console.log("vendor_code", destt.supplierNo)

    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    console.log("formattedDate", formattedDate)

    let insertheader = await INSERT.into(poheader).entries({
      po_number: destt.poNo,
      contract_number: destt.contractNo,
      registration_id: destt.regId,
      vendor_code: req.data.vendor_code,
      vendor_name: destt.vendorName,
      approver_mail: req.data.email,
      status: "Submitted",
      status_criticality: 2,
      vendor_gstin: req.data.vendorGstin,
      company_code: destt.companyCode,
      purchasing_org: destt.purchasingOrg,
      creation_date: formattedDate


    });

    console.log("insertheader", insertheader)

    let comm = await INSERT.into(comment).entries({

      registration_id: destt.regId,
      textArea: req.data.textArea

    });

    console.log("comm", comm)






    let checkedpoline_items = await SELECT.from(polineitem).where({ po_number: req.data.po_number, checked: 'true' });

    console.log("checkedpoline_items", checkedpoline_items)

    for (var i = 0; i < checkedpoline_items.length; i++) {
      await INSERT.into(checkeditem).entries({
        itemno1: checkedpoline_items[i].itemno,
        registration_id1: destt.regId,
        item_desc1: checkedpoline_items[i].item_desc,
        plant1: checkedpoline_items[i].plant,
        unit_price1: checkedpoline_items[i].unit_price,
        quantity1: checkedpoline_items[i].quantity,
        quantity_static1: checkedpoline_items[i].quantity_static,
        amount1: checkedpoline_items[i].amount,
        amount_value_static1: checkedpoline_items[i].amount_value_static,
        cgst_percentage1: checkedpoline_items[i].cgst_percentage,
        sgst_percentage1: checkedpoline_items[i].sgst_percentage,
        // cgst_value :parseFloat(destt.advancePaymentLineItemsSet[i].cgstValue),
        // sgst_value :parseFloat(destt.advancePaymentLineItemsSet[i].sgstValue),
        cgst_value1: checkedpoline_items[i].cgst_value,
        sgst_value1: checkedpoline_items[i].sgst_value,
        cgst_value_static1: checkedpoline_items[i].cgst_value_static,
        sgst_value_static1: checkedpoline_items[i].sgst_value_static,
        vendor_code1: checkedpoline_items[i].vendor_code,
      });


    }



    let files1 = await SELECT.from(Files).where({ po_number: req.data.po_number });

    console.log("files1", files1)

    // for(var i = 0 ;i < files1.length ; i++){
    //   await INSERT.into(files1).entries({ 
    //      registration_id : destt.regId,
    //      po_number : destt.poNo,
    //      content : files1[i].content,
    //      mediaType : files1[i].mediaType,
    //      fileName : files1[i].fileName,
    //      size : files1[i].size,
    //      url : files1[i].url,
    //        });


    //  }


    let checkfalse = await UPDATE(polineitem).set({ checked: 'false' });

    console.log("checkfalse", checkfalse)
    console.log("desttttt", destt)
    let updatefile = await UPDATE(Files).set({ registration_id: destt.regId }).where({ po_number: destt.poNo, registration_id: 'test' });


    var bodyy = {
      "definitionId": process.env.definitionId,
      "context": {
        "po_number": `${req.data.po_number}`,
        "registration_id": `${destt.regId}`,
        "approver_mail": `${req.data.email}`
      }
    }
    // bodyy = JSON.stringify(bodyy)

    console.log("bpabodyy", bodyy);

    var BPA = await cds.connect.to('BPA_S');
    let response11
    try {
      response11 = await BPA.post("/workflow/rest/v1/workflow-instances", bodyy);
      console.log("testetst")
    } catch (error) {
      console.log("Dest error", error)
    }


    console.log("response11", response11)

    return destt.regId


  });

  this.on('getcallfromodata', async (req) => {
    //

    debugger
    var po = req.data.po_number
    var contract = req.data.contract_no
    var vendor = req.data.vendor_code
    console.log("venddddd", vendor)
    var BPA = await cds.connect.to('INVOICE_DEST');
    let destt = await BPA.get(`/sap/opu/odata/sap/ZMM_ADVANCE_PAY_SRV/buyerInfoSet(poNo='${po}',contractNo='${contract}',vendorCode='${vendor}')?$expand=advancePaymentLineItemsSet`);
    console.log("getcalll", destt)
    let poline_items = await SELECT.from(polineitem).where({ po_number: req.data.po_number });
    if (poline_items.length == 0) {

      console.log("startttttt")
      // let destt = JSON.parse(values);
      console.log("arraylentth", destt.advancePaymentLineItemsSet.length)

      console.log("item no", destt.advancePaymentLineItemsSet[0].ItemNumber)
      console.log("item no", destt.advancePaymentLineItemsSet[1].ItemNumber)
      console.log("item no", destt.advancePaymentLineItemsSet[2].ItemNumber)

      for (var i = 0; i < destt.advancePaymentLineItemsSet.length; i++) {

        var amtout = parseFloat(destt.advancePaymentLineItemsSet[i].unitPrice) * parseFloat(destt.advancePaymentLineItemsSet[i].lineItemQuantity)
        console.log("amtout", amtout)
        var cgstoutval = (parseFloat(amtout) * parseFloat(destt.advancePaymentLineItemsSet[i].cgstPerc)) / 100
        console.log("cgstoutval", cgstoutval)
        var sgstoutval = (parseFloat(amtout) * parseFloat(destt.advancePaymentLineItemsSet[i].sgstPerc)) / 100
        console.log("sgstoutval", sgstoutval)


        await INSERT.into(polineitem).entries({
          itemno: destt.advancePaymentLineItemsSet[i].ItemNumber,
          po_number: destt.poNo,
          item_desc: destt.advancePaymentLineItemsSet[i].Itemdescription,
          plant: destt.advancePaymentLineItemsSet[i].Itemdescription,
          unit_price: parseFloat(destt.advancePaymentLineItemsSet[i].unitPrice),
          quantity: parseFloat(destt.advancePaymentLineItemsSet[i].lineItemQuantity),
          quantity_static: parseFloat(destt.advancePaymentLineItemsSet[i].lineItemQuantity),
          amount: parseFloat(parseFloat(destt.advancePaymentLineItemsSet[i].unitPrice) * parseFloat(destt.advancePaymentLineItemsSet[i].lineItemQuantity)),
          amount_value_static: parseFloat(parseFloat(destt.advancePaymentLineItemsSet[i].unitPrice) * parseFloat(destt.advancePaymentLineItemsSet[i].lineItemQuantity)),
          cgst_percentage: parseFloat(destt.advancePaymentLineItemsSet[i].cgstPerc),
          sgst_percentage: parseFloat(destt.advancePaymentLineItemsSet[i].sgstPerc),
          // cgst_value :parseFloat(destt.advancePaymentLineItemsSet[i].cgstValue),
          // sgst_value :parseFloat(destt.advancePaymentLineItemsSet[i].sgstValue),
          cgst_value: cgstoutval,
          sgst_value: sgstoutval,
          cgst_value_static: cgstoutval,
          sgst_value_static: sgstoutval,
          vendor_code: destt.advancePaymentLineItemsSet[i].vendorCode
        });

        amtout = 0
        cgstoutval = 0
        sgstoutval = 0




      }

    }

    console.log("destt.vendorName", destt.vendorName)

    return destt




  });

  this.on('fm1', async (req, next) => {
    debugger
    if (req.data.type == 'checked') {
      await UPDATE(polineitem).set({ checked: 'true' }).where({ itemno: req.data.content, po_number: req.data.id });
      return 'true';
    }
    else {
      await UPDATE(polineitem).set({ checked: 'false' }).where({ itemno: req.data.content, po_number: req.data.id });
      let table = await SELECT.from(polineitem).where({ itemno: req.data.content, po_number: req.data.id });
      let update = await UPDATE(polineitem).set({ amount: table[0].amount_value_static, sgst_value: table[0].sgst_value_static, cgst_value: table[0].cgst_value_static, quantity: table[0].quantity_static }).where({ itemno: req.data.content, po_number: req.data.id });
      return 'false';
    }

  });


  this.on('fm2', async (req, next) => {
    //
    // if(req.data.quantity)
    // {
    //   let table_for_quantity = await SELECT.from(polineitem).where({po_number : req.data.poNum , itemno : req.data.itemId})
    //   if (table_for_quantity[0].quantity<req.data.quantity) 
    //   {
    //     //Do the validations for popping up error
    //   }
    let table = await SELECT.from(checkedpolineitem).where({ po_number: req.data.poNum, itemno: req.data.itemId });
    var quantity = parseFloat(table[0].quantity);
    var unit_price = parseFloat(table[0].unit_price);
    var amounts = parseFloat(quantity * unit_price);
    var cgst_val = parseFloat((table[0].cgst_percentage * amounts) / 100);
    var sgst_val = parseFloat((table[0].sgst_percentage * amounts) / 100);
    var afterUpdate = await UPDATE(checkedpolineitem).set({ amount: amounts, cgst_value: cgst_val, sgst_value: sgst_val }).where({ po_number: req.data.poNum, itemno: req.data.itemId });

    let updatedtable = await SELECT.from(checkedpolineitem).where({ po_number: req.data.poNum, itemno: req.data.itemId });
    // let table_1 = await SELECT.from(checkedpolineitem).where({ po_number : req.data.poNum});
    // for (let i = 0; i < table_1.length; i++) {
    //   table_1[i].cgst_percentage;
    // }  
    return JSON.stringify(updatedtable);
  });


  this.on('cgst', async (req, next) => {
    // //
    let table = await SELECT.from(checkedpolineitem).where({ po_number: req.data.poNum, itemno: req.data.itemId });
    if (table) {
      await UPDATE(checkedpolineitem).set({ cgst_value: parseFloat(req.data.cgst), sgst_value: parseFloat(req.data.sgst) }).where({ po_number: req.data.poNum, itemno: req.data.itemId })
    }
  });

  this.on('advancepayment', async (req, next) => {

    debugger

    let insert_invoice = await INSERT.into(invoice).entries({
      advance_payment_no: req.data.advancePayNo,
      registration_id: req.data.regid,
      po_number: req.data.ponumber,
      advance_payment_date: req.data.advancePayDate,
      advance_payment_value: req.data.advancePayValue


    });

    console.log("insert_invoice", insert_invoice)

  });

  this.on('getcallforobj', async (req) => {
    debugger
    let pohead = await SELECT.from(poheader).where({ registration_id: req.data.registterid });

    let advapay = await SELECT.from(invoice).where({ registration_id: req.data.registterid });


    return JSON.stringify({
      pohead: pohead,
      advapay: advapay
    });

  });
  this.on('valuehelp1', async (req) => {
    debugger
    let val = await SELECT.from(valuehelp).where({ vendor_code: req.data.vencode });

    return JSON.stringify(val);

  });


  this.on('fm3', async (req) => {
    debugger
    let table = await SELECT.from(polineitem).where({ po_number: req.data.poNum, itemno: req.data.itemId });
    return JSON.stringify(table);
  });

});






