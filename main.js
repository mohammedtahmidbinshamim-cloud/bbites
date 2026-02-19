import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // Hero Animation
    const heroTl = gsap.timeline();

    heroTl.from(".hero-content h1", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5
    })
        .from(".hero-content p", {
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.2")
        .from("nav", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=1");

    // Hero Scroll Interaction (Zoom to Background)
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=100%", // Pin for 100% viewport height scroll distance
            scrub: true,
            pin: true
        }
    });

    tl.to(".hero-bg", {
        width: "100%",
        height: "100vh",
        top: "50%",
        borderRadius: 0,
        ease: "power2.inOut"
    }, 0)
        .to(".hero-overlay", {
            backgroundColor: "rgba(20, 45, 29, 0.6)", // Dim the background
            ease: "power2.inOut"
        }, 0)
        .to(".hero", {
            color: "#FFFFFF",
            ease: "power2.inOut"
        }, 0);

    // Section Animations
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        gsap.from(section.children, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%", // Start when top of section hits 80% viewport height
                toggleActions: "play none none reverse"
            }
        });
    });

    // Product Hover Interaction (optional JS enhancement to CSS)
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        product.addEventListener("mouseenter", () => {
            gsap.to(product.querySelector("img"), { scale: 1.05, duration: 0.5 });
        });
        product.addEventListener("mouseleave", () => {
            gsap.to(product.querySelector("img"), { scale: 1, duration: 0.5 });
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector("nav");

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("active");
            menuBtn.classList.toggle("active"); // Optional: for burger to X animation
        });

        // Close menu when a link is clicked
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuBtn.classList.remove("active");
            });
        });
    }
    // Smart Navbar
    const header = document.querySelector("header");
    ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
            if (self.direction === 1 && self.scroll() > 100) {
                header.classList.add("header-hidden");
            } else if (self.direction === -1) {
                header.classList.remove("header-hidden");
            }
        }
    });
});
