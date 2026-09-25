import { ROUNDS_DATA } from "./roundsData.js";

export const SAMPLE_ROUNDS = ROUNDS_DATA;

// 21 ô của Vòng Quay với tone màu pastel lịch sự, trang trọng, học thuật
export const WHEEL_SLICES = [
  { id: 1, type: "point", value: 100, label: "+100", color: "#628093", textColor: "#FFFFFF" },
  { id: 2, type: "double", value: 2, label: "x2 ĐIỂM", color: "#8E3B46", textColor: "#FFFFFF" },
  { id: 3, type: "point", value: 200, label: "+200", color: "#5E7E6B", textColor: "#FFFFFF" },
  { id: 4, type: "lose", value: 0, label: "MẤT LƯỢT", color: "#3E3836", textColor: "#F6F3EC" },
  { id: 5, type: "point", value: 500, label: "+500", color: "#B88A4E", textColor: "#FFFFFF" },
  { id: 6, type: "swap", value: 0, label: "ĐỔI ĐIỂM", color: "#4E7B73", textColor: "#FFFFFF" },
  { id: 7, type: "point", value: 100, label: "+100", color: "#628093", textColor: "#FFFFFF" },
  { id: 8, type: "divide", value: 0.5, label: "CHIA ĐÔI", color: "#B86B5A", textColor: "#FFFFFF" },
  { id: 9, type: "point", value: 1000, label: "+1000", color: "#8C6A54", textColor: "#FFFFFF" },
  { id: 10, type: "point", value: 200, label: "+200", color: "#5E7E6B", textColor: "#FFFFFF" },
  { id: 11, type: "lose", value: 0, label: "MẤT LƯỢT", color: "#3E3836", textColor: "#F6F3EC" },
  { id: 12, type: "point", value: 500, label: "+500", color: "#B88A4E", textColor: "#FFFFFF" },
  { id: 13, type: "double", value: 2, label: "x2 ĐIỂM", color: "#8E3B46", textColor: "#FFFFFF" },
  { id: 14, type: "point", value: 100, label: "+100", color: "#628093", textColor: "#FFFFFF" },
  { id: 15, type: "swap", value: 0, label: "ĐỔI ĐIỂM", color: "#4E7B73", textColor: "#FFFFFF" },
  { id: 16, type: "point", value: 200, label: "+200", color: "#5E7E6B", textColor: "#FFFFFF" },
  { id: 17, type: "point", value: 100, label: "+100", color: "#628093", textColor: "#FFFFFF" },
  { id: 18, type: "divide", value: 0.5, label: "CHIA ĐÔI", color: "#B86B5A", textColor: "#FFFFFF" },
  { id: 19, type: "point", value: 500, label: "+500", color: "#B88A4E", textColor: "#FFFFFF" },
  { id: 20, type: "point", value: 1000, label: "+1000", color: "#8C6A54", textColor: "#FFFFFF" },
  { id: 21, type: "point", value: 100, label: "+100", color: "#628093", textColor: "#FFFFFF" },
];

// Bảng chữ cái Latinh A-Z tiêu chuẩn
export const ALPHABET_A_Z = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
  "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z"
];

export const VIETNAMESE_ALPHABET = ALPHABET_A_Z;

export function getBaseVietnameseLetter(char) {
  if (!char) return "";
  return char
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase();
}

export function normalizeForKeywordComparison(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s+/g, "")
    .toUpperCase();
}

export const normalizeVietnameseChar = normalizeForKeywordComparison;

// Danh sách 6 đội mặc định theo thứ tự với tone màu pastel nhã nhặn
export const DEFAULT_TEAMS = [
  { id: 1, name: "Đội Độc Lập", score: 0, color: "#8E3B46", isEliminated: false, hasGuessedKeyword: false },
  { id: 2, name: "Đội Tự Do", score: 0, color: "#4E7B73", isEliminated: false, hasGuessedKeyword: false },
  { id: 3, name: "Đội Hạnh Phúc", score: 0, color: "#B88A4E", isEliminated: false, hasGuessedKeyword: false },
  { id: 4, name: "Đội Đoàn Kết", score: 0, color: "#5E7E6B", isEliminated: false, hasGuessedKeyword: false },
  { id: 5, name: "Đội Tiên Phong", score: 0, color: "#628093", isEliminated: false, hasGuessedKeyword: false },
  { id: 6, name: "Đội Chiến Thắng", score: 0, color: "#8C6A54", isEliminated: false, hasGuessedKeyword: false }
];

