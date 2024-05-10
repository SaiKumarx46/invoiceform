using db as s1 from '../db/schema';

service MyService {

    entity poheader          as projection on s1.poheader;

    @cds.redirection.target
    entity polineitem        as projection on s1.polineitem;

    entity checkedpolineitem as projection on s1.polineitem
                                where
                                    checked = 'true';

    entity invoice           as projection on s1.invoice;
    entity Files             as projection on s1.Files;
    
    function getcallfromodata(po_number : String , contract_no : String , vendor_code : String) returns String;
     function postcall(po_number : String) returns String;
    function fm1(id : String , content : String , type : String) returns String;
    function fm2(poNum : String , itemId : String , quantity : String , unitPrice : String , sgst_value : String , cgst_value : String) returns String;
    function cgst(poNum : String , itemId : String , cgst : String , sgst : String) returns String;
    function amount_validate(poNum : String , itemId : String , quantity : String)returns String;
}
