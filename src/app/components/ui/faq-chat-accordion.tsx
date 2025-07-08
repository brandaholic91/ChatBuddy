"use client";

import * as React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp = "Every day, 9:01 AM",
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <div className={cn("p-4", className)}>
      {timestamp && (
        <div className="mb-4 text-sm text-muted-foreground">{timestamp}</div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 * idx }}
            className="mb-2"
          >
            <Accordion.Item 
              value={item.id.toString()} 
              className=""
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4">
                  <div
                    className={cn(
                      "relative flex items-center space-x-2 rounded-2xl p-4 w-full transition-colors transition-shadow bg-[#020617] border border-white/10 shadow-2xl text-[#f9fafb] text-lg md:text-xl hover:bg-[#111827]/90 hover:shadow-3xl",
                      questionClassName
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn(
                          "absolute bottom-6",
                          item.iconPosition === "right" ? "right-0" : "left-0"
                        )}
                        style={{
                          transform: item.iconPosition === "right" 
                            ? "rotate(7deg)" 
                            : "rotate(-4deg)",
                        }}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span className="font-medium">{item.question}</span>
                  </div>

                  <span 
                    className={cn(
                      "text-muted-foreground",
                      openItem === item.id.toString() && "text-primary"
                    )}
                  >
                    {openItem === item.id.toString() ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content asChild forceMount>
                <motion.div
                  initial="collapsed"
                  animate={openItem === item.id.toString() ? "open" : "collapsed"}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="ml-7 mt-1 md:ml-16">
                    <div
                      className={cn(
                        "relative max-w-xl rounded-2xl px-6 py-4 bg-gradient-to-r from-[#6366f1] to-[#38bdf8] text-white text-lg md:text-xl",
                        answerClassName
                      )}
                    >
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          </motion.div>
        ))}
      </Accordion.Root>
    </div>
  );
}