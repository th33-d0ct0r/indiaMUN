const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
})


const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((element) => observer.observe(element));

const contactUsButton = document.getElementById('btn')
contactUsButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const data = {
        userEmail: "groverbhavit@gmail.com",
        subject: "Aarav is not a good developer",
        text: "Bhai aarav ko sahi me kuchh nahi ata lmao"
    }
    const response = await fetch("http://localhost:5000/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (response.success) {
        console.log("Successfully sent")
    } else {
        console.log("Error: ", response.msg)
    }
})