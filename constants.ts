import { CategoryGroup, PromptSelections, ViralExample, GalleryCategory } from './types';

export const CATEGORIES: CategoryGroup[] = [
  {
    id: 'cameraType',
    title: 'Kamera Gövdesi & Lens Kiti',
    selectionType: 'single', 
    items: [
      { id: 'arri_alexa_65', label: 'ARRI Alexa 65 + Prime DNA', description: 'Sinemanın zirvesi, geniş format, yumuşak "roll-off". (Dune, The Revenant)' },
      { id: 'imax_70mm', label: 'IMAX 15/70mm Film', description: 'Devasa ölçek, sonsuz çözünürlük ve derinlik. (Oppenheimer, Interstellar)' },
      { id: 'sony_venice_2', label: 'Sony Venice 2 + Cooke S7/i', description: 'Modern, yüksek dinamik aralık, "Cooke Look" sıcaklığı.' },
      { id: 'red_v_raptor', label: 'RED V-Raptor + Atlas Orion', description: 'Keskin, yüksek kare hızı, Anamorfik lens parlamaları (Flares).' },
      { id: 'iphone_15_pro', label: 'iPhone 15 Pro Max', description: 'Gerçekçi, doğal, mobil sinematografi, dijital doku.' },
      { id: '16mm_bolex', label: '16mm Bolex (Vintage)', description: 'Nostaljik, grenli, organik, retro belgesel havası.' },
      { id: 'canon_dream_lens', label: 'Canon 50mm f/0.95', description: '"Dream Lens". Rüya gibi bokeh, ultra sığ alan derinliği.' },
      { id: 'gopro_hero', label: 'GoPro Hero 12', description: 'Balıkgözü (Fisheye), aksiyon, geniş açı, POV.' },
    ]
  },
  {
    id: 'aspectRatio',
    title: 'En / Boy Oranı & Format',
    selectionType: 'single', 
    items: [
      { id: '16_9', label: '16:9 Sinematik', description: 'Standart geniş ekran video' },
      { id: '2_39_1', label: '2.39:1 Anamorfik', description: 'Hollywood geniş perde standardı' },
      { id: '9_16', label: '9:16 Dikey', description: 'Reels/TikTok formatı' },
      { id: '1_1', label: '1:1 Kare', description: 'Sosyal medya odaklı' },
    ]
  },
  {
    id: 'cameraMovement',
    title: 'Kamera Hareketi (Movement)',
    selectionType: 'single', 
    items: [
      { id: 'static', label: 'Statik / Sabit', description: 'Hareketsiz, sadece sahne içi hareket' },
      { id: 'pan_right', label: 'Pan Right', description: 'Sağa doğru yatay dönüş' },
      { id: 'pan_left', label: 'Pan Left', description: 'Sola doğru yatay dönüş' },
      { id: 'tilt_up', label: 'Tilt Up', description: 'Aşağıdan yukarıya dikey hareket' },
      { id: 'zoom_in', label: 'Slow Zoom In', description: 'Yavaşça objeye yaklaşma' },
      { id: 'dolly_zoom', label: 'Dolly Zoom (Vertigo)', description: 'Arka plan çekilirken obje sabit' },
      { id: 'tracking_shot', label: 'Tracking Shot', description: 'Hareket eden objeyi takip etme' },
      { id: 'orbit', label: 'Orbit / Arc', description: 'Objenin etrafında 360 derece dönüş' },
    ]
  },
  {
    id: 'cameraAngle',
    title: 'Kamera Açısı & Perspektif',
    selectionType: 'single',
    items: [
      { id: 'eye_level', label: 'Göz Hizası', description: 'Nötr, insani bakış açısı' },
      { id: 'low_angle', label: 'Düşük Açı (Low Angle)', description: 'Objeyi güçlü ve yüce gösterir' },
      { id: 'high_angle', label: 'Yüksek Açı (High Angle)', description: 'Objeyi küçük veya savunmasız gösterir' },
      { id: 'drone', label: 'Drone / Havadan', description: 'Geniş manzaralar, sinematik uçuş' },
      { id: 'pov', label: 'POV (Öznel Kamera)', description: 'Karakterin gözünden deneyim' },
      { id: 'over_shoulder', label: 'Omuz Üstü (OTS)', description: 'Diyalog ve ilişki odaklı' },
    ]
  },
  {
    id: 'lighting',
    title: 'Işık Tasarımı & Atmosfer',
    selectionType: 'multi', 
    items: [
      { id: 'cinematic', label: 'Sinematik Kontrast', description: 'Dramatik gölgeler, güçlü vurgular' },
      { id: 'volumetric', label: 'Volümetrik (Hacimsel)', description: 'Havadaki toz ve ışık hüzmeleri' },
      { id: 'golden_hour', label: 'Altın Saat', description: 'Gün batımı, sıcak ve yumuşak' },
      { id: 'neon_noir', label: 'Neon Noir', description: 'Islak zeminler, canlı yapay renkler' },
      { id: 'natural', label: 'Doğal Gerçekçilik', description: 'Belgesel tarzı ortam ışığı' },
      { id: 'studio', label: 'Stüdyo Kurulumu', description: 'Kontrollü, mükemmel aydınlatma' },
    ]
  },
  {
    id: 'colorGrade',
    title: 'Renk Skalası (Color Grading)',
    selectionType: 'single', 
    items: [
      { id: 'teal_orange', label: 'Teal & Orange', description: 'Modern aksiyon filmi tonları' },
      { id: 'monochrome', label: 'Siyah Beyaz (Noir)', description: 'Klasik, zamansız estetik' },
      { id: 'vintage_kodak', label: 'Vintage Film', description: 'Nostaljik, sıcak grenli doku' },
      { id: 'bleach_bypass', label: 'Bleach Bypass', description: 'Desatüre, yüksek kontrast (Savaş filmi)' },
      { id: 'cyberpunk', label: 'Cyberpunk', description: 'Mor ve camgöbeği ağırlıklı' },
    ]
  },
  {
    id: 'composition',
    title: 'Kompozisyon',
    selectionType: 'single',
    items: [
      { id: 'center_framed', label: 'Merkezi Kadraj', description: 'Simetrik ve odaklanmış' },
      { id: 'rule_of_thirds', label: '1/3 Kuralı', description: 'Dengeli sinematik yerleşim' },
      { id: 'wide_shot', label: 'Geniş Açı (Wide)', description: 'Çevreyi ve atmosferi gösterir' },
      { id: 'close_up', label: 'Yakın Plan (Close-up)', description: 'Duygu ve detay odaklı' },
    ]
  },
  {
    id: 'shutter',
    title: 'Hareket Hızı & Akış',
    selectionType: 'single',
    items: [
      { id: 'slow_motion', label: 'Slow Motion', description: 'Epik, yavaşlatılmış zaman' },
      { id: 'timelapse', label: 'Timelapse', description: 'Zamanın hızlı akışı' },
      { id: 'hyperlapse', label: 'Hyperlapse', description: 'Hareketli timelapse' },
      { id: 'real_time', label: 'Gerçek Zamanlı', description: 'Standart akış hızı' },
    ]
  },
  {
    id: 'filmStock',
    title: 'Doku ve Kalite',
    selectionType: 'single',
    items: [
      { id: 'imax_70mm', label: 'IMAX 70mm', description: 'Ultra yüksek çözünürlük ve derinlik' },
      { id: 'vhs_glitch', label: 'VHS / Glitch', description: 'Retro 90lar video kaseti' },
      { id: '16mm_grain', label: '16mm Film Grain', description: 'Bağımsız sinema dokusu' },
      { id: 'digital_crisp', label: '8K Dijital', description: 'Kusursuz netlik (RED/ARRI)' },
    ]
  },
  {
    id: 'director',
    title: 'Yönetmen Tarzı',
    selectionType: 'multi', 
    items: [
      { id: 'wes_anderson', label: 'Wes Anderson', description: 'Simetrik, pastel, durağan kamera' },
      { id: 'christopher_nolan', label: 'Christopher Nolan', description: 'Epik ölçek, pratik gerçeklik' },
      { id: 'denis_villeneuve', label: 'Denis Villeneuve', description: 'Atmosferik, yavaş, brütalist' },
      { id: 'michael_bay', label: 'Michael Bay', description: 'Dinamik dönüşler, patlamalar, yüksek kontrast' },
      { id: 'david_fincher', label: 'David Fincher', description: 'Kusursuz kamera hareketleri, yeşil/sarı ton' },
    ]
  },
  {
    id: 'details',
    title: 'Efekt & Render',
    selectionType: 'multi',
    items: [
      { id: 'photorealistic', label: 'Fotogerçekçi', description: 'Ayırt edilemez gerçeklik' },
      { id: 'unreal_engine_5', label: 'Unreal Engine 5', description: 'Yeni nesil oyun sinematiği' },
      { id: 'anime_style', label: 'Anime / 2D', description: 'Japon animasyon stili' },
      { id: '3d_render', label: '3D Pixar Tarzı', description: 'Yumuşak, stilize 3D' },
    ]
  }
];

