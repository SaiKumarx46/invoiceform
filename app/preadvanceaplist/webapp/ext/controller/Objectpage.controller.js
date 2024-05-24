sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('preadvanceaplist.ext.controller.Objectpage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf preadvanceaplist.ext.controller.Objectpage
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:
			{
				onBeforeBinding: async function (oEvent) {
					debugger

					// 	debugger
					// const inputString = oEvent.sPath
					// // const poNumberRegex = /po_number='([^']+)'/;
					// const regIdRegex = /registration_id='([^']+)'/;

					// // Extract the values using match method
					// // const poNumber = inputString.match(poNumberRegex)[1];
					// const regId = inputString.match(regIdRegex)[1];

					// var fname = "objpage";
					// let fname1 = this.getView().getModel().bindContext(`/${fname}(...)`);
					// fname1.setParameter('regId', regId);

					// try {
					// 	await fname1.execute();
					// } catch (error) {
					// 	//
					// 	console.log(error)
					// }

					// let context = fname1.getBoundContext();
					// let getdata = context.getValue();
					// let registerid = getdata.value;

					var path = sap.ui.getCore().byId('preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::Addediteminfo--table').mBindingInfos.items.binding;
					var url = window.location.href;
					var idRegex = /registration_id='(\d+)'/;
					var match = url.match(idRegex);
					var id = match ? match[1] : null;
					console.log(id);

					path.filter
						(
							new sap.ui.model.Filter({
								path: "registration_id1",
								operator: sap.ui.model.FilterOperator.EQ,
								value1: id
							})
						);


					var path1 = sap.ui.getCore().byId('preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::PoLineitems--table').mBindingInfos.items.binding;
					var poNumberRegex = /po_number='(\d+)'/;
					var match1 = url.match(poNumberRegex);
					var poNumber = match1 ? match1[1] : null;
					path1.filter
						(
							new sap.ui.model.Filter({
								path: "po_number",
								operator: sap.ui.model.FilterOperator.EQ,
								value1: poNumber
							})
						);

					var path2 = sap.ui.getCore().byId('preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::Attachment--uploadSet').mBindingInfos.items.binding;
					path2.filter
						(
							new sap.ui.model.Filter({
								path: "registration_id",
								operator: sap.ui.model.FilterOperator.EQ,
								value1: id
							})
						);


				},

				onAfterBinding: async function (oEvent) {
					debugger
					const inputString = oEvent.sPath
					// const poNumberRegex = /po_number='([^']+)'/;
					const regIdRegex = /registration_id='([^']+)'/;

					// Extract the values using match method
					// const poNumber = inputString.match(poNumberRegex)[1];
					const regId = inputString.match(regIdRegex)[1];

					let funcname = "getcallforobj";
                        var oFunc = this.getView().getModel().bindContext(`/${funcname}(...)`);
                        oFunc.setParameter('registterid', regId);
						await oFunc.execute();
						

						
						let context = oFunc.getBoundContext();
						let getdata = context.getValue();
						let res = getdata.value;
						let result = JSON.parse(res)


						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::LineItems--input-a").setValue(result.pohead[0].po_number)
						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::LineItems--input-b").setValue(result.pohead[0].contract_number)
						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::LineItems--input-c").setValue(result.pohead[0].vendor_name)
						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::LineItems--input-d").setValue(result.pohead[0].vendor_gstin)
						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::LineItems--input-e").setValue(result.pohead[0].vendor_code)
						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::LineItems--input-f").setValue(result.pohead[0].approver_mail)
						
						
						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::Payment--input-1").setValue(result.advapay[0].advance_payment_no)
						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::Payment--input-2").setValue(result.advapay[0].advance_payment_date)
						sap.ui.getCore().byId("preadvanceaplist::poheaderObjectPage--fe::CustomSubSection::Payment--input-3").setValue(result.advapay[0].advance_payment_value)


				
		
						
		
					// try {
					// 	await fname1.execute();
					// } catch (error) {
					// 	//
					// 	console.log(error)
					// }


				}
			},

		}
	});
});
