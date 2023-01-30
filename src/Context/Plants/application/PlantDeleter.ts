import { PlantRepository } from "../domain/persistence/PlantRepository"

export default class PlantDeleter {
    constructor(private repository: PlantRepository) {}

    async run(id: string): Promise<void> {
        await this.repository.remove(id)
        //TODO: Evento de dominio
    }
}
