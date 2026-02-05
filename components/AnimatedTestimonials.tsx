import React, { useRef, useState } from "react";
import { IconPlay, IconPause } from "@tabler/icons-react";
import { cn } from "../lib/utils";
import { Testimonial } from "../types";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-4xl mx-auto px-4 md:px-8 py-10", className)}>
      <div className="flex flex-col gap-16 md:gap-24">
        {testimonials.map((testimonial, index) => (
          <div key={`${testimonial.name}-${index}`} className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">

            {/* Video Section */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 group">
                <iframe
                  src={testimonial.src}
                  title={testimonial.name}
                  className="w-full h-full object-cover"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                {testimonial.name}
              </h3>
              <p className="text-sm text-blue-400 font-bold uppercase tracking-widest mb-6">
                {testimonial.designation}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                "{testimonial.quote}"
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
