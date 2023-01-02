import { MotherCreator } from "./MotherCreator"

export class WordMother {
    // static random({ minLength = 1, maxLength = 10 }: { minLength?: number; maxLength?: number }): string {
    //     return MotherCreator.random().lorem.word(Math.floor(Math.random() * (maxLength - minLength)) + minLength) || "word"
    // }
    static random({ minLength, maxLength }: { minLength: number; maxLength: number } = { minLength: 1, maxLength: 10 }): string {
        return MotherCreator.random().lorem.word(Math.floor(Math.random() * (maxLength - minLength)) + minLength) || "word"
    }
}
