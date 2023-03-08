const userDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleEmployeesInfo = async (req, res) => {
  try {
    res.status(200).json(userDB.users);
  } catch (err) {
    console.log("Error in Employees Controller");
  }
};

module.exports = handleEmployeesInfo;

// const data = {
//   employees: require("../model/employees.json"),
//   setEmployees: function (data) {
//     this.employees = data;
//   },
// };

// const getAllEmployees = (req, res) => {
//   res.json(data.employees);
// };

// const createNewEmployee = (req, res) => {
//   const newEmployee = {
//     id: data.employees?.length
//       ? data.employees[data.employees.length - 1].id + 1
//       : 1,
//     fName: req.body.fName,
//     lName: req.body.lName,
//   };

//   if (!newEmployee.fName || !newEmployee.lName) {
//     return res
//       .status(400)
//       .json({ message: "First and last names are required." });
//   }

//   data.setEmployees([...data.employees, newEmployee]);
//   res.status(201).json(data.employees);

//   /* basic form
//   res.json({
//     fName: req.body.fName,
//     lName: req.body.lName,
//   })
//   */
// };

// const updateEmployee = (req, res) => {
//   const employee = data.employees.find(
//     (emp) => emp.id === parseInt(req.body.id)
//   );

//   if (!employee) {
//     return res
//       .status(400)
//       .json({ message: `Employee ID ${req.body.id} not found` });
//   }

//   if (req.body.fName) employee.fName = req.body.fName;
//   if (req.body.lName) employee.lName = req.body.lName;

//   const filteredArray = data.employees.filter(
//     (emp) => emp.id !== parseInt(req.body.id)
//   );

//   const unsortedArray = [...filteredArray, employee];

//   data.setEmployees(
//     unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
//   );

//   res.json(data.employees);

//   /* basic form
//   res.json({
//     fName: req.body.fName,
//     lName: req.body.lName,
//   });
//   */
// };

// const deleteEmployee = (req, res) => {
//   const employee = data.employees.find(
//     (emp) => emp.id === parseInt(req.body.id)
//   );

//   if (!employee)
//     return res
//       .status(400)
//       .json({ message: `Employee ID ${req.body.id} not found` });

//   const filteredArray = data.employees.filter(
//     (emp) => emp.id !== parseInt(req.body.id)
//   );

//   data.setEmployees([...filteredArray]);

//   res.json(data.employees);

//   /* basic form
//   res.json({
//     id: req.body.id,
//   });
//   */
// };

// const getEmployee = (req, res) => {
//   const employee = data.employees.find(
//     (emp) => emp.id === parseInt(req.params.id)
//   );

//   if (!employee)
//     return res
//       .status(400)
//       .json({ message: `Employee ID ${req.params.id} not found` });

//   res.json(employee);

//   /* basic form
//   res.json({
//     id: req.body.id,
//   });
//   */
// };

// module.exports = {
//   getAllEmployees,
//   createNewEmployee,
//   updateEmployee,
//   deleteEmployee,
//   getEmployee,
// };
