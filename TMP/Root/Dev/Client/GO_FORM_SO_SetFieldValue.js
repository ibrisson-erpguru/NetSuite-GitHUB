/***********************************************************************
 *
 * The following javascript code is created by ERP Guru Inc.,
 * a NetSuite Partner. It is a SuiteFlex component containing custom code
 * intented for NetSuite (www.netsuite.com) and use the SuiteScript API.
 * The code is provided "as is": ERP Guru shall not be liable
 * for any damages arising out the intended use or if the code is modified
 * after delivery.
 *
 * Company: ERP Guru inc., www.erpguru.com
 * Author:  olivier.ahad@erpguru.com
 * 			ianicbrisson@erpguru.com
 * Date:    April 17 2012
 * 			April 22nd 2012
 *
 * Reviewed by:
 * Review Date:
 *
 ***********************************************************************/

/** 
 
  
 /**
  * On a Sales Order form, when a field is edited
  * Set the unit conversion rate field value based on the selected weight unit
  * The unit conversion rate is pulled from the Unit Type 8 (Pounds), from the 
  * line item for which the unit name corresponds the unit selected on the form
  * @param {Object} type, subline type
  * @param {Object} name, name of field being changed
  * @param {Object} linenum, subline number
  */ 
 function setWeightUnitConversionRate(type,name,linenum) {
	if (name == 'custbody_weight_by'){
		var weightUnit = nlapiGetFieldText('custbody_weight_by');
		var searchFilters = [];
		searchFilters.push(new nlobjSearchFilter('internalid', null, 'is', '8'));
		searchFilters.push(new nlobjSearchFilter('unitname', null, 'is', weightUnit));
		var searchColumns = [];
		searchColumns.push(new nlobjSearchColumn('conversionrate'));
		var results = nlapiSearchRecord('unitstype', null, searchFilters, searchColumns);
		// Search should always return only one value, if not, just leave the conversion rate blank
		if (results != null && results != '' && results.length == 1) {
			nlapiSetFieldValue('custbody_weightunitconversion',results[0].getValue('conversionrate'));
			nlapiLogExecution('DEBUG', 'TEST', 'TEST');
			for ( var i = 0; i < search.length; i++) {
				var transaction = search[i];
				nlapiLoadRecord('salesorder', 123, null);
				nlapiSubmitRecord('sales order', true, true);
			}
		}
	}
}