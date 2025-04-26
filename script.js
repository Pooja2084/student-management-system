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
