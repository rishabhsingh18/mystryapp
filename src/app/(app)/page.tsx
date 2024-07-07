"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

const Home = () => {
  return (
    <>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the world of anonymous conversations
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Join the community of people who are{" "}
        </p>
      </section>
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full max-w-lg md:max-w-xl"
        >
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index} className="p-2">
              <div className="p-1"> 
                <Card>
                  <CardHeader>{message.title}</CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center p-4">
                    <span className="text-3xl font-semibold">{message.content}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <footer className="text-center p-4 md:p-6">
        @2024,Rishabh PRoduct
      </footer>
    </main>
    </>
  );
};

export default Home;
