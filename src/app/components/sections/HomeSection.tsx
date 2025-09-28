"use client";
///app/components/sections/HomeSection.tsx
import React from "react";
import StreamingTextOnLock from "../animate/StreamingTextOnLock";

const HomeSection = () => {
  return (
    // 1. The <section> is now a grid container with 3 equal rows
    <section
      id="home"
      data-section="home"
      className="min-h-screen grid grid-rows-4 mt-6"
    >
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-bold">bash $whoami</h1>
        <p className="text-[var(--color-text-light)] max-w-2xl mt-5 backdrop-blur-md p-2">
          Party Animals is an open organization initiative with various projects
          and research on Linguistics, Computer Vision, Mathematics, Robotics
          and other fun.?.{"{"}ny{"}"} projects.
          <span className="text-[var(--color-primary)]">
            {" "}
            Anyone can be a part of this initative towards our open-source
            projects{" "}
          </span>
          To contribute you can see, our github page here
        </p>
      </div>
      <div className="flex flex-col item-top text-right ml-auto px-3">
        <p className="text-2xl text-right  backdrop-blur-md ">
          <span className="text-[var(--color-primary)]">Scopes</span> of
          researchs && projects
        </p>
        <p className="pt-2 max-w-2xl text-justify  backdrop-blur-md ">
          <span className="text-[var(--color-primary)]">&Scopes*</span> = vec![
          "Natural Language Processing: Machine Translation, Universal
          Representation, Information Extraction, Context Understanding,
          image-text semantic extraction", "Computer Vision: Image Synthesis,
          Segmentation, Object Detection", "Mathematics: TBD", "Robotics: TBD",
          ];
        </p>
      </div>
      <div className="flex flex-col items-top text-justify border-r-4 border-[var(--color-primary)] pr-8 text-sm  backdrop-blur-md p-2">
        <p className="text-xl">Preface</p>
        <StreamingTextOnLock
          text={`
My old man told me something that stuck. Curiosity didn’t kill the cat. It taught the cat a lesson. It might sound cheesy, but he was right. What doesn’t kill you doesn’t just make you stronger. It makes you sharper. You take the hit, crack a grin, and walk off with scars that teach louder than any book.  

Life isn’t about avoiding the storm. It’s about stepping into it and walking out still breathing. Every fall, every bad call, every time you thought you were done and weren’t, that’s training. Pain isn’t punishment. It’s tuition.  

Most people see mistakes as poison. The real poison is standing still. Curiosity is the spark. Mistakes are the fire. Scars prove you showed up.  

Don’t aim to be safe or perfect. Aim to stay hungry. Try hard. Keep swinging. Learn why you got dropped. That’s how you build lessons no school can hand you. Be a lifelong learner. Every mistake is a chance to learn. You can’t lose if your goal is to learn and experience instead of just to achieve. That’s how you win without even keeping score.  
   `}
          mode="char"
        />
      </div>
      <div className="flex items-start"></div>
    </section>
  );
};

export default HomeSection;
