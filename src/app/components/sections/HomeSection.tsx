"use client";
///app/components/sections/HomeSection.tsx
import React from "react";
import StreamingTextScroll from "../animate/StreamingTextScroll";
const HomeSection = () => {
  return (
    // 1. The <section> is now a grid container with 3 equal rows
    <section
      id="home"
      data-section="home"
      className="min-h-screen grid grid-rows-3 mt-6"
    >
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-bold">
          bash $whoami <span className="animate-pulse">{"!"}</span>
        </h1>
        <p className="text-[var(--color-text-light)] max-w-2xl">
          Marlow Contrabands is an organization initiative with various projects
          and research on Linguistics, Computer Vision, Mathematics, and other
          fun.?.{"{"}ny{"}"} projects.
        </p>
      </div>
      <div className="flex items-top text-justify border-r-4 border-[var(--color-primary)] pr-8">
        <StreamingTextScroll
          text={`
            My old man once told me this line that stuck: curiosity didn’t kill the cat, 
            it taught the cat a valuable lesson. Yeah, it sounds cheesy as fuck, but he wasn’t wrong. 
            What doesn’t kill you doesn’t just make you stronger, it makes you meaner, sharper, more ready to fuck around and find out again. 
            That’s the whole game. You take the hit, laugh it off, and walk away with scars that teach louder than any book ever could.
            be a lifelong learner and every mistakes is an oportunity to learn, 
            you'll never lose if your goal is just to learn and experience rather than achieve !
            `}
          mode="char"
        />
      </div>
      <div className="flex items-start"></div>
    </section>
  );
};

export default HomeSection;
