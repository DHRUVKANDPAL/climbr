import React from "react";

const ExamLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block h-[35px] w-[35px] animate-[spin_2s_infinite_linear]">
          {/* First dot */}
          <div className="absolute bottom-[5%] left-0 h-full w-[30%] origin-[50%_85%] rotate-[60deg]">
            <div className="absolute bottom-0 left-0 h-0 w-full animate-[wobble1_0.8s_infinite_ease-in-out] rounded-full bg-[#5D3FD3] pb-[100%] delay-[-0.24s]"></div>
          </div>

          {/* Second dot */}
          <div className="absolute right-0 bottom-[5%] h-full w-[30%] origin-[50%_85%] rotate-[-60deg]">
            <div className="absolute bottom-0 left-0 h-0 w-full animate-[wobble1_0.8s_infinite_ease-in-out] rounded-full bg-[#5D3FD3] pb-[100%] delay-[-0.12s]"></div>
          </div>

          {/* Third dot */}
          <div className="absolute bottom-[-5%] left-0 h-full w-[30%] translate-x-[116.666%]">
            <div className="absolute top-0 left-0 h-0 w-full animate-[wobble2_0.8s_infinite_ease-in-out] rounded-full bg-[#5D3FD3] pb-[100%]"></div>
          </div>
        </div>
      </div>

      {/* Keyframes for animations */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes wobble1 {
          0%,
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-66%) scale(0.65);
            opacity: 0.8;
          }
        }

        @keyframes wobble2 {
          0%,
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(66%) scale(0.65);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default ExamLoader;
