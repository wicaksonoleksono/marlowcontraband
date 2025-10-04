import React from "react";
import StreamingTextOnLock from "../utils/StreamingTextOnLock";
import { useLenis } from "../hooks/LenisContext";
import BrushBlur from "../components/ui/AnimatedBlurContainer";
const AboutSection = () => {
  const lenis = useLenis();
  return (
    <section id="about" data-section="about" className="min-h-screen ">
      <div className="mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          About us : curiosity is the fuel
        </h2>
        {/* Section 1: Content RIGHT, Image LEFT */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16">
          <BrushBlur
            radiusPx={120}
            className="hidden md:flex flex-col items-top text-justify pr-8 text-sm p-4"
          >
            <div className="w-full h-64 overflow-hidden flex items-center justify-center">
              <img
                src="/images/gallery-visitor.jpg"
                alt="Person viewing artwork in gallery"
                className="w-full h-full object-cover"
              />
            </div>
          </BrushBlur>
          <div className="md:hidden p-4">
            <div className="w-full h-48 overflow-hidden flex items-center justify-center">
              <img
                src="/images/gallery-visitor.jpg"
                alt="Person viewing artwork in gallery"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <BrushBlur radiusPx={120} className="hidden md:block p-4">
            <p className="text-xl pb-3">Who, What, Where?</p>
            <StreamingTextOnLock
              allowHtml={true}
              text={`
              mantera studio is a multidisciplinary research lab based in <b>Jakarta, Indonesia</b>. <br><br> We're an open-source, open-community lab exploring ideas across multiple domains. Our research is public, our implementations are shared, and our curiosity is contagious. We believe the best way to advance knowledge is to do it together, in the open.
            `}
              mode="char"
            />
          </BrushBlur>
          <div className="md:hidden p-4">
            <p className="text-lg pb-3">Who, What, Where?</p>
            <StreamingTextOnLock
              allowHtml={true}
              text={`
              mantera studio is a multidisciplinary research lab based in <b>Jakarta, Indonesia</b>. <br><br> We're an open-source, open-community lab exploring ideas across multiple domains. Our research is public, our implementations are shared, and our curiosity is contagious. We believe the best way to advance knowledge is to do it together, in the open.
            `}
              mode="char"
            />
          </div>
        </div>
        {/* Section 2: Philosophy */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16">
          <BrushBlur radiusPx={120} className="hidden md:block p-4">
            <p className="text-xl">philosophy: curiosity taught the cat</p>
            <div className="text-[var(--color-text-light)] mt-4">
              <p>
                We are passionate individuals united by one driving force:{" "}
                <strong>curiosity</strong>.
              </p>
              <p className="mt-3">
                That curiosity makes us question everything. We don&apos;t just build
                what&apos;s asked—we understand why it&apos;s needed, break it down to
                first principles, and craft solutions that make sense.
              </p>
            </div>
          </BrushBlur>
          <div className="md:hidden p-4">
            <p className="text-lg">philosophy: curiosity taught the cat</p>
            <div className="text-[var(--color-text-light)] mt-4">
              <p>
                We are passionate individuals united by one driving force:{" "}
                <strong>curiosity</strong>.
              </p>
              <p className="mt-3">
                That curiosity makes us question everything. We don&apos;t just build
                what&apos;s asked—we understand why it&apos;s needed, break it down to
                first principles, and craft solutions that make sense.
              </p>
            </div>
          </div>
          <BrushBlur
            radiusPx={120}
            className="hidden md:flex flex-col items-top text-justify pl-8 text-sm p-4"
          >
            <div className="w-full h-64 overflow-hidden flex items-center justify-center">
              <img
                src="/images/running.jpg"
                alt="Running"
                className="w-full h-full object-cover"
              />
            </div>
          </BrushBlur>
          <div className="md:hidden p-4">
            <div className="w-full h-48 overflow-hidden flex items-center justify-center">
              <img
                src="/images/running.jpg"
                alt="Running"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 3: What else? */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16">
          <BrushBlur
            radiusPx={120}
            className="hidden md:flex flex-col items-top text-justify pr-8 text-sm p-4"
          >
            <div className="w-full h-64 overflow-hidden flex items-center justify-center">
              <img
                src="/images/razorbil.jpg"
                alt="Razorbill"
                className="w-full h-full object-cover object-bottom"
              />
            </div>
          </BrushBlur>
          <div className="md:hidden p-4">
            <div className="w-full h-48 overflow-hidden flex items-center justify-center">
              <img
                src="/images/razorbil.jpg"
                alt="Razorbill"
                className="w-full h-full object-cover object-bottom"
              />
            </div>
          </div>
          <BrushBlur radiusPx={120} className="hidden md:block p-4">
            <p className="text-xl">what else?</p>
            <div className="text-[var(--color-text-light)] mt-4">
              <p>
                <strong>
                  Well, tbh doing only research doesn&apos;t pay the bills.
                </strong>{" "}
                So we build products and take on client work to fund our
                explorations.
              </p>
              <p className="mt-3">
                If you need software, try our proprietary products first—they
                might solve your problem out of the box. If not, we&apos;ll build
                something custom. Either way, you get a solution and we get to
                keep researching.
              </p>
            </div>
          </BrushBlur>
          <div className="md:hidden p-4">
            <p className="text-lg">what else?</p>
            <div className="text-[var(--color-text-light)] mt-4">
              <p>
                <strong>
                  Well, tbh doing only research doesn&apos;t pay the bills.
                </strong>{" "}
                So we build products and take on client work to fund our
                explorations.
              </p>
              <p className="mt-3">
                If you need software, try our proprietary products first—they
                might solve your problem out of the box. If not, we&apos;ll build
                something custom. Either way, you get a solution and we get to
                keep researching.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-16 mx-auto mt-12 md:mt-24 w-full md:w-[65vw]">
          <div className="text-justify p-4 mb-8">
            <p className="text-lg md:text-xl">Approach: Human + machine</p>
            <div className="text-[var(--color-text-light)] mt-4">
              <p>Each problem has the right solution.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="backdrop-blur-md p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-2">
                Framework
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-light)]">
                We build proprietary software based off our own problems such
                as: <strong>togetherbase, mc-rag</strong>. To what we offer you
                can explore{" "}
                <a
                  href="#products"
                  className="text-[var(--color-primary)] hover:underline cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    lenis?.scrollTo("#products");
                  }}
                >
                  here
                </a>
                .
              </p>
            </div>
            <div className="backdrop-blur-md p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-2">
                1. How about with my industry specific problem?
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-light)]">
                We can create specific problem software with customization to
                automate you with our expertise in{" "}
                <strong>
                  dynamic automation, design, human touch and seamless
                  integration
                </strong>
                .
              </p>
            </div>
            <div className="backdrop-blur-md p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-2">
                2. Consultation and problem definition
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-light)]">
                We begin with deep consultation sessions to understand your
                specific challenges, goals, and constraints. This critical phase
                ensures we define the problem accurately before designing any
                solution.
              </p>
            </div>
            <div className="backdrop-blur-md p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-2">
                3. Framework design and solution
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-light)]">
                Based on our understanding, we architect a tailored framework
                and solution blueprint that addresses your unique requirements
                while maintaining scalability and efficiency.
              </p>
            </div>
            <div className="backdrop-blur-md p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-2">
                4. Feedback from you
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-light)]">
                We present our proposed solution and gather your insights,
                concerns, and suggestions. Your feedback shapes the final
                approach, ensuring the solution aligns perfectly with your
                vision.
              </p>
            </div>
            <div className="backdrop-blur-md p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-2">
                5. Implementation and feedback
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-light)]">
                We develop and deploy the solution with continuous feedback
                loops, allowing for real-time adjustments and ensuring the final
                product exceeds your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
