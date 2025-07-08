"use client";

import Aurora from "./components/Aurora";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Loader from "./components/Loader";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BubbleChat } from 'flowise-embed-react';
import ScrollTooltip from "./components/ScrollTooltip";

export default function Home() {
  const [amplitude, setAmplitude] = useState(2.0);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      if (window.matchMedia('(max-width: 640px)').matches) {
        setAmplitude(1.0);
      } else {
        setAmplitude(2.0);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // Loader timer
    const timer = setTimeout(() => setFadeOut(true), 2000);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const fadeTimer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(fadeTimer);
    }
  }, [fadeOut]);

  if (loading) return <Loader fadeOut={fadeOut} />;

  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[18rem] sm:h-[28rem] md:h-[40rem] lg:h-[45rem] z-0 pointer-events-none">
            <motion.div
              className="absolute top-0 left-0 w-full h-[18rem] sm:h-[28rem] md:h-[40rem] lg:h-[45rem] z-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
            <Aurora colorStops={["#22d3ee", "#38bdf8", "#a78bfa", "#22d3ee"]} blend={1.0} amplitude={amplitude} speed={0.8} />
            </motion.div>
          </div>
          <Hero />
        </div>
        <Problem />
        <div className="flex flex-col items-center w-full bg-transparent px-4 md:px-12 xl:px-32 2xl:px-64 py-12 md:py-20">
          <div className="w-full max-w-7xl flex flex-col gap-24 md:gap-32 xl:gap-40">
            <Solution />
            <HowItWorks />
          </div>
        </div>
      </div>
      <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 bg-[#020617] py-0">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-24 md:gap-32 xl:gap-40">
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
        </div>
      </div>
      <BubbleChat
        chatflowid="78519a52-afd9-4713-9925-7f1d482d5ed0"
        apiHost="https://flowise-1-jwwt.onrender.com"
        chatflowConfig={{}}
        observersConfig={{
          observeUserInput: () => {},
          observeLoading: () => {},
          observeMessages: () => {}
        }}
        theme={{
          button: {
            backgroundColor: '#3B81F6',
            right: 20,
            bottom: 20,
            size: 48,
            dragAndDrop: true,
            iconColor: 'white',
            customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
            autoWindowOpen: {
              autoOpen: false,
              openDelay: 5,
              autoOpenOnMobile: false
            }
          },
          tooltip: {
            showTooltip: false,
            tooltipMessage: '',
            tooltipBackgroundColor: '',
            tooltipTextColor: '',
            tooltipFontSize: 16
          },
          customCSS: `
            .flowise-footer {
              display: none !important;
            }
          `,
          chatWindow: {
            showTitle: true,
            showAgentMessages: true,
            title: 'ChatBuddy',
            titleAvatarSrc: '/ChatBuddy-logo-fej-hatterrel.svg',
            welcomeMessage: 'Kérdésed van a működésről vagy a megtérülésről? Segítek.',
            errorMessage: 'Egy hiba történt. Kérlek próbáld újra.',
            backgroundColor: '#f9fafb',
            backgroundImage: 'enter image path or link',
            height: 700,
            width: 400,
            fontSize: 16,
            starterPrompts: [
              "💬 Miben tudsz segíteni?",
              "🧮 Mennyit spórolhatok veled havonta?"
            ],
            starterPromptFontSize: 15,
            clearChatOnReload: false,
            sourceDocsTitle: 'Sources:',
            renderHTML: true,
            botMessage: {
              backgroundColor: '#f1f2f5',
              textColor: '#303235',
              showAvatar: true,
              avatarSrc: '/ChatBuddy-logo-fej-hatterrel.png'
            },
            userMessage: {
              backgroundColor: '#3B81F6',
              textColor: '#f9fafb',
              showAvatar: true,
              avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
            },
            textInput: {
              placeholder: 'Segíthetek? Kérdezz bátran!',
              backgroundColor: '#f9fafb',
              textColor: '#303235',
              sendButtonColor: '#3B81F6',
              maxChars: 50,
              maxCharsWarningMessage: 'Túl sok karakter. Kérlek adj meg 50 karakternél kevesebbet.',
              autoFocus: true,
              sendMessageSound: true,
              sendSoundLocation: 'send_message.mp3',
              receiveMessageSound: true,
              receiveSoundLocation: 'receive_message.mp3'
            },
            feedback: {
              color: '#303235'
            },
            dateTimeToggle: {
              date: true,
              time: true
            },
            footer: {
              textColor: '#303235',
              text: '',
              company: '',
              companyLink: ''
            }
          }
        }}
      />
      <ScrollTooltip />
    </>
  );
}
