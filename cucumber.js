const common = [
    "--require-module ts-node/register" // Load TypeScript module
]

const aux_example = [
    ...common,
    "tests/apps/mooc/backend/features/**/*.feature",
    "--require tests/apps/mooc/backend/features/step_definitions/*.steps.ts"
].join(" ")

const plants = [...common, "tests/apps/plants/features/**/*.feature", "--require tests/apps/plants/features/step_definitions/*.steps.ts"].join(" ")

module.exports = {
    plants,
    aux_example
}
