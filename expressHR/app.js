const express = require("express");
const { uid } = require("uid")
const app = express();

app.use(express.json());

const Employees = [
    { "Name": "Ahmed Maher", "Position": "Database Developer", "id": 1, "EmployeeId": uid(), "Salary": 10000 },
    { "Name": "Khalid Rustom", "Position": "Mobile Developer", "id": 2, "EmployeeId": uid(), "Salary": 20000 },
];

app.get("/", (req, res) => {
    res.status(200).json({ "message": "Welcome to the home page!" })
});

app.get("/Employees", (req, res) => {
    res.status(200).json(Employees)
});

app.get("/Employees/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)

    const item = Employees.find((emplyee) => emplyee.id == +id)

    if (item) {
        res.status(200).json(item)
    } else {
        res.status(404).json({ "message": "User Not Found!" })
    }

});

app.get("/Employees/EmployeeId/:id", (req, res) => {
    const { id } = req.params;
    console.log(typeof id)

    const item = Employees.find((emplyee) => emplyee.EmployeeId == id)

    if (item) {
        res.status(200).json(item)
    } else {
        res.status(404).json({ "message": "User Not Found!" })
    }

});

app.post("/Employees", (req, res) => {
    const newData = req.body
    newData.id = Employees.length + 1
    newData.EmployeeId = uid()
    Employees.push(newData)

    res.status(201).json({ "message": "Data added successfully!", data: newData });

});


app.delete("/Employees/:id", (req, res) => {
    const { id } = req.params

    const deletedIndex = Employees.findIndex((emplyee) => emplyee.id == +id)
    console.log(deletedIndex)

    if (deletedIndex != -1) {
        const deltedItem = Employees.splice(deletedIndex, 1)
        res.status(200).json({ "message": "User was deleted successfully!", item: deltedItem })
    } else {
        res.status(404).json({ "message": "User Not Found!" })
    }
});

app.listen(5000, () => {
    console.log("Server is listingin on 5000")
});