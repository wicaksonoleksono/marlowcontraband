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
        <p className="text-[var(--color-text-light)] max-w-2xl mt-5">
          Marlow Contrabands is an organization initiative with various projects
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
      <div className="flex flex-col item-top text-justify ">
        <p className="text-2xl text-right">Scopes of research && projects</p>
        <p className="pt-2 max-w-2xl text-justify">
          Natural Language Processing: Machine Translation, Universal
          Reperesentation, Information Extraction, Context Understanding,
          Computer Vision: Image Synthesis, Segmentation, Object Detection,
          Mathematics : Post-quantum Krpyography, Dynamical System, Computation,
          Robotics: Biomimicry
        </p>
      </div>
      <div className="flex flex-col items-top text-justify border-r-4 border-[var(--color-primary)] pr-8 text-sm">
        <p className="text-xl">Preface</p>
        <StreamingTextOnLock
          text={`
          My old man once told me this line that stuck: curiosity didn’t kill the cat, it taught the cat a valuable lesson. Yeah, it sounds cheesy as fuck, but he wasn’t wrong. What doesn’t kill you doesn’t just make you stronger, it makes you meaner, sharper, 
          more ready to fuck around and find out again. That’s the whole game. You take the hit, laugh it off, and walk away with scars that teach louder than any book ever could. 
          Life’s not about hiding from the shitstorm, it’s about diving straight into it and coming out on the other side with your teeth still clenched. Every fall, every dumb move, every moment you thought you were cooked but still walked away breathing 
          that’s free training. Pain’s not a punishment, it’s the tuition you pay for wisdom. Most people run from mistakes like they’re poison, but the real poison is standing still, scared of messing up. 
          Curiosity is the spark, mistakes are the fire, and the scars are the proof you actually lived.
          So don’t aim to play it safe, don’t aim to be perfect, aim to stay hungry. Be reckless enough to try, stubborn enough to keep swinging, and smart enough to learn why you got knocked down in the first place. 
          That’s how you stack up lessons no school could ever hand you. Be a lifelong learner and every mistakes is an oportunity to learn, you’ll never lose if your goal is just to learn and experience rather than achieve. That’s how you win without even keeping score.

            `}
          mode="char"
        />
      </div>
      <div className="flex items-start"></div>
    </section>
  );
};

export default HomeSection;
