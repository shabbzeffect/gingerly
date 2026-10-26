import { prisma } from "@/lib/prisma";
import { formatKes } from "@/lib/utils";

async function main() {
  console.log("🌱 Seeding Gingerly Designs & Fabrics database...");

  // --- Settings (brand config, editable in admin) ---
  const settings = [
    { key: "brand_name", value: "Gingerly Designs and Fabrics" },
    { key: "brand_tagline", value: "Where Heritage Meets Couture" },
    { key: "studio_location", value: "By appointment, Nairobi, Kenya" },
    { key: "atelier_email", value: "enquiries@gingerly.example" },
    { key: "whatsapp_number", value: "254700000000" },
    { key: "currency", value: "KES" },
    { key: "consultation_fee", value: "" },
    { key: "virtual_consultation_fee", value: "" },
    { key: "rentals_enabled", value: "false" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("✓ Settings seeded");

  // --- Ceremony pages (owner-editable content) ---
  const ceremonies = [
    {
      key: "ruracio",
      title: "Ruracio",
      slug: "ruracio",
      intro:
        "Ruracio is the Kikuyu traditional introduction and bride-price ceremony — a moment of solemn celebration between families. At Gingerly, we craft attire that honours its earthy palette, intricate beadwork, and deep cultural significance.",
      content: {},
      metaTitle: "Ruracio Attire — Bespoke Kikuyu Ceremony Wear, Nairobi",
      metaDescription: "Bespoke Ruracio attire for brides and grooms. Handcrafted in Nairobi with traditional beadwork and contemporary elegance.",
    },
    {
      key: "nyombo",
      title: "Nyombo",
      slug: "nyombo",
      intro:
        "Nyombo is the Luo traditional marriage ceremony, marked by regal silhouettes and symbolic accents. We design garments that carry the dignity and grace of this heritage into the present day.",
      content: {},
      metaTitle: "Nyombo Attire — Bespoke Luo Ceremony Wear, Nairobi",
      metaDescription: "Bespoke Nyombo attire for the Luo traditional ceremony. Handcrafted in Nairobi with regal silhouettes and symbolic detailing.",
    },
    {
      key: "koito",
      title: "Koito",
      slug: "koito",
      intro:
        "Koito is the Kalenjin celebration of union, with its own ceremonial color stories and fabric traditions. We translate those stories into wearable art.",
      content: {},
      metaTitle: "Koito Attire — Bespoke Kalenjin Ceremony Wear, Nairobi",
      metaDescription: "Bespoke Koito attire for the Kalenjin celebration. Handcrafted in Nairobi with ceremonial color stories and fabric close-ups.",
    },
    {
      key: "bukhwi",
      title: "Bukhwi",
      slug: "bukhwi",
      intro:
        "Bukhwi is the Luhya traditional ceremony, distinguished by cowrie shell and sisal texture details. We incorporate these tactile elements into contemporary designs.",
      content: {},
      metaTitle: "Bukhwi Attire — Bespoke Luhya Ceremony Wear, Nairobi",
      metaDescription: "Bespoke Bukhwi attire for the Luhya tradition. Handcrafted in Nairobi with cowrie shell and sisal texture details.",
    },
    {
      key: "white-wedding",
      title: "White Wedding",
      slug: "white-wedding",
      intro:
        "From cathedral veils to hand-beaded bodices, our white wedding gowns are cut to your measurements and your vision. Lace, trains, and timeless silhouettes.",
      content: {},
      metaTitle: "White Wedding Gowns — Bespoke Bridal, Nairobi",
      metaDescription: "Bespoke white wedding gowns and bridal attire, handcrafted in Nairobi. Lace, trains, cathedral veils, and made-to-measure silhouettes.",
    },
    {
      key: "bridesmaid",
      title: "Bridesmaids & Wedding Guests",
      slug: "bridesmaid",
      intro:
        "Coordinated squad looks, Ankara sets, and occasion dresses for bridesmaids and wedding guests — designed to complement, not compete.",
      content: {},
      metaTitle: "Bridesmaid Dresses & Guest Wear, Nairobi",
      metaDescription: "Coordinated bridesmaid dresses and wedding guest attire. Ankara sets and occasion wear from Gingerly Designs and Fabrics.",
    },
    {
      key: "menswear",
      title: "Senator Suits & Menswear",
      slug: "menswear",
      intro:
        "Tailored grooms, groomsmen packages, and Senator suits cut to the individual. Contemporary menswear with Nairobi precision.",
      content: {},
      metaTitle: "Senator Suits & Tailored Menswear, Nairobi",
      metaDescription: "Tailored Senator suits and menswear for grooms and groomsmen. Handcrafted in Nairobi.",
    },
    {
      key: "occasion",
      title: "Occasion Wear",
      slug: "occasion",
      intro:
        "Birthday shoots, prom, music anniversaries, and red-carpet moments. Occasion wear that stands out — made to order in Nairobi.",
      content: {},
      metaTitle: "Occasion Wear & Prom Dresses, Nairobi",
      metaDescription: "Bespoke occasion wear, prom dresses, and red-carpet looks from Gingerly Designs and Fabrics, Nairobi.",
    },
  ];

  for (const c of ceremonies) {
    await prisma.ceremonyPage.upsert({
      where: { key: c.key },
      update: c,
      create: c,
    });
  }
  console.log("✓ Ceremony pages seeded");

  // --- Services ---
  const services = [
    {
      key: "bridal-gowns",
      title: "Bridal Gowns",
      category: "bridal",
      description: "Made-to-measure wedding gowns, cut to your posture and vision. Lace, beadwork, rhinestones, and cathedral veils.",
      order: 1,
    },
    {
      key: "traditional-attire",
      title: "Traditional Ceremony Attire",
      category: "traditional",
      description: "Ruracio, Nyombo, Koito, and Bukhwi garments designed with cultural dignity and contemporary glamour.",
      order: 2,
    },
    {
      key: "bridesmaid",
      title: "Bridesmaid & Guest Dresses",
      category: "occasion",
      description: "Coordinated Ankara sets and occasion dresses for your bridal party and wedding guests.",
      order: 3,
    },
    {
      key: "menswear",
      title: "Senator Suits & Menswear",
      category: "menswear",
      description: "Tailored grooms and groomsmen packages, cut to the individual.",
      order: 4,
    },
    {
      key: "occasion-wear",
      title: "Occasion Wear",
      category: "occasion",
      description: "Prom, birthday photoshoot, performance, and anniversary looks — made to order.",
      order: 5,
    },
    {
      key: "virtual-fittings",
      title: "Virtual Fittings",
      category: "bridal",
      description: "Consultation, measurement guidance, and design reviews for brides in London, Sydney, Nairobi, and beyond.",
      order: 6,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log("✓ Services seeded");

  // --- Lookbook projects (sample/inspiration imagery, clearly marked) ---
  const projects = [
    {
      title: "Ruracio — Beaded Mermaid Gown",
      slug: "ruracio-beaded-mermaid-gown",
      occasion: "ruracio",
      garmentType: "Bridal gown",
      fabric: "Beaded lace with cowrie accents",
      details: "Hand-applied beadwork, cowrie shell details",
      description:
        "A Ruracio bridal gown in earthy golds with hand-applied beadwork. Sample imagery — replace with authentic brand photography.",
      featured: true,
      order: 1,
      images: [
        { alt: "Ruracio beaded mermaid gown front view", order: 0 },
        { alt: "Ruracio beaded detail close-up", order: 1 },
      ],
    },
    {
      title: "Nyombo — Regal Luo Silhouette",
      slug: "nyombo-regal-luo-silhouette",
      occasion: "nyombo",
      garmentType: "Ceremony dress",
      fabric: "Silk organza with symbolic accents",
      details: "Regal silhouette, symbolic embroidery",
      description:
        "Nyombo attire with a regal silhouette and symbolic Luo accents. Sample imagery — replace with authentic brand photography.",
      featured: true,
      order: 2,
      images: [
        { alt: "Nyombo regal silhouette full view", order: 0 },
        { alt: "Nyombo symbolic accent detail", order: 1 },
      ],
    },
    {
      title: "Koito — Kalenjin Celebration Dress",
      slug: "koito-kalenjin-celebration-dress",
      occasion: "koito",
      garmentType: "Celebration dress",
      fabric: "Ankara print with ceremonial colors",
      details: "Ceremonial color story, Ankara fabric",
      description:
        "Koito celebration dress in vibrant Ankara prints. Sample imagery — replace with authentic brand photography.",
      featured: true,
      order: 3,
      images: [
        { alt: "Koito Ankara celebration dress", order: 0 },
      ],
    },
    {
      title: "Bukhwi — Cowrie Shell & Sisal",
      slug: "bukhwi-cowrie-sisal",
      occasion: "bukhwi",
      garmentType: "Ceremony attire",
      fabric: "Sisal texture with cowrie shell embellishment",
      details: "Cowrie shell details, sisal texture",
      description:
        "Bukhwi attire featuring cowrie shell and sisal texture details. Sample imagery — replace with authentic brand photography.",
      featured: false,
      order: 4,
      images: [
        { alt: "Bukhwi cowrie shell detail", order: 0 },
      ],
    },
    {
      title: "White Wedding — Lace Cathedral Veil",
      slug: "white-wedding-lace-cathedral-veil",
      occasion: "white-wedding",
      garmentType: "Bridal gown",
      fabric: "French lace, silk tulle veil",
      details: "Hand-beaded bodice, cathedral veil",
      description:
        "White wedding gown with hand-beaded bodice and cathedral veil. Sample imagery — replace with authentic brand photography.",
      featured: true,
      order: 5,
      images: [
        { alt: "White wedding gown with cathedral veil", order: 0 },
        { alt: "Lace bodice close-up", order: 1 },
      ],
    },
    {
      title: "Senator Suit — Tailored Groom",
      slug: "senator-suit-tailored-groom",
      occasion: "menswear",
      garmentType: "Senator suit",
      fabric: "Wool blend",
      details: "Tailored fit, notch lapel",
      description:
        "Tailored Senator suit for the groom. Sample imagery — replace with authentic brand photography.",
      featured: false,
      order: 6,
      images: [
        { alt: "Senator suit tailored groom", order: 0 },
      ],
    },
  ];

  for (const p of projects) {
    const { images, ...projectData } = p;
    const project = await prisma.lookbookProject.create({
      data: projectData,
    });
    for (const img of images) {
      await prisma.lookbookImage.create({
        data: {
          projectId: project.id,
          url: `/images/placeholder-collection.svg`,
          alt: img.alt,
          order: img.order,
        },
      });
    }
  }
  console.log("✓ Lookbook projects seeded");

  // --- FAQs (some flagged unverified for owner review) ---
  const faqs = [
    {
      question: "How do I start a commission?",
      answer:
        "Book a consultation — in person at our Nairobi studio or virtually from anywhere. We’ll discuss your occasion, vision, and measurements, then create an individual design brief and quote.",
      category: "general",
      order: 1,
      unverified: false,
    },
    {
      question: "Can I book a virtual consultation from London or Sydney?",
      answer:
        "Yes. We serve diaspora clients worldwide through virtual consultations and fittings, with time-zone-aware scheduling.",
      category: "virtual",
      order: 2,
      unverified: false,
    },
    {
      question: "Do you offer rentals?",
      answer:
        "Rentals are available only if confirmed by the atelier. Enquire through our rental page — we will never show availability or pricing that hasn't been verified.",
      category: "rentals",
      order: 3,
      unverified: true,
    },
    {
      question: "How are measurements handled for virtual fittings?",
      answer:
        "We provide a measurement guide you can use at home. Measurements and photos are stored privately and only accessed by the design team.",
      category: "virtual",
      order: 4,
      unverified: false,
    },
    {
      question: "What currencies do you accept?",
      answer:
        "Kenyan shillings (KES) are the default currency. Diaspora clients may pay by Stripe or PayPal in their local currency where configured.",
      category: "payments",
      order: 5,
      unverified: true,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({
      data: f,
    });
  }
  console.log("✓ FAQs seeded");

  console.log("✅ Seed complete. Sample content is clearly marked — replace with authentic brand assets before launch.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
