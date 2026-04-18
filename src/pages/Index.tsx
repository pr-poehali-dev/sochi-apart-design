import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/44453c48-1799-45be-acb1-f18e9cb0fd93/files/faed2163-b10b-455e-894d-eb4a952da270.jpg";
const ROOM_IMG = "https://cdn.poehali.dev/projects/44453c48-1799-45be-acb1-f18e9cb0fd93/files/4d46602f-2078-415a-a16b-0125de1068ee.jpg";

const rooms = [
  {
    id: 1,
    name: "Studio",
    size: "28 м²",
    price: "от 4 200 ₽",
    tag: "Хит",
    features: ["Вид на город", "Смарт ТВ", "Климат-контроль"],
    img: ROOM_IMG,
    color: "from-orange-900/40",
  },
  {
    id: 2,
    name: "Deluxe",
    size: "42 м²",
    price: "от 6 800 ₽",
    tag: "Популярный",
    features: ["Панорамный вид", "Джакузи", "Мини-кухня"],
    img: HERO_IMG,
    color: "from-rose-900/40",
  },
  {
    id: 3,
    name: "Suite",
    size: "65 м²",
    price: "от 10 500 ₽",
    tag: "Премиум",
    features: ["Вид на море", "Терраса", "Полная кухня"],
    img: ROOM_IMG,
    color: "from-amber-900/40",
  },
];

const services = [
  { icon: "Waves", title: "Бассейн на крыше", desc: "Открытый бассейн с видом на горы и море" },
  { icon: "UtensilsCrossed", title: "Ресторан & Бар", desc: "Авторская кухня и коктейли 24/7" },
  { icon: "Dumbbell", title: "Фитнес-зал", desc: "Современное оборудование, персональный тренер" },
  { icon: "Car", title: "Паркинг", desc: "Охраняемая подземная парковка" },
  { icon: "Wifi", title: "Wi-Fi 1 Гбит/с", desc: "Сверхскоростной интернет во всех зонах" },
  { icon: "Bike", title: "Прокат велосипедов", desc: "Электровелосипеды для прогулок по набережной" },
];

const reviews = [
  {
    name: "Дарья К.",
    age: 24,
    city: "Москва",
    text: "Лучший отель в Сочи! Стиль на уровне, персонал крутой, вид из окна — просто кино. Уже планирую вернуться.",
    rating: 5,
    emoji: "🌊",
  },
  {
    name: "Артём В.",
    age: 27,
    city: "СПб",
    text: "3D-тур перед бронированием реально помог выбрать номер. Всё совпало с реальностью один в один. Зачёт!",
    rating: 5,
    emoji: "✨",
  },
  {
    name: "Лиза М.",
    age: 22,
    city: "Екатеринбург",
    text: "Эстетика как в Pinterest. Каждый угол — это контент. Подруги завидуют всем stories из этого места.",
    rating: 5,
    emoji: "📸",
  },
  {
    name: "Никита Р.",
    age: 29,
    city: "Казань",
    text: "Соотношение цена/качество огонь. Центр Сочи, рядом всё, интерьер люксовый. Не ожидал такого уровня.",
    rating: 5,
    emoji: "🔥",
  },
];

