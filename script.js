// Global variables
let students = [];
let teacherSignature = null;
const activities = [
    'Can read letters of alphabets',
    'Can read numbers (1-30)',
    'Can recite rhymes and recall stories',
    'Can identify names, sex, age and common objects',
    'Asks questions and describes activities',
    'Mingles with others and shows co-operation',
    'Enjoys music (singing and dancing)',
    'Remains cheerful and wears clean clothes',
    'Washes hands regularly'
];

const remarksOptions = {
    interest: [
        "Reading story books",
        "Playing football",
        "Watching animations/cartoons",
        "Singing",
        "Dancing",
        "Drawing and coloring",
        "Building with blocks",
        "Playing with puzzles",
        "Outdoor activities",
        "Pretend play/role-playing",
        "Learning new words",
        "Listening to music",
        "Playing with toys",
        "Interacting with technology (educational apps)",
        "Nature exploration",
        "Arts and crafts",
        "Storytelling",
        "Physical activities (running, jumping)",
        "Playing with friends",
        "Helping with simple tasks"
    ],
    attitude: [
        "Positive and cheerful",
        "Respectful towards others",
        "Cooperative and helpful",
        "Responsible and reliable",
        "Confident and self-assured",
        "Patient and understanding",
        "Honest and trustworthy",
        "Adaptable to new situations",
        "Often displays negative attitude",
        "Easily frustrated"
    ],
    conduct: [
        "Well-behaved and disciplined",
        "Follows classroom rules consistently",
        "Kind and considerate to others",
        "Demonstrates good manners",
        "Resolves conflicts peacefully",
        "Shows leadership qualities",
        "Respects school property",
        "Sets a good example for peers",
        "Disruptive in class",
        "Frequently breaks rules"
    ],
    teacherRemarks: [
        "Excellent progress, keep it up!",
        "Shows great potential",
        "A pleasure to teach",
        "Consistently puts in good effort",
        "Developing well academically and socially",
        "Demonstrates strong skills in most areas",
        "Has shown significant improvement",
        "A positive influence in the classroom",
        "Needs to focus more in class",
        "Could benefit from more practice at home"
    ]
};

// DOM Elements
const studentTable = document.getElementById('studentTable');
const totalAttendanceInput = document.getElementById('totalAttendance');
const noOnRollInput = document.getElementById('noOnRoll');
const startingAdmissionNoInput = document.getElementById('startingAdmissionNo');
const crecheClassSelect = document.getElementById('crecheClass');
const academicYearSelect = document.getElementById('academicYear');

// Modals
const modal = document.getElementById('activityModal');
const remarksModal = document.getElementById('remarksModal');
const photoUploadModal = document.getElementById('photoUploadModal');
const pupilsBillModal = document.getElementById('pupilsBillModal');
const teacherSignatureModal = document.getElementById('teacherSignatureModal');
const promoteStudentsModal = document.getElementById('promoteStudentsModal');

// Buttons
const markActivityBtn = document.getElementById('markActivity');
const giveRemarksBtn = document.getElementById('giveRemarks');
const uploadPhotosBtn = document.getElementById('uploadPhotos');
const promoteStudentsBtn = document.getElementById('promoteStudents');
const pupilsBillBtn = document.getElementById('pupilsBill');
const uploadTeacherSignatureBtn = document.getElementById('uploadTeacherSignature');
const downloadReportsBtn = document.getElementById('downloadReports');
const closeBtns = document.getElementsByClassName('close');
const studentSelect = document.getElementById('studentSelect');
const remarksStudentSelect = document.getElementById('remarksStudentSelect');
const activityTable = document.getElementById('activityTable');
const photoUploadList = document.getElementById('photoUploadList');
const pupilsBillTable = document.getElementById('pupilsBillTable');
const populateAllBillsBtn = document.getElementById('populateAllBills');
const signatureCanvas = document.getElementById('signatureCanvas');
const clearSignatureBtn = document.getElementById('clearSignature');
const signatureUpload = document.getElementById('signatureUpload');
const uploadSignatureBtn = document.getElementById('uploadSignatureBtn');
const selectAllStudentsBtn = document.getElementById('selectAllStudents');
const promoteAllSelect = document.getElementById('promoteAllSelect');
const populateAllPromotionsBtn = document.getElementById('populateAllPromotions');
const studentPromotionList = document.getElementById('studentPromotionList');

