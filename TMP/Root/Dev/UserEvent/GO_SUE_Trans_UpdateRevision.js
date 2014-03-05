/***********************************************************************
 *
 * The following javascript code is created by ERP Guru Inc.,
 * a NetSuite Partner. It is a SuiteFlex component containing custom code
 * intented for NetSuite (www.netsuite.com) and use the SuiteScript API.
 * The code is provided "as is": ERP Guru shall not be liable
 * for any damages arising out the intended use or if the code is modified
 * after delivery.
 *
 * Company:  ERP Guru inc., www.erpguru.com
 * Author:   george.panaritis@erpguru.com
 * Date:     Tue Apr 24 2012 13:53:21 GMT-0400 (EDT)
 *
 * Reviewed by:
 * Review Date:
 *
 ***********************************************************************/

//var FOLDER_PDF = 492;	//Sandbox
var FOLDER_PDF = 794;	//Prod
/**
 * The following function willupdate the revision custom field and print.attach the transaction
 * @author   george.panaritis@erpguru.com
 * @param {Object} type the read operation type
 */
function afterSubmit_updateRevision(type){
    if (type == 'xedit' || type == 'edit') {
        var recordSaved = true;
        var transType = nlapiGetRecordType();
        var transId = nlapiGetRecordId();
        var currentRecord = nlapiLoadRecord(transType, transId);
        if (currentRecord != '' && currentRecord != '') {
            var newRevision = 1;
            var currentRevision = currentRecord.getFieldValue('custbody_revision_tracking');
            if (currentRevision != '' && currentRevision != null && currentRevision > 0) {
                currentRevision = parseInt(currentRevision, 10);
                currentRevision++;
                newRevision = currentRevision;
            }
            currentRecord.setFieldValue('custbody_revision_tracking', newRevision);
            try {
                nlapiSubmitRecord(currentRecord);
            } 
            catch (err) {
                nlapiLogExecution('ERROR', 'Cannot Save Transsction id: ' + transId, err.message);
                recordSaved = false;
                logError(e, 'Error Saving Transsction id: ' + transId); //Library call (ITR_GeneralLibrary)
            }
            
            if (recordSaved) {
                var transactionFile = nlapiPrintRecord('TRANSACTION', transId, 'PDF', null);
                nlapiLogExecution('DEBUG', 'nlapiPrintRecord: ', transactionFile);
                if (transactionFile != null && transactionFile != '') {
					//Append the revision number to the file name
                    var fileName = transactionFile.getName();
                    fileName = fileName.split('.pdf')[0];
                    fileName += '_rev' + newRevision + '.pdf';
                    transactionFile.setName(fileName);
					//Add the file to the specific folder in order to save it
                    transactionFile.setFolder(FOLDER_PDF);
                    var transFileId = nlapiSubmitFile(transactionFile);
                    try {
                        nlapiAttachRecord('file', transFileId, transType, transId, null);
                    } 
                    catch (e) {
                        nlapiLogExecution('ERROR', 'Cannot Attach File id: ' + transFileId, e.message);
                        logError(e, 'Error Attaching File: ' + fileName); //Library call (ITR_GeneralLibrary)
                    }
                    
                }
            }
        }
    }
}
