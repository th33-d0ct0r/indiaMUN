const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
})


const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((element) => observer.observe(element));

async function sendData(e) {
    e.preventDefault();
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const text = document.getElementById("text").value
    if (!email || !subject || !text) {
      return alert("Please enter all the details.")
    }
    console.log(email, subject,text)
    const data = {
        "userEmail": email,
        "subject": subject,
        "text": text
    }
    try {
        const response = await fetch("https://indiamun-backend.onrender.com/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        //   mode: "no-cors",
          body: JSON.stringify(data),
        });
        console.log(JSON.stringify(data))
        console.log("success")
        alert("Emails sent successfully. Check your inbox for confirmation")
      } catch (error) {
        console.log(error)
        alert("There was an error in sending the emails. Please try again later.")
    }
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.getElementsByClassName("specialText").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}