// Initialize academic year dropdown
function initAcademicYearDropdown() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = `${year}/${year+1}`;
        option.textContent = `${year}/${year+1}`;
        academicYearSelect.appendChild(option);
    }
}

// Calculate rating based on activities
function calculateRating(activities) {
    const activityCount = Object.keys(activities).length;
    const alwaysCount = Object.values(activities).filter(v => v === 'Always').length;

    if (alwaysCount === activityCount) {
        return 'Incredible Potential';
    } else if (alwaysCount >= Math.floor(activityCount * 0.9)) {
        return 'Great';
    } else if (alwaysCount >= Math.floor(activityCount * 0.8)) {
        return 'Best';
    } else if (alwaysCount >= Math.floor(activityCount * 0.7)) {
        return 'Better';
    } else {
        return 'Good';
    }
}

// Populate student table based on inputs
function populateTable() {
    const noOnRoll = parseInt(noOnRollInput.value);
    const startingAdmissionNo = parseInt(startingAdmissionNoInput.value);
    const crecheClass = crecheClassSelect.value;
    const classLetter = crecheClass.slice(-1);
    
    students = [];
    for (let i = 0; i < noOnRoll; i++) {
        const paddedNumber = (startingAdmissionNo + i).toString().padStart(3, '0');
        students.push({
            name: '',
            admissionNo: `EDISAMCRH${classLetter}${paddedNumber}`,
            attendance: '',
            promotedTo: 'N1',
            rating: 'Incredible Potential',
            activities: activities.reduce((acc, activity) => {
                acc[activity] = 'Always';
                return acc;
            }, {}),
            remarks: {
                interest: '',
                attitude: '',
                conduct: '',
                teacherRemarks: ''
            },
            photo: null,
            bookBill: '0.00',
            canteen: '0.00',
            miscellaneous: '0.00'
        });
    }
    updateTable();
}

// Update student admission numbers when class changes
crecheClassSelect.addEventListener('change', function() {
    const classLetter = this.value.slice(-1);
    students.forEach((student, index) => {
        const paddedNumber = (parseInt(startingAdmissionNoInput.value) + index).toString().padStart(3, '0');
        student.admissionNo = `EDISAMCRH${classLetter}${paddedNumber}`;
    });
    updateTable();
});

