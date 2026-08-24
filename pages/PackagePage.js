const { StepHelper } = require('../utils/StepHelper');
const { PackageLocator } = require('../Locators/PackageLocator');
const { Keywords } = require('../utils/Keywords');

class PackagePage {

    constructor(page) {
        this.page = page;
        this.locator = new PackageLocator(page);
        this.keywords = new Keywords();
    }

    async clickAddNew() {

        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {

                await this.keywords.click(
                    this.locator.addNewBtn
                );
            }
        );
    }

    async clickAddPackage() {

        await StepHelper.step(
            this.page,
            'Click Add Package Button',
            async () => {

                await this.keywords.click(
                    this.locator.addPackageBtn
                );
            }
        );
    }

    async searchPatient(patientName) {

    await StepHelper.step(
        this.page,
        `Search Patient - ${patientName}`,
        async () => {

            await this.keywords.fill(
                this.locator.patientSearchTxt,
                patientName
            );
        }
    );


    const patient =
        this.locator.getPatient(
            patientName
        );


    await this.keywords.waitForElement(
        patient
    );


    await StepHelper.step(
        this.page,
        `Select Patient - ${patientName}`,
        async () => {

            await this.keywords.click(
                patient
            );
        }
    );
}

async selectPackage(packageName) {

    const packageOption =
        this.locator.getPackage(
            packageName
        );

    await this.keywords.waitForElement(
        packageOption
    );

    await StepHelper.step(
        this.page,
        `Select Package - ${packageName}`,
        async () => {

            await this.keywords.click(
                packageOption
            );
        }
    );
}

    async clickProceed() {

        await StepHelper.step(
            this.page,
            'Click Proceed',
            async () => {

                await this.keywords.click(
                    this.locator.proceedBtn
                );
            }
        );
    }

    async activatePackage() {

        await StepHelper.step(
            this.page,
            'Activate Package',
            async () => {

                await this.keywords.click(
                    this.locator.activatePackageBtn
                );
            }
        );
    }

    async addPackage(patientName,packageName) {

        await this.clickAddNew();

        await this.clickAddPackage();

        await this.searchPatient(
            patientName
        );

        await this.selectPackage(
        packageName
        );

        await this.clickProceed();

        await this.activatePackage();
    }


    async clickBookNow() {

        await StepHelper.step(
            this.page,
            'Click Book Now',
            async () => {

                await this.keywords.click(
                    this.locator.bookNowBtn
                );
            }
        );
    }

 async selectPackageItem() {

        const packageItemButton =
            this.locator.packageItemCard
                .getByRole('button')
                .filter({ hasText: /^$/ });


        await StepHelper.step(
            this.page,
            'Select Package Item',
            async () => {

                await this.keywords.click(
                    packageItemButton
                );
            }
        );
    }

//     async addAllPackageServices() {

//     const addButtons =
//         this.locator.addServiceButtons;

//     const serviceCount =
//         await addButtons.count();


//     for (let i = 0; i < serviceCount; i++) {

//         await StepHelper.step(
//             this.page,
//             `Select Package Service - ${i + 1}`,
//             async () => {

//                 // Click current service + button
//                 await this.keywords.click(
//                     addButtons.nth(i)
//                 );
//             }
//         );


//         // Wait for appointment slots
//         await this.keywords.waitForElement(
//             this.locator.timeSlots.first()
//         );


//         // Get available slots
//         const slots =
//             this.locator.timeSlots;

//         const slotCount =
//             await slots.count();


//         // Generate random slot index
//         const randomIndex =
//             Math.floor(
//                 Math.random() * slotCount
//             );


//         await StepHelper.step(
//             this.page,
//             `Select Random Time Slot - ${randomIndex + 1}`,
//             async () => {

//                 await this.keywords.click(
//                     slots.nth(randomIndex)
//                 );
//             }
//         );


//         // Next
//         await StepHelper.step(
//             this.page,
//             'Click Next',
//             async () => {

//                 await this.keywords.click(
//                     this.locator.nextBtn
//                 );
//             }
//         );
//     }
// }

async addAllPackageServices() {

    const serviceCount =
        await this.locator.pendingServiceCards.count();


    for (let i = 0; i < serviceCount; i++) {

        const pendingService =
            this.locator.pendingServiceCards.first();

        const addButton =
            pendingService.locator(
                'button:not(.status)'
            );


        await StepHelper.step(
            this.page,
            `Add Package Service - ${i + 1}`,
            async () => {

                await this.keywords.click(
                    addButton
                );
            }
        );


        const slots =
            this.locator.timeSlots;


        await this.keywords.waitForElement(
            slots.first()
        );


        const slotCount =
            await slots.count();


        const randomIndex =
            Math.floor(
                Math.random() * slotCount
            );


        await StepHelper.step(
            this.page,
            `Select Random Time Slot - ${randomIndex + 1}`,
            async () => {

                await this.keywords.click(
                    slots.nth(randomIndex)
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Click Next',
            async () => {

                await this.keywords.click(
                    this.locator.nextBtn
                );
            }
        );


        await this.keywords.wait(
            this.page,
            1000
        );
    }
}



    async selectFirstAvailableSlot() {

        await StepHelper.step(
            this.page,
            'Select First Available Slot',
            async () => {

                await this.keywords.click(
                    this.locator.slotButton.first()
                );
            }
        );
    }

    async clickNext() {

        await StepHelper.step(
            this.page,
            'Click Next',
            async () => {

                await this.keywords.click(
                    this.locator.nextBtn
                );
            }
        );
    }

async clickConfirm() {

    await StepHelper.step(
        this.page,
        'Click Confirm Button',
        async () => {

            await this.keywords.click(
                this.locator.confirmBtn
            );
        }
    );
}




    async bookPackage(patientName) {

        // await this.clickAddNew();

        // await this.clickAddPackage();

        // await this.searchPatient(
        //     patientName
        // );

        await this.clickBookNow();

        // await this.selectPackageItem();

        await this.addAllPackageServices();

        await this.clickConfirm();

        // await this.selectFirstAvailableSlot();

        // await this.clickNext();
    }
}


module.exports = { PackagePage };