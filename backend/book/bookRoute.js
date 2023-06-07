const {Router} = require('express')
const controller = require('./bookControler')
const router = Router()

router.get("/", controller.getBook)
router.post("/", controller.addBook)
router.get("/:id", controller.getbookbyID)
router.delete("/:id", controller.deleteBook)
router.put("/:id", controller.updateBook)

module.exports = router
