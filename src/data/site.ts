/**
 * Single source of truth for every piece of copy, link and image path on the page.
 *
 * Content is carried over verbatim from the live TIS site (https://tis.edu.in/)
 * so the redesign keeps the school's own words; only the presentation changes.
 */

export const site = {
  name: "Tulas International School",
  shortName: "TIS",
  established: 2012,
  trust: "Rishabh Educational Trust",
  city: "Dehradun",
  state: "Uttarakhand",
  board: "CBSE",
  type: "Co-Educational Boarding & Day School",
  description:
    "TIS is one of India's top boarding and day schools in Dehradun, India. Our CBSE curriculum focuses on academic excellence, holistic development, and preparing students to be global leaders.",
  url: "https://tis.edu.in",
} as const;

export const contact = {
  helpline: "+91-9837983791",
  helplineDisplay: "+91 98379 83791",
  landlines: ["0135-2699444", "0135-2699666"],
  email: "info@tis.edu.in",
  addressLines: [
    "Tulas International School",
    "Dhoolkot, P.O – Selaqui, Chakrata Road",
    "Dehradun – 248011 (Uttarakhand)",
  ],
  mapUrl: "https://maps.app.goo.gl/maBF8syXueQkw31E6",
  applyUrl: "https://admission.tis.edu.in",
  brochureUrl: "https://tis.edu.in/MandatoryPDF/TIS_BROCHURE.pdf",
  virtualTourUrl: "https://tis.edu.in/virtual-tour/",
  studentPortalUrl: "https://tis.fedena.com/",
} as const;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/tulasinternationalschool/", icon: "/images/brand/facebook.svg" },
  { label: "X", href: "https://twitter.com/tulas_intschool?lang=en", icon: "/images/brand/x.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/school/tulas-international-school/?originalSubdomain=in", icon: "/images/brand/linkedin.svg" },
  { label: "Instagram", href: "https://www.instagram.com/tulasinternationalschool/?hl=en", icon: "/images/brand/instagram.svg" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC-eRtybnv3GvfvcWxQq93zw", icon: "/images/brand/youtube.svg" },
] as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Boarding", href: "#boarding" },
  { label: "Sports", href: "#beyond" },
  { label: "Campus", href: "#campus" },
  { label: "Rankings", href: "#rankings" },
  { label: "Voices", href: "#voices" },
];

export const footerNav: NavItem[] = [
  { label: "FAQ", href: "https://tis.edu.in/faq/" },
  { label: "Calendar", href: "https://tis.edu.in/MandatoryPDF/TIS_CALENDAR_2024__PDF.pdf" },
  { label: "Brochure", href: "https://tis.edu.in/MandatoryPDF/TIS_BROCHURE.pdf" },
  { label: "Mandatory Disclosure", href: "https://tis.edu.in/MandatoryPDF/DisciplinaryPolicy.pdf" },
  { label: "Child Welfare & Safety Policy", href: "https://tis.edu.in/MandatoryPDF/childWelfarePolicy.pdf" },
  { label: "Mobile Phone Policy", href: "https://tis.edu.in/MandatoryPDF/MobilePhonePolicy.pdf" },
  { label: "Privacy Policy", href: "https://tis.edu.in/privacy-policy/" },
  { label: "Terms & Conditions", href: "https://tis.edu.in/terms-conditions/" },
  { label: "Disclaimer", href: "https://tis.edu.in/disclaimer/" },
];

export const hero = {
  eyebrow: `Admissions open · ${site.board} · ${site.city}`,
  titleLines: ["Let's do it", "with Tulas"],
  lead: site.description,
  primaryCta: { label: "Apply Now", href: contact.applyUrl },
  secondaryCta: { label: "Enquire Now", href: `#enquire` },
  image: "/images/hero/campus-aerial.webp",
  imageAlt: "Aerial view of the Tulas International School campus in Dehradun",
  marquee: [
    "Boarding Life",
    "16+ Olympic Sports",
    "CBSE Curriculum",
    "22 Acre Campus",
    "6:1 Student Teacher Ratio",
    "24×7 Medical",
    "Holistic Development",
  ],
} as const;

