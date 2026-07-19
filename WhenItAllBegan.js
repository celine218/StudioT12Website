var password = "2034";

var password = "2034";

function setMsg(text, kind) {
  const msg = document.getElementById("msg");
  if (!msg) return;

  msg.textContent = text || "";
  msg.classList.remove("error", "ok", "show");

  if (kind) msg.classList.add(kind);
  if (text) msg.classList.add("show");
}

function shakeForm() {
  const form = document.querySelector(".passform");
  if (!form) return;

  form.classList.remove("shake");
  void form.offsetWidth; // retrigger animation
  form.classList.add("shake");
}

function passcheck() {
  const form = document.querySelector(".passform");
  const inputEl = document.getElementById("pass1");
  const raw = (inputEl?.value ?? "").trim();

  setMsg("", null);

  if (!raw) {
    setMsg("error: empty", "error");
    shakeForm();
    return false;
  }

  if (raw !== password) {
    setMsg("When it all began...", "error");
    shakeForm();

    document.documentElement.classList.add("flicker");
    setTimeout(() => document.documentElement.classList.remove("flicker"), 220);

    return false;
  }

  // SUCCESS
  setMsg("Time stamps of tragedy spread across different perspectives", "ok");
  form.classList.add("locked");

  document.documentElement.classList.add("flicker");
  setTimeout(() => document.documentElement.classList.remove("flicker"), 180);

  setTimeout(() => {
    window.location.href = "OneStory.html";
  }, 1600);

  return false;
}



(function () {
  const root = document.documentElement;

  function doFlicker() {
    root.classList.add("flicker");

    // duration of flicker
    setTimeout(
      () => root.classList.remove("flicker"),
      20 + Math.random() * 100
    );
  }

  function schedule() {
    // 25% chance of burst flickers
    const bursts = Math.random() < 0.5
      ? 2 + Math.floor(Math.random() * 3) // 2–4 flickers
      : 1;

    let count = 0;

    function burstStep() {
      doFlicker();
      count++;

      if (count < bursts) {
        setTimeout(burstStep, 80 + Math.random() * 180);
      } else {
        setTimeout(schedule, 1200 + Math.random() * 5200);
      }
    }

    burstStep();
  }

  // initial delay so it doesn't flicker immediately on load
  setTimeout(schedule, 800 + Math.random() * 1500);
})();

