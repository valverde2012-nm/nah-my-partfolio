const elText = document.querySelector('.text')

function soat() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    elText.innerHTML = 
    String(hour).padStart(2, '0') + 
    ':' +
    String(minute).padStart(2, '0') + 
    ':' + 
    String(second).padStart(2, '0');
}

setInterval(soat, 1000);



document.querySelector(".btn__right").addEventListener("click", async function () {

  let name = document.querySelector(".input__right").value.trim();
  let email = document.querySelector(".input__right2").value.trim();
  let subject = document.querySelector(".input__right3").value.trim();
  let message = document.querySelector(".input__right4").value.trim();


  if (!name || !email || !subject || !message) {
    showNotify("⚠️ Iltimos, hamma joyni to‘ldir!", "error");
    return;
  }

  let text = `📩 Yangi xabar:
 👤 Ism: ${name}
 📧 Email: ${email}
 📌 Nomer: ${subject}
 💬 Message: ${message}`;

  let token = "8714532480:AAGfrrWPZMiQNzH0H9AiBHEPF-wtevKHlhk";
  let chat_id = "580607993";

  try {
    let res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chat_id,
        text: text
      })
    });

    if (res.ok) {
      showNotify("✅ Xabar muvaffaqiyatli yuborildi!", "success");

      document.querySelector(".input__right").value = "";
      document.querySelector(".input__right2").value = "";
      document.querySelector(".input__right3").value = "";
      document.querySelector(".input__right4").value = "";

    } else {
      throw new Error();
    }

  } catch (err) {
    showNotify("❌ Xatolik yuz berdi!", "error");
  }

});



function showNotify(text, type) {
  let notify = document.createElement("div");
  notify.innerText = text;

  
  let bg;
  if (type === "success") {
    bg = "linear-gradient(135deg, #00c853, #69f0ae)";
  } else {
    bg = "linear-gradient(135deg, #ff4b2b, #ff416c)";
  }

  notify.style.position = "fixed";
  notify.style.top = "30px";
  notify.style.right = "30px";
  notify.style.background = bg;
  notify.style.color = "#fff";
  notify.style.padding = "15px 25px";
  notify.style.borderRadius = "12px";
  notify.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
  notify.style.fontSize = "16px";
  notify.style.fontWeight = "500";
  notify.style.zIndex = "9999";
  notify.style.opacity = "0";
  notify.style.transform = "translateY(-20px)";
  notify.style.transition = "all 0.4s ease";

  document.body.appendChild(notify);

  setTimeout(() => {
    notify.style.opacity = "1";
    notify.style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    notify.style.opacity = "0";
    notify.style.transform = "translateY(-20px)";
  }, 2500);

  setTimeout(() => {
    notify.remove();
  }, 3000);
}