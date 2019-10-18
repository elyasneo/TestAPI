const faker = require('faker')
const uuid = require('uuid')
const randomItem = require('random-item')
const fakeGen = require('../fake-generator')

faker.locale = 'fa'

module.exports.comments = (number, depth) => {
    if (depth == 0) return []
    const items = []
    for (let index = 0; index < number; index++) {
        items.push({
            id: uuid.v1(),
            name: faker.name.firstName(),
            content: faker.lorem.sentences(Math.floor(Math.random() * 4) + 1),
            role: randomItem(["مدیر", "دانشجوی دوره"]),
            color: randomItem(["green", "red"]),
            date: "98/8/2",
            reply: module.exports.comments(Math.floor(Math.random() * 4), depth - 1 + Math.floor(Math.random() * 2))
        })
    }
    return items
}
module.exports.sessions = (number) => {
    if (number == 0) return this.sessions(1)[0]
    const items = []
    for (let index = 0; index < number; index++) {
        items.push({
            id: uuid.v1(),
            name: faker.name.lastName(),
            lessons: this.lessons(Math.floor(Math.random() * 5) + 1)
        })
    }
    return items
}
module.exports.lessons = (number) => {
    if (number == 0) return this.lessons(1)[0]
    const items = []
    for (let index = 0; index < number; index++) {
        items.push({
            id: uuid.v1(),
            name: faker.name.firstName(),
            type: randomItem(["video", "audio", "exam", "exam_answer"]),
            source: "https://dl.zabanmaster.com/ZM-contents/final-turkish.mp4",
            questions: fakeGen.getQuestions(8),
            isLocked: randomItem([true, false])
        })
    }
    return items
}