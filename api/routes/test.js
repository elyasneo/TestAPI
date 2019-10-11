const express = require("express");
const router = express.Router();
const fakeGen = require("../fake-generator");


router.post("/auth/login",(req,res,nex)=>{
  console.log(req.body.username);
  
   if(req.body.username=="elyas"&&req.body.password=="123456"){
     res.status(200).json({
       token:"aEafasfASESAFSAKSDhasdaiohsasfashfiaohsf"
     })
   }else{
     res.status(404).json({
      msg:"نام کاربری یا رمز عبور اشتباه است" 
     })
   }
})

router.get("/academy", (req, res, next) => {
  res.status(200).json(fakeGen.getAcademy(10));
});

router.get("/academy/:id", (req, res, next) => {
  console.log(req.params.id);

  let item = fakeGen.getAcademy(1)[0];
  item.id = req.params.id;
  item["podcastItems"] = fakeGen.getPodcastItem(7);
  res.status(200).json(item);
});

router.get("/courses", (req, res, nex) => {
  res.status(200).json(fakeGen.getCourses(10));
});

router.get("/courses/:id", (req, res, nex) => {
  let item = fakeGen.getCourses(1)[0];
  item.id = req.params.id;
  item["descriptions"] = fakeGen.getCourseDescriptions(10);
  item["attachments"] = fakeGen.getCourseAttachment(2);
  item["sessions"] = fakeGen.getCourseSessions(10);
  res.status(200).json(item);
});

module.exports = router;
