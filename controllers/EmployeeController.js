const Employee = require('../models/Employee')

const index = (req,res,next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured!'
        })
    })
}

const show = (req,res,next) => {
    let employeeID = req.body.employeeID
    Employee.findByid(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'An error Occurred'
        })
    })
}

const store = (req, res, next) => {
    let employee = new Employee({
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age       
    })
    if(req.file){
        employee.photo = req.file.path
    }
    employee.save()
    .then(response => {
        res.json({
            message: "Employee Added Successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "An error Occurred "
        })
    })
}

const update = (req,res,next) => {
    let employeeID = req.body.employeeID
    
    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age    
    }
    Employee.findByIdAndUpdate(employeeID, {$set:updatedData})
    .then(() => {
        res.json({
            message: 'Employee updated successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!!!!!'
        })
    })
}

const destroy = (req,res,next) => {
    let employeeID = req.body.employeeID
    Employee.findIdAndRemove(employeeID)
    .then(() => {
        res.json({
            message: "Employee Deleted Successfully"    
        })
    })
    .catch(error => {
        res.json({
            message: "An error Occurred "
        })
    })
}

module.exports = { 
    index, show, store, update, destroy
}