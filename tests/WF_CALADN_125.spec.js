import { test, expect } from "../fixtures/baseTest.js";

const { StepHelper } = require('../utils/StepHelper');
                            
test.setTimeout(120000);

const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { PaymentPage } = require('../pages/PaymentPage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PackagePage } = require('../pages/PackagePage');
const { CancellationPage } = require('../pages/CancellationPage.js');

const { patientData } = require('../testdata/patients.json');
const { paymentData } = require('../testdata/payments.json');
const { appoinmentData }= require('../testdata/appointmentData.json');
const { consultData, bookingData } = require('../testdata/consultData.json');
const { serviceData, DateData } = require('../testdata/serviceData.json');
const { invoiceData } = require('../testdata/invoiceData.json');
const { packageData,statusData } = require('../testdata/packageData.json');
const { cancellationData } = require('../testdata/CancellationData.json');

const { generatePatientName } = require('../utils/RandomData');



test('Package - Cancel with Full Refund', async ({ page }) => {

    const patientName = generatePatientName();
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
    const calendarPage = new CalendarPage(page);
    const packagePage = new PackagePage(page);
    const cancellationPage = new CancellationPage(page);

    await patientPage.createPatient(
        patientName,
        patientData
    );

    await packagePage.addPackage(
    patientName,
    packageData.packageName
    );

    await calendarPage.PatientFromCalendarBookPackage(
    patientName,
    bookingData.bookingDate
    );

    await packagePage.bookPackage(
    patientName
    );

    await calendarPage.PatientFromCalendarView(
    patientName,
    statusData.expectedStatus
    );

    await invoicePage.generateInvoice(
    patientName,
    invoiceData
    ); 

    const summaryAmount =
    await invoicePage.verifyInvoiceTotalAfterAdjustment(
        invoiceData
    );

    await invoicePage.verifyPaymentSection();

    await invoicePage.openAndVerifyInvoicePDF(
        patientName,
        patientData,
        invoiceData,
        summaryAmount
    );

    await cancellationPage.Payment(
        paymentData.amount
    );

    await cancellationPage.cancelPackageWithFullRefund();

//    await cancellationPage.cancelWithRefund(
//     paymentData.paymentMethod,
//     paymentData.amount,
//     paymentData.transactionId
//     );

});
