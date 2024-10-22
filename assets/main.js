// Animasi Opening Homepage
function showLoadingPage() {
  document.body.classList.add("show-loading-page");
  document.querySelector(".loading-page").style.display = "flex";
  document.querySelector(".after-load").style.display = "none";
  document.querySelector(".loading").style.display = "none";
  document.body.classList.add("no-scroll");

  // Sembunyikan elemen utama saat loading
  document.querySelector("main").style.display = "none";

  // Pastikan halaman di-scroll ke atas segera
  window.scrollTo(0, 0);
}

// Tambahkan variabel global untuk menghentikan animasi
let typingFinished = false; // Menandakan kapan animasi pengetikan selesai

// Fungsi reset teks saat trigger ulang
function resetTypingEffect(element) {
  typingFinished = false;
  element.innerHTML = "";
}

// Fungsi untuk animasi pengetikan
function typeWriterEffect(
  element,
  typingSpeed = 150,
  backspaceSpeed = 100,
  delayBetweenTexts = 1000
) {
  const baseText = "Welcome to ";
  const taskText = "Task E-Commerce";
  const newText = "Parallax";
  let fullText = baseText + taskText;
  let charIndex = 0;
  let isDeleting = false;
  let phase = "typing";

  const cursor = '<span class="blinking-cursor">|</span>';

  function type() {
    if (typingFinished) {
      // Jika animasi selesai, hentikan pengetikan
      element.innerHTML = "Welcome to Parallax";
      return;
    }

    if (phase === "typing" && charIndex < fullText.length) {
      element.innerHTML = fullText.substring(0, charIndex + 1) + cursor;
      charIndex++;
      setTimeout(type, typingSpeed);
    } else if (charIndex === fullText.length && !isDeleting) {
      setTimeout(() => {
        isDeleting = true;
        phase = "backspacing";
        setTimeout(type, delayBetweenTexts);
      }, delayBetweenTexts);
    } else if (isDeleting && charIndex > baseText.length) {
      element.innerHTML = fullText.substring(0, charIndex - 1) + cursor;
      charIndex--;
      setTimeout(type, backspaceSpeed);
    } else if (isDeleting && charIndex === baseText.length) {
      isDeleting = false;
      phase = "replacing";
      fullText = baseText + newText;
      charIndex = baseText.length;
      setTimeout(type, typingSpeed);
    } else if (phase === "replacing" && charIndex < fullText.length) {
      element.innerHTML = fullText.substring(0, charIndex + 1) + cursor;
      charIndex++;
      setTimeout(type, typingSpeed);
    }
  }

  type();
}

// Fungsi untuk memanggil efek pengetikan dan mengatur fade-out
function hideLoadingPage() {
  document.querySelector(".loading-page").style.display = "none";
  document.querySelector(".after-load").style.display = "flex";
  gsap.to(".after-load", { opacity: 1, duration: 0 });

  const textElement = document.querySelector(".after-load h4");

  // Reset teks sebelum animasi pengetikan
  resetTypingEffect(textElement);

  // Jalankan animasi pengetikan
  typeWriterEffect(textElement, 150, 100, 1000);

  // Setelah animasi pengetikan selesai, hentikan dan mulai fade-out
  setTimeout(function () {
    typingFinished = true;
    textElement.innerHTML = "Welcome to Parallax"; // Set teks final

    gsap.to(".after-load", {
      opacity: 0,
      duration: 2,
      onComplete: function () {
        document.querySelector(".after-load").style.display = "none";
        document.body.classList.remove("no-scroll");

        // Tampilkan elemen utama dengan animasi fade-in
        document.querySelector("main").style.display = "block";
        gsap.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 2 });
      },
    });
  }, 11000);
}

// CSS untuk kursor berkedip dan glitch
const style = document.createElement("style");
style.innerHTML = `
  .blinking-cursor {
    font-weight: bold;
    font-size: 1.2em;
    animation: blink 0.7s infinite;
  }

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes glitch {
    0% { text-shadow: 2px 0px white, -2px 0px white; }
    50% { text-shadow: -2px 0px white, 2px 0px white; }
    100% { text-shadow: 2px 0px white, -2px 0px white; }
  }

  .glitching {
    animation: glitch 0.3s infinite;
  }
`;
document.head.appendChild(style);

function handleLoadingEntryClick() {
  const loadingEntry = document.querySelector(".loading-entry");
  loadingEntry.style.transform = "scale(0.9)";
  setTimeout(hideLoadingPage, 300);
}

function handleLogoClick() {
  showLoadingPage();
  setTimeout(hideLoadingPage, 3000);
}

// Fungsi untuk dijalankan ketika halaman selesai dimuat
window.onload = function () {
  // Pastikan tombol "Tap Here" bisa diklik setelah elemen loading ada
  document
    .querySelector(".loading-entry")
    .addEventListener("click", handleLoadingEntryClick);

  // Tambahkan event listener untuk klik logo "This 4drux"
  document.querySelector("header a").addEventListener("click", function (e) {
    e.preventDefault(); // Mencegah perilaku default link
    handleLogoClick(); // Tampilkan loading ketika logo diklik
  });

  // Periksa apakah pengguna telah mengunjungi situs sebelumnya
  if (sessionStorage.getItem("hasVisited") !== "true") {
    showLoadingPage(); // Tampilkan halaman loading pertama kali
  } else {
    // Jika sudah pernah mengunjungi, langsung tampilkan konten utama
    document.body.classList.remove("no-scroll");
    document.querySelector(".loading-page").style.display = "none";
    document.querySelector(".after-load").style.display = "none";
    document.body.classList.remove("show-loading-page");
  }
};

// Pastikan elemen "Tap Here" bisa diklik
document
  .querySelector(".loading-entry")
  .addEventListener("click", handleLoadingEntryClick);

window.onscroll = () => {
  document.querySelector(".mountain").style.marginTop = scrollY + "px";

  document.querySelector(".trees").style.marginTop = scrollY / 1.5 + "px";

  document.querySelector(".stars").style.marginTop = scrollY * 2 + "px";

  document.querySelector(".stars").style.marginRight = scrollY / 2 + "px";

  document.querySelector(".moon").style.transform =
    "rotate(-" + scrollY / 5.5 + "deg)";
};

let initialSlide = 0;

if (window.matchMedia("(min-width: 1024px)").matches) {
  initialSlide = 2;
}

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  initialSlide: initialSlide,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  keyboard: {
    enabled: true,
  },
  mousewheel: {
    thresholdDelta: 70,
  },
  spaceBetween: 30,
  loop: false,
  touchRatio: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Optional: Add event listener to update the active class
swiper.on("slideChange", function () {
  // Perform any actions when the slide changes
});
