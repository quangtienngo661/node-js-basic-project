const express = require("express");
const router = express.Router();
const { 
    getStudents, 
    createStudent, 
    getOneStudentById, 
    updateOneStudent, 
    deleteOneStudent, 
    getStudentsWithGpa 
} = require("../controllers/student.controller")

router.get('/', getStudents);
router.get('/query', getStudentsWithGpa);
router.get('/:id', getOneStudentById);
router.post('/', createStudent)
router.put('/:id', updateOneStudent)
router.delete('/:id', deleteOneStudent)

module.exports = router;