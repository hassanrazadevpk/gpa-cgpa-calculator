// Function to add a semester row in the University GPA, CGPA & Percentage Calculator
function addSemester() {
    const semesterRows = document.getElementById('semesterRows');
    const rowCount = semesterRows.children.length + 1;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${rowCount}th Semester</td>
        <td><input type="number" id="credit${rowCount}" class="credit"></td>
        <td><input type="number" id="points${rowCount}" class="qualityPoints"></td>
        <td><input type="number" id="totalMarks${rowCount}" class="totalMarks"></td>
        <td><input type="number" id="obtainedMarks${rowCount}" class="obtainedMarks"></td>
        <td id="gpa${rowCount}"></td>
        <td id="cgpa${rowCount}"></td> <!-- CGPA for each semester -->
        <td id="percentage${rowCount}"></td>
    `;
    semesterRows.appendChild(newRow);
}

// Function to delete the last semester row
function deleteSemester() {
    const semesterRows = document.getElementById('semesterRows');
    if (semesterRows.children.length > 0) {
        semesterRows.removeChild(semesterRows.lastChild);
    }
}

// Function to add a subject row in the Semester GPA & Percentage Calculator
function addSubject() {
    const subjectRows = document.getElementById('subjectRows');
    const rowCount = subjectRows.children.length + 1;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>Subject ${rowCount}</td>
        <td><input type="number" id="subjectCredit${rowCount}" class="credit"></td>
        <td><input type="number" id="subjectGradePoints${rowCount}" class="gradePoints"></td>
        <td><input type="number" id="subjectTotalMarks${rowCount}" class="subjectTotalMarks"></td>
        <td><input type="number" id="subjectObtainedMarks${rowCount}" class="subjectObtainedMarks"></td>
        <td id="subjectGpa${rowCount}"></td>
        <td id="subjectPercentage${rowCount}"></td>
    `;
    subjectRows.appendChild(newRow);
}

// Function to delete the last subject row
function deleteSubject() {
    const subjectRows = document.getElementById('subjectRows');
    if (subjectRows.children.length > 0) {
        subjectRows.removeChild(subjectRows.lastChild);
    }
}

// Function to calculate the results for both University and Semester
function calculateResults(type) {
    let totalCredits = 0;
    let totalQualityPoints = 0;
    let totalMarks = 0;
    let obtainedMarks = 0;

    if (type === 'university') {
        const semesterRows = document.getElementById('semesterRows').children;
        let totalGpa = 0;
        let totalPercentage = 0;
        let previousCgpa = 0;  // Store CGPA of previous semesters

        for (let row of semesterRows) {
            const creditHours = parseFloat(row.cells[1].querySelector('input').value);
            const qualityPoints = parseFloat(row.cells[2].querySelector('input').value);
            const total = parseFloat(row.cells[3].querySelector('input').value);
            const obtained = parseFloat(row.cells[4].querySelector('input').value);

            totalCredits += creditHours;
            totalQualityPoints += qualityPoints;
            totalMarks += total;
            obtainedMarks += obtained;

            // GPA = Quality Points / Credit Hours
            const gpa = (qualityPoints / creditHours).toFixed(2);

            // Percentage = (Obtained Marks / Total Marks) * 100
            const percentage = ((obtained / total) * 100).toFixed(2);

            // CGPA calculation: (Total Quality Points / Total Credit Hours)
            const cgpa = (totalQualityPoints / totalCredits).toFixed(2);

            row.cells[5].innerText = gpa;
            row.cells[6].innerText = cgpa;  // Display CGPA for each semester
            row.cells[7].innerText = percentage;

            totalGpa += parseFloat(gpa);
            totalPercentage += parseFloat(percentage);
        }

        // Calculate overall GPA: Total Quality Points / Total Credit Hours
        const overallGpa = (totalQualityPoints / totalCredits).toFixed(2);
        // Calculate CGPA: Total Quality Points / Total Credit Hours
        const cgpa = (totalQualityPoints / totalCredits).toFixed(2);
        const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);

        document.getElementById('gpaResult').innerText = `GPA: ${(totalGpa / semesterRows.length).toFixed(2)}`;
        document.getElementById('cgpaResult').innerText = `CGPA: ${cgpa}`;
        document.getElementById('percentageResult').innerText = `Percentage: ${percentage}%`;

    } else if (type === 'semester') {
        const subjectRows = document.getElementById('subjectRows').children;
        let subjectTotalMarks = 0;
        let subjectObtainedMarks = 0;
        let totalSubjectGpa = 0;
        let totalSubjectPercentage = 0;

        for (let row of subjectRows) {
            const creditHours = parseFloat(row.cells[1].querySelector('input').value);
            const gradePoints = parseFloat(row.cells[2].querySelector('input').value);
            const total = parseFloat(row.cells[3].querySelector('input').value);
            const obtained = parseFloat(row.cells[4].querySelector('input').value);

            subjectTotalMarks += total;
            subjectObtainedMarks += obtained;

            // GPA = Grade Points / Credit Hours
            const gpa = (gradePoints / creditHours).toFixed(2);

            // Percentage = (Obtained Marks / Total Marks) * 100
            const percentage = ((obtained / total) * 100).toFixed(2);

            row.cells[5].innerText = gpa;
            row.cells[6].innerText = percentage;

            totalSubjectGpa += parseFloat(gpa);
            totalSubjectPercentage += parseFloat(percentage);
        }

        const gpa = (totalSubjectGpa / subjectRows.length).toFixed(2);
        const percentage = ((subjectObtainedMarks / subjectTotalMarks) * 100).toFixed(2);

        document.getElementById('semesterGpaResult').innerText = `GPA: ${gpa}`;
        document.getElementById('semesterPercentageResult').innerText = `Percentage: ${percentage}%`;
    }
}
