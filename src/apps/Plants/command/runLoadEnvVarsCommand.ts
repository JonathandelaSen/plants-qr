import { LoadEnvVarsCommand } from "./LoadEnvVarsCommand"

LoadEnvVarsCommand.run()
    .then(() => {
        console.log("LoadEnvVars success")
        process.exit(0)
    })
    .catch(error => {
        console.log("LoadEnvVars fail", error)
        process.exit(1)
    })
