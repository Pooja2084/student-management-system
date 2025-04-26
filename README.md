// # Student-management-System
// project 2. Student management System
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management System</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 80%;
            margin: 50px auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        h2 {
            text-align: center;
            color: #333;
            font-size: 2rem;
            margin-bottom: 30px;
        }

        .form-group {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 20px;
        }

        .form-group input {
            padding: 12px;
            font-size: 1rem;
            border-radius: 6px;
            border: 1px solid #ddd;
            width: 48%;
            box-sizing: border-box;
        }

        .form-group button {
            padding: 12px 20px;
            font-size: 1rem;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
            box-sizing: border-box;
        }

        .form-group button:hover {
            background-color: #45a049;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            text-align: center;
        }

        th, td {
            padding: 15px;
            border: 1px solid #ddd;
            font-size: 1rem;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        td button {
            padding: 8px 12px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            margin: 5px;
        }

        td button.edit {
            background-color: #2196F3;
            color: white;
        }

        td button.edit:hover {
            background-color: #1976D2;
        }

        td button.delete {
            background-color: #f44336;
            color: white;
        }

        td button.delete:hover {
            background-color: #d32f2f;
        }

        .error-message {
            color: red;
            font-size: 0.9rem;
            text-align: center;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .form-group input {
                width: 100%;
            }

            .form-group button {
                width: 100%;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Student Management System</h2>

        <!-- Error Message Display -->
        <div id="error-message" class="error-message"></div>

        <!-- Student Form -->
        <div class="form-group">
            <input type="text" id="name" placeholder="Enter Student Name">
            <input type="number" id="age" placeholder="Enter Age">
            <input type="text" id="enrollment" placeholder="Enter Enrollment Number">
            <input type="number" id="attendance" placeholder="Enter Attendance (%)">
            <input type="number" id="grades" placeholder="Enter Grade (0-100)">
            <button onclick="addStudent()">Add Student</button>
        </div>

        <!-- Student List Table -->
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Enrollment Number</th>
                    <th>Attendance (%)</th>
                    <th>Grades</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="student-list"></tbody>
        </table>
    </div>

    <script>
        // Store students in a mock database (could be replaced with a backend API)
        let students = [];

        // Fetch students from mock data and render them on the table
        function renderStudents() {
            const studentList = document.getElementById('student-list');
            studentList.innerHTML = '';

            students.forEach(student => {
                studentList.innerHTML += `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.enrollment}</td>
                        <td>${student.attendance}</td>
                        <td>${student.grades}</td>
                        <td>
                            <button class="edit" onclick="editStudent('${student.id}')">Edit</button>
                            <button class="delete" onclick="deleteStudent('${student.id}')">Delete</button>
                        </td>
                    </tr>
                `;
            });
        }

        // Add new student
        function addStudent() {
            const name = document.getElementById('name').value.trim();
            const age = document.getElementById('age').value.trim();
            const enrollment = document.getElementById('enrollment').value.trim();
            const attendance = document.getElementById('attendance').value.trim();
            const grades = document.getElementById('grades').value.trim();

            // Validate inputs
            if (!name || !age || !enrollment || !attendance || !grades) {
                displayError('All fields are required.');
                return;
            }

            if (isNaN(age) || age <= 0) {
                displayError('Age must be a positive number.');
                return;
            }

            if (isNaN(attendance) || attendance < 0 || attendance > 100) {
                displayError('Attendance must be a percentage (0-100).');
                return;
            }

            if (isNaN(grades) || grades < 0 || grades > 100) {
                displayError('Grades must be between 0 and 100.');
                return;
            }

            // Create new student object and push to array
            const newStudent = {
                id: Date.now().toString(),
                name,
                age,
                enrollment,
                attendance,
                grades
            };

            students.push(newStudent);

            // Clear inputs and update the table
            document.getElementById('name').value = '';
            document.getElementById('age').value = '';
            document.getElementById('enrollment').value = '';
            document.getElementById('attendance').value = '';
            document.getElementById('grades').value = '';

            renderStudents();
        }

        // Edit student
        function editStudent(id) {
            const student = students.find(student => student.id === id);
            if (!student) return;

            const newName = prompt('Enter new name:', student.name);
            const newAge = prompt('Enter new age:', student.age);
            const newEnrollment = prompt('Enter new enrollment number:', student.enrollment);
            const newAttendance = prompt('Enter new attendance (%):', student.attendance);
            const newGrades = prompt('Enter new grades (0-100):', student.grades);

            // Update the student data
            student.name = newName;
            student.age = newAge;
            student.enrollment = newEnrollment;
            student.attendance = newAttendance;
            student.grades = newGrades;

            renderStudents();
        }

        // Delete student
        function deleteStudent(id) {
            students = students.filter(student => student.id !== id);
            renderStudents();
        }

        // Display error message
        function displayError(message) {
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerHTML = message;

            setTimeout(() => {
                errorMessage.innerHTML = '';
            }, 3000);
        }

        // Initial render
        renderStudents();
    </script>
</body>

</html>
