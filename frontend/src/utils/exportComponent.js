import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const exportComponentToPDF = (node, filename = "download.pdf") => {
  if (!node) {
    console.error("No DOM node provided.");
    return;
  }

  html2canvas(node, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    scrollY: -window.scrollY,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convert pixel size to mm (1 px = 0.264583 mm)
    const pdfWidth = imgWidth * 0.264583;
    const pdfHeight = imgHeight * 0.264583;

    // Create PDF with same size as canvas
    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? "l" : "p",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  });
};


export const exportComponentToPNG = (node, filename = "resume.png") => {
  html2canvas(node, { scale: 2 }).then((canvas) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
};