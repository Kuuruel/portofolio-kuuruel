'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import Loading from "@/components/loading";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiSun, FiMoon } from "react-icons/fi";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<string>('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = storedTheme || (prefersDark ? "dark" : "light");
      
      document.documentElement.setAttribute("data-theme", theme);
      setCurrentTheme(theme);
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      setCurrentTheme(newTheme);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 200);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (loading) return;

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              history.replaceState(null, "", `#${id}`);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header className="bg-black/10 backdrop-blur-[2px] py-4 fixed w-full h-[75px] top-0 z-50 animate__animated animate__fadeInDown">
        <div className="w-[90%] mx-auto flex flex-row items-center justify-between">
          <div>
            <a href="#home" className="relative group text-xl md:text-2xl lg:text-3xl">
              <span className="relative z-10">
                <TypeAnimation
                  sequence={["`Kuuruel",5000,"`Angga P",5000]}
                  wrapper="span"
                  speed={10}
                  className="text-purple-500 font-medium"
                  repeat={Infinity}
                  cursor={false}
                />
              </span>
              <span className="absolute left-0 top-1/2 w-full h-2 bg-purple-300 opacity-0 blur-sm rounded group-hover:opacity-100 transition-all duration-300 -translate-y-1/2"></span>
            </a>
          </div>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

          <nav className="hidden md:block">
            <ul className="flex flex-row list-none gap-4 lg:gap-20 items-center">
              <li>
                <a href="#about" className="relative group text-sm lg:text-[1.3rem]">
                  <span className="relative z-10">About</span>
                  <span className="absolute left-0 top-1/2 w-full h-2 bg-purple-300 opacity-0 blur-md rounded group-hover:opacity-100 transition-all duration-300 -translate-y-1/2"></span>
                </a>
              </li>
              <li>
                <a href="#skills" className="relative group text-sm lg:text-[1.3rem]">
                  <span className="relative z-10">Skills</span>
                  <span className="absolute left-0 top-1/2 w-full h-2 bg-purple-300 opacity-0 blur-md rounded group-hover:opacity-100 transition-all duration-300 -translate-y-1/2"></span>
                </a>
              </li>
              <li>
                <a href="#projects" className="relative group text-sm lg:text-[1.3rem]">
                  <span className="relative z-10">Projects</span>
                  <span className="absolute left-0 top-1/2 w-full h-2 bg-purple-300 opacity-0 blur-md rounded group-hover:opacity-100 transition-all duration-300 -translate-y-1/2"></span>
                </a>
              </li>
              <li>
                <a href="#contact" className="relative group text-sm lg:text-[1.3rem]">
                  <span className="relative z-10">Contact</span>
                  <span className="absolute left-0 top-1/2 w-full h-2 bg-purple-300 opacity-0 blur-md rounded group-hover:opacity-100 transition-all duration-300 -translate-y-1/2"></span>
                </a>
              </li>
              <li>
                <a href="https://drive.google.com/uc?export=download&id=1ofqczf9pB7TsG_BW7PvSp7HstdH20hBk" className="relative group text-sm lg:text-[1.3rem]">
                  <span className="relative z-10">CV</span>
                  <span className="absolute left-0 top-1/2 w-full h-2 bg-purple-500 opacity-0 blur-md rounded group-hover:opacity-100 transition-all duration-300 -translate-y-1/2"></span>
                </a>
              </li>
               <li>
                  <button
                    onClick={toggleTheme}
                    className="cursor-pointer group relative flex items-center justify-center w-10 h-10 rounded-full border border-purple-500 transition-all duration-300
                              dark:bg-purple-950/10 hover:shadow-[0_0_10px_rgba(128,0,255,0.5)] text-purple-700 dark:text-white"
                  >
                    {currentTheme === 'dark' ? (
                      <FiSun size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <FiMoon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    )}
                    <span className="sr-only">Toggle Theme</span>
                  </button>
                </li>
            </ul>
          </nav>

          {isMenuOpen && (
            <nav className="md:hidden absolute top-[75px] left-0 w-full bg-black/10">
              <ul className="flex flex-col list-none gap-4 p-4">
                <li>
                  <a href="#about" className="block py-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="block py-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" className="block py-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="block py-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="https://drive.google.com/uc?export=download&id=1ofqczf9pB7TsG_BW7PvSp7HstdH20hBk" className="block py-2 text-lg">
                    CV
                  </a>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="cursor-pointer group relative flex items-center justify-center w-10 h-10 rounded-full border border-purple-500 transition-all duration-300
                              dark:bg-purple-950/10 hover:shadow-[0_0_10px_rgba(128,0,255,0.5)] text-purple-700 dark:text-white"
                  >
                    {currentTheme === 'dark' ? (
                      <FiSun size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <FiMoon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    )}
                    <span className="sr-only">Toggle Theme</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main className="flex flex-col pt-[7vh]">
        <section id="home" className="flex flex-row items-center min-h-screen px-4">
          <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col text-center lg:text-left order-2 lg:order-1 animate__animated animate__fadeInLeft">
              <h1 className="text-lg md:text-xl lg:text-2xl text-gray-400">Hello!, I am</h1>
              <h1 className="text-2xl md:text-3xl lg:text-4xl my-1">Angga Pradita</h1>
              <div className="text-2xl md:text-4xl lg:text-6xl font-bold my-2 bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                <TypeAnimation
                  sequence={[
                    "I'm Web Developer",
                    1000,
                    "I'm UI/UX Designer",
                    1000,
                    "I'm Kurumi Husband",
                    1000,
                    "I'm Alya Husband",
                    1000,
                    "I'm Emilia Husband",
                    1000,
                    "I'm Mahiru Husband",
                    1000,
                    "I'm Saika Husband",
                    1000,
                  ]}
                  wrapper="span"
                  speed={30}
                  className="font-bold"
                  repeat={Infinity}
                  cursor={false}
                />
              </div>
              <p className="text-sm md:text-lg lg:text-xl my-4 max-w-2xl">
                I am currently studying as a student in the Software Engineering (RPL) department at SMK Negeri 1 Denpasar, Bali. While focusing on web development, I&#39;m also learning modern technologies like React, and actively building projects to improve my skills.
              </p>
              <a
                href="https://drive.google.com/uc?export=download&id=1ofqczf9pB7TsG_BW7PvSp7HstdH20hBk"
                className="self-center lg:self-start border border-purple-700 rounded px-6 py-3 hover:bg-purple-950/20 transition mt-4 text-lg md:text-xl cursor-pointer inline-block text-center"
              >
                Get my CV
              </a>

            </div>
            <div className="flex justify-center items-center order-1 lg:order-2 animate__fadeInRight animate__animated mt-8 lg:mt-0">
              <Image
                src="/img/home1.png"
                alt="imgHome"
                width={700}
                height={600}
                className="w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain drop-shadow-[0_0_60px_rgba(128,0,255,0.5)]"
              />
            </div>
          </div>
        </section>

        <section id="about" className="flex flex-col justify-center min-h-screen px-4 py-16">
          <div className="w-[90%] mx-auto">
            <h1 className="text-center text-3xl md:text-5xl lg:text-6xl my-12" data-aos="zoom-in-down">About Me</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center my-16">
              <div data-aos="fade-right">
                <h3 className="text-purple-500 text-2xl md:text-3xl lg:text-4xl font-medium mb-4" >Past</h3>
                <p className="leading-relaxed text-sm md:text-lg lg:text-xl">
                  Started my journey in programming during middle school, learning basic HTML and CSS. Developed passion for creating digital experiences and solving problems through code.
                </p>
              </div>

              <div data-aos="fade-up">
                <h3 className="text-purple-500 text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Present</h3>
                <p className="leading-relaxed text-sm md:text-lg lg:text-xl">
                  Currently, I am a software engineering student at SMKN 1 Denpasar majoring in Software Engineering. I&#39;m currently learning JavaScript, Laravel, React, and UI/UX design using tools like Figma.
                </p>
              </div>

              <div data-aos="fade-left">
                <h3 className="text-purple-500 text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Future</h3>
                <p className="leading-relaxed text-sm md:text-lg lg:text-xl">
                  Aspiring to become a full-stack developer, planning to master modern frameworks like Node.js and React. Looking forward to contributing to innovative projects and continuous learning.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:gap-24">
              <div className="text-center text-lg md:text-xl lg:text-[1.5rem] rounded-lg border border-purple-500 bg-purple-500/10 px-6 py-4 leading-tight" data-aos="fade-up-right">
                2 Years <br />Experience
              </div>
              <div className="text-center text-lg md:text-xl lg:text-[1.5rem] rounded-lg border border-purple-500 bg-purple-500/10 px-6 py-4 leading-tight" data-aos="fade-up-left">
                4+ Projects <br />Completed
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="flex flex-col justify-center items-center min-h-screen px-4 py-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl my-12" data-aos="zoom-in-down">Skills</h1>

          <div className="w-[90%] mx-auto" data-aos="fade-up-right">
            <h2 className="text-2xl md:text-3xl lg:text-4xl my-6 text-left">Front-end</h2>
            <div className="flex flex-wrap justify-start gap-4 lg:gap-6 mb-8" data-aos="fade-up">
              {[
                { title: "HTML5", icon: "https://img.icons8.com/?size=100&id=20909&format=png&color=ffffff" },
                { title: "CSS", icon: "https://img.icons8.com/?size=100&id=21278&format=png&color=ffffff" },
                { title: "JavaScript", icon: "https://img.icons8.com/?size=100&id=108784&format=png&color=ffffff" },
                { title: "Tailwind CSS", icon: "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=ffffff" },
                { title: "Next.js", icon: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=ffffff" },
                { title: "TypeScript", icon: "https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=ffffff" },
              ].map((skill, i) => (
                <div key={i} className="cursor-default flex flex-col sm:flex-row items-center border border-purple-500 bg-purple-500/10 backdrop-blur-sm rounded-lg p-3 lg:p-4 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] transition-all duration-300">
                  <Image className="mb-2 sm:mb-0 sm:ml-2" src={skill.icon} alt={skill.title} width={30} height={30} />
                  <h3 className="text-sm md:text-lg lg:text-xl sm:mx-4 text-center">{skill.title}</h3>
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl my-6 text-left">Back-end</h2>
            <div className="flex flex-wrap justify-start gap-4 lg:gap-6 mb-8" data-aos="fade-up">
              {[
                { title: "Node.js", icon: "https://img.icons8.com/?size=100&id=54087&format=png&color=ffffff" },
                { title: "PHP", icon: "https://img.icons8.com/?size=100&id=UGYn5TapNioV&format=png&color=ffffff" },
                { title: "Laravel", icon: "https://img.icons8.com/?size=100&id=lRjcvhvtR81o&format=png&color=ffffff" },
                { title: "MySQL", icon: "https://img.icons8.com/?size=100&id=UFXRpPFebwa2&format=png&color=ffffff" },
              ].map((skill, i) => (
                <div key={i} className="cursor-default flex flex-col sm:flex-row items-center border border-purple-500 bg-purple-500/10 backdrop-blur-sm rounded-lg p-3 lg:p-4 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] transition-all duration-300">
                  <Image className="mb-2 sm:mb-0 sm:ml-2" src={skill.icon} alt={skill.title} width={30} height={30} />
                  <h3 className="text-sm md:text-lg lg:text-xl sm:mx-4 text-center">{skill.title}</h3>
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl my-6 text-left">Miscellaneous</h2>
            <div className="flex flex-wrap justify-start gap-4 lg:gap-6" data-aos="fade-up">
              {[
                { title: "Git", icon: "https://img.icons8.com/?size=100&id=20906&format=png&color=ffffff" },
                { title: "GitHub", icon: "https://img.icons8.com/?size=100&id=16318&format=png&color=ffffff" },
                { title: "VS Code", icon: "https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=ffffff" },
                { title: "Figma", icon: "https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=ffffff" },
                { title: "Canva", icon: "https://img.icons8.com/?size=100&id=iWw83PVcBpLw&format=png&color=ffffff" },
              ].map((skill, i) => (
                <div key={i} className="cursor-default flex flex-col sm:flex-row items-center border border-purple-500 bg-purple-500/10 backdrop-blur-sm rounded-lg p-3 lg:p-4 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] transition-all duration-300">
                  <Image className="mb-2 sm:mb-0 sm:ml-2" src={skill.icon} alt={skill.title} width={30} height={30} />
                  <h3 className="text-sm md:text-lg lg:text-xl sm:mx-4 text-center">{skill.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl my-12" data-aos="zoom-in-down">Projects</h1>
          <div className="w-[90%] mx-auto">
            {[
              {
                title: "Web Profile Karbiter Group",
                desc: "My independent project is to create information about our group. This website only uses HTML, CSS, and JS.",
                link: "https://karbiterr.netlify.app/",
                img: "/img/Karbiter.png"
              },
              {
                title: "Web Profile DKV",
                desc: "Project that I made with my group to create various information about the DKV department at our school.",
                link: "https://web-profil-dkv-2.netlify.app/",
                img: "/img/Profil dkv.png"
              },
              {
                title: "Design Web Portfolio",
                desc: "First design of my Portfolio Web",
                link: "https://www.figma.com/design/2xSA3samaMN3oAE2Z3PvVw/Desain-Web-Angga-07?node-id=0-1",
                img: "/img/Figma.png"
              },
              {
                title: "Design Web BlueBook",
                desc: "Web design I made for school purposes",
                link: "https://www.figma.com/design/jfxy06xXxPR7H1GQvmmNjO/Untitled?node-id=0-1",
                img: "/img/bluebook.png"
              }
            ].map((proj, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row items-center min-h-[70vh] gap-8 lg:gap-12">
                <div className="flex flex-col items-center justify-center w-full lg:w-1/2" data-aos="fade-right">
                  <Image 
                    src={proj.img} 
                    alt={proj.title} 
                    width={600} 
                    height={400} 
                    className="w-full max-w-2xl border-2 rounded-xl border-purple-500 object-cover" 
                  />
                </div>
                <div className="flex flex-col justify-center w-full lg:w-1/2 gap-4 text-center lg:text-left" data-aos="fade-left">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">{proj.title}</h2>
                  <p className="text-sm md:text-lg lg:text-xl">{proj.desc}</p>
                  <div>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">
                      <button className="cursor-pointer rounded my-2 py-3 px-6 border border-purple-500 hover:bg-purple-950/30 transition text-sm md:text-base">
                        Go to project
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="flex flex-col items-center min-h-screen px-4 py-16">
          <div className="w-[90%] mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl text-center my-12" data-aos="zoom-in-down">Contact</h1>
            <p className="text-sm md:text-lg text-center  mb-12 max-w-2xl mx-auto" data-aos="zoom-in-down">
              Feel free to reach out to me for any projects, collaborations, or just to say hello. I&#39;m always excited to connect with fellow developers and creators.
            </p>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="flex-1 flex flex-col gap-6 lg:gap-8" data-aos="fade-right">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <Image
                      src="https://img.icons8.com/ios-filled/50/000000/marker.png"
                      alt="address-icon"
                      width={28}
                      height={28}
                      className="w-6 h-6 md:w-7 md:h-7"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-medium">Address</h2>
                    <p className="text-sm md:text-base ">Indonesia, Bali.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <Image
                      src="https://img.icons8.com/ios-filled/50/000000/new-post.png"
                      alt="email-icon"
                      width={28}
                      height={28}
                      className="w-6 h-6 md:w-7 md:h-7"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-medium">Email</h2>
                    <p className="text-sm md:text-base ">anjayp271@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <Image
                      src="https://img.icons8.com/ios-filled/50/000000/github.png"
                      alt="github-icon"
                      width={28}
                      height={28}
                      className="w-6 h-6 md:w-7 md:h-7"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-medium">GitHub</h2>
                    <a
                      href="https://github.com/Kuuruel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-purple-400 hover:text-purple-300 transition"
                    >
                      Kuuruel
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex-1 border border-purple-500 p-6 lg:p-8 rounded-lg shadow-lg bg-purple-500/5" data-aos="fade-left">
                <h2 className="text-xl md:text-2xl font-medium mb-6">Send Message</h2>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="bg-transparent placeholder-gray-500 border-b border-gray-400 py-3 outline-none focus:border-purple-500 transition text-sm md:text-base"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-transparent placeholder-gray-500 border-b border-gray-400 py-3 outline-none focus:border-purple-500 transition text-sm md:text-base"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Type your Message..."
                    rows={4}
                    className="bg-transparent placeholder-gray-500 border-b border-gray-400 py-3 outline-none focus:border-purple-500 transition resize-none text-sm md:text-base"
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    className="border border-purple-700 hover:bg-purple-950/30 font-medium py-3 mt-4 rounded transition text-sm md:text-base cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-purple-500/30 py-6 mt-12">
        <div className="w-[90%] mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm">
            <p>Design and Develop by Kuuruel</p>
            <p>@Copyright - 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
}