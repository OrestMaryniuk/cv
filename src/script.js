import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const element = document.getElementById("cv-content");
const button = document.querySelector(".btn");

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

async function downloadPDF() {
  button.disabled = true;

  const clone = element.cloneNode(true);
  clone.style.position = "fixed";
  clone.style.top = "-150vh";
  clone.style.left = "-100vw";
  clone.style.width = "70rem";
  clone.style.aspectRatio = "210 / 297";
  clone.style.borderRadius = "0";
  clone.style.flexDirection = "row";

  const cloneSidebar = clone.querySelector(".sidebar");
  const cloneMainContent = clone.querySelector(".main-content");
  cloneSidebar.style.width = "35%";
  cloneMainContent.style.width = "65%";

  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
    const name = document.querySelector(".name")?.textContent || "CV";
    const filename = `${name.trim().replace(/\s+/g, "_")}_CV.pdf`;

    if (isIOS()) {
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      pdf.save(filename);
    }
  } catch (err) {
    console.error("Помилка при створенні PDF:", err);
    alert("Не вдалося створити PDF.");
  } finally {
    button.disabled = false;
    document.body.removeChild(clone);
  }
}

button.addEventListener("click", downloadPDF);
