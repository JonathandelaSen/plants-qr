export class PlantCreatedEmailSender {
    run(plantId: string): void {
        console.log("PlantCreatedEmailSender send " + plantId)
    }
}
