module.exports = app => {
  const inquiries = require("../controllers/inquiryController.js");
  const auth = require("../middleware/auth.js")
  var router = require("express").Router();

  // Create a new inquiry
  router.post("/", auth.verifyToken, inquiries.createInquiry);

  // Retrieve a inquiry
  // router.get("/:id", inquiries.findInquiry);

  // Update a inquiry with id
  // router.put("/:id", inquiries.updateInquiry);

  app.use('/api/inquiries', router);
};