// Update the student table display
function updateTable() {
    const tbody = studentTable.querySelector('tbody');
    tbody.innerHTML = '';
    students.forEach((student, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><input type="text" value="${student.admissionNo}" class="input" style="width: 120px;" readonly></td>
            <td><input type="text" value="${student.name}" onchange="updateStudent(${index}, 'name', this.value)" class="input" style="width: 250px;"></td>
            <td><input type="number" value="${student.attendance}" onchange="updateStudent(${index}, 'attendance', this.value)" class="input" style="width: 80px;"></td>
            <td>
                <select onchange="updateStudent(${index}, 'promotedTo', this.value)" class="select">
                    <option value="N1" ${student.promotedTo === 'N1' ? 'selected' : ''}>N1</option>
                    <option value="N2" ${student.promotedTo === 'N2' ? 'selected' : ''}>N2</option>
                    <option value="KG1" ${student.promotedTo === 'KG1' ? 'selected' : ''}>KG1</option>
                    <option value="KG2" ${student.promotedTo === 'KG2' ? 'selected' : ''}>KG2</option>
                    <option value="---" ${student.promotedTo === '---' ? 'selected' : ''}>---</option>
                </select>
            </td>
            <td>
                <select onchange="updateStudentRating(${index}, this.value)" class="select" style="width: 150px;">
                    <option value="Incredible Potential" ${student.rating === 'Incredible Potential' ? 'selected' : ''}>Incredible Potential</option>
                    <option value="Great" ${student.rating === 'Great' ? 'selected' : ''}>Great</option>
                    <option value="Best" ${student.rating === 'Best' ? 'selected' : ''}>Best</option>
                    <option value="Better" ${student.rating === 'Better' ? 'selected' : ''}>Better</option>
                    <option value="Good" ${student.rating === 'Good' ? 'selected' : ''}>Good</option>
                </select>
            </td>
            <td class="total-bill">${calculateTotalBill(student)}</td>
        `;
    });
}

// Update student data
function updateStudent(index, field, value) {
    students[index][field] = value;
}

// Update student rating and adjust activities accordingly
function updateStudentRating(index, rating) {
    students[index].rating = rating;
    updateActivityTableForRating(index);
}

// Update activity table based on rating
function updateActivityTableForRating(index) {
    const student = students[index];
    const rating = student.rating;
    const activityCount = Object.keys(student.activities).length;

    let alwaysCount;
    switch (rating) {
        case 'Incredible Potential':
            alwaysCount = activityCount;
            break;
        case 'Great':
            alwaysCount = Math.floor(activityCount * 0.9);
            break;
        case 'Best':
            alwaysCount = Math.floor(activityCount * 0.8);
            break;
        case 'Better':
            alwaysCount = Math.floor(activityCount * 0.7);
            break;
        default:
            alwaysCount = Math.floor(activityCount * 0.6);
    }

    Object.keys(student.activities).forEach((activity, i) => {
        student.activities[activity] = i < alwaysCount ? 'Always' : 'Sometimes';
    });

    if (document.getElementById('activityTable')) {
        populateActivityTable();
    }
}

// Calculate total bill
function calculateTotalBill(student) {
    return ((parseFloat(student.bookBill) || 0) + 
            (parseFloat(student.canteen) || 0) + 
            (parseFloat(student.miscellaneous) || 0)).toFixed(2);
}

// Update student photo display
function updateStudentPhoto(elementId, photoData) {
    const photoElement = document.getElementById(elementId);
    if (photoData) {
        photoElement.src = photoData;
        photoElement.style.display = 'block';
    } else {
        photoElement.style.display = 'none';
    }
}

// Validate form before generating reports
function validateForm() {
    if (!startingAdmissionNoInput.value) {
        alert('Please enter a starting admission number.');
        return false;
    }
    if (!noOnRollInput.value) {
        alert('Please enter the number of students on roll.');
        return false;
    }
    if (!totalAttendanceInput.value) {
        alert('Please enter the total attendance.');
        return false;
    }
    if (!document.getElementById('nextTermBegins').value) {
        alert('Please enter the next term beginning date.');
        return false;
    }
    if (!document.getElementById('vacationDate').value) {
        alert('Please enter the vacation date.');
        return false;
    }
    if (students.length === 0 || students.every(student => student.name === '')) {
        alert('Please fill in student names.');
        return false;
    }
    return true;
}

// Event listeners for buttons
markActivityBtn.onclick = function() {
    if (students.length === 0 || students.every(student => student.name === '')) {
        alert('Please fill in student names first before marking activities.');
        return;
    }
    populateStudentSelect();
    modal.style.display = 'block';
}

giveRemarksBtn.onclick = function() {
    if (students.length === 0 || students.every(student => student.name === '')) {
        alert('Please fill in student names first before giving remarks.');
        return;
    }
    populateRemarksStudentSelect();
    populateRemarksOptions();
    remarksModal.style.display = 'block';
}

uploadPhotosBtn.onclick = function() {
    if (students.length === 0 || students.every(student => student.name === '')) {
        alert('Please fill in student names first before uploading photos.');
        return;
    }
    populatePhotoUploadList();
    photoUploadModal.style.display = 'block';
}

promoteStudentsBtn.onclick = function() {
    if (students.length === 0 || students.every(student => student.name === '')) {
        alert('Please fill in student names first before promoting students.');
        return;
    }
    populateStudentPromotionList();
    promoteStudentsModal.style.display = 'block';
}

pupilsBillBtn.onclick = function() {
    if (students.length === 0 || students.every(student => student.name === '')) {
        alert('Please fill in student names first before accessing Pupils Bill.');
        return;
    }
    populatePupilsBillTable();
    pupilsBillModal.style.display = 'block';
}

uploadTeacherSignatureBtn.onclick = function() {
    teacherSignatureModal.style.display = 'block';
    initializeSignatureCanvas();
}

downloadReportsBtn.onclick = function() {
    if (validateForm()) {
        generateAllReports();
    }
}

// Close modal buttons
Array.from(closeBtns).forEach(btn => {
    btn.onclick = function() {
        modal.style.display = 'none';
        remarksModal.style.display = 'none';
        photoUploadModal.style.display = 'none';
        pupilsBillModal.style.display = 'none';
        teacherSignatureModal.style.display = 'none';
        promoteStudentsModal.style.display = 'none';
    }
});

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == modal) modal.style.display = 'none';
    if (event.target == remarksModal) remarksModal.style.display = 'none';
    if (event.target == photoUploadModal) photoUploadModal.style.display = 'none';
    if (event.target == pupilsBillModal) pupilsBillModal.style.display = 'none';
    if (event.target == teacherSignatureModal) teacherSignatureModal.style.display = 'none';
    if (event.target == promoteStudentsModal) promoteStudentsModal.style.display = 'none';
}

// Populate student select dropdown for activity modal
function populateStudentSelect() {
    studentSelect.innerHTML = '';
    students.forEach((student, index) => {
        if (student.name) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = student.name;
            studentSelect.appendChild(option);
        }
    });
    studentSelect.onchange = function() {
        const selectedStudent = students[this.value];
        document.getElementById('activityStudentName').textContent = `Student: ${selectedStudent.name}`;
        updateStudentPhoto('activityStudentPhoto', selectedStudent.photo);
        populateActivityTable();
    };
    studentSelect.onchange();
}

// Populate activity table for selected student
function populateActivityTable() {
    const studentIndex = studentSelect.value;
    const student = students[studentIndex];
    const tbody = activityTable.querySelector('tbody');
    tbody.innerHTML = '';

    activities.forEach(activity => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${activity}</td>
            <td><input type="radio" name="${activity}" value="Always" ${student.activities[activity] === 'Always' ? 'checked' : ''}></td>
            <td><input type="radio" name="${activity}" value="Sometimes" ${student.activities[activity] === 'Sometimes' ? 'checked' : ''}></td>
            <td><input type="radio" name="${activity}" value="Never" ${student.activities[activity] === 'Never' ? 'checked' : ''}></td>
        `;
    });

    activityTable.onchange = function(e) {
        if (e.target.type === 'radio') {
            const activity = e.target.name;
            const value = e.target.value;
            student.activities[activity] = value;
            
            student.rating = calculateRating(student.activities);
            document.getElementById('currentRating').textContent = `Current Rating: ${student.rating}`;
            
            updateTable();
        }
    };

    document.getElementById('currentRating').textContent = `Current Rating: ${student.rating}`;
}

