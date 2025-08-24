document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("clickBtn");
  const msg = document.getElementById("message");

  btn.addEventListener("click", () => {
    msg.textContent = "🎉 You clicked the button!";
  });
});
