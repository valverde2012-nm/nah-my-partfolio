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



document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.querySelector(".name").value.trim();
        const email = form.querySelector(".email").value.trim();
        const message = form.querySelector(".textarea").value.trim();

        // Telegram API uchun kerakli ma’lumotlar
        const token = "8717864718:AAFjjSjoQ8kR7gtzELnaH38weE3CbTZLgKg";
        const chat_id = "5968343355";
        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        const text = `
📩 *Yangi ariza!*
👤 Ismi: *${name}*
✉️ Email: *${email}*
💬 Izoh: ${message}
    `;
        console.log(text);

        // API orqali yuborish
        fetch(telegramUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chat_id,
                text: text,
            }),

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.ok) {
                    Swal.fire({
                        title: "Yuborildi",
                        text: "Xabar muvaffaqiyatli jo'natildi",
                        icon: "success"
                    });
                    form.reset();
                } else {
                    Swal.fire({
                        title: "Xatolik",
                        text: data.description || "Xatolik yuz berdi",
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: "Xatolik",
                    text: "Server bilan ulanishda muammo",
                    icon: "error"
                });
            });
    });
});




document.querySelector(".btn__right").addEventListener("click", function () {
  
  let name = document.querySelector(".input__right").value;
  let email = document.querySelector(".input__right2").value;
  let subject = document.querySelector(".input__right3").value;
  let message = document.querySelector(".input__right4").value;

  let text = `📩 Yangi xabar:
👤 Ism: ${name}
📧 Email: ${email}
📌 Nomer: ${subject}
💬 Message: ${message}`;

  let token = "8714532480:AAGfrrWPZMiQNzH0H9AiBHEPF-wtevKHlhk";  
  let chat_id = "580607993";  

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: text
    })
  })
  .then(() => {
    alert("Xabar yuborildi ✅");
  })
  .catch(() => {
    alert("Xatolik ❌");
  });

});