// Populate student select dropdown for remarks modal
function populateRemarksStudentSelect() {
    remarksStudentSelect.innerHTML = '';
    students.forEach((student, index) => {
        if (student.name) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = student.name;
            remarksStudentSelect.appendChild(option);
        }
    });
    remarksStudentSelect.onchange = function() {
        const selectedStudent = students[this.value];
        document.getElementById('remarksStudentName').textContent = `Student: ${selectedStudent.name}`;
        updateStudentPhoto('remarksStudentPhoto', selectedStudent.photo);
        updateRemarksSelections();
    };
    remarksStudentSelect.onchange();
}

// Populate remarks options
function populateRemarksOptions() {
    for (const key of Object.keys(remarksOptions)) {
        const select = document.getElementById(key);
        select.innerHTML = '';
        remarksOptions[key].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        select.onchange = function() {
            const studentIndex = remarksStudentSelect.value;
            students[studentIndex].remarks[key] = this.value;
        };
    }
    
    const ratingSelect = document.getElementById('ratingSelect');
    ratingSelect.innerHTML = '';
    ['Incredible Potential', 'Great', 'Best', 'Better', 'Good'].forEach(rating => {
        const option = document.createElement('option');
        option.value = rating;
        option.textContent = rating;
        ratingSelect.appendChild(option);
    });
    ratingSelect.onchange = function() {
        const studentIndex = remarksStudentSelect.value;
        students[studentIndex].rating = this.value;
        updateTable();
        updateActivityTableForRating(studentIndex);
    };
    
    updateRemarksSelections();
}