export const INITIAL_SELECTIONS: PromptSelections = {
  cameraType: [],
  cameraMovement: [],
  cameraAngle: [],
  lighting: [],
  lens: [],
  filmStock: [],
  director: [],
  details: [],
  aspectRatio: [],
  composition: [],
  shutter: [],
  colorGrade: [],
};

export const GALLERY_FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'cinematic', label: 'Sinematik & Film' },
  { id: 'product', label: 'Reklam & Ürün' },
  { id: 'anime', label: 'Anime & Animasyon' },
  { id: '3d', label: '3D & CGI' },
  { id: 'nature', label: 'Doğa & Belgesel' },
];

export const VIRAL_EXAMPLES: ViralExample[] = [
  // CINEMATIC
  {
    id: 'cyberpunk_city',
    title: 'Neon Tokyo Drift',
    category: 'cinematic',
    categoryLabel: 'Cyberpunk',
    thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Futuristic city street, heavy rain, neon lights.',
    scene_action: 'Fast-paced car chase, vehicle drifting around a corner.',
    technical_specifications: {
      camera: 'ARRI Alexa 65',
      lighting: 'Neon Noir',
      movement: 'Low Angle Tracking',
      atmosphere: 'Rainy, Electric'
    },
    video_generation_prompt: 'Cinematic low angle tracking shot of a futuristic sports car drifting on a rainy cyberpunk street at night, neon signs reflecting on wet pavement, volumetric fog, sparks flying from wheels, high motion blur, photorealistic 8k, blade runner aesthetic --ar 16:9',
    negative_prompt: 'daylight, dry, static, cartoon',
    suggested_settings: { motion_bucket_id: 180, fps: 24 }
  },
  {
    id: 'fashion_portrait',
    title: 'Vogue Slow-Mo',
    category: 'cinematic',
    categoryLabel: 'Fashion',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Close up of a model with intricate makeup, wind blowing hair.',
    scene_action: 'Subtle head turn, hair flowing in slow motion.',
    technical_specifications: {
      camera: 'Sony Venice 2',
      lighting: 'Rembrandt',
      movement: 'Static with Subject Motion',
      atmosphere: 'Elegant, High Fashion'
    },
    video_generation_prompt: 'Extreme close-up portrait of a fashion model with avant-garde makeup, wind blowing through hair in slow motion, direct eye contact, 85mm lens, bokeh background, high fashion photography style, soft studio lighting, 8k resolution --ar 4:5',
    negative_prompt: 'ugly, deformed, bad skin',
    suggested_settings: { motion_bucket_id: 80, fps: 60 }
  },
  
  // NATURE
  {
    id: 'nature_drone',
    title: 'Nordic Majesty',
    category: 'nature',
    categoryLabel: 'Travel',
    thumbnail: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Vast mountain landscape, misty fjords, sunrise.',
    scene_action: 'Slow, smooth aerial movement gliding over the water.',
    technical_specifications: {
      camera: 'DJI Mavic 3',
      lighting: 'Golden Hour',
      movement: 'Drone Flyover',
      atmosphere: 'Serene, Epic'
    },
    video_generation_prompt: 'Epic wide aerial drone shot flying over a calm norwegian fjord at sunrise, mist rising from the water, snow-capped mountains in the distance, soft golden lighting, hyperrealistic, national geographic style, slow smooth motion --ar 16:9',
    negative_prompt: 'shaky camera, text',
    suggested_settings: { motion_bucket_id: 110, fps: 30 }
  },
  {
    id: 'macro_fluid',
    title: 'Abstract Ink',
    category: 'nature',
    categoryLabel: 'Abstract Macro',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Colorful ink dropping into water, swirling.',
    scene_action: 'Fluid dynamics, colors exploding.',
    technical_specifications: {
      camera: 'Macro Probe Lens',
      lighting: 'Backlit',
      movement: 'Microscopic Zoom',
      atmosphere: 'Dreamy, Fluid'
    },
    video_generation_prompt: 'Macro shot of vibrant blue and gold ink dropping into water, swirling fluid dynamics, explosion of color, slow motion, microscopic detail, backlit, 8k resolution, abstract art wallpaper style --ar 9:16',
    negative_prompt: 'solid, static',
    suggested_settings: { motion_bucket_id: 140, fps: 60 }
  },

  // PRODUCT / COMMERCIAL
  {
    id: 'coffee_commercial',
    title: 'Morning Brew',
    category: 'product',
    categoryLabel: 'Commercial',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Pouring hot coffee into a cup, steam rising.',
    scene_action: 'Liquid pouring, steam swirling, beans falling.',
    technical_specifications: {
      camera: 'Phantom Flex 4K',
      lighting: 'High Key Food',
      movement: 'Static Slow Mo',
      atmosphere: 'Warm, inviting'
    },
    video_generation_prompt: 'Commercial product shot of hot coffee being poured into a ceramic cup, steam rising in beautiful swirls, coffee beans falling in slow motion in the background, warm morning lighting, high speed camera, 1000fps phantom flex, delicious, cinematic advertising --ar 16:9',
    negative_prompt: 'spill, messy, dark',
    suggested_settings: { motion_bucket_id: 100, fps: 60 }
  },
  {
    id: 'sneaker_reveal',
    title: 'Urban Sneaker',
    category: 'product',
    categoryLabel: 'Streetwear',
    thumbnail: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Floating sneaker in urban environment.',
    scene_action: 'Shoe rotating 360 degrees, levitating.',
    technical_specifications: {
      camera: 'Virtual Camera',
      lighting: 'Studio Rim Light',
      movement: 'Orbit',
      atmosphere: 'Clean, Hypebeast'
    },
    video_generation_prompt: 'Product reveal video of a futuristic high-top sneaker levitating and rotating in mid-air, urban concrete background, sharp studio rim lighting, 360 degree orbit camera, 8k resolution, hypebeast commercial style --ar 1:1',
    negative_prompt: 'blurry logo, hands',
    suggested_settings: { motion_bucket_id: 50, fps: 30 }
  },

  // ANIME
  {
    id: 'anime_fight',
    title: 'Shonen Battle',
    category: 'anime',
    categoryLabel: 'Action Anime',
    thumbnail: 'https://images.unsplash.com/photo-1620336655052-b68d975308e2?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Anime character charging energy, glowing aura.',
    scene_action: 'Power up, wind blowing clothes, debris rising.',
    technical_specifications: {
      camera: 'Dynamic Action Cam',
      lighting: 'Anime Glow',
      movement: 'Push In',
      atmosphere: 'Intense, Vibrant'
    },
    video_generation_prompt: 'Anime style action shot of a warrior character powering up, glowing blue aura surrounding body, rocks and debris floating upwards against gravity, wind blowing hair and cape, intense facial expression, Makoto Shinkai art style, vibrant colors, 4k --ar 16:9',
    negative_prompt: '3d render, realistic',
    suggested_settings: { motion_bucket_id: 200, fps: 12 }
  },
  {
    id: 'lofi_study',
    title: 'Lofi Study Girl',
    category: 'anime',
    categoryLabel: 'Cozy Anime',
    thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Girl studying at desk, rain outside window.',
    scene_action: 'Writing in notebook, cat sleeping, rain falling.',
    technical_specifications: {
      camera: 'Static',
      lighting: 'Lamp Light',
      movement: 'Subtle Animation',
      atmosphere: 'Cozy, Nostalgic'
    },
    video_generation_prompt: 'Lofi hip hop aesthetic, anime girl studying at a desk near a rainy window at night, warm desk lamp lighting, cat sleeping on the table breathing rhythmically, rain droplets on glass, studio ghibli style, cozy atmosphere, loopable video --ar 16:9',
    negative_prompt: 'fast motion, scary',
    suggested_settings: { motion_bucket_id: 20, fps: 12 }
  },

  // 3D & CGI
  {
    id: 'cute_robot',
    title: 'Pixar Robot',
    category: '3d',
    categoryLabel: '3D Character',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
    visual_analysis: 'Cute small robot holding a flower.',
    scene_action: 'Robot looking at flower, blinking, tilting head.',
    technical_specifications: {
      camera: 'Virtual 50mm',
      lighting: 'Soft Area Light',
      movement: 'Slight Dolly',
      atmosphere: 'Cute, Heartwarming'
    },
    video_generation_prompt: '3D animation in Pixar style, a cute small rusty robot holding a glowing flower, looking at it with curiosity, head tilt, blinking mechanical eyes, soft bokeh background, octane render, unreal engine 5, heartwarming mood --ar 1:1',
    negative_prompt: '2d, sketch, scary',
    suggested_settings: { motion_bucket_id: 60, fps: 24 }
  }
];