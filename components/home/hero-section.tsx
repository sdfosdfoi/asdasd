"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-6xl mx-auto px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Покупка и продажа<br />
              <span className="text-primary">спецтехники и запчастей</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Надежная площадка для поиска, покупки и продажи строительной техники, запчастей и оборудования по всей России.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/katalog">Найти технику</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/add-listing">Разместить объявление</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" 
              alt="Спецтехника" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img 
              src="https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" 
              alt="Запчасти" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}