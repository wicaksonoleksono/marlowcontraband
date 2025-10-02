import React from "react";
import StreamingTextOnLock from "../utils/StreamingTextOnLock";
import { useLenis } from "../hooks/LenisContext";
import BrushBlur from "../components/ui/AnimatedBlurContainer";
const AboutSection = () => {
  const lenis = useLenis();

  return (
    <section id="about" data-section="about" className="min-h-screen py-20">
      <div className="mx-auto">
        <h2 className="text-5xl font-bold mb-8">About us : Deus ex Machina</h2>

        {/* Section 1: Content RIGHT, Image LEFT */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <BrushBlur
            radiusPx={120}
            className="flex flex-col items-top text-justify pr-8 text-sm  p-4"
          >
            {/* Left side - Gallery image */}
            <div className="w-full h-64 overflow-hidden flex items-center justify-center">
              <img
                src="/images/gallery-visitor.jpg"
                alt="Person viewing artwork in gallery"
                className="w-full h-full object-cover"
              />
            </div>
          </BrushBlur>
          <BrushBlur radiusPx={120} className=" p-4">
            <p className="text-xl pb-3">Who, What, Where?</p>
            <StreamingTextOnLock
              allowHtml={true}
              text={`
              mantra is a multidiciplinary engineering research lab based in <b>Jakarta Indonesia</b>, <br>  <br> building systems where automation and pattern recognition work hand in hand.  
              From discrete to continuous and probabilistic recognition, our approach is to simplify the complex and create software that feels intuitive, seamless, and easy to use. 
            `}
              mode="char"
            />
          </BrushBlur>
        </div>

        {/* Section 2: Content LEFT, Image RIGHT */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <BrushBlur radiusPx={120} className=" p-4">
            <p className="text-xl">philosophy: curiosity taught the cat</p>
            <div className="text-[var(--color-text-light)] mt-4">
              <p>
                We are passionate individuals united by one driving force:{" "}
                <strong>curiosity</strong>.
              </p>
              <p className="mt-3">
                This curiosity fuels our relentless pursuit of innovation as we
                build software solutions that span the digital landscape - from
                responsive web applications to intuitive mobile experiences.
              </p>
              <p className="mt-3">
                Our diverse expertise allows us to craft everything from complex
                web platforms to sleek mobile apps, always guided by our shared
                belief that technology should amplify human potential, not
                complicate it.
              </p>
            </div>
          </BrushBlur>
          <BrushBlur
            radiusPx={120}
            className="flex flex-col items-top text-justify pl-8 text-sm p-4"
          >
            {/* Right side - Running image */}
            <div className="w-full h-64 overflow-hidden flex items-center justify-center">
              <img
                src="/images/running.jpg"
                alt="Running"
                className="w-full h-full object-cover"
              />
            </div>
          </BrushBlur>
        </div>

        {/* Section 3: Our Method - Full Width with Center Text and 4 Subsections */}
        <div className="mb-16 mx-auto mt-100" style={{ width: "65vw" }}>
          <div
            className="text-justify  p-4 mb-8"
            style={{
              marginLeft: "calc((100vw - 65vw) * 2/3)",
              marginRight: "calc((100vw - 65vw) * 2/3)",
            }}
          >
            <p className="text-xl">Approach: Human + machine</p>
            <div className="text-[var(--color-text-light)] mt-4">
              <p>Each problem always has the right solution.</p>
            </div>
          </div>

          {/* 6 Subsections Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-md p-4">
              <h3 className="text-lg font-semibold mb-2">Framework</h3>
              <p className="text-[var(--color-text-light)]">
                We build proprietary software based off our own problems such
                as:{" "}
                <strong>
                  free cashier management, course finding platform
                </strong>
                . To what we offer you can explore{" "}
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
            <div className="backdrop-blur-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                1. How about with my industry specific problem?
              </h3>
              <p className="text-[var(--color-text-light)]">
                We can create specific problem software with customization to
                automate you with our expertise in{" "}
                <strong>
                  dynamic automation, design, human touch and seamless
                  integration
                </strong>
                .
              </p>
            </div>
            <div className="backdrop-blur-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                2. Consultation and problem definition
              </h3>
              <p className="text-[var(--color-text-light)]">
                We begin with deep consultation sessions to understand your
                specific challenges, goals, and constraints. This critical phase
                ensures we define the problem accurately before designing any
                solution.
              </p>
            </div>
            <div className="backdrop-blur-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                3. Framework design and solution
              </h3>
              <p className="text-[var(--color-text-light)]">
                Based on our understanding, we architect a tailored framework
                and solution blueprint that addresses your unique requirements
                while maintaining scalability and efficiency.
              </p>
            </div>
            <div className="backdrop-blur-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                4. Feedback from you
              </h3>
              <p className="text-[var(--color-text-light)]">
                We present our proposed solution and gather your insights,
                concerns, and suggestions. Your feedback shapes the final
                approach, ensuring the solution aligns perfectly with your
                vision.
              </p>
            </div>
            <div className="backdrop-blur-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                5. Implementation and feedback
              </h3>
              <p className="text-[var(--color-text-light)]">
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
