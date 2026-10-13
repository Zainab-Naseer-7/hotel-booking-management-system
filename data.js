// VELA PRIVÉ - Luxury Hotel Database & Mock Data Store

const INITIAL_HOTELS = [
  {
    id: "vela-paris",
    name: "L'Hôtel de la Paix & Palais Royal",
    tagline: "Haute Hospitality on Place Vendôme",
    destination: "Paris, France",
    city: "Paris",
    country: "France",
    category: "Heritage Palaces",
    badge: "Historic Palace 2026",
    rating: 4.96,
    reviewsCount: 384,
    startingPrice: 1450,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Nestled in the illustrious Place Vendôme, L'Hôtel de la Paix combines 18th-century French neoclassicism with bespoke contemporary luxury. Indulge in private balconies overlooking the Eiffel Tower, a three-star Michelin salon led by Chef Antoine Laurent, and subterranean Roman spa baths carved from natural French limestone.",
    address: "15 Place Vendôme, 75001 Paris, France",
    coordinates: { lat: 48.8675, lng: 2.3294 },
    stars: 5,
    featured: true,
    trending: true,
    amenities: [
      "Michelin Dining",
      "Private Butler",
      "Subterranean Spa",
      "Eiffel Tower View",
      "Free High-Speed Wi-Fi",
      "Valet Limousine Service",
      "Champagne Cellar",
      "Pet Concierge",
      "24/7 Room Service",
      "Indoor Heated Pool"
    ],
    highlights: [
      "Direct views of Place Vendôme and Eiffel Tower",
      "3-Star Michelin Restaurant 'Le Céleste'",
      "Private subterranean Dior Institut Spa",
      "Dedicated 24-hour floor butler"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 48 hours prior to arrival",
      pets: "Pets permitted upon prior concierge arrangement",
      smoking: "Non-smoking property (designated cigar lounge available)"
    },
    rooms: [
      {
        id: "room-paris-1",
        name: "Vendôme Deluxe King Suite",
        size: "65 m² / 700 sq ft",
        capacity: 2,
        bedType: "1 Grand Emperor King",
        price: 1450,
        discountPrice: 1290,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        amenities: ["Place Vendôme View", "Marble Bath & Steam Shower", "Krug Welcome Bottle", "Free Breakfast"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 4
      },
      {
        id: "room-paris-2",
        name: "Palais Royal Prestige Suite",
        size: "110 m² / 1,180 sq ft",
        capacity: 3,
        bedType: "1 Grand Emperor King + Daybed",
        price: 2650,
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        amenities: ["Eiffel Tower Balcony", "Walk-in Dressing Room", "Private In-suite Sauna", "Chauffeur Airport Transfer"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 2
      },
      {
        id: "room-paris-3",
        name: "The Imperial Rooftop Penthouse",
        size: "240 m² / 2,580 sq ft",
        capacity: 4,
        bedType: "2 Grand Emperor Kings",
        price: 5900,
        discountPrice: 5200,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        amenities: ["360° Paris Skyline Rooftop", "Private Chef & Butler", "Private Plunge Pool", "Custom Wine Cellar"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 1
      }
    ]
  },
  {
    id: "vela-maldives",
    name: "Velaa Private Atoll & Azure Sanctuary",
    tagline: "An Untamed Ultra-Luxe Coral Atoll",
    destination: "Noonu Atoll, Maldives",
    city: "Noonu Atoll",
    country: "Maldives",
    category: "Overwater Suites",
    badge: "World's Best Island 2026",
    rating: 4.99,
    reviewsCount: 512,
    startingPrice: 2200,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Hovering above the crystal turquoise lagoon of Noonu Atoll, Velaa Private Atoll redefines seclusion. Surrounded by vibrant house reefs, each overwater sanctuary features glass floor panels, cantilevered private infinity pools, direct lagoon staircases, and personalized marine biologist expeditions.",
    address: "Velaa Island, Noonu Atoll, Republic of Maldives",
    coordinates: { lat: 5.795, lng: 73.284 },
    stars: 5,
    featured: true,
    trending: true,
    amenities: [
      "Overwater Infinity Pool",
      "Private Butler",
      "Private Seaplane Transfers",
      "Overwater Spa",
      "Submarine Tours",
      "PADI Dive Centre",
      "Free High-Speed Wi-Fi",
      "Gourmet Overwater Restaurant",
      "Sunset Catamaran Charter"
    ],
    highlights: [
      "Private glass-bottom overwater pavilion",
      "Direct staircase into turquoise lagoon reef",
      "Snow room in Maldives' only cryotherapy spa",
      "Private 45-minute seaplane arrival from Malé"
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 7 days prior to arrival",
      pets: "No pets permitted on marine conservation sanctuary",
      smoking: "Designated outdoor terraces only"
    },
    rooms: [
      {
        id: "room-maldives-1",
        name: "Overwater Sunrise Pool Residence",
        size: "185 m² / 1,990 sq ft",
        capacity: 2,
        bedType: "1 Grand Emperor King",
        price: 2200,
        discountPrice: 1980,
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
        amenities: ["Infinity Plunge Pool", "Glass Floor Salon", "Lagoon Access Stairway", "Daily Champagne Breakfast"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 3
      },
      {
        id: "room-maldives-2",
        name: "Romantic Sunset Lagoon Villa",
        size: "260 m² / 2,800 sq ft",
        capacity: 2,
        bedType: "1 Canopy King Bed",
        price: 3400,
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
        amenities: ["Unobstructed Sunset Views", "Private Jacuzzi", "Dedicated Butler 24/7", "Private Sandbank Dinner"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 2
      },
      {
        id: "room-maldives-3",
        name: "Ocean Pavilion Estate (4-Bedroom)",
        size: "620 m² / 6,670 sq ft",
        capacity: 8,
        bedType: "4 Emperor King Suites",
        price: 8800,
        discountPrice: 7900,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        amenities: ["Private Island Beach Strip", "Olympic-length Infinity Pool", "Private Yacht Mooring", "Private Chef & Staff"],
        freeBreakfast: true,
        freeCancellation: false,
        availableCount: 1
      }
    ]
  },
  {
    id: "vela-kyoto",
    name: "Aman Kyoto Forest Sanctuary",
    tagline: "Secret Moss Gardens & Zen Onsen Pavilion",
    destination: "Kyoto, Japan",
    city: "Kyoto",
    country: "Japan",
    category: "Private Villas",
    badge: "Architectural Masterpiece",
    rating: 4.97,
    reviewsCount: 245,
    startingPrice: 1650,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Set within a secluded 80-acre botanical moss garden at the foot of Mount Hidari Daimonji, Aman Kyoto reflects traditional Ryokan aesthetics reimagined for modern visionaries. Natural thermal onsen springs, artisanal cedar bathtubs, and multi-course Kaiseki cuisine curated by Living National Treasures.",
    address: "1 Okitayama Washimine-cho, Kita-ku, Kyoto 603-8458, Japan",
    coordinates: { lat: 35.051, lng: 135.727 },
    stars: 5,
    featured: true,
    trending: false,
    amenities: [
      "Natural Mineral Onsen",
      "Kaiseki Gastronomy",
      "Zen Tea Ceremony Master",
      "Hinoki Wood Soaking Tubs",
      "Forest Yoga Pavilion",
      "Bespoke Cultural Guide",
      "Complimentary Luxury EV Shuttle",
      "Free High-Speed Wi-Fi"
    ],
    highlights: [
      "Centuries-old hidden moss gardens and stone pathways",
      "Authentic private indoor and open-air hot spring onsen",
      "Seasonal Kaiseki dining honoring Kyoto tea traditions",
      "Exclusive private temple access after public hours"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 72 hours prior to arrival",
      pets: "No pets allowed",
      smoking: "Strict non-smoking forest reserve"
    },
    rooms: [
      {
        id: "room-kyoto-1",
        name: "Susuki Forest Pavilion Suite",
        size: "72 m² / 775 sq ft",
        capacity: 2,
        bedType: "1 Japanese Custom King Futon Bed",
        price: 1650,
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        amenities: ["Hinoki Wood Bathtub", "Forest Canopy Views", "Bespoke Green Tea Bar", "Traditional Yukata Robes"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 3
      },
      {
        id: "room-kyoto-2",
        name: "Washimine Villa Sanctuary",
        size: "140 m² / 1,500 sq ft",
        capacity: 3,
        bedType: "1 King Bed + Tatami Living Room",
        price: 3100,
        discountPrice: 2850,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        amenities: ["Private Open-Air Stone Onsen", "Moss Garden Veranda", "Private Tea Master Session", "Shoji Paper Architecture"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 2
      }
    ]
  },
  {
    id: "vela-amalfi",
    name: "Villa TreVille & Cliffside Palace",
    tagline: "Dramatic Glamour Above Positano Bay",
    destination: "Positano, Amalfi Coast, Italy",
    city: "Positano",
    country: "Italy",
    category: "Private Villas",
    badge: "Mediterranean Icon",
    rating: 4.95,
    reviewsCount: 329,
    startingPrice: 1850,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Perched high on the jagged coastal cliffs above Positano, Villa TreVille was once the private artistic haven of maestro Franco Zeffirelli. Surrounded by cascades of bougainvillea, private beach elevator descent, and antique Vietri ceramic tile suites, it is the quintessence of Italian high glamour.",
    address: "Via Arienzo 30, 84017 Positano SA, Italy",
    coordinates: { lat: 40.627, lng: 14.492 },
    stars: 5,
    featured: false,
    trending: true,
    amenities: [
      "Cliffside Infinity Pool",
      "Private Beach Elevator",
      "Complimentary Riva Boat Shuttle",
      "Riva Yacht Charters",
      "Sea-view Terraces",
      "Michelin Trained Executive Chef",
      "Artisan Cocktail Bar",
      "Free High-Speed Wi-Fi"
    ],
    highlights: [
      "Private elevator down the cliffside to exclusive beach club",
      "Hand-painted antique 19th-century ceramic tile decor",
      "Daily complimentary Riva speedboat trips into Positano marina",
      "Limoncello tasting from on-site cliffside lemon groves"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 5 days prior to arrival",
      pets: "Small pets welcome upon request",
      smoking: "Permitted on open-air terraces only"
    },
    rooms: [
      {
        id: "room-amalfi-1",
        name: "Zeffirelli Master Suite",
        size: "80 m² / 860 sq ft",
        capacity: 2,
        bedType: "1 Hand-carved King Bed",
        price: 1850,
        discountPrice: 1650,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        amenities: ["Panoramic Positano Bay View", "Hand-painted Vietri Tiles", "Private Sun Terrace", "Daily Complimentary Prosecco"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 2
      },
      {
        id: "room-amalfi-2",
        name: "Callas Royal Cliffside Estate",
        size: "150 m² / 1,610 sq ft",
        capacity: 3,
        bedType: "1 Grand Emperor King + Daybed",
        price: 3600,
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        amenities: ["Private Heated Cliff Jacuzzi", "Private Lemon Grove Garden", "Dedicated Villa Butler", "Private Sunset Boat Cruise"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 1
      }
    ]
  },
  {
    id: "vela-stmoritz",
    name: "The Badrutt's Alpine Grand Chalet",
    tagline: "Noble Elegance in the Engadin Alps",
    destination: "St. Moritz, Switzerland",
    city: "St. Moritz",
    country: "Switzerland",
    category: "Alpine Chalets",
    badge: "Legendary Alpine Resort",
    rating: 4.98,
    reviewsCount: 468,
    startingPrice: 1950,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Since 1896, The Badrutt's Grand Chalet has epitomized Swiss Alpine royalty. Overlooking the sapphire Lake St. Moritz and the snow-crested Corviglia peaks, guests arrive via vintage Rolls-Royce Phantom and savor private ski concierges, ice-skating rinks, and wood-fired thermal pools.",
    address: "Via Serlas 27, 7500 St. Moritz, Switzerland",
    coordinates: { lat: 46.498, lng: 9.843 },
    stars: 5,
    featured: true,
    trending: false,
    amenities: [
      "Ski-in / Ski-out Access",
      "Rolls-Royce Chauffeur",
      "Thermal Alpine Pool",
      "Private Ski Concierge",
      "Helicopter Heliport",
      "Cigar & Cognac Club",
      "Michelin Star Alpine Dining",
      "Free High-Speed Wi-Fi"
    ],
    highlights: [
      "Complimentary station transfer in hotel Rolls-Royce fleet",
      "Indoor infinity pool looking out to snow-covered Engadin Alps",
      "Ski butler handling heated boots and VIP lift tickets",
      "Nobu restaurant residency inside historic ballroom"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 7 days prior to arrival",
      pets: "Dogs permitted (dog amenities & bed provided)",
      smoking: "Designated smoking lounge with walk-in humidor"
    },
    rooms: [
      {
        id: "room-moritz-1",
        name: "Engadin Lakeview Deluxe Suite",
        size: "70 m² / 750 sq ft",
        capacity: 2,
        bedType: "1 Austrian Goose Down King",
        price: 1950,
        discountPrice: 1720,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        amenities: ["Fireplace Living Room", "Lake St. Moritz Balcony", "Swiss Pine Wood Paneling", "Ski Pass Included"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 3
      },
      {
        id: "room-moritz-2",
        name: "Hitchcock Tower Suite",
        size: "160 m² / 1,720 sq ft",
        capacity: 4,
        bedType: "2 Grand Emperor Kings",
        price: 4800,
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
        amenities: ["Two-story Tower Lookout", "Private Sauna & Steam Room", "Grand Piano & Bar", "24h Alpine Butler"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 1
      }
    ]
  },
  {
    id: "vela-dubai",
    name: "Burj Al-Sultana Sky Palace",
    tagline: "Ultra-Futuristic Luxury Above the Arabian Gulf",
    destination: "Dubai, United Arab Emirates",
    city: "Dubai",
    country: "United Arab Emirates",
    category: "City Penthouses",
    badge: "7-Star Experience",
    rating: 4.97,
    reviewsCount: 680,
    startingPrice: 1750,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Rising dramatically over the Dubai Marina and the Arabian Gulf, Burj Al-Sultana is a temple of golden architecture and modern opulence. Featuring suspended cantilevered infinity pools 70 stories high, 24-karat gold leaf interiors, rooftop helipads, and private underwater dining pavilions.",
    address: "Al Marsa Street, Dubai Marina, Dubai, UAE",
    coordinates: { lat: 25.078, lng: 55.138 },
    stars: 5,
    featured: true,
    trending: true,
    amenities: [
      "Sky-High Infinity Pool",
      "Helipad Transfers",
      "24K Gold Spa Treatments",
      "Underwater Aquarium Dining",
      "Private Maybach Chauffeur",
      "24/7 Royal Butler",
      "Private Cinema",
      "Free High-Speed Wi-Fi"
    ],
    highlights: [
      "Suspended glass bottom infinity pool on 70th floor",
      "Complimentary airport arrival via Rolls-Royce Cullinan",
      "Hermès bespoke amenities in every suite",
      "Private terrace with unobstructed views of Palm Jumeirah"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "13:00",
      cancellation: "Free cancellation up to 48 hours prior to arrival",
      pets: "Pets under 10kg accepted with VIP pet concierge",
      smoking: "Designated sky terrace cigar rooms"
    },
    rooms: [
      {
        id: "room-dubai-1",
        name: "Marina Horizon Executive Suite",
        size: "95 m² / 1,020 sq ft",
        capacity: 2,
        bedType: "1 Revolving King Bed",
        price: 1750,
        discountPrice: 1490,
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
        amenities: ["Palm Jumeirah Skyline View", "Dyson & Hermès Bath Suite", "Gold-leaf Champagne Bar", "Smart Home Automation"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 5
      },
      {
        id: "room-dubai-2",
        name: "Royal Duplex Sky Palace",
        size: "380 m² / 4,090 sq ft",
        capacity: 6,
        bedType: "3 Emperor King Suites",
        price: 7200,
        discountPrice: 6500,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        amenities: ["Private Helipad Access", "Private Cantilevered Pool", "In-suite Gold Bar & Cinema", "24h Dedicated Royal Butler"],
        freeBreakfast: true,
        freeCancellation: false,
        availableCount: 1
      }
    ]
  },
  {
    id: "vela-bali",
    name: "Mandapa Rainforest & River Sanctuary",
    tagline: "Sacred Serenity in the Ayung River Valley",
    destination: "Ubud, Bali, Indonesia",
    city: "Bali",
    country: "Indonesia",
    category: "Private Villas",
    badge: "Eco-Luxe Sanctuary",
    rating: 4.96,
    reviewsCount: 390,
    startingPrice: 1280,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Surrounded by emerald rice terraces and the sacred Ayung River rushing below, Mandapa is a Balinese sanctuary of profound quietude. Experience open-air bamboo dining pavilions, sacred purification water rituals with high Balinese priests, and private teak pool estates.",
    address: "Jalan Kedewatan, Ubud, Gianyar, Bali 80571, Indonesia",
    coordinates: { lat: -8.487, lng: 115.245 },
    stars: 5,
    featured: false,
    trending: true,
    amenities: [
      "Riverfront Private Pool",
      "Personal Patih (Butler)",
      "Balinese Healer Sessions",
      "Ayurvedic Herbal Spa",
      "Bamboo Treehouse Dining",
      "Organic Farm-to-Table",
      "Yoga Shala Pavilion",
      "Free High-Speed Wi-Fi"
    ],
    highlights: [
      "Dedicated 24-hour Patih (Balinese royal butler)",
      "Private river pool overlooking sacred Ayung river canyon",
      "Signature Kubu restaurant with private bamboo cocoon pods",
      "Complimentary sunrise yoga and meditation daily"
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 72 hours prior to arrival",
      pets: "No pets allowed on sacred reserve grounds",
      smoking: "Designated garden pavilions only"
    },
    rooms: [
      {
        id: "room-bali-1",
        name: "River Front Teak Pool Villa",
        size: "145 m² / 1,560 sq ft",
        capacity: 2,
        bedType: "1 Balinese Carved King Bed",
        price: 1280,
        discountPrice: 1120,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        amenities: ["Private Riverfront Pool", "Open-concept Marble Bath", "Organic Gourmet Breakfast", "Daily Afternoon Herbal Tea"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 4
      },
      {
        id: "room-bali-2",
        name: "Mandapa Rice Field Reserve Estate",
        size: "275 m² / 2,960 sq ft",
        capacity: 4,
        bedType: "2 Emperor King Pavilions",
        price: 2450,
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
        amenities: ["360° Private Rice Terrace Views", "20-meter Infinity Pool", "Private Outdoor Dining Shala", "Exclusive Priest Blessing Ceremony"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 2
      }
    ]
  },
  {
    id: "vela-newyork",
    name: "The Mark Manhattan Fifth Avenue",
    tagline: "The Pinnacle of Upper East Side Sophistication",
    destination: "New York City, USA",
    city: "New York",
    country: "United States",
    category: "City Penthouses",
    badge: "Metropolitan Grandeur",
    rating: 4.94,
    reviewsCount: 420,
    startingPrice: 1550,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Located one block from Central Park on 77th and Madison, The Mark is an iconic New York institution. Designed by Jacques Grange, it hosts Jean-Georges Vongerichten's flagship dining room, custom Bergdorf Goodman 24/7 personal shopping privileges, and town-car fleets.",
    address: "25 East 77th Street, Upper East Side, New York, NY 10075, USA",
    coordinates: { lat: 40.774, lng: -73.963 },
    stars: 5,
    featured: false,
    trending: false,
    amenities: [
      "Central Park Steps",
      "Jean-Georges Restaurant",
      "Bergdorf Goodman VIP Access",
      "Frédéric Fekkai Hair Salon",
      "The Mark Pedicabs & Bicycles",
      "Custom Sailboat Charter",
      "24/7 Concierge",
      "Free High-Speed Wi-Fi"
    ],
    highlights: [
      "One block from Central Park and the Metropolitan Museum of Art",
      "Dining exclusively overseen by Chef Jean-Georges",
      "Private chauffeured luxury house cars",
      "Custom The Mark black-and-white striped pedicabs"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 24 hours prior to arrival",
      pets: "Dog friendly with gourmet pet menu and custom Woof beds",
      smoking: "Strict non-smoking facility"
    },
    rooms: [
      {
        id: "room-ny-1",
        name: "Madison Avenue Premier King",
        size: "55 m² / 590 sq ft",
        capacity: 2,
        bedType: "1 Custom Italian Linen King",
        price: 1550,
        discountPrice: 1395,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        amenities: ["Black & White Striped Marble Bath", "Bang & Olufsen Sound System", "Central Park Glimpse", "Morning New York Times & Pastries"],
        freeBreakfast: true,
        freeCancellation: true,
        availableCount: 6
      },
      {
        id: "room-ny-2",
        name: "The Grand Penthouse at The Mark",
        size: "930 m² / 10,000 sq ft",
        capacity: 8,
        bedType: "5 Grand Emperor Kings",
        price: 12500,
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        amenities: ["Largest Hotel Penthouse in USA", "2,500 sq ft Private Rooftop with Central Park View", "Grand Ballroom with 26ft Ceilings", "Private Elevator & 24h Security"],
        freeBreakfast: true,
        freeCancellation: false,
        availableCount: 1
      }
    ]
  }
];

const DESTINATIONS_DATA = [
  {
    name: "Maldives",
    country: "Indian Ocean",
    hotelCount: 14,
    startingPrice: "$2,200",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    tagline: "Overwater bliss and pristine coral atolls"
  },
  {
    name: "Paris",
    country: "France",
    hotelCount: 22,
    startingPrice: "$1,450",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tagline: "Historic palaces, haute couture, and Michelin stars"
  },
  {
    name: "Kyoto",
    country: "Japan",
    hotelCount: 9,
    startingPrice: "$1,650",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    tagline: "Serene bamboo groves and private hot spring onsen"
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    hotelCount: 16,
    startingPrice: "$1,850",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    tagline: "Dramatic sea cliffs and lemon-scented terraces"
  },
  {
    name: "St. Moritz",
    country: "Switzerland",
    hotelCount: 11,
    startingPrice: "$1,950",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    tagline: "Glacial lakes, royal chalets, and private powder slopes"
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    hotelCount: 18,
    startingPrice: "$1,750",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    tagline: "Ultra-luxury sky penthouses and private desert dunes"
  }
];

const SPECIAL_OFFERS = [
  {
    id: "offer-1",
    title: "The Royal Paris Gastronomy Retreat",
    hotelName: "L'Hôtel de la Paix & Palais Royal",
    badge: "Limited Edition",
    discount: "20% OFF + Michelin Tasting",
    description: "Book 4+ nights in any Heritage Suite and receive an exclusive 7-course private tasting dinner for two paired with vintage Grand Cru champagnes.",
    promoCode: "PARISLUXE",
    validTill: "Autumn 2026",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "offer-2",
    title: "Azure Atoll Seaplane & Spa Escape",
    hotelName: "Velaa Private Atoll & Azure Sanctuary",
    badge: "Complimentary Seaplane",
    discount: "$1,200 Credit Included",
    description: "Enjoy roundtrip private twin-otter seaplane transfers for two and daily bespoke signature marine caviar spa rituals included with stays of 5 nights.",
    promoCode: "MALDIVESVIP",
    validTill: "Year-Round 2026",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "offer-3",
    title: "Alpine Glacier & Rolls-Royce Experience",
    hotelName: "The Badrutt's Alpine Grand Chalet",
    badge: "Winter Privilege",
    discount: "Upgrade to Engadin Lakeview",
    description: "Guaranteed complimentary room upgrade, private helicopter glacier tour, and unlimited access to the Roman thermal baths.",
    promoCode: "SWISSGOLD",
    validTill: "Winter 2026/2027",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80"
  }
];

const REVIEWS_SAMPLE = [
  {
    author: "Lord Henry Cavendish",
    location: "London, United Kingdom",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    hotelId: "vela-paris",
    rating: 5.0,
    date: "August 2026",
    verified: true,
    title: "Flawless French refinement beyond expectations",
    comment: "From the moment the Maybach pulled onto Place Vendôme, the service was peerless. The sommelier unlocked a 1982 Château Margaux from the private cellar, and the view of the fireworks over the Eiffel Tower from our suite was unforgettable."
  },
  {
    author: "Elena Rostova",
    location: "Zurich, Switzerland",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    hotelId: "vela-maldives",
    rating: 5.0,
    date: "July 2026",
    verified: true,
    title: "Pure paradise on Earth - total seclusion",
    comment: "We have stayed at luxury resorts across the globe, but Velaa is in a league of its own. Waking up to manta rays swimming beneath the glass floor of our overwater bedroom was magical. Our butler Tariq anticipated every single whim before we even spoke."
  },
  {
    author: "Kenji Takahashi",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    hotelId: "vela-kyoto",
    rating: 5.0,
    date: "June 2026",
    verified: true,
    title: "A spiritual sanctuary that calms the soul",
    comment: "The quiet whisper of the cedar forest and the mineral waters of the private onsen bath brought profound peace. The Kaiseki dinner was true poetic art. The most meditative property in the world."
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "VP-849201",
    hotelId: "vela-paris",
    hotelName: "L'Hôtel de la Paix & Palais Royal",
    roomName: "Vendôme Deluxe King Suite",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    checkIn: "2026-10-12",
    checkOut: "2026-10-16",
    nights: 4,
    guests: 2,
    guestName: "Alexander Vance",
    guestEmail: "alexander.vance@velaprive.com",
    guestPhone: "+1 (555) 392-8812",
    totalAmount: 5160,
    status: "Confirmed",
    paymentMethod: "Visa Signature **** 9081",
    specialRequests: "Chilled vintage champagne on arrival; private airport limousine transfer."
  },
  {
    id: "VP-773194",
    hotelId: "vela-maldives",
    hotelName: "Velaa Private Atoll & Azure Sanctuary",
    roomName: "Overwater Sunrise Pool Residence",
    location: "Noonu Atoll, Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
    checkIn: "2026-11-20",
    checkOut: "2026-11-25",
    nights: 5,
    guests: 2,
    guestName: "Alexander Vance",
    guestEmail: "alexander.vance@velaprive.com",
    guestPhone: "+1 (555) 392-8812",
    totalAmount: 9900,
    status: "Confirmed",
    paymentMethod: "Mastercard World Elite **** 4410",
    specialRequests: "Sunset catamaran reef cruise; dietary: gluten-free breakfast."
  }
];