export const about = {
  eyebrow: "About TIS",
  lead: "Boarding and Day School Excellence",
  body: [
    "We provide world-class education, modern facilities, and a nurturing environment for students to thrive academically, socially, and culturally.",
    "Join TIS to be part of a community that encourages leadership, innovation, and lifelong learning.",
  ],
  founding: `Tulas International School was established in ${site.established} under the aegis of the ${site.trust} to impart education through seamless opportunities.`,
  pillars: [
    {
      title: "Boarding and Day School Excellence",
      body: "World-class education, modern facilities, and a nurturing environment for students to thrive academically, socially, and culturally. Join TIS to be part of a community that encourages leadership, innovation, and lifelong learning.",
    },
    {
      title: "Academic Excellence",
      body: "Our CBSE curriculum focuses on academic excellence, holistic development, and preparing students to be global leaders — from the classroom to the competition arena.",
    },
    {
      title: "Made for the Future",
      body: "A thoughtfully planned 22-acre campus, a 6:1 student teacher ratio and 24×7 medical assistance give every learner the room, care and support to thrive.",
    },
  ] as const,
  quotes: [
    {
      text: "We feel supported in what we do and nudged further to do more",
      body: "At Tulas, we believe in bringing out the best in every student—whether it's academics, music, art, or drama. With the right support and inspiration, creativity finds its way. For us, school isn't just about lessons, it's about endless opportunities waiting to be explored.",
      image: "/images/hero/lady-in-pink.webp",
      alt: "TIS student smiling in a pink uniform",
    },
    {
      text: "Tulas helped me thrive and become the best version of myself",
      body: "When you choose a school that chooses you, it becomes more than just a place to learn—it becomes a place to belong, grow, and shine. At Tulas International School, we see the potential in every student and help them bring it to life.",
      image: "/images/hero/man-in-blue.webp",
      alt: "TIS student in a blue uniform",
    },
  ] as const,
} as const;

export const academics = {
  eyebrow: "Academics",
  title: "Learning that leads somewhere",
  lead: "A CBSE curriculum built around academic excellence, holistic development, and preparing students to be global leaders.",
  cards: [
    {
      index: "01",
      title: "Academics",
      body: "A rigorous CBSE programme with small-group teaching, structured remediation and a 6:1 student teacher ratio that keeps every learner visible.",
      points: ["CBSE curriculum", "6:1 student teacher ratio", "Structured remediation"],
    },
    {
      index: "02",
      title: "Boarding Life",
      body: "A warm, structured home away from home — supervised round the clock, with 24×7 medical assistance on a 22-acre campus.",
      points: ["24×7 medical assistance", "Supervised living", "Pollution-free campus"],
    },
    {
      index: "03",
      title: "Beyond Academics",
      body: "16+ sports plus art, music, drama and robotics — the arenas where curiosity leads and confidence is built.",
      points: ["16+ Olympic sports", "Art, music & drama", "Club culture"],
    },
    {
      index: "04",
      title: "Admission",
      body: "A clear, parent-friendly process for Classes IV to XII, with a dedicated admission helpline and an online application portal.",
      points: ["Classes IV – XII", "Online application", "Parent helpline"],
    },
  ] as const,
} as const;

export const beyond = {
  eyebrow: "Beyond Academics",
  title: "Sports? It's not just a facility. At Tulas it's the foundation!",
  body: "16+ sports curated to bring joy and discipline to your life.",
  items: [
    { name: "Archery", image: "/images/sports/archery.webp" },
    { name: "Cycling", image: "/images/sports/cycling.webp" },
    { name: "Hockey", image: "/images/sports/hockey.webp" },
    { name: "Swimming", image: "/images/sports/swimming.webp" },
    { name: "Taekwondo", image: "/images/sports/taekwondo.webp" },
    { name: "Football", image: "/images/sports/football.webp" },
    { name: "Shooting Range", image: "/images/sports/shooting.webp" },
    { name: "Horse Riding", image: "/images/sports/horse-riding.webp" },
    { name: "Billiards", image: "/images/sports/billiards.webp" },
    { name: "Squash", image: "/images/sports/squash.webp" },
    { name: "Volleyball", image: "/images/sports/volleyball.webp" },
    { name: "Basketball", image: "/images/sports/basketball.webp" },
    { name: "Cricket", image: "/images/sports/cricket.webp" },
    { name: "Lawn Tennis", image: "/images/sports/lawn-tennis.webp" },
    { name: "Badminton", image: "/images/sports/badminton.webp" },
    { name: "Table Tennis", image: "/images/sports/table-tennis.webp" },
  ] as const,
  gallery: [
    { src: "/images/hero/gallery-1.webp", label: "Performing arts", alt: "TIS student taking part in a cultural performance" },
    { src: "/images/hero/gallery-2.webp", label: "Sporting spirit", alt: "TIS student training on the sports field" },
    { src: "/images/hero/gallery-5.webp", label: "Karate", alt: "Martial arts training at TIS" },
    { src: "/images/hero/gallery-6.webp", label: "Swimming", alt: "Swimming training at the TIS pool" },
    { src: "/images/hero/gallery-7.webp", label: "Pottery", alt: "Pottery studio activity" },
    { src: "/images/hero/gallery-8.webp", label: "Dance", alt: "Dance performance by TIS students" },
  ] as const,
} as const;

