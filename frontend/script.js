const form = document.getElementById("employeeForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const employeeData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        position: document.getElementById("position").value
    };

    try {
        const response = await fetch("http://localhost:5000/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeData)
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        }
        else {
            alert(data.message || "Error registering employee");
        }
        // alert(data.message);
        form.reset();
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
});
