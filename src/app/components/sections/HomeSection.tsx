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
        <h1 className="text-4xl font-bold">source .newmace</h1>
        <p className="text-[var(--color-text-light)] max-w-2xl mt-5 backdrop-blur-md p-2">
          newmace is an open organization initiative with various projects and
          research on Linguistics, Computer Vision, Mathematics, Robotics and
          other fun.?.{"{"}ny{"}"} projects.
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
          text={`A big reason for building this community is simple. It is for people who share the same drive in life: the love of lifelong learning. I grew up with the idea that curiosity is not a weakness. From a young age my father told me that curiosity never killed the cat, it taught the cat an important lesson. That stayed with me.
          Young or old, there is never a reason to stop learning. There is never a reason to get bored of asking questions. Curiosity is not a distraction, it is the fuel that keeps learning alive.
          My background is in mathematics and computer science, but the vision for this place is not limited to one field. Any project can belong here. It can be a drawing, a short story, a piece of music, a question about history, or even a deep dive into nuclear physics. The point is not the subject. The point is sharing.
          This space is meant to bring people together, to put ideas out into the open, and to give back to the public. If you carry the same motivation to learn and to keep your curiosity alive, then this community is already yours.
   `}
          mode="char"
        />
      </div>
      <div className="flex items-start"></div>
    </section>
  );
};

export default HomeSection;