export const secret = {
  eyebrow: "At TIS",
  question: "What's the secret to making school awesome?",
  body: "The secret to making one's school experience truly unforgettable? It's all about making learning feel like an adventure—where curiosity leads, creativity thrives, and every day brings something new to discover. When students are inspired, they don't just learn—they grow, explore, and shape their own futures. There, we cracked it!",
  image: "/images/ui/at-tis.webp",
  imageAlt: "TIS students celebrating together",
  stamp: "There, we cracked it!",
} as const;

export const campusStats = [
  { value: 22, suffix: "", label: "Acre pollution free campus", image: "/images/stats/pollution-free.webp" },
  { value: 16, suffix: "+", label: "Olympic sports", image: "/images/stats/sports.webp" },
  { value: 24, suffix: "×7", label: "Medical assistance", image: "/images/stats/medical.webp" },
  { value: 6, suffix: ":1", label: "Student teacher ratio", image: "/images/stats/ratio.webp" },
] as const;

export const rankings = {
  eyebrow: "Recognition",
  title: "Ranked by the people who rank schools",
  items: [
    { rank: "#1", title: "In Dehradun", body: "Co-Educational Boarding School in Dehradun by Education Today" },
    { rank: "#2", title: "In Uttarakhand", body: "Co-Educational Boarding School in North India by Education Today" },
    { rank: "#1", title: "In North India", body: "Co-Educational Boarding School in North India by Outlook" },
    { rank: "#4", title: "In India", body: "Co-Educational Boarding School in India by Education Today" },
  ] as const,
};

export type Personality = { name: string; role: string; image: string };

