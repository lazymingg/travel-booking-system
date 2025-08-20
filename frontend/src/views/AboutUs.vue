<script setup>
import HeaderModal from '@/components/HeaderModal.vue';
import FooterModal from '@/components/FooterModal.vue';

const team = [
  {
    name: 'Trần Cao Vân',
    role: 'Full-Stack Developer',
    roleBg: 'var(--accent-green)',
    roleText: '#fff',
    desc: 'Develops user interfaces and optimizes experiences across all devices.',
    avatar: 'src/assets/Image/Teams/TranCaoVan.jpg',
  },
  {
    name: 'Nguyễn Hữu Anh Trí',
    role: 'Front-end Developer',
    roleBg: 'var(--accent-purple)',
    roleText: '#fff',
    desc: 'Designs and builds server systems, ensuring data security.',
    avatar: 'src/assets/Image/Teams/NguyenHuuAnhTri.jpg',
  },
  {
    name: 'Lê Thanh Phong',
    role: 'UI/UX Designer',
    roleBg: 'var(--accent-orange)',
    roleText: '#fff',
    desc: 'Creates intuitive, friendly, and easy-to-use interfaces.',
    avatar: 'src/assets/Image/Teams/LeThanhPhong.jpg',
  },
  {
    name: 'Nguyễn Văn Minh',
    role: 'Back-end Developer',
    roleBg: 'var(--accent-teal)',
    roleText: '#fff',
    desc: 'Builds marketing strategies and connects customers with our products.',
    avatar: 'src/assets/Image/Teams/NguyenVanMinh.jpg',
  },
  {
    name: 'Lê Trung Kiên',
    role: 'Project Manager',
    roleBg: 'var(--primary)',
    roleText: '#fff',
    desc: 'Manages progress, coordinates team members, and ensures project quality.',
    avatar: 'src/assets/Image/Teams/LeTrungKien.jpg',
  }
]

const values = [
  {
    icon: '🌟',
    title: 'Quality',
    desc: 'Committed to the best service, carefully vetting every partner.',
    bg: 'var(--accent-purple)'
  },
  {
    icon: '🤝',
    title: 'Trust',
    desc: 'Transparent information and secure customer data.',
    bg: 'var(--accent-teal)'
  },
  {
    icon: '🚀',
    title: 'Innovation',
    desc: 'Continuously updating technology and optimizing user experience.',
    bg: 'var(--accent-orange)'
  },
  {
    icon: '💚',
    title: 'Dedication',
    desc: 'Supportive team, always listening to customers.',
    bg: 'var(--accent-green)'
  }
]

const stats = {
  hotels: 5000,
  users: 120,
  partners: 50
}

const testimonials = [
  {
    name: 'Linh Nguyen',
    role: 'Customer',
    feedback: 'Booking was super fast, great prices, and very enthusiastic support!',
    image: 'src/assets/Image/Teams/TranCaoVan.jpg',
  },
  {
    name: 'Minh Tran',
    role: 'Partner Business',
    feedback: 'Easy room management, reaching new customers every day.',
    image: 'src/assets/Image/Teams/TranCaoVan.jpg',
  },
  {
    name: 'Ha Pham',
    role: 'Customer',
    feedback: 'Friendly interface, lots of hotel choices that fit my needs. Great experience!',
    image: 'src/assets/Image/Teams/TranCaoVan.jpg',
  }
]
</script>

