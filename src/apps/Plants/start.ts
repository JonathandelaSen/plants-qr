import { PlantsQRApp } from "./PlantsQRApp"

try {
    new PlantsQRApp().start().catch(handleError)
} catch (e) {
    handleError(e)
}

process.on("uncaughtException", err => {
    console.log("uncaughtException", err)
    process.exit(1)
})
function handleError(e: any) {
    console.log(e)
    process.exit(1)
}
