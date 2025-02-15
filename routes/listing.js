const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIN , isOwner, validateListing} = require("../middleware.js")

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

// INDEX ROUTE //CREATE ROUTE 
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIN,validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing));


// NEW ROUTE 
router.get("/new",isLoggedIN,listingController.renderNewForm);

// SHOW ROUTE //UPDATE ROUTE //DELETE ROUTE
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIN, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIN,isOwner, wrapAsync(listingController.destroyListing));

// EDIT ROUTE 
router.get("/:id/edit", isLoggedIN,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;