const { expect } = require('@playwright/test');
const { test } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper.js');
const { Verify } = require('../utils/verification.js');
 
class AppointmentPage {
    constructor(page) {
        this.page = page;
    }
 
    async clickPatientNameInAppointmentPanel(patientName) {
        await StepHelper.step(
            this.page,
            `Click patient name in appointment panel to expand full screen: '${patientName}'`,
            async () => {
                const patientNameInPanel = this.page
                    .locator('app-appointment-details')
                    .locator('.name-edit')
                    .filter({ hasText: patientName })
                    .first();
 
                await patientNameInPanel.waitFor({
                    state: 'visible',
                    timeout: 10000
                });
 
                await patientNameInPanel.scrollIntoViewIfNeeded();
                await patientNameInPanel.click({ force: true });
            }
        );
    }
 
    async clickAddNewButton() {
        await StepHelper.step(
            this.page,
            'Click Add New Button to open dropdown menu',
            async () => {
                await this.page
                    .locator('app-patient-profile')
                    .getByRole('button', { name: 'Add New' })
                    .click();
            }
        );
    }
 
    async verifyAddNewMenuItems() {
        const addNewMenuItems = [
            'Add Consult',
            'Add Service',
            'Add Test',
            'Add Consumable',
            'Add Day Care',
            'Add Package',
            'Add Surgery',
            'Add Admission',
        ];
 
        for (const menuItem of addNewMenuItems) {
            await StepHelper.step(
                this.page,
                `Verify Add New menu item: "${menuItem}"`,
                async () => {
                    await expect(
                        this.page.locator('app-patient-profile')
                    ).toContainText(menuItem);
 
                    console.log(`Verified '${menuItem}'`);
 
                    await test.info().attach(
                        `Verified '${menuItem}'`,
                        {
                            body: Buffer.from(
                                `Verified '${menuItem}' is present in the Add New dropdown menu.`
                            ),
                            contentType: 'text/plain'
                        }
                    );
                }
            );
        }
    }
 
    async closeAddNewDropdown() {
        await StepHelper.step(
            this.page,
            'Close Add New dropdown (Escape)',
            async () => {
                await this.page.keyboard.press('Escape');
            }
        );
    }
 
    async openTypeDropdown(currentTypeLabel) {
        await StepHelper.step(
            this.page,
            `Open Type dropdown on appointment page: '${currentTypeLabel}'`,
            async () => {
                const escapedLabel = currentTypeLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const typeDropdown = this.page.getByRole('button', {
                    name: new RegExp(`^${escapedLabel}$`),
                    exact: true
                }).first();
 
                await typeDropdown.waitFor({
                    state: 'visible',
                    timeout: 10000
                });
 
                await typeDropdown.click();
            }
        );
    }
 
    async openCurrentTypeDropdown(currentTypeLabel = 'Consult') {
        await StepHelper.step(
            this.page,
            `Open current Type dropdown after changing it to '${currentTypeLabel}'`,
            async () => {
                const currentTypeDropdown = this.page.locator(
                    `(//span[text()='${currentTypeLabel}'])[1]`
                );
 
                await currentTypeDropdown.waitFor({
                    state: 'visible',
                    timeout: 10000
                });
 
                await currentTypeDropdown.click();
            }
        );
    }
 
    async selectType(type) {
        await StepHelper.step(
            this.page,
            `Select ${type} from the Type dropdown`,
            async () => {
                await this.page
                    .locator('app-patient-profile')
                    .getByText(type, { exact: true })
                    .first()
                    .click();
            }
        );
    }
 
    async verifyDoctorAndService(
        type,
        storedDoctorName,
        storedTypeValue,
        storedServiceName
    ) {
        const profileContainer =
            this.page.locator('app-patient-profile');
 
        await profileContainer.waitFor({
            state: 'visible',
            timeout: 10000
        });
 
        const readProfileText = async () =>
            await profileContainer.innerText();
 
        await Verify.contains(
            this.page,
            `${type} type - Doctor name (stored vs screen)`,
            storedDoctorName,
            readProfileText
        );
 
        if (type === 'Consult') {
            await Verify.contains(
                this.page,
                `${type} type - Consult slot (stored vs screen)`,
                storedTypeValue,
                readProfileText
            );
        } else if (type === 'Service') {
            await Verify.contains(
                this.page,
                `${type} type - Service name (stored vs screen)`,
                storedServiceName,
                readProfileText
            );
        }
    }
 
    async clickAddNewForWaitlist() {
        await StepHelper.step(
            this.page,
            'Click Add New Button for Waitlist consult booking',
            async () => {
                await this.page
                    .locator('app-patient-profile')
                    .getByRole('button', { name: 'Add New' })
                    .click();
            }
        );
    }
 
    async clickAddConsult() {
        await StepHelper.step(
            this.page,
            'Select Add Consult from the dropdown',
            async () => {
                await this.page
                    .getByRole('button', { name: 'Add Consult' })
                    .click();
            }
        );
    }
 
    async enterConsultSlot(consultSlot) {
        await StepHelper.step(
            this.page,
            `Type Consult Slot name: ${consultSlot}`,
            async () => {
                const consultInput = this.page.locator(
                    "xpath=//div[@class='search-icon']//following::input[@type='text']"
                );
 
                await consultInput.click();
                await consultInput.fill(consultSlot);
            }
        );
    }
 
    async selectConsultOption(consultSlot) {
        const consultOptionLocator = this.page.locator(
            `xpath=(//div[normalize-space()='${consultSlot}'])[1]`
        );
 
        await consultOptionLocator.waitFor({
            state: 'visible',
            timeout: 5000
        });
 
        await StepHelper.step(
            this.page,
            `Select Consult Option: ${consultSlot}`,
            async () => {
                await consultOptionLocator.click();
            }
        );
    }
 
    async closeProviderDropdown() {
        await StepHelper.step(
            this.page,
            'Close Provider dropdown (Escape)',
            async () => {
                await this.page.keyboard.press('Escape');
            }
        );
    }
 
    async openBookingDatePicker() {
        await StepHelper.step(
            this.page,
            'Open Booking Date picker',
            async () => {
                await this.page
                    .locator("//div[@class='range-date-container']")
                    .click();
            }
        );
    }
 
    async selectBookingDate(bookingDate) {
        await StepHelper.step(
            this.page,
            `Select Booking Date: ${bookingDate}`,
            async () => {
                await this.page
                    .locator('#currentMonth')
                    .getByText(bookingDate, { exact: true })
                    .click();
            }
        );
    }
 
    async applyBookingDate() {
        await StepHelper.step(
            this.page,
            'Apply the selected Booking Date',
            async () => {
                await this.page.getByText('Apply').nth(1).click();
            }
        );
    }
 
    async verifyConfirmedAppointment(patientName) {
        await StepHelper.step(
            this.page,
            `Verify Confirmed status on appointment page for: '${patientName}'`,
            async () => {
                const profileContainer = this.page.locator(
                    'app-appointment-details, app-patient-profile'
                ).first();
 
                await profileContainer.waitFor({
                    state: 'visible',
                    timeout: 15000
                });
 
                await expect(profileContainer)
                    .toContainText(/confirmed/i);
 
                console.log(
                    `Appointment for '${patientName}' is in Confirmed status.`
                );
 
                await test.info().attach(
                    `Appointment Confirmed: '${patientName}'`,
                    {
                        body: Buffer.from(
                            `Appointment for '${patientName}' is showing Confirmed status on the appointment page.`
                        ),
                        contentType: 'text/plain'
                    }
                );
            }
        );
    }
}
 
module.exports = { AppointmentPage };