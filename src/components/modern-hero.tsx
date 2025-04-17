import { Star } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    
  };
}

const Hero7 = ({
  heading = "Um sistema feito para os veterinario",
  description = "Quero q todo mundo tome no cu vai se fuder piranha buceta inferno xereca pau piranha puta aaaaaaaaa vasco fodase eu sei la AAAAAAAAAAHHHHH CHIDORIIIIIIII",
  button = {
    text: "Tome no cu muito mais",
    url: "https://www.shadcnblocks.com",
  },
  reviews = {
    count: 200,
    
  },
}: Hero7Props) => {
  return (
    <section className="py-32">
      <div className="container text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
            {description}
          </p>
        </div>
        <Button asChild size="lg" className="mt-10">
          <a href={button.url}>{button.text}</a>
        </Button>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">

          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-left font-medium text-muted-foreground">
              {reviews.count}+ pessoas comeram sua mãe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