export const personalities = {
  eyebrow: "On campus",
  sports: {
    label: "Sports & Social",
    people: [
      { name: "Sakshi Malik", role: "First Indian wrestler to win a medal in the Rio 2016 Olympics, Olympics Bronze Medalist in Wrestling, Silver Medalist in 2014 Commonwealth Games, Rajeev Gandhi Khel Ratan Awardee 2016, Padma Shri Awardee 2017", image: "/images/people/sakshi-malik.webp" },
      { name: "Vishesh Bhriguvanshi", role: "Indian Basketball Team Captain & major FIBA Asia Championship player. Under his captaincy Team India won a 3x3 basketball gold medal at the Asian Beach Games in 2008", image: "/images/people/vishesh-bhriguvanshi.webp" },
      { name: "Prakashi Tomar & Late Ms Chandro Tomar", role: "Based on their real life, Bhumi Pednekar & Taapsee Pannu acted in the biopic movie “Saand ke Aakh” known as Shooter Dadi, 30 National Championship winner", image: "/images/people/prakashi-tomar.webp" },
      { name: "Abhishek Verma", role: "6th highest world ranking, Arjuna Awardee, Asian Games gold medalist in Archery 2013", image: "/images/people/abhishek-verma.webp" },
      { name: "Aditi Gopichand Swami", role: "7th highest world ranking, Arjuna Awardee, World Champion in Archery 2024", image: "/images/people/aditi-gopichand-swami.webp" },
      { name: "Jeevan Jyot Singh Teja", role: "Dronacharya Awardee in Archery 2022", image: "/images/people/jeevan-jyot-singh-teja.webp" },
      { name: "Ojus Devtale", role: "9th highest world ranking, Arjuna Awardee 2023 and current world champion in Archery", image: "/images/people/ojas-pravin-deotale.webp" },
      { name: "Rajat Chauhan", role: "5th highest world ranking, Arjuna Awardee 2016 in Archery", image: "/images/people/rajat-chauhan.webp" },
      { name: "Devendra Singh Bisht", role: "Under-18 school Indian football team selector", image: "/images/people/devendra-singh-bisht.webp" },
      { name: "Manish Metani", role: "Indian football player", image: "/images/people/manish-metani.webp" },
      { name: "Saurabh Joshi", role: "Influencer with 30 million subscribers on YouTube", image: "/images/people/saurabh-joshi.webp" },
      { name: "Arushi Nishank", role: "Kathak dancer, actor, film producer, environmentalist, TEDx speaker, and National Convener of Sparsh Ganga", image: "/images/people/arushi-nishank.webp" },
      { name: "Lakshmi Agarwal", role: "International Women Empowerment Award from the Ministry of Women and Child Development, Founder and President of The Laxmi Foundation, a NGO dedicated to acid attack victims", image: "/images/people/lakshmi-agarwal.webp" },
    ] as Personality[],
  },
  leaders: {
    label: "Leaders of India",
    people: [
      { name: "Shri Dhan Singh Rawat Ji", role: "Minister of Higher Education, Uttarakhand", image: "/images/people/dhan-singh-rawat.webp" },
      { name: "Shri Trivendra Singh Rawat Ji", role: "Member of Parliament & former Chief Minister, Uttarakhand", image: "/images/people/trivendra-singh-rawat.webp" },
      { name: "Shri Subodh Uniyal Ji", role: "Technical Education and Forest Minister, Uttarakhand", image: "/images/people/subodh-uniyal.webp" },
      { name: "Dr Ramesh Pokhriyal Nishank Ji", role: "Former Union Cabinet Minister for Education, Government of India | Former Chief Minister of Uttarakhand", image: "/images/people/ramesh-pokhriyal-nishank.webp" },
      { name: "Shri Bhagat Singh Koshyari Ji", role: "Former Governor of Maharashtra and Goa, former Chief Minister of Uttarakhand", image: "/images/people/bhagat-singh-koshyari.webp" },
      { name: "Shri Dharmendra Pradhan Ji", role: "Union Minister of Education for India", image: "/images/people/dharmendra-pradhan.webp" },
      { name: "Shri Anurag Tripathi Ji", role: "CBSE Secretary Uttarakhand", image: "/images/people/anurag-tripathi.webp" },
      { name: "Shri Arvind Pandey Ji", role: "MLA, former Education Minister", image: "/images/people/arvind-pandey.webp" },
      { name: "Shri Namami Bansal Ji", role: "I.A.S Municipal Commissioner Uttarakhand", image: "/images/people/namami-bansal.webp" },
      { name: "Shri Abhinav Kumar Ji", role: "ADG and former DGP of Uttarakhand Police", image: "/images/people/abhinav-kumar.webp" },
      { name: "Shri Janmejaya Khanduri Ji", role: "IG Dehradun — Government of India", image: "/images/people/janmejaya-khanduri.webp" },
      { name: "Shri Ashok Kumar Ji", role: "Former DGP, Uttarakhand", image: "/images/people/ashok-kumar.webp" },
      { name: "Shri Amit Kumar Sinha Ji", role: "ADG, Principal Secretary Sports, Uttarakhand", image: "/images/people/amit-kumar-sinha.webp" },
      { name: "Shri Sunil Uniyal Gama Ji", role: "Former Mayor, Municipal Corporation, Dehradun", image: "/images/people/sunil-uniyal-gama.webp" },
      { name: "Shri Sahdev Singh Pundir Ji", role: "MLA Sahaspur, Uttarakhand", image: "/images/people/sahdev-singh-pundir.webp" },
    ] as Personality[],
  },
} as const;

