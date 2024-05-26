namespace db;

using {
    
    managed
} from '@sap/cds/common';

entity poheader {
    key po_number          : String;
      key registration_id    : String;
        contract_number    : String;
        vendor_code        : String;
        vendor_name        : String;
        vendor_gstin       : String;
        approver_mail      : String;
        status             : String ;
        status_criticality : Integer;
        purchase_doc       : String;
        document_date      : String;
        company_code       : String;
        purchasing_org     : String;
        comment            : String;
        creation_date      : String;
        po_to_item         : Composition of many polineitem
                                 on po_to_item.po_number = po_number;
        po_to_checkeditem         : Composition of many checkeditem
                                 on po_to_checkeditem.registration_id1 = registration_id;
        po_to_invoice      : Composition of one invoice
                                 on po_to_invoice.registration_id = registration_id;
        po_to_file         : Association to many Files
                                 on po_to_file.po_number = po_number;
        po_to_comment         : Composition of many comment
                                 on po_to_comment.registration_id = registration_id;
        
}
 
entity polineitem {
    key itemno          : String;
    key po_number       : String;
        item_desc       : String;
        item_desc_cond  : String;
        plant           : String;
        unit_price      : Decimal(10, 2);
        quantity        : Decimal(10, 2);
        cgst_percentage : Decimal(3, 2);
        sgst_percentage : Decimal(3, 2);
        cgst_value      : Decimal(10, 2);
        cgst_value_static      : Decimal(10, 2);
        sgst_value      : Decimal(10, 2);
        sgst_value_static      : Decimal(10, 2);
        amount          : Decimal(10, 2) ;
        amount_value_static          : Decimal(10, 2) ;
        quantity_static : Decimal(10, 2);
        checked         : String @default : false;
        item_to_po      : Association to one poheader
                              on item_to_po.po_number = po_number;

}

entity invoice {

    key advance_payment_no    : String;
        key registration_id    : String;
        po_number             : String;
        advance_payment_date  : String;
        advance_payment_value : String;
        invoice_to_po         : Association to one poheader
                                    on invoice_to_po.registration_id = registration_id;
}


entity comment {
    key commentId      : UUID;
    key registration_id : String;
        textArea       : String;
        comment1       : Association to one poheader
                             on comment1.registration_id = registration_id;
}

entity valuehelp {
    key valid    : String;
    vendor_code : String;
    po_number : String;
    contract_number : String;
}

entity poheader_withoutpo {
    nfa_number   : String;
    vendor_name  : String;
    vendor_gstin : String;
    nfa_value    : String;

}

entity invoice_withoutpo {
    invoice_number : String;
    invoice_date   : String;
    invoice_amount : String;
}


entity Files :  managed {
    key fileId    : UUID;
        po_number : String;
        registration_id    : String;
        @Core.MediaType  : mediaType
        content   : LargeBinary;

        @Core.IsMediaType: true
        mediaType : String;
        fileName  : String;
        size      : Integer;
        url       : String;
        files     : Association to one poheader
                        on files.po_number = po_number;
}

entity checkeditem {
    key itemno1          : String;
    key registration_id1    : String;
        item_desc1       : String;
        item_desc_cond1  : String;
        plant1           : String;
        unit_price1      : Decimal(10, 2);
        quantity1        : Decimal(10, 2);
        cgst_percentage1 : Decimal(3, 2);
        sgst_percentage1 : Decimal(3, 2);
        cgst_value1      : Decimal(10, 2);
        cgst_value_static1      : Decimal(10, 2);
        sgst_value1      : Decimal(10, 2);
        sgst_value_static1      : Decimal(10, 2);
        amount1          : Decimal(10, 2) ;
        amount_value_static1          : Decimal(10, 2) ;
        quantity_static1 : Decimal(10, 2);
        checked1         : String ;
        checkeditem_to_po      : Association to one poheader
                              on checkeditem_to_po.     registration_id = registration_id1;

}


// namespace db;

// using {
//     cuid,
//     managed
// } from '@sap/cds/common';

// entity poheader {
//     key po_number          : String;
//      key registration_id    : String;
//         contract_number    : String;
//         vendor_code        : String;
//         vendor_name        : String;
//         vendor_gstin       : String;
//         status             : String;
//         status_criticality : Integer;
//         purchase_doc       : String;
//         document_date      : String;
//         company_code       : String;
//         purchasing_org     : String;
//         comment            : String;
//         creation_date      : Date;
//         po_to_item         : Composition of many polineitem
//                                  on po_to_item.po_number = po_number;
//         po_to_invoice      : Composition of many invoice
//                                  on po_to_invoice.po_number = po_number;
//         po_to_file         : Association to many Files
//                                  on po_to_file.po_number = po_number;
// }

// entity polineitem {
//     key itemno          : String;
//     key po_number       : String;
//         item_desc       : String;
//         item_desc_cond  : String;
//         plant           : String;
//         unit_price      : Decimal(10, 2);
//         quantity        : Decimal(10, 2);
//         cgst_percentage : Decimal(3, 2);
//         sgst_percentage : Decimal(3, 2);
//         cgst_value      : Decimal(10, 2);
//         sgst_value      : Decimal(10, 2);
//         amount          : Decimal(10, 2);
//         checked         : String @default : false;
//         item_to_po      : Association to one poheader
//                               on item_to_po.po_number = po_number;

// }

// entity invoice {

//     key advance_payment_no    : String;
//         po_number             : String;
//         advance_payment_date  : String;
//         advance_payment_value : String;
//         invoice_to_po         : Association to one poheader
//                                     on invoice_to_po.po_number = po_number;
// }


// entity poheader_withoutpo {
//     nfa_number   : String;
//     vendor_name  : String;
//     vendor_gstin : String;
//     nfa_value    : String;

// }

// entity invoice_withoutpo {
//     invoice_number : String;
//     invoice_date   : String;
//     invoice_amount : String;
// }


// entity Files : cuid, managed {
//     key fileId    : UUID;
//         po_number : String;

//         @Core.MediaType  : mediaType
//         content   : LargeBinary;

//         @Core.IsMediaType: true
//         mediaType : String;
//         fileName  : String;
//         size      : Integer;
//         url       : String;
//         files     : Association to one poheader
//                         on files.po_number = po_number;
// }
