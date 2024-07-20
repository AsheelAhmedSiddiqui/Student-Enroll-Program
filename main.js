let enrollFrom = document.getElementById("enrollForm");
let showData = document.getElementById("dataTable");

const generateRandom = () => {
	var random = Math.round(Math.random() * 10000);
	if (random < 10) {
		random = "000" + random;
	} else if (random < 100) {
		random = "00" + random;
	} else if (random < 1000) {
		random = "0" + random;
	}
	return random;
};

enrollFrom.addEventListener("submit", (e) => {
	e.preventDefault();
	let studentNameValue = e.target.studentName.value;
	let studentAgeValue = e.target.studentAge.value;
	let studentEmailValue = e.target.studentEmail.value;
	let studentGenderValue = e.target.studentGender[0].checked
		? "Male"
		: "Female";
	let studentId = generateRandom();
	let allStudentData = JSON.parse(localStorage.getItem("studentData")) ?? [];

	const Toast = Swal.mixin({
		toast: true,
		position: "bottom-end",
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});
	Toast.fire({
		icon: "success",
		title: "SuccessFully Enrolled",
	});

	allStudentData.push({
		studentName: studentNameValue,
		studentAge: studentAgeValue,
		studentEmail: studentEmailValue,
		studentGender: studentGenderValue,
		studentId: studentId,
	});
	localStorage.setItem("studentData", JSON.stringify(allStudentData));
	displayData();
	e.target.reset();
});

const displayData = () => {
	let allStudentData = JSON.parse(localStorage.getItem("studentData")) ?? [];
	let finalData = "";
	allStudentData.forEach((element, i) => {
		finalData += `
					<tr>
						<td>${element.studentId}</td>
						<td>${element.studentName.slice(0,1).toUpperCase()}${element.studentName.slice(1)}</td>
						<td>${element.studentAge}</td>
						<td>${element.studentGender}</td>
						<td>${element.studentEmail}</td>
						<td class="btn-box">
							<button id="edit" onclick="editItem(${i})">Edit</button>
							<button id="delete" onclick="removeItem(${i})">Delete</button>
						</td>
					</tr>
		`;
	});
	showData.innerHTML = finalData;
};

let editItem = (index) => {
	let allStudentData = JSON.parse(localStorage.getItem("studentData")) ?? [];
	let student = allStudentData[index];
	enrollFrom.studentName.value = student.studentName;
	enrollFrom.studentAge.value = student.studentAge;
	enrollFrom.studentEmail.value = student.studentEmail;
	if (student.studentGender === "Male") {
		enrollFrom.studentGender[0].checked = true;
	} else {
		enrollFrom.studentGender[1].checked = true;
	}
	allStudentData.splice(index, 1);
	localStorage.setItem("studentData", JSON.stringify(allStudentData));
	displayData();
	editIndex = index; // Set editIndex to the index of the item being edited
};

let removeItem = (index) => {
	let allStudentData = JSON.parse(localStorage.getItem("studentData")) ?? [];
	allStudentData.splice(index, 1);

	localStorage.setItem("studentData", JSON.stringify(allStudentData));
	displayData();
};

displayData();
