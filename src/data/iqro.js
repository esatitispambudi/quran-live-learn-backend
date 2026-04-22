// Iqro Learning Structure - 30 Levels
export const iqroLevels = [
  {
    level: 1,
    title: 'Huruf Hijaiyah (Alif - Ya)',
    description: 'Mengenal 29 huruf Arab dasar dan cara melafalkannya',
    lessons: [
      { id: 1, arabic: 'ا', name: 'Alif', sound: 'A', tips: 'Mulut terbuka, suara natural', pronunciationExamples: { slow: 'Aaaaa...', normal: 'A', comparison: 'Seperti vokal "a" dalam "apa", tapi panjang' } },
      { id: 2, arabic: 'ب', name: 'Ba', sound: 'B', tips: 'Bibir tertutup, lepas tiba-tiba', pronunciationExamples: { slow: 'Bbbbaa', normal: 'Ba', comparison: 'Seperti "b" dalam "buku"' } },
      { id: 3, arabic: 'ت', name: 'Ta', sound: 'T', tips: 'Lidah menyentuh gigi atas', pronunciationExamples: { slow: 'Ttttaa', normal: 'Ta', comparison: 'Seperti "t" dalam "tangan"' } },
      { id: 4, arabic: 'ث', name: 'Tsa', sound: 'Ts', tips: 'Seperti Ta, tapi lebih halus', pronunciationExamples: { slow: 'Thhhaa', normal: 'Tha', comparison: 'Seperti "th" dalam "think" (Inggris)' } },
      { id: 5, arabic: 'ج', name: 'Jim', sound: 'J', tips: 'Dari tenggorokan, seperti J', pronunciationExamples: { slow: 'Jjjaa', normal: 'Ja', comparison: 'Seperti "j" dalam "jalan"' } },
      { id: 6, arabic: 'ح', name: 'Ha', sound: 'H', tips: 'Dari tenggorokan, halus dan panjang', pronunciationExamples: { slow: 'Hhhhaa', normal: 'Ha', comparison: 'Seperti hembusan napas panjang "hhhh"' } },
      { id: 7, arabic: 'خ', name: 'Kha', sound: 'Kh', tips: 'Dari tenggorokan, seperti Kh', pronunciationExamples: { slow: 'Khhh-aa', normal: 'Kha', comparison: 'Seperti "kh" dalam "khusus"' } },
      { id: 8, arabic: 'د', name: 'Dal', sound: 'D', tips: 'Lidah menyentuh gigi atas bagian dalam', pronunciationExamples: { slow: 'Dddd-aa', normal: 'Da', comparison: 'Seperti "d" dalam "damai"' } },
      { id: 9, arabic: 'ذ', name: 'Dzal', sound: 'Dz', tips: 'Seperti Dal, tapi lebih halus', pronunciationExamples: { slow: 'Dhhh-aa', normal: 'Dha', comparison: 'Seperti "dh" dalam "this" (Inggris)' } },
      { id: 10, arabic: 'ر', name: 'Ra', sound: 'R', tips: 'Lidah di langit-langit, bergetar', pronunciationExamples: { slow: 'Rrrrr-aa', normal: 'Ra', comparison: 'Seperti "r" dalam "rumah" yang lembut' } },
      { id: 11, arabic: 'ز', name: 'Za', sound: 'Z', tips: 'Seperti huruf Z biasa', pronunciationExamples: { slow: 'Zzzz-aa', normal: 'Za', comparison: 'Seperti "z" dalam "zona"' } },
      { id: 12, arabic: 'س', name: 'Sin', sound: 'S', tips: 'Seperti huruf S biasa', pronunciationExamples: { slow: 'Ssss-aa', normal: 'Sa', comparison: 'Seperti "s" dalam "saya"' } },
      { id: 13, arabic: 'ش', name: 'Syin', sound: 'Sy', tips: 'Seperti Sy dalam "saya"', pronunciationExamples: { slow: 'Shhhh-aa', normal: 'Sha', comparison: 'Seperti "sy" dalam "syaraf"' } },
      { id: 14, arabic: 'ص', name: 'Shad', sound: 'Sh', tips: 'Suara dalam (emphatic), dari tenggorokan', pronunciationExamples: { slow: 'Shhh-aa (dalam)', normal: 'Sha (dalam)', comparison: 'Lebih dalam dari "Sy", bunyi tegas' } },
      { id: 15, arabic: 'ض', name: 'Dhad', sound: 'Dh', tips: 'Suara dalam, dari lidah', pronunciationExamples: { slow: 'Dhhh-aa (dalam)', normal: 'Dha (dalam)', comparison: 'Lebih dalam dari "Dza", bunyi tegas' } },
      { id: 16, arabic: 'ط', name: 'Tha', sound: 'Th', tips: 'Suara dalam (emphatic)', pronunciationExamples: { slow: 'Thhh-aa (dalam)', normal: 'Tha (dalam)', comparison: 'Lebih dalam dari "Ta", bunyi tegas' } },
      { id: 17, arabic: 'ظ', name: 'Dza', sound: 'Dz', tips: 'Suara dalam, halus', pronunciationExamples: { slow: 'Dhhh-aa (halus)', normal: 'Dza (halus)', comparison: 'Antara "Dz" biasa dan "Dz" dalam' } },
      { id: 18, arabic: 'ع', name: 'Ain', sound: 'A', tips: 'Dari tenggorokan, ada bunyi', pronunciationExamples: { slow: '\'Aaaa (dari tenggorokan)', normal: '\'A', comparison: 'Seperti ada kejutan di tenggorokan saat mengucapkan "a"' } },
      { id: 19, arabic: 'غ', name: 'Ghain', sound: 'Gh', tips: 'Dari tenggorokan, seperti Kh', pronunciationExamples: { slow: 'Ghhh-aa', normal: 'Gha', comparison: 'Seperti "gh" dalam "ghazal", suara dalam dari tenggorokan' } },
      { id: 20, arabic: 'ف', name: 'Fa', sound: 'F', tips: 'Bibir bawah dan gigi atas', pronunciationExamples: { slow: 'Ffff-aa', normal: 'Fa', comparison: 'Seperti "f" dalam "fakta"' } },
      { id: 21, arabic: 'ق', name: 'Qaf', sound: 'Q', tips: 'Dari belakang lidah', pronunciationExamples: { slow: 'Qqqq-aa', normal: 'Qa', comparison: 'Seperti "q" dalam "Quran", dari belakang lidah' } },
      { id: 22, arabic: 'ك', name: 'Kaf', sound: 'K', tips: 'Dari belakang lidah, seperti K', pronunciationExamples: { slow: 'Kkkk-aa', normal: 'Ka', comparison: 'Seperti "k" dalam "kabar"' } },
      { id: 23, arabic: 'ل', name: 'Lam', sound: 'L', tips: 'Seperti huruf L biasa', pronunciationExamples: { slow: 'Llll-aa', normal: 'La', comparison: 'Seperti "l" dalam "lembut"' } },
      { id: 24, arabic: 'م', name: 'Mim', sound: 'M', tips: 'Bibir tertutup, keluarkan suara', pronunciationExamples: { slow: 'Mmmm-aa', normal: 'Ma', comparison: 'Seperti "m" dalam "makan"' } },
      { id: 25, arabic: 'ن', name: 'Nun', sound: 'N', tips: 'Lidah di gigi atas, keluarkan suara', pronunciationExamples: { slow: 'Nnnn-aa', normal: 'Na', comparison: 'Seperti "n" dalam "nama"' } },
      { id: 26, arabic: 'ه', name: 'Ha', sound: 'H', tips: 'Napas dari tenggorokan', pronunciationExamples: { slow: 'Hhhh', normal: 'Ha', comparison: 'Seperti hembusan napas ringan "h"' } },
      { id: 27, arabic: 'و', name: 'Waw', sound: 'W', tips: 'Bibir bundar, seperti W', pronunciationExamples: { slow: 'Wwww-aa', normal: 'Wa', comparison: 'Seperti "w" dalam "warna"' } },
      { id: 28, arabic: 'ي', name: 'Ya', sound: 'Y', tips: 'Seperti Y dalam "yogurt"', pronunciationExamples: { slow: 'Yyyy-aa', normal: 'Ya', comparison: 'Seperti "y" dalam "yoga"' } },
      { id: 29, arabic: 'ء', name: 'Hamza', sound: 'A', tips: 'Henti vokal, dari tenggorokan', pronunciationExamples: { slow: '\'Aa... (potong)', normal: '\'A', comparison: 'Seperti suara henti mendadak "a\'" sebelum vokal baru' } }
    ],
    estimated_days: 15
  },
  {
    level: 2,
    title: 'Harakat (Tanda Baca)',
    description: 'Mempelajari 6 tanda baca dasar (Fatha, Kasra, Damma, Sukun, Tanwin, Syaddah)',
    lessons: [
      { id: 30, arabic: 'َ', name: 'Fatha', symbol: 'A', example: 'بَ', tips: 'Garis di atas huruf, suara "a" pendek', pronunciationExamples: { slow: 'Baaaa (pendek)', normal: 'Ba', comparison: 'Seperti vokal "a" dalam "bata"' } },
      { id: 31, arabic: 'ِ', name: 'Kasra', symbol: 'I', example: 'بِ', tips: 'Garis di bawah huruf, suara "i" pendek', pronunciationExamples: { slow: 'Biiii (pendek)', normal: 'Bi', comparison: 'Seperti vokal "i" dalam "biri"' } },
      { id: 32, arabic: 'ُ', name: 'Damma', symbol: 'U', example: 'بُ', tips: 'Kurva di atas huruf, suara "u" pendek', pronunciationExamples: { slow: 'Buuu (pendek)', normal: 'Bu', comparison: 'Seperti vokal "u" dalam "buku"' } },
      { id: 33, arabic: 'ْ', name: 'Sukun', symbol: '', example: 'بْ', tips: 'Lingkaran kecil, huruf tanpa vokal', pronunciationExamples: { slow: 'B... (terhenti)', normal: 'B', comparison: 'Huruf tanpa suara lanjutan, contoh: buku → b-ku' } },
      { id: 34, arabic: 'ً', name: 'Tanwin Fatha', symbol: 'AN', example: 'بً', tips: 'Dua garis di atas, suara "an"', pronunciationExamples: { slow: 'Baan', normal: 'Ban', comparison: 'Suara "an" pada akhir kata' } },
      { id: 35, arabic: 'ٍ', name: 'Tanwin Kasra', symbol: 'IN', example: 'بٍ', tips: 'Dua garis di bawah, suara "in"', pronunciationExamples: { slow: 'Biin', normal: 'Bin', comparison: 'Suara "in" pada akhir kata' } }
    ],
    estimated_days: 7
  },
  {
    level: 3,
    title: 'Kombinasi Huruf (Dasar)',
    description: 'Membaca huruf dengan harakat berbeda',
    lessons: [
      { id: 36, arabic: 'بَا', name: 'Ba-A', sound: 'ba', practice: 'Ulangi 5x', pronunciationExamples: { slow: 'Baaaa', normal: 'Ba', comparison: 'Seperti "ba" dalam "bapa"' } },
      { id: 37, arabic: 'بِي', name: 'Bi-I', sound: 'bi', practice: 'Ulangi 5x', pronunciationExamples: { slow: 'Biiii', normal: 'Bi', comparison: 'Seperti "bi" dalam "bisnis"' } },
      { id: 38, arabic: 'بُو', name: 'Bu-U', sound: 'bu', practice: 'Ulangi 5x', pronunciationExamples: { slow: 'Buuu', normal: 'Bu', comparison: 'Seperti "bu" dalam "buku"' } },
      { id: 39, arabic: 'تَا', name: 'Ta-A', sound: 'ta', practice: 'Ulangi 5x', pronunciationExamples: { slow: 'Taaaa', normal: 'Ta', comparison: 'Seperti "ta" dalam "tangan"' } },
      { id: 40, arabic: 'تِي', name: 'Ti-I', sound: 'ti', practice: 'Ulangi 5x', pronunciationExamples: { slow: 'Tiiii', normal: 'Ti', comparison: 'Seperti "ti" dalam "tikus"' } }
    ],
    estimated_days: 7
  },
  {
    level: 4,
    title: 'Iqro Juz 1',
    description: 'Membaca kata-kata sederhana dan kalimat pendek',
    lessons: [
      { id: 41, arabic: 'الْحَمْدُ', translation: 'al-hamdu (pujian)', tips: 'Perhatikan alif lam dan tanwin', pronunciationExamples: { slow: 'Al-ham-du', normal: 'Alhamdu', comparison: 'Puji - pujian' } },
      { id: 42, arabic: 'لِلَّهِ', translation: 'lillah (untuk Allah)', tips: 'Syaddah pada lam', pronunciationExamples: { slow: 'Lil-lah', normal: 'Lillah', comparison: 'Untuk - untuk Allah' } },
      { id: 43, arabic: 'رَبِّ', translation: 'rabbi (Tuhanku)', tips: 'Syaddah pada ba', pronunciationExamples: { slow: 'Rab-bi', normal: 'Rabbi', comparison: 'Tuhan - Tuhanku' } },
      { id: 44, arabic: 'الْعَالَمِينَ', translation: 'al-alamin (dunia)', tips: 'Panjang dan ada huruf sakit', pronunciationExamples: { slow: 'Al-aa-la-mi-na', normal: 'Alalamin', comparison: 'Alam - semua alam/dunia' } }
    ],
    estimated_days: 10
  },
  {
    level: 5,
    title: 'Iqro Juz 2',
    description: 'Melanjutkan dengan kata-kata lebih panjang',
    lessons: [
      { id: 45, arabic: 'الرَّحْمَٰنِ', translation: 'ar-rahman (Yang Maha Pengasih)', tips: 'Perhatikan alif lam', pronunciationExamples: { slow: 'Ar-rah-ma-ni', normal: 'Arrahman', comparison: 'Pengasih - Yang Maha Pengasih' } },
      { id: 46, arabic: 'الرَّحِيمِ', translation: 'ar-rahim (Yang Maha Penyayang)', tips: 'Syaddah dan ya', pronunciationExamples: { slow: 'Ar-rah-i-mi', normal: 'Arrahim', comparison: 'Penyayang - Yang Maha Penyayang' } }
    ],
    estimated_days: 7
  },
  {
    level: 6,
    title: 'Iqro Juz 3-6',
    description: 'Melanjutkan pembacaan Iqro dengan tingkat kesulitan meningkat',
    lessons: [
      { id: 47, arabic: 'مَالِكِ', translation: 'malik (raja)', tips: 'Level 3 Iqro', pronunciationExamples: { slow: 'Ma-li-ki', normal: 'Malik', comparison: 'Pemilik - raja' } },
      { id: 48, arabic: 'يَوْمِ', translation: 'yawm (hari)', tips: 'Perhatikan sukun', pronunciationExamples: { slow: 'Yaw-mi', normal: 'Yawmi', comparison: 'Hari - hari' } },
      { id: 49, arabic: 'الدِّينِ', translation: 'ad-din (agama)', tips: 'Syaddah pada dal', pronunciationExamples: { slow: 'Ad-di-ni', normal: 'Addini', comparison: 'Agama - agama' } }
    ],
    estimated_days: 21
  },
  {
    level: 7,
    title: 'Iqro Juz 7-10',
    description: 'Meningkatkan kecepatan dan kelancaran membaca',
    lessons: [
      { id: 50, arabic: 'إِيَّاكَ', translation: 'iyyak (hanya Engkau)', tips: 'Level 7 Iqro', pronunciationExamples: { slow: 'I-ya-ka', normal: 'Iyyak', comparison: 'Hanya Anda/Engkau' } },
      { id: 51, arabic: 'نَعْبُدُ', translation: 'nabudu (kami menyembah)', tips: 'Perhatian pada tanwin', pronunciationExamples: { slow: 'Na-a-bu-du', normal: 'Naabud', comparison: 'Kami menyembah' } }
    ],
    estimated_days: 21
  },
  {
    level: 8,
    title: 'Iqro Juz 11-15',
    description: 'Membaca dengan ritme dan tajweed yang baik',
    lessons: [
      { id: 52, arabic: 'وَإِيَّاكَ', translation: 'wa iyyak (dan hanya Engkau)', tips: 'Level 11 Iqro', pronunciationExamples: { slow: 'Wa-i-ya-ka', normal: 'Wa-iyyak', comparison: 'Dan hanya Anda' } },
      { id: 53, arabic: 'نَسْتَعِينُ', translation: 'nastaiin (kami minta pertolongan)', tips: 'Perhatian pada ta', pronunciationExamples: { slow: 'Nas-ta-i-nu', normal: 'Nasta\'in', comparison: 'Kami minta bantuan' } }
    ],
    estimated_days: 21
  },
  {
    level: 9,
    title: 'Iqro Juz 16-20',
    description: 'Melatih pembacaan dengan lancar dan benar',
    lessons: [
      { id: 54, arabic: 'اهْدِنَا', translation: 'ihdina (tunjukkan kami)', tips: 'Level 16 Iqro', pronunciationExamples: { slow: 'Ih-di-na', normal: 'Ihdina', comparison: 'Tunjukkan kami' } },
      { id: 55, arabic: 'الصِّرَاطَ', translation: 'ash-shirath (jalan)', tips: 'Perhatian pada shad', pronunciationExamples: { slow: 'Ash-shi-ra-tha', normal: 'Asshirath', comparison: 'Jalan yang benar' } }
    ],
    estimated_days: 21
  },
  {
    level: 10,
    title: 'Iqro Juz 21-30 & Tamatnya',
    description: 'Menyelesaikan Iqro dan siap membaca Quran dengan baik',
    lessons: [
      { id: 56, arabic: 'الْمُسْتَقِيمَ', translation: 'al-mustaqim (yang lurus)', tips: 'Tamat Iqro!', pronunciationExamples: { slow: 'Al-mus-ta-qi-ma', normal: 'Almustaqim', comparison: 'Jalan yang lurus' } },
      { id: 57, arabic: 'صِرَاطَ الَّذِينَ', translation: 'shirath alladhin (jalan mereka)', tips: 'Persiapan baca Quran', pronunciationExamples: { slow: 'Shi-ra-tha al-la-dhi-na', normal: 'Shirath alladhin', comparison: 'Jalan mereka yang' } }
    ],
    estimated_days: 21
  }
];

