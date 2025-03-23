"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controller/doctorController");
const router = express_1.default.Router();
router.get('/getslot', doctorController_1.getSlot);
router.post('/addslot', doctorController_1.addSlot);
exports.default = router;
