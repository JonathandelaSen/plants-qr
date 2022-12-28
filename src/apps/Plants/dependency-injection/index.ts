import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection"

const container = new ContainerBuilder()
const loader = new YamlFileLoader(container)
const env = process.env.NODE_ENV || "dev"

loader.load(`${__dirname}/application_${env}.yaml`)
console.log("Loaded dependencies at:", `${__dirname}/application_${env}.yaml`)
//container.register("Shared.asd", asd)

export default container
