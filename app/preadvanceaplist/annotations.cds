using MyService as service from '../../srv/service';
annotate service.poheader with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'po_number',
                Value : po_number,
            },
            {
                $Type : 'UI.DataField',
                Label : 'contract_number',
                Value : contract_number,
            },
            {
                $Type : 'UI.DataField',
                Label : 'vendor_code',
                Value : vendor_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'vendor_name',
                Value : vendor_name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'vendor_gstin',
                Value : vendor_gstin,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status_criticality',
                Value : status_criticality,
            },
            {
                $Type : 'UI.DataField',
                Label : 'purchase_doc',
                Value : purchase_doc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'document_date',
                Value : document_date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'company_code',
                Value : company_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'purchasing_org',
                Value : purchasing_org,
            },
            {
                $Type : 'UI.DataField',
                Label : 'comment',
                Value : comment,
            },
            {
                $Type : 'UI.DataField',
                Label : 'creation_date',
                Value : creation_date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'registration_id',
                Value : registration_id,
            },
        ],
    },
    UI.Facets : [],
    UI.LineItem : [
         {
            $Type : 'UI.DataField',
            Value : po_to_invoice.advance_payment_no,
            Label : 'Advance Payment No',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Criticality : status_criticality,
        },
        {
            $Type : 'UI.DataField',
            Value : registration_id,
            Label : 'Registration Id',
        },
        {
            $Type : 'UI.DataField',
            Value : po_number,
            Label : 'Purchasing Doc.',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Vendor Name',
            Value : vendor_name,
        },
        {
            $Type : 'UI.DataField',
            Value : creation_date,
            Label : 'Document Date ',
        },
        {
            $Type : 'UI.DataField',
            Value : po_to_invoice.advance_payment_value,
            Label : 'Advance Payment Val',
        },
        {
            $Type : 'UI.DataField',
            Value : company_code,
            Label : 'Company Code',
        },
        {
            $Type : 'UI.DataField',
            Value : purchasing_org,
            Label : 'Purchasing Org',
        },
        {
            $Type : 'UI.DataField',
            Value : comment,
            Label : 'Comment',
        },
        {
            $Type : 'UI.DataFieldForIntentBasedNavigation',
            SemanticObject : 'submitform',
            Action : 'display',
            Label : 'With-PO Advance Payment Request',
        },
    ],
);
annotate service.invoice with {
    advance_payment_no @Common.Label : 'Advance Payment Number '
};
annotate service.poheader with {
    creation_date @Common.Label : 'Creation Date Range '
};

annotate service.poheader with @(Capabilities.Deletable: false);

annotate service.poheader with {
    status @Common.Label : 'Status '
};
annotate service.poheader with {
    vendor_name @Common.Label : 'Vendor Name'
};


annotate service.poheader with @(
    UI.SelectionFields : [
        po_to_invoice.advance_payment_no,
        creation_date,
        status,
        vendor_name,
    ]
);

