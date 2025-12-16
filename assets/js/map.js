window.addEventListener('load', () => {
    mapScroll.scrollLeft = mapScroll.scrollWidth / 2;
});

const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText").innerText;

copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(copyText);
        alert("해시태그가 복사됐습니다");
    } catch (err) {
        console.error(err);
    }
});