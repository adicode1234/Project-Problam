// ===================== HOTEL TYPES =====================

export type HotelTier = "5-star" | "affordable" | "budget";

export type Hotel = {
  id: string;
  name: string;
  city:
    | "Kolkata"
    | "Mumbai"
    | "Darjeeling"
    | "Arunachal Pradesh"
    | "Manali"
    | "Gujarat";
  neighbourhood: string;
  tier: HotelTier;
  price_range: string;
  price_per_night_inr: number; // approximate INR per night
  image: string; // Unsplash image URL
  rating: number; // out of 5
  why_stay_here: string;
  best_for: string; // e.g. "Couples", "Business", "Backpackers"
  amenities: string[];
  insider_tip: string;
  official_website: string;
  booking_link: string; // direct booking page
  coordinates: [number, number]; // [lat, lng]
  tags: string[];
  address: string;
  check_in: string;
  check_out: string;
  nearby_attractions: string[];
};

// ===================== HOTELS DATABASE =====================

export const HOTELS: Hotel[] = [

  // ──────────────────── KOLKATA ────────────────────

  {
    id: "kol-001",
    name: "The Oberoi Grand",
    city: "Kolkata",
    neighbourhood: "Chowringhee",
    tier: "5-star",
    price_range: "₹10,800-₹19,000",
    price_per_night_inr: 18000,
    image: "https://content.jdmagicbox.com/comp/kolkata/46/033p1002346/catalogue/the-oberoi-grand-dharmatala-kolkata-hotels-x0xqr9vput.jpg",
    rating: 4.8,
    why_stay_here:
      "A colonial-era landmark on Chowringhee, The Oberoi Grand is Kolkata's crown jewel — white-columned grandeur with impeccable butler service and a pool that feels like a secret garden in the city's heart.",
    best_for: "Luxury travellers, honeymooners, heritage lovers",
    amenities: [
      "Outdoor pool",
      "Spa & wellness centre",
      "24-hr butler service",
      "Fine dining (The Chowringhee Bar)",
      "Business centre",
      "Valet parking",
      "Concierge",
      "Fitness centre",
    ],
    insider_tip:
      "Ask for a room overlooking the inner courtyard pool — it's quieter and more atmospheric than the street-facing rooms.",
    official_website: "https://www.oberoihotels.com/hotels-in-kolkata/",
    booking_link: "https://www.oberoihotels.com/hotels-in-kolkata/rooms-and-suites/",
    coordinates: [22.5558, 88.3495],
    tags: ["colonial", "heritage", "luxury", "pool", "fine-dining"],
    address: "15, Jawaharlal Nehru Road, Chowringhee, Kolkata – 700013",
    check_in: "2:00 PM",
    check_out: "12:00 PM",
    nearby_attractions: ["Victoria Memorial", "Park Street", "Maidan", "Indian Museum"],
  },

  {
    id: "kol-002",
    name: "ITC Royal Bengal",
    city: "Kolkata",
    neighbourhood: "Salt Lake / Sector V",
    tier: "5-star",
    price_range: "₹8,000–₹10,600",
    price_per_night_inr: 15000,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/604155459.jpg?k=b3840036ac52cffbb4c18842b0a6af2fe151f87f19bdbc0b365ac617ffb32c7b&o=",
    rating: 4.7,
    why_stay_here:
      "One of India's tallest hotels with panoramic city views, ITC Royal Bengal blends Bengal artisan craft with modern luxury. Its rooftop infinity pool and Dum Pukht restaurant are legendary.",
    best_for: "Business travellers, food connoisseurs, couples",
    amenities: [
      "Infinity rooftop pool",
      "Spa",
      "Multiple restaurants (Dum Pukht, Eden Pavilion)",
      "Executive lounge",
      "MICE facilities",
      "Fitness centre",
      "Kids' club",
    ],
    insider_tip:
      "Book a table at Dum Pukht for dinner — reserve at least a week in advance as it fills up fast.",
    official_website: "https://www.itchotels.com/in/en/itcroyal-bengal-kolkata",
    booking_link: "https://www.itchotels.com/in/en/itcroyal-bengal-kolkata/rooms",
    coordinates: [22.5744, 88.4343],
    tags: ["rooftop-pool", "business", "luxury", "bengal-art", "fine-dining"],
    address: "1, JBS Haldane Avenue, Salt Lake, Kolkata – 700105",
    check_in: "3:00 PM",
    check_out: "12:00 PM",
    nearby_attractions: ["Eco Park", "Biswa Bangla Gate", "Science City", "New Town"],
  },

  {
    id: "kol-003",
    name: "The LaLiT Great Eastern Kolkata",
    city: "Kolkata",
    neighbourhood: "BBD Bagh",
    tier: "5-star",
    price_range: "₹6,380–₹12,000",
    price_per_night_inr: 10000,
    image: "https://www.thelalit.com/wp-content/uploads/2021/07/Kolkata-Facade-M.jpg",
    rating: 4.5,
    why_stay_here:
      "Built in 1841, this is Asia's oldest hotel still in operation. Its restored Victorian ballroom and tiffin-era nostalgia make it unlike anything else in the city.",
    best_for: "History buffs, heritage enthusiasts, couples",
    amenities: [
      "Heritage ballroom",
      "Spa",
      "Multiple restaurants",
      "Pool",
      "Business centre",
      "Vintage bar",
    ],
    insider_tip:
      "Stroll through the original 1841 lobby corridors in the evening — the teak woodwork and iron columns are stunning when lit.",
    official_website: "https://www.thelalit.com/the-lalit-great-eastern-kolkata/",
    booking_link: "https://www.thelalit.com/the-lalit-great-eastern-kolkata/rooms-and-suites/",
    coordinates: [22.5726, 88.3502],
    tags: ["heritage", "victorian", "historic", "luxury", "ballroom"],
    address: "1-3, Old Court House Street, BBD Bagh, Kolkata – 700069",
    check_in: "2:00 PM",
    check_out: "12:00 PM",
    nearby_attractions: ["Dalhousie Square", "Writers' Building", "St. John's Church"],
  },

  {
    id: "kol-004",
    name: "Vedic Village Spa Resort",
    city: "Kolkata",
    neighbourhood: "Rajarhat",
    tier: "affordable",
    price_range: "₹3,744-₹8,100",
    price_per_night_inr: 5500,
    image: "https://images.trvl-media.com/lodging/9000000/8120000/8119600/8119508/983d4ca1.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    rating: 4.3,
    why_stay_here:
      "A lush eco-resort on the outskirts of Kolkata with thatched cottages, organic farms, and authentic Ayurvedic treatments. Perfect for a digital detox without leaving the city district.",
    best_for: "Wellness seekers, couples, weekend retreats",
    amenities: [
      "Ayurvedic spa",
      "Organic farm",
      "Pool",
      "Yoga centre",
      "Cultural performances",
      "Multi-cuisine restaurant",
    ],
    insider_tip:
      "Request the 'Panchakarma' Ayurvedic detox package — it's exceptional value here compared to Kerala resorts.",
    official_website: "https://www.vedicvillage.com/",
    booking_link: "https://www.vedicvillage.com/accommodation/",
    coordinates: [22.6311, 88.4789],
    tags: ["eco-resort", "ayurveda", "wellness", "cottages", "organic"],
    address: "Chakpachuria, Badu Road, Rajarhat, Kolkata – 700135",
    check_in: "2:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Eco Park", "New Town Art District", "Biswa Bangla Gate"],
  },

  {
    id: "kol-005",
    name: "Broadway Hotel",
    city: "Kolkata",
    neighbourhood: "Dharmatala",
    tier: "budget",
    price_range: "₹815-₹1,487 ",
    price_per_night_inr: 1200,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/81/32/ba/exterior.jpg?w=900&h=500&s=1",
    rating: 3.8,
    why_stay_here:
      "Kolkata's most famous budget hotel — a 1937 art deco institution beloved by writers, artists, and backpackers. Its attached Basement Bar is a city institution.",
    best_for: "Backpackers, solo travellers, budget explorers",
    amenities: [
      "Art deco architecture",
      "Basement Bar (famous in the city)",
      "Restaurant",
      "24-hr front desk",
      "AC rooms available",
    ],
    insider_tip:
      "The Basement Bar serves cold Kingfisher and fish cutlets for almost nothing — sit there on a weekday evening and you'll meet Kolkata's best storytellers.",
    official_website: "https://broadwayhotelkolkata.com/",
    booking_link: "https://broadwayhotelkolkata.com/rooms/",
    coordinates: [22.5607, 88.3519],
    tags: ["budget", "art-deco", "historic", "backpacker", "bar"],
    address: "27A, Ganesh Chandra Avenue, Dharmatala, Kolkata – 700013",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["New Market", "Esplanade", "Park Street", "Maidan"],
  },

  // ──────────────────── MUMBAI ────────────────────

  {
    id: "mum-001",
    name: "The Taj Mahal Palace",
    city: "Mumbai",
    neighbourhood: "Colaba",
    tier: "5-star",
    price_range: "₹35,000-₹45,000",
    price_per_night_inr: 35000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPqHkWL2yy7QW4M-0rNQvPtWy_wMQjj1Vc2g&s",
    rating: 4.9,
    why_stay_here:
      "India's most iconic hotel — 120 years old, overlooking the Gateway of India. The Palace wing rooms with harbour views are among the finest hotel rooms on earth.",
    best_for: "Luxury travellers, honeymooners, bucket-list stays",
    amenities: [
      "Harbour-view rooms",
      "Multiple fine-dining restaurants (Wasabi, Golden Dragon, Souk)",
      "Jiva Spa",
      "Rooftop pool",
      "Taj Club lounge",
      "24-hr butler",
      "Boutiques",
    ],
    insider_tip:
      "Even if you're not staying, have high tea at the Sea Lounge — the harbour views and finger sandwiches are extraordinary.",
    official_website: "https://www.tajhotels.com/en-in/taj/taj-mahal-palace-mumbai/",
    booking_link: "https://www.tajhotels.com/en-in/taj/taj-mahal-palace-mumbai/rooms-and-suites/",
    coordinates: [18.9217, 72.8332],
    tags: ["iconic", "heritage", "harbour-view", "luxury", "gateway-of-india"],
    address: "Apollo Bunder, Colaba, Mumbai – 400001",
    check_in: "2:00 PM",
    check_out: "12:00 PM",
    nearby_attractions: ["Gateway of India", "Elephanta Caves", "Colaba Causeway", "Regal Cinema"],
  },

  {
    id: "mum-002",
    name: "Four Seasons Hotel Mumbai",
    city: "Mumbai",
    neighbourhood: "Worli",
    tier: "5-star",
    price_range: "₹25,000-₹35,000",
    price_per_night_inr: 28000,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34412063.jpg?k=f43279d45409734343fd5b8787a22ac9a1b2a499ef7bd58b53235faa51ba4778&o=",
    rating: 4.7,
    why_stay_here:
      "A glass tower rising above Worli with uninterrupted Arabian Sea views from every room. AER rooftop bar is Mumbai's most dramatic sundowner spot.",
    best_for: "Business travellers, couples, sundowner seekers",
    amenities: [
      "AER rooftop bar & pool",
      "Spa",
      "San-Qi restaurant (pan-Asian)",
      "Fitness centre",
      "Business centre",
      "Kids' facilities",
    ],
    insider_tip:
      "Visit AER rooftop bar at sunset on a clear day — you can see the Bandra-Worli Sea Link lit up against an orange sky.",
    official_website: "https://www.fourseasons.com/mumbai/",
    booking_link: "https://www.fourseasons.com/mumbai/rooms-and-suites/",
    coordinates: [19.0136, 72.8173],
    tags: ["sea-view", "rooftop", "contemporary", "luxury", "sundowner"],
    address: "1/136, Dr. E Moses Road, Worli, Mumbai – 400018",
    check_in: "3:00 PM",
    check_out: "12:00 PM",
    nearby_attractions: ["Worli Sea Face", "Bandra-Worli Sea Link", "Nehru Planetarium"],
  },

  {
    id: "mum-003",
    name: "Abode Bombay",
    city: "Mumbai",
    neighbourhood: "Colaba",
    tier: "affordable",
    price_range: "₹4,500-₹6,000",
    price_per_night_inr: 4500,
    image: "https://content.jdmagicbox.com/v2/comp/mumbai/q2/022pxx22.xx22.140115123559.l2q2/catalogue/abode-crawford-market-mumbai-hotels-hrg3.jpg",
    rating: 4.4,
    why_stay_here:
      "A gorgeous boutique hotel in a restored 1940s heritage building steps from the Gateway of India. Each room is individually decorated with vintage Bombay photography and handcrafted furniture.",
    best_for: "Design lovers, couples, boutique-hotel fans",
    amenities: [
      "Heritage architecture",
      "Rooftop café",
      "Curated art collection",
      "Concierge",
      "Free Wi-Fi",
      "24-hr reception",
    ],
    insider_tip:
      "Ask for the 'Bombay room' — its window seat overlooking the laneway is perfect for morning coffee and people-watching.",
    official_website: "https://www.abodebombay.com/",
    booking_link: "https://www.abodebombay.com/rooms/",
    coordinates: [18.9225, 72.8327],
    tags: ["boutique", "heritage", "design", "colaba", "vintage"],
    address: "Lansdowne House, MB Marg, Colaba, Mumbai – 400001",
    check_in: "2:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Gateway of India", "Colaba Causeway", "Café Mondegar"],
  },

  {
    id: "mum-004",
    name: "Zostel Mumbai",
    city: "Mumbai",
    neighbourhood: "Fort",
    tier: "budget",
    price_range: "₹700-₹1,200",
    price_per_night_inr: 700,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/ee/20/6f/caption.jpg?w=1200&h=-1&s=1",
    rating: 4.1,
    why_stay_here:
      "India's most popular hostel chain — perfectly located in the Fort heritage district with co-working spaces, a buzzing common room, and the best budget traveller community in the city.",
    best_for: "Backpackers, solo travellers, digital nomads",
    amenities: [
      "Dormitory & private rooms",
      "Co-working space",
      "Common room",
      "Free Wi-Fi",
      "Locker storage",
      "Travel desk",
    ],
    insider_tip:
      "Ask the front desk for their hand-drawn neighbourhood walking map — it's not on Google and leads to the best chai tapris and Irani cafés nearby.",
    official_website: "https://www.zostel.com/zostel/mumbai/",
    booking_link: "https://www.zostel.com/zostel/mumbai/",
    coordinates: [18.9353, 72.8348],
    tags: ["hostel", "backpacker", "social", "budget", "co-working"],
    address: "Mezzanine Floor, Tanners House, 22 Dr Dadabhai Naoroji Road, Fort, Mumbai – 400001",
    check_in: "2:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Chhatrapati Shivaji Maharaj Terminus", "Horniman Circle", "Flora Fountain"],
  },

  // ──────────────────── DARJEELING ────────────────────

  {
    id: "dar-001",
    name: "Glenburn Tea Estate & Boutique Hotel",
    city: "Darjeeling",
    neighbourhood: "Glenburn",
    tier: "5-star",
    price_range: "₹35,000-₹45,000",
    price_per_night_inr: 25000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7kvT8idwGUjGfxcAPexit3IFilztHdvZ09Q&s",
    rating: 4.9,
    why_stay_here:
      "A working tea estate from 1860 with just 8 bungalow rooms, Kanchenjunga views, and daily tea-plucking walks. One of India's finest boutique experiences — all-inclusive with gourmet meals.",
    best_for: "Luxury escapists, tea lovers, nature enthusiasts",
    amenities: [
      "All-inclusive meals",
      "Tea estate walks",
      "River fishing",
      "Kanchenjunga views",
      "Campfires",
      "Bird watching",
      "Library",
    ],
    insider_tip:
      "Wake up at 5 AM and walk to the eastern ridge — on a clear day you get a full view of Kanchenjunga turning pink in sunrise light.",
    official_website: "https://www.glenburntea.com/",
    booking_link: "https://www.glenburntea.com/stay/",
    coordinates: [27.0292, 88.2272],
    tags: ["tea-estate", "luxury", "all-inclusive", "kanchenjunga", "colonial"],
    address: "Glenburn Tea Estate, Darjeeling – 734201, West Bengal",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Tiger Hill", "Batasia Loop", "Happy Valley Tea Estate"],
  },

  {
    id: "dar-002",
    name: "Windamere Hotel",
    city: "Darjeeling",
    neighbourhood: "Observatory Hill",
    tier: "5-star",
    price_range: "₹12,000-₹15,000",
    price_per_night_inr: 12000,
    image: "https://www.darjeeling-tourism.com/darj_i00083b.jpg",
    rating: 4.6,
    why_stay_here:
      "Built in 1887, Windamere is a living museum of the British Raj era — fireplaces in every room, silver tea service, and a dining room that still serves puddings from Victorian-era recipes.",
    best_for: "Heritage lovers, couples, history enthusiasts",
    amenities: [
      "Fireplace in rooms",
      "Raj-era dining room",
      "Silver tea service",
      "Mountain views",
      "Library",
      "Garden",
      "Evening entertainment",
    ],
    insider_tip:
      "The hotel still plays old gramophone records in the evening lounge — pair that with their homemade plum brandy for a genuinely magical night.",
    official_website: "https://www.windamerehotel.com/",
    booking_link: "https://www.windamerehotel.com/rooms.html",
    coordinates: [27.0414, 88.2632],
    tags: ["heritage", "raj-era", "fireplace", "colonial", "mountain-views"],
    address: "Observatory Hill, Darjeeling – 734101, West Bengal",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Observatory Hill Temple", "Mahakal Temple", "Chowrasta Mall"],
  },

  {
    id: "dar-003",
    name: "Hotel Dekeling",
    city: "Darjeeling",
    neighbourhood: "Gandhi Road",
    tier: "affordable",
    price_range: "₹3,000-₹6,000",
    price_per_night_inr: 3000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1q3qlNHeJB8nrjy4gDlNM6QyGyPHInHzwiw&s",
    rating: 4.2,
    why_stay_here:
      "A warm, family-run hotel perched on the hillside with stunning valley views, home-cooked Tibetan-Bengali meals, and owners who have been welcoming travellers for three generations.",
    best_for: "Budget-conscious travellers, solo trekkers, families",
    amenities: [
      "Mountain & valley views",
      "Home-cooked meals",
      "Trekking guidance",
      "Free Wi-Fi",
      "Warm blankets & hot water",
      "Travel desk",
    ],
    insider_tip:
      "Ask Mrs Dekeling for her momos recipe — she's been known to teach cooking classes to guests who stay more than 2 nights.",
    official_website: "https://hoteldekeling.com/",
    booking_link: "https://hoteldekeling.com/rooms/",
    coordinates: [27.0419, 88.2629],
    tags: ["family-run", "valley-view", "tibetan", "cozy", "affordable"],
    address: "51, Gandhi Road, Darjeeling – 734101, West Bengal",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Chowrasta Mall", "Tiger Hill", "Darjeeling Himalayan Railway"],
  },

  {
    id: "dar-004",
    name: "Cochrane Place",
    city: "Darjeeling",
    neighbourhood: "Kurseong",
    tier: "affordable",
    price_range: "₹3,744-₹8,100",
    price_per_night_inr: 5500,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/99/49/27/cochrane-place.jpg?w=900&h=500&s=1",
    rating: 4.4,
    why_stay_here:
      "A heritage bungalow from 1920 nestled in tea gardens 30 minutes below Darjeeling in the quieter hill town of Kurseong. Fewer tourists, more mist, and far better value.",
    best_for: "Couples, slow travellers, tea garden enthusiasts",
    amenities: [
      "Tea garden setting",
      "Heritage bungalow rooms",
      "Restaurant with local cuisine",
      "Garden walks",
      "Fireplace lounge",
      "Mountain views",
    ],
    insider_tip:
      "Kurseong is far less crowded than Darjeeling town — rent a cycle from the hotel and explore tea estate roads at your own pace.",
    official_website: "https://www.cochraneplace.com/",
    booking_link: "https://www.cochraneplace.com/rooms-tariff/",
    coordinates: [26.8791, 88.2780],
    tags: ["heritage-bungalow", "kurseong", "tea-garden", "misty", "quiet"],
    address: "12/1, Pankhabari Road, Kurseong, Darjeeling – 734203, West Bengal",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Cochrane Tea Estate", "Netaji Subhash Chandra Bose Museum", "Eagle's Crag"],
  },

  // ──────────────────── ARUNACHAL PRADESH ────────────────────

  {
    id: "aru-001",
    name: "Pemaling Luxury Camp",
    city: "Arunachal Pradesh",
    neighbourhood: "Tawang",
    tier: "5-star",
    price_range: "₹18,000-₹25,000",
    price_per_night_inr: 18000,
    image: "https://content3.jdmagicbox.com/comp/west-kameng/a9/9999p3782.3782.140427230015.u9a9/catalogue/hotel-pemaling-dirang-west-kameng-hotels-7n91aq.jpg",
    rating: 4.7,
    why_stay_here:
      "India's finest luxury tented camp near Tawang, with heated Swiss canvas tents, floor-to-ceiling windows facing the monastery, and a private bonfire under the Himalayan stars.",
    best_for: "Luxury adventurers, couples, monastery seekers",
    amenities: [
      "Heated luxury tents",
      "Monastery views",
      "Private bonfire",
      "Gourmet Arunachali cuisine",
      "Cultural experiences",
      "Guided treks",
      "Stargazing sessions",
    ],
    insider_tip:
      "Visit Tawang Monastery at 6 AM for the morning prayer session — the camp's guide will arrange a private blessing from the head monk.",
    official_website: "https://www.pemaling.com/",
    booking_link: "https://www.pemaling.com/reservations/",
    coordinates: [27.5860, 91.8677],
    tags: ["luxury-camp", "tawang", "monastery", "himalayan", "stargazing"],
    address: "Near Tawang Monastery, Tawang, Arunachal Pradesh – 790104",
    check_in: "2:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Tawang Monastery", "Sela Pass", "Madhuri Lake", "Bumla Pass"],
  },

  {
    id: "aru-002",
    name: "Hotel Tawang Palace",
    city: "Arunachal Pradesh",
    neighbourhood: "Tawang Town",
    tier: "affordable",
    price_range: "₹3,500-₹5,000",
    price_per_night_inr: 3500,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/31/3c/d8/caption.jpg?w=900&h=500&s=1",
    rating: 4.1,
    why_stay_here:
      "The most reliable mid-range hotel in Tawang town with clean rooms, mountain-facing balconies, and the warmest hospitality from a local Monpa family.",
    best_for: "Trekkers, solo travellers, budget explorers",
    amenities: [
      "Mountain views",
      "In-house restaurant (local Monpa cuisine)",
      "Hot water",
      "Travel assistance for permits",
      "Free parking",
    ],
    insider_tip:
      "The owners can arrange Inner Line Permit extensions and local jeep sharing to remote monasteries — ask them before booking tour operators.",
    official_website: "https://www.hoteltawangpalace.com/",
    booking_link: "https://www.hoteltawangpalace.com/rooms/",
    coordinates: [27.5856, 91.8670],
    tags: ["mountain-view", "monpa", "local", "affordable", "permit-help"],
    address: "Old Market, Tawang Town, Arunachal Pradesh – 790104",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Tawang Monastery", "Tawang War Memorial", "PT Tso Lake"],
  },

  {
    id: "aru-003",
    name: "Dony Polo Ashok Hotel",
    city: "Arunachal Pradesh",
    neighbourhood: "Itanagar",
    tier: "affordable",
    price_range: "₹3,744-₹8,100",
    price_per_night_inr: 4000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8Lb5kT-nCzk8VVPzul9YWXGEdGHQBpgQ2g&s",
    rating: 3.9,
    why_stay_here:
      "The capital's most established hotel — run by ITDC with reliable service, a well-stocked restaurant, and the best location in Itanagar for exploring the state capital's cultural sites.",
    best_for: "Business travellers, government visitors, culture seekers",
    amenities: [
      "Restaurant",
      "Conference room",
      "Free Wi-Fi",
      "Parking",
      "Travel desk",
      "24-hr room service",
    ],
    insider_tip:
      "The restaurant's Arunachali thali featuring bamboo shoot curry and aporv is outstanding — order it for dinner, not the standard Indian menu.",
    official_website: "https://www.theashokgroup.com/hotel/dony-polo-ashok-itanagar",
    booking_link: "https://www.theashokgroup.com/hotel/dony-polo-ashok-itanagar/rooms",
    coordinates: [27.0995, 93.6233],
    tags: ["capital", "itanagar", "reliable", "culture", "government"],
    address: "Sector C, Itanagar, Arunachal Pradesh – 791111",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Ita Fort", "Jawaharlal Nehru Museum", "Ganga Lake", "Namdapha National Park"],
  },

  // ──────────────────── MANALI ────────────────────

  {
    id: "man-001",
    name: "Span Resort & Spa",
    city: "Manali",
    neighbourhood: "Kullu Valley",
    tier: "5-star",
    price_range: "₹35,000-₹45,000",
    price_per_night_inr: 14000,
    image: "https://api.blessingsonthenet.com/uploads/hotels/2613c2ddb96780e57d22bbc2f9e5fc7b-1690219182807-Span%20Resort%20at%20Manali_1.jpg",
    rating: 4.6,
    why_stay_here:
      "Perched right on the Beas riverbank with chalets that jut out over the rushing water. Wake up to the sound of the river, step out to apple orchards, and soak in outdoor hot tubs with snow-peak views.",
    best_for: "Couples, luxury adventurers, nature lovers",
    amenities: [
      "Riverside chalets",
      "Outdoor hot tubs",
      "Himalayan spa",
      "River-facing restaurant",
      "Adventure activity desk",
      "Apple orchard walks",
      "Bonfire evenings",
    ],
    insider_tip:
      "Book the 'Beas Suite' — it has a private deck literally hanging over the river. The white noise of water is extraordinary for sleep.",
    official_website: "https://www.spanresort.com/",
    booking_link: "https://www.spanresort.com/rooms-suites/",
    coordinates: [31.9397, 77.1586],
    tags: ["riverside", "chalets", "hot-tub", "luxury", "beas-river"],
    address: "Katrain, Kullu Valley, Himachal Pradesh – 175129",
    check_in: "2:00 PM",
    check_out: "12:00 PM",
    nearby_attractions: ["Rohtang Pass", "Solang Valley", "Great Himalayan National Park"],
  },

  {
    id: "man-002",
    name: "Solang Valley Resort",
    city: "Manali",
    neighbourhood: "Solang Valley",
    tier: "5-star",
    price_range: "₹25,000-₹35,000",
    price_per_night_inr: 11000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaFGUO4R8jZP6gAqd1JtGNaCLUMHDRVZ4rTw&s",
    rating: 4.5,
    why_stay_here:
      "Ski-in ski-out access in winter and paragliding right from the resort in summer. Massive glass-walled rooms face the Solang snow bowl — the best adventure basecamp in Manali.",
    best_for: "Adventure seekers, skiers, families",
    amenities: [
      "Ski-in/ski-out access",
      "Paragliding arrangements",
      "Glass-wall mountain view rooms",
      "Indoor pool & spa",
      "Restaurant with valley views",
      "Bonfire area",
    ],
    insider_tip:
      "In February–March the snow conditions are perfect and the resort is half the price of peak December. Book on weekdays for best rates.",
    official_website: "https://www.solangvalleyresort.com/",
    booking_link: "https://www.solangvalleyresort.com/rooms/",
    coordinates: [32.0803, 77.1238],
    tags: ["skiing", "paragliding", "snow", "adventure", "mountain-view"],
    address: "Solang Valley, Manali, Himachal Pradesh – 175131",
    check_in: "2:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Rohtang Pass", "Atal Tunnel", "Beas Kund Trek"],
  },

  {
    id: "man-003",
    name: "Apple Country Resort",
    city: "Manali",
    neighbourhood: "Manali Town",
    tier: "affordable",
    price_range: "₹4,500-₹6,000",
    price_per_night_inr: 4500,
    image: "https://daahy6akrtcj2.cloudfront.net/hotelsmanali.co.in/photos/2057147231.jpg",
    rating: 4.2,
    why_stay_here:
      "A charming resort nestled inside working apple orchards, with wooden cottages, mountain views, and the freshest apple juice you'll ever taste — served daily at breakfast.",
    best_for: "Families, couples, first-time Manali visitors",
    amenities: [
      "Apple orchard setting",
      "Wooden cottages",
      "Mountain-view restaurant",
      "Bonfire evenings",
      "Trekking desk",
      "Free Wi-Fi",
      "Parking",
    ],
    insider_tip:
      "Pick apples straight from the trees in September-October — the owner lets guests harvest their own fruit and the resort makes fresh apple jam that you can carry home.",
    official_website: "https://www.applecountryresorts.com/",
    booking_link: "https://www.applecountryresorts.com/rooms/",
    coordinates: [32.2432, 77.1892],
    tags: ["apple-orchard", "cottages", "mountain-view", "family", "peaceful"],
    address: "Circuit House Road, Manali, Himachal Pradesh – 175131",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Hadimba Temple", "Old Manali", "Vashisht Hot Springs", "Club House"],
  },

  {
    id: "man-004",
    name: "Zostel Manali",
    city: "Manali",
    neighbourhood: "Old Manali",
    tier: "budget",
    price_range: "₹700-₹1,200",
    price_per_night_inr: 600,
    image: "",
    rating: 4.3,
    why_stay_here:
      "The social hub of Old Manali — a backpacker hostel with rooftop river views, a fireplace lounge, a café, and the most well-connected travel community for trekking and biking partners.",
    best_for: "Backpackers, solo travellers, trekkers, bikers",
    amenities: [
      "Rooftop with Beas River views",
      "In-house café",
      "Fireplace lounge",
      "Travel community noticeboard",
      "Dorm & private rooms",
      "Locker storage",
    ],
    insider_tip:
      "Pin a note on the travel board if you need biking partners for Spiti Valley — most Zostel guests are on their way there and happy to share the journey.",
    official_website: "https://www.zostel.com/zostel/manali/",
    booking_link: "https://www.zostel.com/zostel/manali/",
    coordinates: [32.2478, 77.1792],
    tags: ["hostel", "backpacker", "old-manali", "café", "river-view"],
    address: "Old Manali Road, Old Manali, Himachal Pradesh – 175131",
    check_in: "2:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Manu Temple", "Old Manali Cafés", "Hadimba Temple", "Beas River"],
  },

  // ──────────────────── GUJARAT ────────────────────

  {
    id: "guj-001",
    name: "The Fern Residency Ahmedabad",
    city: "Gujarat",
    neighbourhood: "Bodakdev, Ahmedabad",
    tier: "5-star",
    price_range: "₹35,000-₹45,000",
    price_per_night_inr: 8500,
    image: "https://r1imghtlak.ibcdn.com/81bcdbcb-b34b-4c75-8b27-9ca1adea181a.jpeg",
    rating: 4.4,
    why_stay_here:
      "Ahmedabad's greenest luxury hotel — LEED certified with a stunning pool courtyard, a rooftop terrace bar, and proximity to the UNESCO World Heritage old city walks.",
    best_for: "Business travellers, couples, heritage explorers",
    amenities: [
      "Outdoor pool",
      "Rooftop terrace",
      "Eco-certified property",
      "Spa & fitness centre",
      "Multi-cuisine restaurant",
      "Business centre",
      "Valet parking",
    ],
    insider_tip:
      "The hotel can arrange early morning Heritage Walk guides — book through them rather than street touts for a far better experience.",
    official_website: "https://www.fernhotels.com/fern-residency-ahmedabad.html",
    booking_link: "https://www.fernhotels.com/fern-residency-ahmedabad.html#rooms",
    coordinates: [23.0416, 72.5179],
    tags: ["eco", "leed", "pool", "heritage-walk", "ahmedabad"],
    address: "Panchwati Cross Road, Bodakdev, Ahmedabad, Gujarat – 380054",
    check_in: "2:00 PM",
    check_out: "12:00 PM",
    nearby_attractions: ["Sabarmati Ashram", "Old City Heritage Walk", "Adalaj Stepwell"],
  },

  {
    id: "guj-002",
    name: "Rann Utsav – Tent City",
    city: "Gujarat",
    neighbourhood: "Dhordo, Rann of Kutch",
    tier: "5-star",
    price_range: "₹25,000-₹35,000",
    price_per_night_inr: 20000,
    image: "https://evokeexperiences.in/wp-content/uploads/2025/11/gallery-thumb.jpg",
    rating: 4.8,
    why_stay_here:
      "The Government of Gujarat's legendary Tent City on the white salt desert — a once-a-year festival experience (Nov–Feb) with luxury AC tents, camel safaris, folk music, and moonlit walks on the Rann.",
    best_for: "Bucket-list travellers, couples, festival seekers",
    amenities: [
      "Luxury AC tents",
      "Cultural performances nightly",
      "Camel & jeep safaris",
      "Folk music & dance",
      "Local Kutchi cuisine",
      "Sunrise & moonrise viewing",
      "Handicraft marketplace",
    ],
    insider_tip:
      "Book at least 3 months in advance — the tent city sells out entirely for December and full moon nights. Full moon dates are the most magical.",
    official_website: "https://www.rannutsav.com/",
    booking_link: "https://www.rannutsav.com/book-your-tent/",
    coordinates: [23.8776, 69.8000],
    tags: ["rann-of-kutch", "tent-city", "festival", "salt-desert", "cultural"],
    address: "Dhordo Village, Rann of Kutch, Gujarat – 370510",
    check_in: "2:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["White Rann", "Black Hill", "Kalo Dungar", "India Bridge"],
  },

  {
    id: "guj-003",
    name: "WelcomHotel Vadodara",
    city: "Gujarat",
    neighbourhood: "Vadodara City Centre",
    tier: "5-star",
    price_range: "₹35,000-₹45,000",
    price_per_night_inr: 7500,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/56/8b/a7/welcomhotel-vadodara.jpg?w=900&h=500&s=1",
    rating: 4.3,
    why_stay_here:
      "ITC's premium brand in the cultural capital of Gujarat — walking distance from Laxmi Vilas Palace, with an exceptional buffet featuring authentic Gujarati thali alongside pan-Indian options.",
    best_for: "Culture lovers, heritage tourism, business travellers",
    amenities: [
      "Pool",
      "Spa",
      "Gujarati & multi-cuisine restaurant",
      "Business centre",
      "Fitness centre",
      "24-hr room service",
    ],
    insider_tip:
      "The weekend Gujarati thali dinner is extraordinary — unlimited servings of dhokla, undhiyu, basundi, and 25+ dishes for ₹1200 per person. Unmissable.",
    official_website: "https://www.itchotels.com/in/en/welcomhotel-vadodara",
    booking_link: "https://www.itchotels.com/in/en/welcomhotel-vadodara/rooms",
    coordinates: [22.3072, 73.1812],
    tags: ["cultural", "vadodara", "gujarati-thali", "heritage", "pool"],
    address: "R.C. Dutt Road, Alkapuri, Vadodara, Gujarat – 390007",
    check_in: "2:00 PM",
    check_out: "12:00 PM",
    nearby_attractions: ["Laxmi Vilas Palace", "Baroda Museum", "Sayaji Garden"],
  },

  {
    id: "guj-004",
    name: "Hotel Kalyan",
    city: "Gujarat",
    neighbourhood: "Old City, Ahmedabad",
    tier: "affordable",
    price_range: "₹4,500-₹6,000",
    price_per_night_inr: 2800,
    image: "https://content.jdmagicbox.com/comp/rajkot/z5/0281px281.x281.220108175815.r2z5/catalogue/hotel-kalyan-pedak-road-rajkot-hotels-zvqmo3za4v.jpg",
    rating: 3.9,
    why_stay_here:
      "A well-run mid-range hotel right inside the UNESCO World Heritage walled city, within walking distance of the finest pols, mosques, and Jain temples of Ahmedabad.",
    best_for: "Heritage explorers, budget travellers, solo adventurers",
    amenities: [
      "Central Old City location",
      "Restaurant (Gujarati cuisine)",
      "Free Wi-Fi",
      "24-hr reception",
      "Travel desk",
      "Hot water",
    ],
    insider_tip:
      "The hotel staff organise sunrise heritage pol walks for ₹200 per person — cheaper and more personal than any tour operator in the city.",
    official_website: "https://www.hotelkalyan.com/",
    booking_link: "https://www.hotelkalyan.com/rooms/",
    coordinates: [23.0225, 72.5714],
    tags: ["old-city", "heritage", "affordable", "pol-walks", "ahmedabad"],
    address: "Opposite Sidi Saiyyed Mosque, Old City, Ahmedabad, Gujarat – 380001",
    check_in: "12:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Sidi Saiyyed Mosque", "Teen Darwaza", "Jama Masjid", "Bhadra Fort"],
  },

  {
    id: "guj-005",
    name: "Zostel Ahmedabad",
    city: "Gujarat",
    neighbourhood: "Ellis Bridge, Ahmedabad",
    tier: "budget",
    price_range: "₹700-₹1,200",
    price_per_night_inr: 600,
    image: "https://proxy.cdn.zostel.com/zostel/gallery/images/S4LvLZ9pTlGFaMFTHHsX5g/zostel-panchgani-hostel-20201105114521.jpg?format=jpg",
    rating: 4.0,
    why_stay_here:
      "Ahmedabad's favourite backpacker spot — a restored heritage haveli with a rooftop lounge, a café serving the best masala chai in the city, and a community of travellers heading to Rann of Kutch.",
    best_for: "Backpackers, solo travellers, Kutch-bound explorers",
    amenities: [
      "Heritage haveli building",
      "Rooftop lounge",
      "In-house café",
      "Free Wi-Fi",
      "Dorm & private rooms",
      "Travel board",
      "Locker storage",
    ],
    insider_tip:
      "The café's masala chai served in terracotta kulhads is made with Sabarmati water and locally sourced cardamom — it's genuinely one of the best cups of chai you'll have.",
    official_website: "https://www.zostel.com/zostel/ahmedabad/",
    booking_link: "https://www.zostel.com/zostel/ahmedabad/",
    coordinates: [23.0301, 72.5671],
    tags: ["haveli", "heritage", "backpacker", "café", "budget"],
    address: "Near Ellis Bridge, Ahmedabad, Gujarat – 380006",
    check_in: "2:00 PM",
    check_out: "11:00 AM",
    nearby_attractions: ["Sabarmati Ashram", "Kankaria Lake", "Vishalla Village Restaurant"],
  },
];

// ===================== HOTEL HELPERS =====================

/** Filter hotels by city */
export const getHotelsByCity = (city: Hotel["city"]) =>
  HOTELS.filter((h) => h.city === city);

/** Filter hotels by tier */
export const getHotelsByTier = (tier: HotelTier) =>
  HOTELS.filter((h) => h.tier === tier);

/** Filter hotels by price range */
export const getHotelsByPriceRange = (price: "$" | "$$" | "$$$") =>
  HOTELS.filter((h) => h.price_range === price);

/** All unique cities in the database */
export const HOTEL_CITIES = [...new Set(HOTELS.map((h) => h.city))];

/** Tier label map for UI display */
export const HOTEL_TIER_LABELS: Record<HotelTier, string> = {
  "5-star": "⭐ 5-Star Luxury",
  affordable: "🏡 Mid-Range & Affordable",
  budget: "🎒 Budget & Backpacker",
};

/** Tier badge colors for UI */
export const HOTEL_TIER_COLORS: Record<HotelTier, string> = {
  "5-star": "#f59e0b",
  affordable: "#60a5fa",
  budget: "#4ade80",
};