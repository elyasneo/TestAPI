const faker = require("faker/locale/fa");
const randomItem = require("random-item");

(module.exports.getAcademy = number => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push({
      id: faker.random.uuid(),
      name: faker.name.title(),
      imageUrl:
        "https://cdn.britannica.com/25/4825-004-C11466B0/Flag-United-Kingdom.jpg",
      description: faker.lorem.lines(4)
    });
  }
  return result;
}),
  (module.exports.getPodcastItem = number => {
    const result = [];
    for (let i = 0; i < number; i++) {
      result.push({
        id: faker.random.uuid(),
        name: faker.name.title(),
        source:
          "https://dl.zabanmaster.com/Download/Audio/Podcast/Podcast1.mp3",
        descriptionFa: faker.lorem.lines(4),
        descriptionEn: faker.lorem.lines(4)
      });
    }
    return result;
  }),
  (module.exports.getCourses = number => {
    const result = [];
    for (let i = 0; i < number; i++) {
      result.push({
        id: faker.random.uuid(),
        name: faker.name.title(),
        numOfStudent: faker.random.number({ min: 4, max: 50 }),
        numOfViews: faker.random.number({ min: 1000 }),
        teacherName: faker.name.firstName(),
        imageUrl:
          "https://cdn.britannica.com/25/4825-004-C11466B0/Flag-United-Kingdom.jpg",
        cost: faker.random.number({ min: 100000, max: 400000 }),
        offCost: faker.random.number({ min: 100000, max: 500000 }),
        duration: faker.random.number({ min: 4 }),
        courseDetails: ["توضیحات 1 :مقدار 1", "توضیحات 2 : مقدار 2"],
        point: faker.random.number({ min: 1, max: 5 }),
        buyLink: "https://zabanmaster.com/product/learn-turkish/",
        shareLink: "https://zabanmaster.com/?p=597",
        isBought: faker.random.boolean()
      });
    }
    return result;
  }),
  (module.exports.getCourseDescriptions = number => {
    let result = [];
    for (let i = 0; i < number; i++) {
      result.push({
        id: faker.random.uuid(),
        title: faker.name.title(),
        imageUrl: randomItem([
          "",
          "https://clipartstation.com/wp-content/uploads/2018/09/bar-graph-clipart-5.jpg"
        ]),
        content: faker.lorem.lines(faker.random.number({ min: 2, max: 7 }))
      });
    }
    return result;
  }),
  (module.exports.getCourseAttachment = number => {
    let result = [];
    for (let i = 0; i < number; i++) {
      result.push({
        id: faker.random.uuid(),
        name: faker.name.title(),
        source:
          "https://clipartstation.com/wp-content/uploads/2018/09/bar-graph-clipart-5.jpg",
        isLocked: faker.random.boolean()
      });
    }
    return result;
  }),
  (module.exports.getLessons = number => {
    let result = [];
    for (let i = 0; i < number; i++) {
      let type = randomItem(["video", "audio", "exam", "exam_answer"]);
      let name = faker.name.title();
      let source;
      switch (type) {
        case "video":
          source = "https://dl.zabanmaster.com/ZM-contents/final-turkish.mp4";
          break;
        case "exam_answer":
          source = "https://dl.zabanmaster.com/ZM-contents/final-turkish.mp4";
          break;
        case "audio":
          source =
            "https://dl.zabanmaster.com/Download/Audio/Podcast/Podcast1.mp3";
          break;
        default:
          source = null;
          break;
      }
      let questions = this.getQuestions(6);
      if (type != "exam") questions = null;
      result.push({
        type: type,
        name: name,
        source: source,
        questions: questions,
        isLocked: faker.random.boolean()
      });
    }
    return result;
  }),
  (module.exports.getCourseSessions = number => {
    let result = [];
    for (let i = 0; i < number; i++) {
      result.push({
        id: faker.random.uuid(),
        name: faker.name.title(),
        lessons: this.getLessons(6)
      });
    }
    return result;
  }),
  (module.exports.getCourseComments = number => {
    let result = [];
    //TODO getCourseComments
    return result;
  }),
  (module.exports.getQuestions = number => {
    let result = [];
    for (let i = 0; i < number; i++) {
      let nO = faker.random.number({ min: 2, max: 4 });
      let options = [];
      for (let j = 0; j < nO; j++) {
        options.push(faker.random.word());
      }
      result.push({
        question: faker.lorem.lines(1),
        options: options,
        correctAnswer: faker.random.number({ min: 1, max: options.length })
      });
    }
    return result;
  });
