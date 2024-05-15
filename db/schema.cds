namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity poheader {
    key po_number          : String;
      key registration_id    : String;
        contract_number    : String;
        vendor_code        : String;
        vendor_name        : String;
        vendor_gstin       : String;
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
        po_to_invoice      : Composition of many invoice
                                 on po_to_invoice.po_number = po_number;
        po_to_file         : Association to many Files
                                 on po_to_file.po_number = po_number;
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
        po_number             : String;
        advance_payment_date  : String;
        advance_payment_value : String;
        invoice_to_po         : Association to one poheader
                                    on invoice_to_po.po_number = po_number;
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


entity Files : cuid, managed {
    key fileId    : UUID;
        po_number : String;

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
