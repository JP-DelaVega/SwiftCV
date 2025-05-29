import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import ResumeTemplate_1 from "../ResumeTemplates/ResumeTemplate_1";
import ResumeTemplate_2 from "../ResumeTemplates/ResumeTemplate_2";
import ResumeTemplate_3 from "../ResumeTemplates/ResumeTemplate_3";
import ResumeTemplate_4 from "../ResumeTemplates/ResumeTemplate_4";
import ResumeTemplate_5 from "../ResumeTemplates/ResumeTemplate_5";
import ResumeTemplate_6 from "../ResumeTemplates/ResumeTemplate_6";
import ResumeTemplate_7 from "../ResumeTemplates/ResumeTemplate_7";
import { exportComponent } from "../utils/exportComponent";

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
    setIndex((prev) => (prev - 1 + templateComponents.length) % templateComponents.length);

  const CurrentTemplate = templateComponents[index];

  // Ref for the OFFSCREEN full-size clone for export
  const exportRef = useRef(null);

  const handleDownload = () => {
    if (exportRef.current) {
      exportComponent(exportRef.current, "resume.pdf");
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen flex justify-center items-center">
        <div className="w-full h-full flex justify-center items-center relative mt-12">
          <div className="w-full h-full flex justify-center items-center transition-filter duration-300">
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
                <div className="w-full h-full max-w-[80vw] max-h-[90vh] flex justify-center items-center">
                  <div
                    className={`
                      w-full h-full
                      scale-[0.4] sm:scale-[0.45] md:scale-[0.5]
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition pointer-events-auto"
                onClick={handleDownload}
              >
                Download to PDF
              </button>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
          <button onClick={prev} className="p-2 rounded-full shadow hover:bg-gray-200">
            <ChevronLeft />
          </button>
        </div>
        <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
          <button onClick={next} className="p-2 rounded-full shadow hover:bg-gray-200">
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
