window.onload = async () => {
  document.getElementsByClassName('dropdown')[0].style.left = document.getElementById('homeLink').getBoundingClientRect().left + 'px'
  try {
    const response = await fetch("https://indiamun-backend.onrender.com/chalja/12ka4", {
      method: "GET"
    })
    console.log("backend initiated")
  } catch (error) {
    console.log(error)
  }
}

document.body.onclick = (e) => {
  if (e.target !== document.getElementsByClassName('dropdown')[0]) {
    document.getElementsByClassName('dropdown')[0].style.transform = 'scale(1, 0)'
  }
}

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

const hamburger = document.getElementById("hamburger")
const hamburgerMenu = document.getElementById("hamburgerMenu")
hamburger.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(hamburgerMenu.classList)
  if (hamburgerMenu.classList.contains("phone-nav-menu-visible")) {
    hamburgerMenu.classList.add("phone-nav-menu-hidden")
    hamburgerMenu.classList.remove("phone-nav-menu-visible")
  } else {
    hamburgerMenu.classList.add("phone-nav-menu-visible")
    // hamburgerMenu.classList.remove("phone-nav-menu-visible")
  }
})

let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
      selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
      px = value => withUnit(value, "px"),
      ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
  const star = document.createElement("span"),
        color = selectRandom(config.colors);

  star.className = "star fa-solid fa-star";

  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);

  appendElement(star);

  removeElement(star, config.starAnimationDuration);
}

const createGlowPoint = position => {
  const glow = document.createElement("div");

  glow.className = "glow-point";

  glow.style.left = px(position.x);
  glow.style.top = px(position.y);

  appendElement(glow)

  removeElement(glow, config.glowDuration);
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);
const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
        quantity = determinePointQuantity(distance);

  const dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => { 
    const x = last.x + dx * index, 
          y = last.y + dy * index;

    createGlowPoint({ x, y });
  });
}

const updateLastStar = position => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
  if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = e => {
  const mousePosition = { x: e.pageX, y: e.pageY }

  adjustLastMousePosition(mousePosition);

  const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
        hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

  if(hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);

    updateLastStar(mousePosition);
  }

  createGlow(last.mousePosition, mousePosition);

  updateLastMousePosition(mousePosition);
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);

function showInternalLinks() {
  document.getElementsByClassName('dropdown')[0].style.transform = 'scale(1, 1)'
}