// Update remarks selections for selected student
function updateRemarksSelections() {
    const studentIndex = remarksStudentSelect.value;
    const student = students[studentIndex];
    for (const key of Object.keys(remarksOptions)) {
        const select = document.getElementById(key);
        select.value = student.remarks[key] || '';
    }
    document.getElementById('ratingSelect').value = student.rating;
}

// Populate photo upload list
function populatePhotoUploadList() {
    photoUploadList.innerHTML = '';
    students.forEach((student, index) => {
        if (student.name) {
            const container = document.createElement('div');
            container.className = 'photo-upload-container';
            container.innerHTML = `
                <img class="photo-preview" src="${student.photo || 'https://via.placeholder.com/100?text=No+Photo'}" alt="${student.name}">
                <span>${student.name}</span>
                <input type="file" accept="image/*" onchange="handlePhotoUpload(${index}, this)">
                <span class="tick" style="display: ${student.photo ? 'inline' : 'none'}">✓</span>
            `;
            photoUploadList.appendChild(container);
        }
    });
}

// Handle photo upload
function handlePhotoUpload(index, input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            students[index].photo = e.target.result;
            input.previousElementSibling.previousElementSibling.src = students[index].photo;
            input.nextElementSibling.style.display = 'inline';
        }
        reader.readAsDataURL(file);
    }
}

// Populate student promotion list
function populateStudentPromotionList() {
    studentPromotionList.innerHTML = '';
    students.forEach((student, index) => {
        if (student.name) {
            const container = document.createElement('div');
            container.className = 'photo-upload-container';
            container.innerHTML = `
                <input type="checkbox" class="promote-checkbox" data-index="${index}" ${student.promotedTo !== '---' ? 'checked' : ''}>
                <img class="photo-preview" src="${student.photo || 'https://via.placeholder.com/100?text=No+Photo'}" alt="${student.name}">
                <span>${student.name}</span>
                <select class="promote-select" data-index="${index}">
                    <option value="N1" ${student.promotedTo === 'N1' ? 'selected' : ''}>N1</option>
                    <option value="N2" ${student.promotedTo === 'N2' ? 'selected' : ''}>N2</option>
                    <option value="KG1" ${student.promotedTo === 'KG1' ? 'selected' : ''}>KG1</option>
                    <option value="KG2" ${student.promotedTo === 'KG2' ? 'selected' : ''}>KG2</option>
                    <option value="---" ${student.promotedTo === '---' ? 'selected' : ''}>---</option>
                </select>
            `;
            studentPromotionList.appendChild(container);
        }
    });
}

// Event listeners for promotion buttons
selectAllStudentsBtn.onclick = function() {
    const checkboxes = studentPromotionList.querySelectorAll('.promote-checkbox');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
}

populateAllPromotionsBtn.onclick = function() {
    const selectedValue = promoteAllSelect.value;
    const selects = studentPromotionList.querySelectorAll('.promote-select');
    selects.forEach(select => {
        select.value = selectedValue;
        const index = parseInt(select.dataset.index);
        students[index].promotedTo = selectedValue;
    });
    updateTable();
}

// Event listener for promotion list changes
studentPromotionList.addEventListener('change', function(e) {
    if (e.target.classList.contains('promote-select')) {
        const index = parseInt(e.target.dataset.index);
        students[index].promotedTo = e.target.value;
        updateTable();
    }
});

