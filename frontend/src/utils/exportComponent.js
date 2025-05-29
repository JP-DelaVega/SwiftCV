import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const exportComponent = (node, filename = "download.pdf") => {
    if (!node) {
      console.error("No DOM node provided.");
      return;
    }
  
    html2canvas(node, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgProps = pdf.getImageProperties(imgData);
      const pdfPageWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
  
      // Calculate height to maintain aspect ratio
      let pdfWidth = pdfPageWidth;
      let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // If the height is bigger than PDF page height, scale it down
      if (pdfHeight > pdfPageHeight) {
        pdfHeight = pdfPageHeight;
        pdfWidth = (imgProps.width * pdfHeight) / imgProps.height;
      }
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    });
  };
  