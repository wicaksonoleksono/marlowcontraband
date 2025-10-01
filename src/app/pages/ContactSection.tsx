"use client";

import React from "react";
import Button from "../components/ui/Button";

const ContactSection = () => {
  return (
    <section
      id="contact"
      data-section="contact"
      className="min-h-screen flex flex-col justify-center items-center py-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8">Get In Touch</h2>
        <p className="text-xl text-[var(--color-text-light)] mb-12 max-w-2xl mx-auto text-justify">
          Ready to automate your processes and build something that scales?
          Let's discuss how we can help transform your operations. We are always
          open to collaborating on interesting research projects. Whether you're
          working on cutting-edge technology, need help with analysis, or want
          to explore new ideas together, let's connect!
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() =>
              window.open("mailto:hello@newport-engineering.com", "_blank")
            }
          >
            Email Us
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open("https://calendly.com/newport-engineering", "_blank")
            }
          >
            Schedule Call
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-primary)] border-opacity-20">
          <p className="text-[var(--color-text-light)]">
            hello@newport-engineering.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