// Populate pupils bill table
function populatePupilsBillTable() {
    const tbody = pupilsBillTable.querySelector('tbody');
    tbody.innerHTML = '';
    students.forEach((student, index) => {
        if (student.name) {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>
                    <img src="${student.photo || 'https://via.placeholder.com/50?text=No+Photo'}" 
                         alt="${student.name}" 
                         style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    ${student.name}
                </td>
                <td><input type="number" class="bill-input" data-type="bookBill" data-index="${index}" step="0.01" value="${student.bookBill || '0.00'}"></td>
                <td><input type="number" class="bill-input" data-type="canteen" data-index="${index}" step="0.01" value="${student.canteen || '0.00'}"></td>
                <td><input type="number" class="bill-input" data-type="miscellaneous" data-index="${index}" step="0.01" value="${student.miscellaneous || '0.00'}"></td>
                <td class="total-bill">${calculateTotalBill(student)}</td>
            `;
        }
    });

    pupilsBillTable.removeEventListener('input', updateBill);
    pupilsBillTable.addEventListener('input', updateBill);
}

// Update bill
function updateBill(event) {
    if (event.target.classList.contains('bill-input')) {
        const index = parseInt(event.target.dataset.index);
        const type = event.target.dataset.type;
        const value = parseFloat(event.target.value) || 0;
        students[index][type] = value.toFixed(2);
        
        const row = event.target.closest('tr');
        row.querySelector('.total-bill').textContent = calculateTotalBill(students[index]);
        
        updateMainTableWithBillTotals();
    }
}

// Update main table with bill totals
function updateMainTableWithBillTotals() {
    const rows = studentTable.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        const totalBillCell = row.querySelector('.total-bill');
        if (totalBillCell) {
            totalBillCell.textContent = calculateTotalBill(students[index]);
        }
    });
}

// Populate all bills
populateAllBillsBtn.onclick = function() {
    const firstRow = pupilsBillTable.querySelector('tbody tr');
    if (firstRow) {
        const firstRowInputs = firstRow.querySelectorAll('.bill-input');
        const values = Array.from(firstRowInputs).map(input => parseFloat(input.value) || 0);
        
        students.forEach((student, index) => {
            if (student.name) {
                student.bookBill = values[0].toFixed(2);
                student.canteen = values[1].toFixed(2);
                student.miscellaneous = values[2].toFixed(2);
            }
        });
        
        populatePupilsBillTable();
        updateMainTableWithBillTotals();
    }
}

// Initialize signature canvas
function initializeSignatureCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
        teacherSignature = canvas.toDataURL('image/png');
    }

    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left;
        const offsetY = touch.clientY - rect.top;

        const mouseEvent = new MouseEvent(
            e.type === 'touchstart' ? 'mousedown' : 'mousemove',
            {
                clientX: touch.clientX,
                clientY: touch.clientY
            }
        );

        if (e.type === 'touchstart') {
            startDrawing({ offsetX, offsetY });
        } else {
            draw({ offsetX, offsetY });
        }
    }

    clearSignatureBtn.onclick = function() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        teacherSignature = null;
    }

    uploadSignatureBtn.onclick = function() {
        const file = signatureUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    const aspectRatio = img.width / img.height;
                    let drawWidth = canvas.width;
                    let drawHeight = canvas.width / aspectRatio;
                    
                    if (drawHeight > canvas.height) {
                        drawHeight = canvas.height;
                        drawWidth = canvas.height * aspectRatio;
                    }
                    
                    const x = (canvas.width - drawWidth) / 2;
                    const y = (canvas.height - drawHeight) / 2;
                    
                    ctx.drawImage(img, x, y, drawWidth, drawHeight);
                    teacherSignature = canvas.toDataURL('image/png');
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }
}

// Generate PDF reports
function generateAllReports() {
    const { jsPDF } = window.jspdf;
    
    students.forEach(student => {
        if (student.name) {
            generateStudentReport(student, jsPDF);
        }
    });
    
    alert('All reports have been generated and downloaded.');
}

// Generate individual student report
function generateStudentReport(student, jsPDF) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Header
    doc.addImage('https://i.postimg.cc/w3CyWzCG/logo.png', 'PNG', 20, 10, 20, 20);
    doc.setFontSize(16);
    doc.text('Edisam Educational Complex', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text('HEMANG-BOTANTIA P.O. BOX KJ 221 KEJETIA – KSI', 105, 20, { align: 'center' });
    doc.text('(CONT: 0243756611/ 0556501264 / 0542162399)', 105, 25, { align: 'center' });
    doc.setFontSize(12);
    doc.text('IN GOD WE TRUST', 105, 30, { align: 'center' });
    doc.setFontSize(14);
    doc.text('CRECHE TERMINAL REPORT', 105, 40, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(60, 42, 150, 42);
    
    // Student Info
    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 20, 50);
    doc.text(`Adm. No: ${student.admissionNo}`, 20, 55);
    doc.text(`Class: ${crecheClassSelect.value}`, 20, 60);
    doc.text(`Academic Year: ${academicYearSelect.value}`, 120, 50);
    doc.text(`Term: ${document.getElementById('term').value}`, 120, 55);
    doc.text(`Attendance: ${student.attendance}/${totalAttendanceInput.value}`, 120, 60);
    
    // Activities
    doc.setFontSize(14);
    doc.text('ACTIVITIES', 105, 70, { align: 'center' });
    
    const activityData = [];
    activities.forEach(activity => {
        activityData.push([activity, student.activities[activity]]);
    });
    
    doc.autoTable({
        startY: 75,
        head: [['Activity', 'Performance']],
        body: activityData,
        theme: 'grid',
        headStyles: { fillColor: [75, 75, 75] },
        styles: { fontSize: 10 }
    });
    
    // Remarks
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('REMARKS', 105, finalY, { align: 'center' });
    
    const remarksData = [
        ['Interest', student.remarks.interest || ''],
        ['Attitude', student.remarks.attitude || ''],
        ['Conduct', student.remarks.conduct || ''],
        ['Class Teacher\'s Remarks', student.remarks.teacherRemarks || '']
    ];
    
    doc.autoTable({
        startY: finalY + 5,
        body: remarksData,
        theme: 'grid',
        styles: { fontSize: 10 }
    });
    
    // Rating and Promotion
    const remarksY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Rating: ${student.rating}`, 20, remarksY);
    doc.text(`Promoted to: ${student.promotedTo}`, 120, remarksY);
    
    // Dates
    doc.text(`Next Term Begins: ${new Date(document.getElementById('nextTermBegins').value).toLocaleDateString()}`, 20, remarksY + 10);
    doc.text(`Vacation Date: ${new Date(document.getElementById('vacationDate').value).toLocaleDateString()}`, 120, remarksY + 10);
    
    // Bills
    doc.setFontSize(14);
    doc.text('BILLS', 105, remarksY + 20, { align: 'center' });
    
    const billsData = [
        ['Book Bill', `GH₵ ${student.bookBill}`],
        ['Canteen', `GH₵ ${student.canteen}`],
        ['Miscellaneous', `GH₵ ${student.miscellaneous}`],
        ['Total', `GH₵ ${calculateTotalBill(student)}`]
    ];
    
    doc.autoTable({
        startY: remarksY + 25,
        body: billsData,
        theme: 'grid',
        styles: { fontSize: 10 }
    });
    
    // Signature
    if (teacherSignature) {
        const signatureY = doc.lastAutoTable.finalY + 10;
        doc.text('Class Teacher\'s Signature:', 20, signatureY);
        doc.addImage(teacherSignature, 'PNG', 20, signatureY + 5, 40, 20);
    }
    
    // Student Photo
    if (student.photo) {
        doc.addImage(student.photo, 'JPEG', 150, 45, 30, 30);
    }
    
    // QR Code
    const qr = new QRious({
        value: `Name: ${student.name}, Adm No: ${student.admissionNo}, Class: ${crecheClassSelect.value}`,
        size: 100
    });
    doc.addImage(qr.toDataURL(), 'PNG', 150, 230, 30, 30);
    
    // Footer
    doc.setFontSize(8);
    doc.text('Generated by Edisam Educational Complex Report System', 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save(`${student.name.replace(/\s+/g, '_')}_Report.pdf`);
}

// Initialize the application
function init() {
    initAcademicYearDropdown();
    
    // Set up event listeners for form inputs
    noOnRollInput.addEventListener('change', populateTable);
    startingAdmissionNoInput.addEventListener('change', populateTable);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
