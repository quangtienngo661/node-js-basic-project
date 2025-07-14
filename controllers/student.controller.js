const mongoose = require("mongoose");
const Student = require("../models/Students");

const getStudents = async (req, res) => {
    try {
        const student = await Student.find();
        console.log(student)
        return res.json(student);
    } catch (error) {
        return res.status(500).json({
            msg: "Error getting students",
            error: error.message
        })
    }
}

const getStudentsWithGpa = async (req, res) => {
    try {
        const { gpa_min, gpa_max } = req.query;
        const studentsWithGpa = await Student.find({
            gpa: {
                $gte: Number(gpa_min) || 0,
                $lte: Number(gpa_max) || 4
            }
        })
        console.log(studentsWithGpa)
        return res.json(studentsWithGpa)

    } catch (error) {
        return res.status(500).json({
            msg: "Error getting students",
            error: error.message
        })
    }
}

const getOneStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ msg: "Student not found! " });
        }
        return res.status(200).json(student)
    }
    catch (error) {
        return res.status(500).json({
            msg: "Error getting student",
            error: error.message
        })
    }
    // return res.end(`Student with id ${Number(req.params.id)}`)
}

const createStudent = async (req, res) => {
    try {
        const studentData = { ...req.body }
        // console.log(student)
        const createdStudent = await Student.create(studentData);
        // return res.end(`Student with id ${Number(req.params.id)}`)

        // const student = new Student({ ...req.body })
        // student.save();

        return res.status(201).json({ msg: "Student's created successfully!", student: createdStudent })
    } catch (error) {
         return res.status(500).json({
            msg: "Error creating student",
            error: error.message
        })
    }

}

const updateOneStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const newStudentInfo = { ...req.body };

        // const updatedStudent = await Student.updateOne(
        //     { _id: id },
        //     {
        //         $set: { ...newStudentInfo }
        //     })

        // return res.json(updatedStudent);

        // Recommended approach: 
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { $set: { ...newStudentInfo } },
            {
                new: true,              // Return updated document
                runValidators: true,    // Run schema validation
                upsert: false,          // Don't create if not found
            }
        )

        if (!updatedStudent) {
            return res.status(404).json({ msg: "Student not found!" })
        }

        return res.status(200).json(updatedStudent);
    } catch (error) {
        return res.status(500).json({
            msg: "Error updating student",
            error: error.message
        })
    }

}

const deleteOneStudent = async (req, res) => {
    try {
        const { id } = req.params;
        // const student = await Student.findById(id);
        // console.log(student)
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({msg: "Student not found"})
        }

        return res.status(200).json({
            msg: "Student deleted successfully",
            student: deletedStudent
        });

        // return res.end(`This student with the id ${Number(req.params.id)} will be removed`)
    } catch (error) {
        return res.status(500).json({
            msg: "Error deleting student",
            error: error.message
        })
    }
}

module.exports = { getStudents, createStudent, getOneStudentById, updateOneStudent, deleteOneStudent, getStudentsWithGpa }