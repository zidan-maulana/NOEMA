export interface Preset {
  author: string;
  source: string;
  category: string;
  text: string;
}

export const PRESETS: Preset[] = [
  {
    author: "Virginia Woolf",
    source: "The Waves / Sastra",
    category: "Literature",
    text: "Keindahan dunia memiliki dua sisi tajam, satu berupa tawa, satu berupa kepedihan, yang mencabik-cabik kalbu. Dalam momen-momen paling senyap, kita menyadari bahwa pikiran adalah sebuah katedral yang lapang, menampung serpihan ingatan dan sensasi yang menolak ditenangkan oleh riuh rendah dunia harian."
  },
  {
    author: "Viktor Frankl",
    source: "Man's Search for Meaning",
    category: "Psychology",
    text: "Kekuatan di luar kendalimu bisa merampas segalanya yang kamu miliki kecuali satu hal: kebebasanmu untuk menentukan bagaimana kamu merespons situasi tersebut. Di ruang kosong antara stimulus dan respons, terletak kekuatan kita untuk memilih sikap, dan di sanalah pertumbuhan kita bersemi."
  },
  {
    author: "Zygmunt Bauman",
    source: "Liquid Modernity / Sosiologi",
    category: "Sociology",
    text: "Dalam kehidupan modern yang cair (liquid modernity), tidak ada ikatan yang permanen, dan ikatan apa pun yang kita jalin untuk sementara waktu harus diikat dengan longgar agar dapat dilepaskan kembali dengan cepat saat keadaan berubah. Kita senantiasa terombang-ambing di antara hasrat akan kebebasan dan kerinduan akan rasa aman."
  },
  {
    author: "Susan Sontag",
    source: "Against Interpretation",
    category: "Aesthetics",
    text: "Menafsirkan berarti memiskinkan, menguras dunia—demi mendirikan dunia bayangan berisi 'makna-makna'. Kekuatan utama dari karya seni terletak pada kemisteriusannya, sebuah perjumpaan yang menuntut keheningan dan perhatian penuh kita, alih-alih klasifikasi intelektual yang tergesa-gesa."
  },
  {
    author: "Hannah Arendt",
    source: "The Life of the Mind",
    category: "Contemporary Philosophy",
    text: "Berpikir berarti senantiasa mencari makna, mengambil jeda sejenak dan melangkah keluar dari derasnya arus kesibukan harian. Dalam sela-sela refleksi yang sunyi ini, kita menemukan ruang batin yang dibutuhkan untuk bertindak dengan hati nurani dan merumuskan tempat kita dalam bentangan kisah manusia."
  }
];
