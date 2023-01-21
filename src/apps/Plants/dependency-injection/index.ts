import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection"

export default class Injector {
    private static container: ContainerBuilder
    static async run(): Promise<ContainerBuilder> {
        if (this.container) {
            return this.container
        }
        this.container = new ContainerBuilder()
        const loader = new YamlFileLoader(this.container)
        const env = process.env.NODE_ENV || "dev"
        await loader.load(`${__dirname}/application_${env}.yaml`)
        console.log("Loaded dependencies at:", `${__dirname}/application_${env}.yaml`)
        return this.container
    }
}
