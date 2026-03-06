import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import {
MapPin,
Phone,
Mail,
Star,
ChevronRight,
Menu,
X,
Wifi,
Waves,
Utensils,
Dumbbell,
Sparkles,
Calendar,
ArrowRight
} from 'lucide-react';

// Hotel Data
const hotelData = {
name: "Hotel Indigo Bali Seminyak Beach",
tagline: "Where Tradition Meets Modern Luxury",
location: "Seminyak, Bali, Indonesia",
address: "Jl. Camplung Tanduk No. 10, Seminyak, Bali 80361",
phone: "+62 361 935 8888",
email: "reservations@hotelindigobali.com",
rating: 4.8,
reviews: 2847,
description: "Situated on Bali's most vibrant beachfront, Hotel Indigo Bali Seminyak Beach is your home base to experience bountiful unique island life. A place where centuries of traditions and cultures blend with an atmosphere of casual sophistication.",
coordinates: { lat: -8.6908, lng: 115.1625 }
};

const rooms = [
{
name: "Superior Room",
description: "Garden view sanctuary with signature spa-inspired bathroom",
price: "From $317/night",
image: "https://kimi-web-img.moonshot.cn/img/indigo-cms.mindimedia.net/1ac40aba63e08d0e593cc87ff65ee3c58b922a68.webp",
features: ["King Bed", "Garden View", "Balcony", "40 m²"]
},
{
name: "Premium Suite",
description: "Luxurious suite with separate living area and ocean glimpses",
price: "From $450/night",
image: "https://kimi-web-img.moonshot.cn/img/seminyak.hotelindigo.com/4801c479366c84731048efd66f3c2317b7114f2a.webp",
features: ["King Bed", "Ocean View", "Living Room", "65 m²"]
},
{
name: "Pool Villa",
description: "Private sanctuary with plunge pool and butler service",
price: "From $890/night",
image: "https://kimi-web-img.moonshot.cn/img/digital.ihg.com/347ee7117494545e62e564ae3a0f593e2181a303",
features: ["Private Pool", "Butler Service", "Garden", "120 m²"]
}
];

const amenities = [
{ icon: Waves, title: "Beach Access", desc: "Direct access to Seminyak Beach" },
{ icon: Utensils, title: "7 Restaurants", desc: "World-class dining experiences" },
{ icon: Sparkles, title: "Sava Spa", desc: "Traditional Balinese treatments" },
{ icon: Dumbbell, title: "24h Fitness", desc: "State-of-the-art equipment" },
{ icon: Wifi, title: "Free WiFi", desc: "High-speed throughout resort" },
{ icon: Calendar, title: "Events", desc: "3 meeting rooms, 1,180 sq ft" }
];

const reviews = [
{
name: "Sarah Mitchell",
location: "London, UK",
rating: 5,
text: "Absolutely stunning property. The attention to detail in the design is remarkable. Staff went above and beyond to make our anniversary special.",
date: "2 weeks ago"
},
{
name: "James Chen",
location: "Singapore",
rating: 5,
text: "Perfect location right on Seminyak Beach. The rooms are beautifully appointed with local art. SugarSand bar is a must-visit for sunset cocktails.",
date: "1 month ago"
},
{
name: "Emma Thompson",
location: "Sydney, Australia",
rating: 5,
text: "The pool villa exceeded all expectations. Private butler service was impeccable. Already planning our return trip!",
date: "2 months ago"
}
];

const galleryImages = [
"https://kimi-web-img.moonshot.cn/img/dynamic-media-cdn.tripadvisor.com/75878b34027dd063f5ade53d7479dd668dd02895.jpg",
"https://kimi-web-img.moonshot.cn/img/dynamic-media-cdn.tripadvisor.com/e907964d2ac86e5872f706566059778cae50cfe8.jpg",
"https://kimi-web-img.moonshot.cn/img/blog.inivie.com/b99f3f7c8cbd68210d5437a2bb8c8ca992ae650f.jpg",
"https://kimi-web-img.moonshot.cn/img/balidriverandtour.com/fba2b8277c9d130ec176997234fab81fddd0b10b.jpg"
];

// Animation Variants
const fadeInUp = {
hidden: { opacity: 0, y: 60 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}
};

const staggerContainer = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: { staggerChildren: 0.15, delayChildren: 0.2 }
}
};

const scaleIn = {
hidden: { opacity: 0, scale: 0.9 },
visible: {
opacity: 1,
scale: 1,
transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}
};

const slideIn = {
hidden: { opacity: 0, x: -60 },
visible: {
opacity: 1,
x: 0,
transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}
};

export default function HotelWebsite() {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrollY, setScrollY] = useState(0);
const [activeSection, setActiveSection] = useState('hero');

const heroRef = useRef(null);
const aboutRef = useRef(null);
const roomsRef = useRef(null);
const amenitiesRef = useRef(null);
const galleryRef = useRef(null);
const reviewsRef = useRef(null);
const locationRef = useRef(null);
const contactRef = useRef(null);

const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
stiffness: 100,
damping: 30,
restDelta: 0.001
});

useEffect(() => {
const handleScroll = () => {
setScrollY(window.scrollY);

// Determine active section  
  const sections = [  
    { ref: heroRef, id: 'hero' },  
    { ref: aboutRef, id: 'about' },  
    { ref: roomsRef, id: 'rooms' },  
    { ref: amenitiesRef, id: 'amenities' },  
    { ref: galleryRef, id: 'gallery' },  
    { ref: reviewsRef, id: 'reviews' },  
    { ref: locationRef, id: 'location' },  
    { ref: contactRef, id: 'contact' }  
  ];  
    
  const current = sections.find(section => {  
    if (section.ref.current) {  
      const rect = section.ref.current.getBoundingClientRect();  
      return rect.top <= 100 && rect.bottom >= 100;  
    }  
    return false;  
  });  
    
  if (current) setActiveSection(current.id);  
};  

window.addEventListener('scroll', handleScroll, { passive: true });  
return () => window.removeEventListener('scroll', handleScroll);

}, []);

const scrollToSection = (ref) => {
ref.current?.scrollIntoView({ behavior: 'smooth' });
setIsMenuOpen(false);
};

return (
<div className="min-h-screen bg-stone-50 overflow-x-hidden">
<Head>
<title>{hotelData.name} | Luxury Beachfront Resort</title>
<meta name="description" content={hotelData.description} />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>

{/* Progress Bar */}  
  <motion.div  
    className="fixed top-0 left-0 right-0 h