export const testimonials = {
  eyebrow: "From the parents",
  lead: "We have seen a remarkable improvement in our child's confidence and skills since joining Tulas. The teachers here are genuinely dedicated to bringing out the best in every student, nurturing their strengths and helping them grow in all aspects of life.",
  items: [
    { name: "Tashi Tsering", relation: "F/O Jigmet Skaldon", quote: "I would like to convey a big thanks to the Management and Teachers of Tulas International School for taking good care of my son.", image: "/images/reviews/tashi-tsering.webp" },
    { name: "Namita Agarwal", relation: "M/O Krishna Agarwal", quote: "Tulas gives a comprehensive environment for our child to grow. The sports, academics and extra-curricular activities have helped Krishna in knowing himself better.", image: "/images/reviews/namita-agarwal.webp" },
    { name: "Sandeep Kumar", relation: "F/O Aryan", quote: "Our experience is very amazing with school. Staff is very cooperative and supportive. Our son always admires the school whenever we talk with him.", image: "/images/reviews/sandeep-kumar.webp" },
    { name: "Pinky Sharma", relation: "M/O Swastik Sharma", quote: "I am happy and satisfied with the wonderful experience of my son in this school. Teachers are very good especially Shweta Ma'am. She is always available when I need her.", image: "/images/reviews/pinky-sharma.webp" },
    { name: "Suresh Kumar", relation: "F/O Aditya Kumar", quote: "Tulas International School is doing excellent in all the fields especially giving a lot of exposure to children. Very nicely planned and organized academic programme. Good efforts by all teachers.", image: "/images/reviews/suresh-kumar.webp" },
    { name: "Mrs Urja Bhayani", relation: "M/O Shikha & Samarth Bhayani", quote: "Right from the beginning, we have been in touch with Robin Sir and Shweta Ma'am. Both are very helpful and cooperative. Teachers are passionate and helpful towards academics.", image: "/images/reviews/urja-bhayani.webp" },
    { name: "Amit Agrawal", relation: "F/O Samruddhi Agrawal", quote: "Being a parent it's a big challenge to find a boarding school that qualifies your parameters of security, health, hygiene, academics, non-academics and self discipline being key features.", image: "/images/reviews/amit-agrawal.webp" },
    { name: "Ashu Arora", relation: "M/O Manisha Changrani", quote: "It has been a fantastic journey for our daughter in Tulas International School so far. The boarding and infrastructure facility are excellent. We have seen significant improvement in Manisha.", image: "/images/reviews/ashu-arora.webp" },
    { name: "Gulabdas Gupta", relation: "F/O Annika Gulabdas Gupta", quote: "We admitted our daughter, Annika Gulabdas Gupta, in class VIII this year in Tulas. She is very much satisfied with the facilities offered at Tulas related to education, extra-curricular activities, recreation & hygiene.", image: "/images/reviews/gulabdas-gupta.webp" },
    { name: "Selendra K. Ajmera", relation: "F/O Aman Ajmera", quote: "Hi Tulas! In the beginning it was very tough for me to send my son to a boarding school but the day I visited the campus the first thing which came to my mind was that this is the right place and right environment.", image: "/images/reviews/selendra-ajmera.webp" },
  ] as const,
};

export const awards = {
  eyebrow: "Awards",
  lead: "We believe in celebrating the hard work and perseverance of the best!",
  items: [
    { image: "/images/awards/top-boarding.webp", title: "Top Boarding School", alt: "Top Boarding School award" },
    { image: "/images/awards/best-residential.webp", title: "Best Residential School", alt: "Best Residential School award" },
    { image: "/images/awards/uttarakhand.webp", title: "Uttarakhand recognition", alt: "Uttarakhand award" },
  ] as const,
  cta: { label: "See All Awards", href: "https://tis.edu.in/" },
};

export const partners = {
  eyebrow: "Collaborations",
  lead: "12+ collaborations",
  items: [
    { image: "/images/partners/universidad.webp", name: "Universidad" },
    { image: "/images/partners/yhnbepcntet.webp", name: "YHNB EPCNCTET" },
    { image: "/images/partners/universitat.webp", name: "Universitat" },
    { image: "/images/partners/cpi6.webp", name: "CPI6" },
    { image: "/images/partners/inseec.webp", name: "INSEEC" },
    { image: "/images/partners/trinity.webp", name: "Trinity" },
    { image: "/images/partners/university.webp", name: "University" },
    { image: "/images/partners/international-award.webp", name: "International Award for Young People" },
    { image: "/images/partners/lions.webp", name: "Lions" },
    { image: "/images/partners/inseec-u.webp", name: "INSEEC University" },
    { image: "/images/partners/universitas.webp", name: "Universitas" },
    { image: "/images/partners/university-logo.webp", name: "University Logo" },
  ] as const,
};

export const enquiry = {
  eyebrow: "Admissions",
  title: "Come and see the campus for yourself",
  body: "Tours run through the week. Call the admission helpline, or send an enquiry and our team will get back to you within one working day.",
  classes: [
    "Class IV", "Class V", "Class VI", "Class VII", "Class VIII",
    "Class IX", "Class X", "Class XI", "Class XII",
  ] as const,
} as const;