<template>
  <HeaderModal />
    <div class="about-root">
      <!-- About Intro -->
      <section class="about-intro">
        <h1>About Us</h1>
        <p>
          <strong>WeGo</strong> is a smart travel platform where you can easily search, compare, and book thousands of hotels, resorts, and homestays nationwide.
          We are committed to providing the fastest, safest, and most cost-effective booking experience, making your journey complete and memorable.
        </p>
      </section>
  
      <!-- Vision & Mission -->
      <section class="vision-mission">
        <div class="vision-card">
          <h2>Vision</h2>
          <p>
            To become the leading travel platform in Southeast Asia, connecting millions of travelers with great experiences and quality services.
          </p>
        </div>
        <div class="mission-card">
          <h2>Mission</h2>
          <p>
            To deliver convenience, transparency, and optimal value to customers through technology and a dedicated team.
          </p>
        </div>
      </section>
  
      <!-- Core Values -->
      <section class="core-values">
        <h2>Core Values</h2>
        <div class="values-grid">
          <div class="value-card" v-for="value in values" :key="value.title">
            <div class="value-icon" :style="{ background: value.bg }">
              <span>{{ value.icon }}</span>
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.desc }}</p>
          </div>
        </div>
      </section>
  
      <!-- Testimonials -->
      <section class="testimonials">
        <h2>Customer Feedback</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="t in testimonials" :key="t.name">
            <div class="testimonial-avatar">
              <div class="avatar-placeholder"><img :src="t.image" alt="Avatar" class="testimonial-img" /></div>
            </div>
            <div class="testimonial-content">
              <p class="testimonial-text">"{{ t.feedback }}"</p>
              <div class="testimonial-name">{{ t.name }}</div>
              <div class="testimonial-role">{{ t.role }}</div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Team Section -->
      <section class="team-section">
        <h2>Development Team</h2>
        <div class="team-grid">
          <div class="team-card" v-for="member in team" :key="member.name">
            <div class="avatar">
              <div class="avatar-placeholder"><img :src="member.avatar" alt="Avatar" class="team-img" /></div>
            </div>
            <div class="member-blocks">
              <div class="member-name-block">
                <h3 class="member-name">{{ member.name }}</h3>
              </div>
              <div class="member-role-block">
                <span class="member-role" :style="{ background: member.roleBg, color: member.roleText }">{{ member.role }}</span>
              </div>
              <div class="member-desc-block">
                <p class="member-desc">{{ member.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Achievements -->
      <section class="achievements">
        <h2>Achievements & Partners</h2>
        <div class="achievements-grid">
          <div class="achievement-stat">
            <div class="stat-number">+{{ stats.hotels }}</div>
            <div class="stat-label">Hotels</div>
          </div>
          <div class="achievement-stat">
            <div class="stat-number">+{{ stats.users }}K</div>
            <div class="stat-label">Users</div>
          </div>
          <div class="achievement-stat">
            <div class="stat-number">+{{ stats.partners }}</div>
            <div class="stat-label">Partners</div>
          </div>
          <div class="achievement-logos">
            <img v-for="logo in partners" :key="logo" :src="logo" alt="Partner Logo" />
          </div>
        </div>
      </section>
  
      <!-- Contact CTA -->
      <section class="contact-cta">
        <div class="contact-content">
          <h2>Contact Us</h2>
          <p>Have questions or want to collaborate? Send us your information!</p>
          <form class="contact-form" @submit.prevent>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Email" required />
            <textarea rows="3" placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  <FooterModal />
  </template>
  

  <style>
  :root {
    --primary: #2563EB;
    --primary-hover: #1D4ED8;
    --primary-foreground: #ffffff;
    --secondary: #DBEAFE;
    --accent-green: #10B981;
    --accent-purple: #7C3AED;
    --accent-orange: #F59E42;
    --accent-teal: #14B8A6;
    --neutral-bg: #F3F4F6;
    --text-main: #23272F;
    --text-muted: #64748B;
    --card-bg: #F9FAFB;
    --card-shadow: 0 2px 12px rgba(37,99,235,0.07);
    --border: #E5E5E5;
  }
  
  .about-root {
    max-width: 1200px;
    margin: 0 auto;
    background: var(--neutral-bg);
    color: var(--text-main);
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    padding: 0;
  }
  
  section {
    margin-bottom: 3rem;
    padding: 0 1rem;
  }

 .about-intro {
  text-align: center;
  margin-bottom: 2rem; /* Reduced margin */
  background: var(--secondary);
  border-radius: 1.2rem;
  padding: 1rem 0.8rem 1rem 0.8rem; /* Reduced vertical and horizontal padding */
  box-shadow: var(--card-shadow);
  }

  .about-intro h1 {
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--primary);
    margin-bottom: 0.7rem; /* Slightly reduced space below heading */
    letter-spacing: 1px;
  }

  .about-intro p {
    font-size: 1.5rem;
    color: var(--text-muted);
    line-height: 1.45; /* Reduced line-height for compactness */
    max-width: 700px;
    margin: 0 auto 1rem auto; /* Reduced bottom margin */
    text-align: justify;
    letter-spacing: 0.2px;
    font-weight: 500;
  }

  /* Responsive styles for introduction */
  @media (max-width: 900px) {
    .about-intro {
      padding: 0.7rem 0.5rem;
    }
    .about-intro h1 {
      font-size: 2rem;
    }
    .about-intro p {
      font-size: 1rem;
      max-width: 95vw;
      line-height: 1.35;
    }
  }

  @media (max-width: 600px) {
    .about-intro {
      padding: 0.5rem 0.3rem;
    }
    .about-intro h1 {
      font-size: 1.5rem;
    }
    .about-intro p {
      font-size: 0.95rem;
      max-width: 98vw;
      line-height: 1.25;
      padding: 0 0.2rem;
    }
  }
    
  .vision-mission {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .vision-card, .mission-card {
    background: var(--card-bg);
    border-radius: 1rem;
    box-shadow: var(--card-shadow);
    padding: 2rem 1.5rem;
    text-align: center;
    border: 1px solid var(--border);
  }
  
  .vision-card h2,
  .mission-card h2 {
    color: var(--primary);
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
  }

  .vision-card p,
  .mission-card p {
    font-size: 1.5rem; /* Adjust this value for desktop */
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
    text-align: justify; /* Căn lề đều */
  }

  /* Responsive styles */
  @media (max-width: 900px) {
    .vision-card p,
    .mission-card p {
      font-size: 1.2rem; /* Tăng từ 1rem để phù hợp với cỡ chữ desktop */
    }
  }
  @media (max-width: 600px) {
    .vision-card p,
    .mission-card p {
      font-size: 1.1rem; /* Tăng từ 0.95rem để phù hợp với cỡ chữ desktop */
    }
  }
  
  .core-values h2 {
    text-align: center;
    color: var(--primary);
    font-size: 2.0rem;
    font-weight: 700;
    margin-bottom: 2rem;
    letter-spacing: 0.5px;
  }
  
  .values-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    justify-items: center;
  }
  
  .value-card {
    background: var(--card-bg);
    border-radius: 1rem;
    box-shadow: var(--card-shadow);
    padding: 2rem 1.2rem 1.5rem 1.2rem;
    text-align: center;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .value-icon {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #fff;
  }
  
  .value-card h3 {
    font-size: 1.65rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  .value-card p {
    font-size: 1.15rem;
    color: var (--text-muted);
    line-height: 1.5;
    text-align: justify; /* Căn lề đều */
  }

  .values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 cards per row on desktop */
  gap: 2rem;
  justify-items: center;
  }

  @media (max-width: 1200px) {
    .values-grid {
      grid-template-columns: repeat(2, 1fr); /* 2 cards per row at <=1200px */
    }
  }
  @media (max-width: 900px) {
    .values-grid {
      grid-template-columns: repeat(2, 1fr); /* 2 cards per row on tablet */
    }
  }
  @media (max-width: 600px) {
    .values-grid {
      grid-template-columns: 1fr; /* 1 card per row on mobile */
    }
  }
  
  .testimonials {
    background: var(--secondary);
    border-radius: 1.2rem;
    padding: 2.5rem 1rem;
    box-shadow: var (--card-shadow);
  }
  
  .testimonials h2 {
    text-align: center;
    color: var(--primary);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-items: center;
    justify-content: center; /* Giống Team Development */
  }
  
  .testimonial-card {
    background: var(--card-bg);
    border-radius: 1rem;
    box-shadow: var(--card-shadow);
    padding: 2rem 1.2rem 1.5rem 1.2rem;
    text-align: center;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .testimonial-avatar {
  width: 70px;          /* Smaller than team avatar */
  height: 70px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  overflow: hidden;
  }

  .testimonial-img {
    width: 100%;
    height: 100%;
    object-fit: cover;    /* Show full image like team avatar */
    border-radius: 50%;
  }
  
  .avatar-placeholder {
    color: var(--primary-foreground);
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  
  .testimonial-text {
    font-size: 1.4rem;
    color: var(--text-main);
    font-style: italic;
    margin-bottom: 0.7rem;
  }
  
  .testimonial-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary);
  }
  
  .testimonial-role {
    font-size: 1.0rem;
    color: var(--text-muted);
  }

  .testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cards per row on desktop */
  gap: 2rem;
  justify-items: center;
  }

  @media (max-width: 1200px) {
    .testimonials-grid {
      grid-template-columns: repeat(2, 1fr); /* 2 cards per row at <=1200px */
    }
  }
  @media (max-width: 900px) {
    .testimonials-grid {
      grid-template-columns: repeat(2, 1fr); /* 2 cards per row on tablet */
    }
  }
  @media (max-width: 600px) {
    .testimonials-grid {
      grid-template-columns: 1fr; /* 1 card per row on mobile */
    }
  }

  /* Responsive cho testimonials */
  @media (max-width: 900px) {
    .testimonials h2 {
      font-size: 2.0rem; /* Tăng từ mặc định để phù hợp */
    }
    .testimonial-text {
      font-size: 1.2rem; /* Tăng từ mặc định để phù hợp */
    }
    .testimonial-name {
      font-size: 1.1rem; /* Tăng từ mặc định để phù hợp */
    }
  }
  @media (max-width: 600px) {
    .testimonials h2 {
      font-size: 1.8rem; /* Tăng từ mặc định để phù hợp */
    }
    .testimonial-text {
      font-size: 1.1rem; /* Tăng từ mặc định để phù hợp */
    }
    .testimonial-name {
      font-size: 1.0rem; /* Tăng từ mặc định để phù hợp */
    }
  }
  
  .team-section h2 {
    text-align: center;
    color: var(--primary);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    letter-spacing: 0.5px;
  }
  
  .team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cards per row on desktop */
  gap: 2rem;
  justify-items: center;
  justify-content: center;
  }

  @media (max-width: 1200px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row at <=1200px */
    }
  }

  @media (max-width: 900px) {
    .team-grid {
      grid-template-columns: repeat(2, 1fr); /* 2 cards per row on tablet */
    }
  }
  @media (max-width: 600px) {
    .team-grid {
      grid-template-columns: 1fr; /* 1 card per row on mobile */
    }
  }
  
  .team-card {
    background: var(--card-bg);
    border-radius: 1rem;
    box-shadow: var(--card-shadow);
    padding: 2rem 1.2rem 1.5rem 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
    border: 2px solid var(--border);
    text-align: center;
    min-height: 340px;
    height: 100%;
  }
  
  .team-card:hover {
    box-shadow: 0 8px 32px rgba(37,99,235,0.16);
    transform: translateY(-8px) scale(1.04);
    background: var(--secondary);
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.2rem;
    overflow: hidden;
    border: 2px solid var(--primary-hover);
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .member-blocks {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 210px;
    justify-content: flex-start;
  }
  
  .member-name-block {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }
  
  .member-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-hover);
    margin-bottom: 0;
    letter-spacing: 0.5px;
    transition: color 0.2s;
    text-align: center;
    width: 100%;
  }
  
  .team-card:hover .member-name {
    color: var(--primary);
  }
  
  .member-role-block {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin-bottom: 0.5rem;
  }
  
  .member-role {
    display: inline-block;
    font-size: 1.15rem;
    border-radius: 0.7rem;
    padding: 0.22rem 1rem;
    font-weight: 600;
    letter-spacing: 0.3px;
    box-shadow: 0 2px 8px rgba(37,99,235,0.10);
    text-align: center;
  }
  
  .member-desc-block {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 120px;
    width: 100%;
  }
  
  .member-desc {
    font-size: 1.2rem;
    color: var(--text-muted);
    line-height: 1.6;
    font-weight: 400;
    letter-spacing: 0.2px;
    padding: 0.3rem 0.5rem;
    text-align: left;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 6.5em; /* ~4 lines at 1.6 line-height */
    white-space: normal;
  }
  
  .achievements {
    margin-bottom: 3rem;
    background: var(--secondary); /* Light blue background like testimonials */
    border-radius: 1.2rem;
    padding: 2.5rem 1rem;
    box-shadow: var(--card-shadow);
  }
  
  .achievements h2 {
    text-align: center;
    color: var(--primary);
    font-size: 2.5rem; /* Increased from 1.6rem to match other sections */
    font-weight: 700;
    margin-bottom: 2rem;
  }
  
  .achievements-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }
  
  .achievement-stat {
    background: var(--card-bg);
    border-radius: 1rem;
    box-shadow: var(--card-shadow);
    padding: 1.5rem 2rem;
    text-align: center;
    border: 1px solid var(--border);
    min-width: 120px;
  }
  
  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
  }
  
  .stat-label {
    font-size: 1rem;
    color: var(--text-muted);
  }
  
  .achievement-logos {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  
  .achievement-logos img {
    height: 40px;
    width: auto;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 1px 4px rgba(37,99,235,0.07);
    padding: 0.3rem 0.7rem;
  }
  
  .contact-cta {
    margin-top: 3rem;
    background: linear-gradient(90deg, var(--secondary) 0%, #fff 100%);
    border-radius: 1.2rem;
    padding: 2.5rem 1rem;
    box-shadow: var(--card-shadow);
    display: flex;
    justify-content: center;
  }
  
  .contact-content {
    max-width: 500px; /* Increased from 400px */
    width: 100%;
    text-align: center;
  }
  
  .contact-content h2 {
    color: var(--primary);
    font-size: 2.2rem; /* Increased from 1.4rem */
    font-weight: 700;
    margin-bottom: 0.7rem;
  }
  
  .contact-content p {
    color: var(--text-muted);
    margin-bottom: 1.2rem;
    font-size: 1.4rem; /* Increased from default */
    line-height: 1.5;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-form input,
  .contact-form textarea {
    padding: 1rem 1.2rem; /* Increased from 0.7rem */
    border-radius: 0.75rem; /* Slightly increased */
    border: 1px solid var(--border);
    font-size: 1.2rem; /* Increased from 1rem */
    background: #fff;
    color: var(--text-main);
    resize: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .contact-form input:focus,
  .contact-form textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  .contact-form button {
    background: var(--primary);
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 0.75rem;
    padding: 1rem 2rem; /* Increased from 0.8rem 1.2rem */
    font-size: 1.3rem; /* Increased from 1rem */
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  
  .contact-form button:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
  }

  /* Responsive for achievements */
  @media (max-width: 900px) {
    .achievements h2 {
      font-size: 2.0rem;
    }
  }
  @media (max-width: 600px) {
    .achievements h2 {
      font-size: 1.8rem;
    }
  }

  /* Responsive for contact */
  @media (max-width: 900px) {
    .contact-content h2 {
      font-size: 1.8rem;
    }
    .contact-content p {
      font-size: 1.2rem;
    }
    .contact-form input,
    .contact-form textarea {
      font-size: 1.1rem;
      padding: 0.9rem 1rem;
    }
    .contact-form button {
      font-size: 1.2rem;
      padding: 0.9rem 1.8rem;
    }
  }
  @media (max-width: 600px) {
    .contact-content h2 {
      font-size: 1.6rem;
    }
    .contact-content p {
      font-size: 1.1rem;
    }
    .contact-form input,
    .contact-form textarea {
      font-size: 1rem;
      padding: 0.8rem 1rem;
    }
    .contact-form button {
      font-size: 1.1rem;
      padding: 0.8rem 1.5rem;
    }
  }

  .vision-card p,
  .mission-card p {
    font-size: 1.5rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
    text-align: justify; /* Căn lề đều */
  }

  /* Responsive styles */
  @media (max-width: 900px) {
    .vision-card p,
    .mission-card p {
      font-size: 1.2rem; /* Tăng từ 1rem để phù hợp với cỡ chữ desktop */
    }
  }
  @media (max-width: 600px) {
    .vision-card p,
    .mission-card p {
      font-size: 1.1rem; /* Tăng từ 0.95rem để phù hợp với cỡ chữ desktop */
    }
  }

  .value-card p {
    font-size: 1.15rem;
    color: var(--text-muted);
    line-height: 1.5;
    text-align: justify; /* Căn lề đều */
  }

  /* Responsive cho core values */
  @media (max-width: 900px) {
    .value-card p {
      font-size: 1.0rem; /* Phù hợp với cỡ chữ desktop */
    }
  }
  @media (max-width: 600px) {
    .value-card p {
      font-size: 0.95rem; /* Phù hợp với cỡ chữ desktop */
    }
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-items: center;
    justify-content: center; /* Giống Team Development */
  }

  @media (max-width: 1200px) {
    .testimonials-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 900px) {
    .testimonials-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 600px) {
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Responsive cho testimonials */
  @media (max-width: 900px) {
    .testimonials h2 {
      font-size: 2.0rem; /* Tăng từ mặc định để phù hợp */
    }
    .testimonial-text {
      font-size: 1.2rem; /* Tăng từ mặc định để phù hợp */
    }
    .testimonial-name {
      font-size: 1.1rem; /* Tăng từ mặc định để phù hợp */
    }
  }
  @media (max-width: 600px) {
    .testimonials h2 {
      font-size: 1.8rem; /* Tăng từ mặc định để phù hợp */
    }
    .testimonial-text {
      font-size: 1.1rem; /* Tăng từ mặc định để phù hợp */
    }
    .testimonial-name {
      font-size: 1.0rem; /* Tăng từ mặc định để phù hợp */
    }
  }

  /* Responsive cho core values h2 */
  @media (max-width: 900px) {
    .core-values h2 {
      font-size: 1.8rem; /* Phù hợp với cỡ chữ desktop */
    }
  }
  @media (max-width: 600px) {
    .core-values h2 {
      font-size: 1.6rem; /* Phù hợp với cỡ chữ desktop */
    }
  }

  /* Responsive cho vision/mission h2 */
  @media (max-width: 900px) {
    .vision-card h2,
    .mission-card h2 {
      font-size: 2.0rem; /* Giảm từ 2.4rem nhưng vẫn lớn hơn responsive cũ */
    }
  }
  @media (max-width: 600px) {
    .vision-card h2,
    .mission-card h2 {
      font-size: 1.8rem; /* Giảm từ 2.4rem nhưng vẫn lớn hơn responsive cũ */
    }
  }
  </style>