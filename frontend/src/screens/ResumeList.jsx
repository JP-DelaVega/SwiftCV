import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaFileImage, FaFilePdf } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import ResumeTemplate_1 from "../ResumeTemplates/ResumeTemplate_1";
import ResumeTemplate_2 from "../ResumeTemplates/ResumeTemplate_2";
import ResumeTemplate_3 from "../ResumeTemplates/ResumeTemplate_3";
import ResumeTemplate_4 from "../ResumeTemplates/ResumeTemplate_4";
import ResumeTemplate_5 from "../ResumeTemplates/ResumeTemplate_5";
import ResumeTemplate_6 from "../ResumeTemplates/ResumeTemplate_6";
import ResumeTemplate_7 from "../ResumeTemplates/ResumeTemplate_7";
import { exportComponentToPDF, exportComponentToPNG } from "../utils/exportComponent";
const templateComponents = [
  ResumeTemplate_1,
  ResumeTemplate_2,
  ResumeTemplate_3,
  ResumeTemplate_4,
  ResumeTemplate_5,
  ResumeTemplate_6,
  ResumeTemplate_7,
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [hoverOnSmallDiv, setHoverOnSmallDiv] = useState(false);
  const [hoverOnOverlay, setHoverOnOverlay] = useState(false);

  const hovered = hoverOnSmallDiv || hoverOnOverlay;

  const next = () => setIndex((prev) => (prev + 1) % templateComponents.length);
  const prev = () =>
    setIndex(
      (prev) =>
        (prev - 1 + templateComponents.length) % templateComponents.length
    );

  const CurrentTemplate = templateComponents[index];

  // Ref for the OFFSCREEN full-size clone for export
  const exportRef = useRef(null);

  const handleDownloadPDF = () => {
    if (exportRef.current) {
      exportComponentToPDF(exportRef.current, "resume.pdf");
    }
  };
  const handleDownloadPNG = () => {
    if (exportRef.current) {
      exportComponentToPNG(exportRef.current, "resume.png");
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-auto flex flex-col justify-center items-center overflow-hidden">
        <div className=" w-[45vw] h-full flex justify-center items-center relative ">
           <Link
            to="/ResumeDetails"
            className="z-10 absolute top-[7rem] flex items-center gap-2 text-blue-500 hover:text-blue-700 transition"
          >
            <FaEdit className="text-lg" />
            <span>Edit Resume</span>
          </Link>
          <div className=" w-full h-full flex justify-center items-center transition-filter duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="flex justify-center items-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
              >
                {/* VISIBLE scaled component */}

                <div className=" w-full max-w-[80vw] flex justify-center items-center">
                  <div
                    className={`
                      w-full h-full
                     scale-[0.6] sm:scale-[0.7] md:scale-[0.8]

                      origin-center pointer-events-auto
                      ${hovered ? "filter blur-sm" : ""}
                    `}
                    onMouseEnter={() => setHoverOnSmallDiv(true)}
                    onMouseLeave={() => setHoverOnSmallDiv(false)}
                  >
                    <CurrentTemplate />
                  </div>
                </div>

                {/* OFFSCREEN full-size component for export */}
                <div
                  ref={exportRef}
                  style={{
                    position: "fixed",
                    top: "-10000px",
                    left: "-10000px",
                    width: "800px", // set a fixed width for good resolution
                    backgroundColor: "white",
                  }}
                >
                  <CurrentTemplate />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {hovered && (
            <div
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              onMouseEnter={() => setHoverOnOverlay(true)}
              onMouseLeave={() => setHoverOnOverlay(false)}
            >
              <button
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition pointer-events-auto"
                onClick={handleDownloadPDF}
              >
                <FaFilePdf className="inline mr-2" />
                <span>Download to PDF</span>
              </button>
              <button
                className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition pointer-events-auto"
                onClick={handleDownloadPNG}
              >
                <FaFileImage className="inline mr-2" />
                <span>Download to PNG</span>
              </button>
            </div>
          )}
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
            <button
              onClick={prev}
              className="p-3 rounded-full shadow hover:bg-blue-300 bg-grey-200"
            >
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
            <button
              onClick={next}
              className="p-3 rounded-full shadow hover:bg-blue-300  bg-grey-200"
            >
              <ChevronRight />
            </button>
          </div>
        </div>


      </div>
    </>
  );
};

export default Carousel;
