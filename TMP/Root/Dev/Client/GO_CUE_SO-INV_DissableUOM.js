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
 * Author:  ianic.brisson@erpguru.com
 * Date:    June 15 2012
 *
 * Reviewed by:
 * Review Date:
 *
 ***********************************************************************/

 var ADMINISTRATOR = '42';
 
 /**
  * Disable the UOM field on Sales Orders and Invoices
  * @param {Object} type, mode in which the record is being accessed
  */ 
 function lineInit_DissableUOM(type) {
	if ( type == 'item' && nlapiGetRole() != ADMINISTRATOR ) {
		nlapiDisableLineItemField('item','units','true');
	}
}

 function filedChanged_DissableUOM(type,name,linenum) {
	if ( type == 'item' && nlapiGetRole() != ADMINISTRATOR && name == 'item') {
		doh
		nlapiDisableLineItemField('item','units','true');
	}
}

 function pageInit_DissableUOM(type) {
	if ( nlapiGetRole() != ADMINISTRATOR ) {
		nlapiDisableLineItemField('item','units','true');
	}
}