// Quiz/Latihan untuk setiap level
export const iqroQuiz = {
  level_1: {
    questions: [
      { question: 'Huruf apa ini: ا', options: ['Alif', 'Ba', 'Ta'], correct: 0 },
      { question: 'Huruf apa ini: ب', options: ['Ba', 'Ta', 'Tsa'], correct: 0 },
      { question: 'Huruf apa ini: ت', options: ['Ta', 'Tsa', 'Jim'], correct: 0 }
    ]
  },
  level_2: {
    questions: [
      { question: 'Tanda ini disebut: َ', options: ['Fatha', 'Kasra', 'Damma'], correct: 0 },
      { question: 'Tanda ini menyebabkan suara: ِ', options: ['A', 'I', 'U'], correct: 1 },
      { question: 'Huruf tanpa vokal disebut: ْ', options: ['Fatha', 'Sukun', 'Tanwin'], correct: 1 }
    ]
  }
};

// Progres tracking template
export const createIqroProgress = (userId) => ({
  userId,
  currentLevel: 1,
  completedLevels: [],
  lessonsCompleted: [],
  totalHours: 0,
  accuracy: 0,
  lastStudied: new Date(),
  achievements: []
});

export default {
  iqroLevels,
  iqroQuiz,
  createIqroProgress
};