const galleryItems = [
  { img: HERO_IMG, label: "Крышный бар" },
  { img: ROOM_IMG, label: "Deluxe Suite" },
  { img: HERO_IMG, label: "Панорама Сочи" },
  { img: ROOM_IMG, label: "Лобби" },
  { img: HERO_IMG, label: "Бассейн" },
  { img: ROOM_IMG, label: "Studio" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingDates, setBookingDates] = useState({ from: "", to: "", guests: "2" });
  const [tourActive, setTourActive] = useState(false);
  const [tourScene, setTourScene] = useState(0);

  const navLinks = [
    { id: "rooms", label: "Номера" },
    { id: "tour3d", label: "3D-тур" },
    { id: "gallery", label: "Галерея" },
    { id: "reviews", label: "Отзывы" },
    { id: "booking", label: "Бронировать" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const tourScenes = [
    { label: "Лобби", desc: "Просторный лобби с арт-объектами и зоной отдыха" },
    { label: "Номер Deluxe", desc: "42 м² с панорамным видом и дизайнерской мебелью" },
    { label: "Бассейн", desc: "Крышный бассейн с видом на горы и море Сочи" },
    { label: "Ресторан", desc: "Авторская кухня с видом на вечерний город" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground grain-overlay">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)", backdropFilter: "blur(2px)" }}>
        <button onClick={() => scrollTo("hero")} className="font-display text-2xl text-gold tracking-widest">
          TheМост
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="nav-link text-sm font-medium text-white/70 hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
        </div>

        <button onClick={() => scrollTo("booking")}
          className="hidden md:block px-5 py-2 bg-gold text-background text-sm font-semibold rounded-full hover:opacity-90 transition-opacity">
          Забронировать
        </button>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
          <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8">
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="font-display text-4xl text-white hover:text-gold transition-colors">
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="TheМост Апарт-отель Сочи" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)"
          }} />
        </div>

        <div className="relative z-10 px-6 md:px-16 pb-20 w-full">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4 animate-fade-up">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm font-medium tracking-widest uppercase">Сочи · Центр</span>
            </div>
            <h1 className="font-display text-9xl md:text-[150px] leading-[0.9] text-white mb-6 animate-fade-up delay-100">
              TheМост<br />
              <span className="text-gold" style={{ fontSize: "0.46em", fontWeight: 400, letterSpacing: "0.15em" }}>Апарт-отель</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-lg mb-10 animate-fade-up delay-200">
              Апарт-отель нового поколения в самом сердце Сочи.
              Для тех, кто ценит стиль, свободу и живые впечатления.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <button onClick={() => scrollTo("booking")}
                className="px-8 py-4 bg-gold text-background font-bold rounded-full text-base hover:scale-105 transition-transform glow-gold">
                Забронировать номер
              </button>
              <button onClick={() => scrollTo("tour3d")}
                className="px-8 py-4 border border-white/30 text-white font-medium rounded-full text-base hover:border-gold hover:text-gold transition-colors flex items-center gap-2">
                <Icon name="Play" size={16} />
                3D-тур по отелю
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 right-6 md:right-16 flex gap-8 animate-fade-up delay-400">
            {[["98%", "довольных гостей"], ["4.9★", "на всех платформах"], ["500+", "отзывов"]].map(([val, label]) => (
              <div key={val} className="text-right">
                <div className="font-display text-3xl text-gold">{val}</div>
                <div className="text-white/50 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-600">
          <span className="text-white/40 text-xs tracking-widest">СКРОЛЛ</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-gold py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="font-display text-2xl text-background mx-8 tracking-widest">
              TheМост · СОЧИ · ЦЕНТР · СТИЛЬ · СВОБОДА · МОРЕ ·
            </span>
          ))}
        </div>
      </div>

      {/* ROOMS */}
      <section id="rooms" className="py-24 px-6 md:px-16">
        <AnimSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-sm tracking-widest uppercase">Номера</span>
          </div>
          <h2 className="font-display text-6xl md:text-7xl text-white mb-16">ВЫБЕРИ<br />СВОЙ ФОРМАТ</h2>
        </AnimSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room, i) => (
            <AnimSection key={room.id}>
              <div className="card-hover rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: "#111" }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={room.img} alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${room.color} to-transparent`} />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-background text-xs font-bold rounded-full">
                    {room.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-3xl text-white">{room.name}</h3>
                    <span className="text-white/50 text-sm">{room.size}</span>
                  </div>
                  <ul className="space-y-1 mb-6">
                    {room.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-white/60 text-sm">
                        <div className="w-1 h-1 rounded-full bg-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-gold">{room.price}</span>
                    <button
                      onClick={() => scrollTo("booking")}
                      className="px-4 py-2 border border-gold/40 text-gold text-sm rounded-full hover:bg-gold hover:text-background transition-all">
                      Выбрать
                    </button>
                  </div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* 3D TOUR */}
      <section id="tour3d" className="py-24 px-6 md:px-16 bg-card">
        <AnimSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-coral" />
            <span className="text-coral text-sm tracking-widest uppercase">3D-тур</span>
          </div>
          <h2 className="font-display text-6xl md:text-7xl text-white mb-6">ЗАГЛЯНИ<br />ВНУТРЬ</h2>
          <p className="text-white/60 max-w-lg mb-12">
            Исследуй отель до приезда — номера, лобби, бассейн, ресторан.
            Выбирай осознанно, приезжай уверенно.
          </p>
        </AnimSection>

        <AnimSection>
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-black/50 border border-white/10">
            {!tourActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                style={{ background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${HERO_IMG}) center/cover` }}>
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-2 tracking-widest uppercase">Интерактивный 3D-тур</p>
                  <h3 className="font-display text-4xl md:text-5xl text-white mb-8">TheМост · СОЧИ</h3>
                </div>
                <button
                  onClick={() => setTourActive(true)}
                  className="w-24 h-24 rounded-full border-2 border-gold flex items-center justify-center hover:bg-gold/20 transition-all glow-gold">
                  <Icon name="Play" size={36} className="text-gold ml-2" />
                </button>
                <p className="text-white/40 text-sm">Нажми, чтобы начать тур</p>

                <div className="absolute bottom-6 left-6 flex gap-3 flex-wrap">
                  {tourScenes.map((s, i) => (
                    <button key={i}
                      className="px-3 py-1.5 border border-white/20 text-white/60 text-xs rounded-full hover:border-gold hover:text-gold transition-all">
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black flex flex-col">
                <div className="flex-1 relative overflow-hidden">
                  <img
                    src={tourScene % 2 === 0 ? HERO_IMG : ROOM_IMG}
                    alt="Tour"
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white/80 text-sm">
                    📍 {tourScenes[tourScene % tourScenes.length].label}
                  </div>
                  <div className="absolute bottom-16 left-4 right-4 text-center">
                    <p className="text-white/80 text-sm">{tourScenes[tourScene % tourScenes.length].desc}</p>
                  </div>

                  <button
                    onClick={() => setTourScene(s => Math.max(0, s - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:border-gold transition-all">
                    <Icon name="ChevronLeft" size={20} className="text-white" />
                  </button>
                  <button
                    onClick={() => setTourScene(s => s + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:border-gold transition-all">
                    <Icon name="ChevronRight" size={20} className="text-white" />
                  </button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-black/80">
                  {tourScenes.map((s, i) => (
                    <button key={i}
                      onClick={() => setTourScene(i)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${tourScene % tourScenes.length === i ? "bg-gold text-background" : "border border-white/20 text-white/60 hover:border-gold"}`}>
                      {s.label}
                    </button>
                  ))}
                  <button onClick={() => setTourActive(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/20 text-white/60 hover:text-white">
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </AnimSection>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 md:px-16 bg-card">
        <AnimSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-coral" />
            <span className="text-coral text-sm tracking-widest uppercase">Галерея</span>
          </div>
          <h2 className="font-display text-6xl md:text-7xl text-white mb-16">АТМОСФЕРА<br />В КАДРЕ</h2>
        </AnimSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryItems.map((item, i) => (
            <AnimSection key={i}>
              <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? "h-72 md:h-72" : "h-48 md:h-52"}`}>
                <img src={item.img} alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-medium text-sm">{item.label}</span>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 md:px-16">
        <AnimSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-sm tracking-widest uppercase">Отзывы</span>
          </div>
          <h2 className="font-display text-6xl md:text-7xl text-white mb-16">ГОВОРЯТ<br />ГОСТИ</h2>
        </AnimSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <AnimSection key={r.name}>
              <div className="p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300"
                style={{ background: "#0d0d0d" }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {r.emoji}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{r.name}, {r.age}</div>
                    <div className="text-white/40 text-sm">{r.city}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array(r.rating).fill(null).map((_, j) => (
                      <Icon key={j} name="Star" size={14} className="text-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">"{r.text}"</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6 md:px-16"
        style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a1000 50%, #0d0d0d 100%)" }}>
        <AnimSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm tracking-widest uppercase">Бронирование</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h2 className="font-display text-6xl md:text-8xl text-white mb-6">ТВОЙ<br />СОЧИ<br /><span className="text-gold">ЖДЁТ</span></h2>
            <p className="text-white/60 mb-12">
              Заполни форму — и мы свяжемся для подтверждения.<br />
              Бесплатная отмена за 24 часа до заезда.
            </p>

            <div className="p-8 rounded-3xl border border-gold/20 glow-gold"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)" }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Заезд</label>
                  <input type="date"
                    value={bookingDates.from}
                    onChange={e => setBookingDates(d => ({ ...d, from: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Выезд</label>
                  <input type="date"
                    value={bookingDates.to}
                    onChange={e => setBookingDates(d => ({ ...d, to: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Гостей</label>
                  <select
                    value={bookingDates.guests}
                    onChange={e => setBookingDates(d => ({ ...d, guests: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold focus:outline-none transition-colors">
                    {["1", "2", "3", "4"].map(n => (
                      <option key={n} value={n} className="bg-background">{n} гост{n === "1" ? "ь" : "я"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input type="text" placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors" />
                <input type="tel" placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors" />
              </div>

              <button className="w-full py-4 bg-gold text-background font-bold text-lg rounded-xl hover:opacity-90 transition-opacity hover:scale-[1.02] transform duration-200 glow-gold">
                Отправить заявку
              </button>
              <p className="text-white/30 text-xs mt-4">Ответим в течение 15 минут · Без предоплаты</p>
            </div>
          </div>
        </AnimSection>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 md:px-16 bg-card">
        <AnimSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold text-sm tracking-widest uppercase">Контакты</span>
              </div>
              <h2 className="font-display text-6xl md:text-7xl text-white mb-10">НАЙДИ<br />НАС</h2>

              <div className="space-y-6">
                {[
                  { icon: "MapPin", label: "Адрес", value: "ул. Учительская, 5, Сочи" },
                  { icon: "Phone", label: "Телефон", value: "+7 (862) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "hello@themost.ru" },
                  { icon: "Clock", label: "Ресепшн", value: "Круглосуточно, 24/7" },
                ].map(c => (
                  <div key={c.icon} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={18} className="text-gold" fallback="Info" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs uppercase tracking-widest">{c.label}</div>
                      <div className="text-white font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                {[
                  { icon: "Instagram", label: "Instagram" },
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Youtube", label: "YouTube" },
                ].map(s => (
                  <button key={s.icon}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold text-white/50 transition-all">
                    <Icon name={s.icon} size={18} fallback="Share2" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden h-80 md:h-96 border border-white/10 relative bg-black/40">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <Icon name="MapPin" size={28} className="text-gold" />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">TheМост Апарт-отель</p>
                  <p className="text-white/50 text-sm">ул. Учительская, 5 · Сочи</p>
                </div>
                <button className="px-6 py-2 border border-gold/40 text-gold text-sm rounded-full hover:bg-gold/10 transition-colors flex items-center gap-2">
                  <Icon name="ExternalLink" size={14} />
                  Открыть в Яндекс.Картах
                </button>
              </div>
            </div>
          </div>
        </AnimSection>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl text-gold tracking-widest">TheМост</span>
          <p className="text-white/30 text-sm">© 2024 TheМост Апарт-отель · Сочи · Все права защищены</p>
          <div className="flex gap-6">
            <button className="text-white/40 text-sm hover:text-white transition-colors">Конфиденциальность</button>
            <button className="text-white/40 text-sm hover:text-white transition-colors">Правила отеля</button>
          </div>
        </div>
      </footer>
    </div>
  );
}