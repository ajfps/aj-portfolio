const snowContainer = document.createElement("div");
snowContainer.classList.add("snow-container");
document.body.insertBefore(snowContainer, document.body.firstChild);

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");

  const size = Math.random() * 3 + 2;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;

  snowflake.style.left = `${Math.random() * 100}vw`;

  const duration = Math.random() * 5 + 5;
  snowflake.style.animationDuration = `${duration}s`;

  snowflake.style.opacity = Math.random() * 0.7 + 0.3;

  snowContainer.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

function startSnowfall() {
  for (let i = 0; i < 50; i++) {
    createSnowflake();
  }

  setInterval(createSnowflake, 200);
}

window.addEventListener("load", startSnowfall);
