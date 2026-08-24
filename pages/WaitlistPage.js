const { expect } = require('@playwright/test');
const { test } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper.js');
 
class WaitlistPage {
    constructor(page) {
        this.page = page;
    }
 
    async clickHourglass() {
        await StepHelper.step(
            this.page,
            'Click Hourglass (Waitlist) icon on the first doctor card',
            async () => {
                await this.page
                    .locator('.fa-solid.fa-hourglass')
                    .first()
                    .click();
            }
        );
    }
 
    async clickProceed() {
        await StepHelper.step(
            this.page,
            'Click Proceed after hourglass selection',
            async () => {
                await this.page.getByText('Proceed').click();
            }
        );
    }
 
    async clickConfirmBooking() {
        await StepHelper.step(
            this.page,
            'Click Confirm Booking to add to waitlist',
            async () => {
                await this.page
                    .getByText('Confirm Booking')
                    .click();
            }
        );
 
        await this.page.waitForLoadState('networkidle');
    }
 
    async clickWaitlist() {
        await StepHelper.step(
            this.page,
            'Click Waitlist from the left corner menu on Calendar page',
            async () => {
                await this.page
                    .getByText('Waitlist', { exact: true })
                    .first()
                    .click();
            }
        );
    }
 
    getWaitlistCard(patientName) {
        return this.page
            .locator('div')
            .filter({ hasText: patientName })
            .filter({ has: this.page.getByRole('button', { name: 'Schedule' }) })
            .last();
    }
 
    async verifyWaitlistEntry(patientName) {
        const waitlistEntryLocator = this.getWaitlistCard(patientName);
 
        await StepHelper.step(
            this.page,
            `Verify waitlist entry is present for patient: '${patientName}'`,
            async () => {
                await waitlistEntryLocator.waitFor({
                    state: 'visible',
                    timeout: 15000
                });
 
                await expect(waitlistEntryLocator)
                    .toContainText(patientName);
 
                console.log(
                    `Verified waitlist entry for patient: '${patientName}'`
                );
 
                await test.info().attach(
                    `Waitlist patient verified: '${patientName}'`,
                    {
                        body: Buffer.from(
                            `Patient '${patientName}' is present in the Waitlist.`
                        ),
                        contentType: 'text/plain'
                    }
                );
            }
        );
    }
 
    async clickSchedule(patientName) {
        await StepHelper.step(
            this.page,
            `Click Schedule button for waitlist record: '${patientName}'`,
            async () => {
                await this.getWaitlistCard(patientName)
                    .getByRole('button', { name: 'Schedule' })
                    .click();
            }
        );
    }
 
 
    async selectFirstAvailableTimeSlot() {
        await StepHelper.step(
            this.page,
            'Select any available time slot from the schedule picker',
            async () => {
                const firstSlot = this.page
                    .locator('span.slot-time:visible')
                    .last();
 
                await firstSlot.waitFor({
                    state: 'visible',
                    timeout: 15000
                });
 
                await firstSlot.scrollIntoViewIfNeeded();
                await firstSlot.click({ force: true });
            }
        );
    }
 
    async clickConfirmSchedule() {
        await StepHelper.step(
            this.page,
            'Click Confirm Schedule button',
            async () => {
                await this.page
                    .getByRole('button', { name: /confirm schedule/i })
                    .first()
                    .click({ force: true });
            }
        );
 
        await this.page.waitForLoadState('networkidle');
    }
 
}
 
module.exports = { WaitlistPage };