"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Region = "AUSTRALIA" | "CANADA" | "EUROPE" | "NEW ZEALAND" | "UK" | "USA";

interface ShowDate {
  id: string;
  dateNum: string;
  month: string;
  venue: string;
  city: string;
}

const AU_DATES: ShowDate[] = [
  { id: "au-01", dateNum: "7th", month: "MAY", venue: "WANGARATTA TURF CLUB", city: "WANGARATTA" },
  { id: "au-02", dateNum: "8th", month: "MAY", venue: "SSA CLUB", city: "ALBURY" },
  { id: "au-03", dateNum: "8th", month: "MAY", venue: "HALEKULANI BOWLING CLUB", city: "CENTRAL COAST" },
  { id: "au-04", dateNum: "9th", month: "MAY", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-05", dateNum: "9th", month: "MAY", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-06", dateNum: "9th", month: "MAY", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-07", dateNum: "9th", month: "MAY", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-08", dateNum: "15th", month: "MAY", venue: "HEAVEN LOUNGE", city: "MILDURA" },
  { id: "au-09", dateNum: "16th", month: "MAY", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-10", dateNum: "16th", month: "MAY", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-11", dateNum: "16th", month: "MAY", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-12", dateNum: "16th", month: "MAY", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-13", dateNum: "22nd", month: "MAY", venue: "ORAN PARK HOTEL", city: "ORAN PARK" },
  { id: "au-14", dateNum: "22nd", month: "MAY", venue: "TILLY'S WAGGA WAGGA", city: "WAGGA" },
  { id: "au-15", dateNum: "23rd", month: "MAY", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-16", dateNum: "23rd", month: "MAY", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-17", dateNum: "23rd", month: "MAY", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-18", dateNum: "23rd", month: "MAY", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-19", dateNum: "29th", month: "MAY", venue: "ASTOR HOTEL", city: "GOULBURN" },
  { id: "au-20", dateNum: "29th", month: "MAY", venue: "CHELSEA HEIGHTS", city: "ASPENDALE GARDENS" },
  { id: "au-21", dateNum: "30th", month: "MAY", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-22", dateNum: "30th", month: "MAY", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-23", dateNum: "30th", month: "MAY", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-24", dateNum: "30th", month: "MAY", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-25", dateNum: "5th", month: "JUN", venue: "NEX NEWCASTLE", city: "NEWCASTLE" },
  { id: "au-26", dateNum: "6th", month: "JUN", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-27", dateNum: "6th", month: "JUN", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-28", dateNum: "6th", month: "JUN", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-29", dateNum: "6th", month: "JUN", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-30", dateNum: "11th", month: "JUN", venue: "THE MARLIN HOTEL", city: "ULLADULLA" },
  { id: "au-31", dateNum: "12th", month: "JUN", venue: "BAY PAVILIONS", city: "BATEMANS BAY" },
  { id: "au-32", dateNum: "13th", month: "JUN", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-33", dateNum: "13th", month: "JUN", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-34", dateNum: "13th", month: "JUN", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-35", dateNum: "13th", month: "JUN", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-36", dateNum: "19th", month: "JUN", venue: "WREST POINT CASINO", city: "SANDY BAY" },
  { id: "au-37", dateNum: "20th", month: "JUN", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-38", dateNum: "20th", month: "JUN", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-39", dateNum: "20th", month: "JUN", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-40", dateNum: "20th", month: "JUN", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-41", dateNum: "26th", month: "JUN", venue: "BRIDGEWAY HOTEL", city: "ADELAIDE" },
  { id: "au-42", dateNum: "27th", month: "JUN", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-43", dateNum: "27th", month: "JUN", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-44", dateNum: "27th", month: "JUN", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-45", dateNum: "27th", month: "JUN", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-46", dateNum: "3rd", month: "JUL", venue: "ARMIDALE EX SERVICES CLUB", city: "ARMIDALE" },
  { id: "au-47", dateNum: "3rd", month: "JUL", venue: "FITZY'S LOGNHOLME", city: "LOGNHOLME" },
  { id: "au-48", dateNum: "4th", month: "JUL", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-49", dateNum: "4th", month: "JUL", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-50", dateNum: "15th", month: "JUL", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-51", dateNum: "4th", month: "JUL", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-52", dateNum: "10th", month: "JUL", venue: "MINDIL BEACH CASINO RESORT", city: "DARWIN" },
  { id: "au-53", dateNum: "11th", month: "JUL", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-54", dateNum: "11th", month: "JUL", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-55", dateNum: "11th", month: "JUL", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-56", dateNum: "11th", month: "JUL", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-57", dateNum: "16th", month: "JUL", venue: "ENCORE ROCKINGHAM", city: "ROCKINGHAM" },
  { id: "au-58", dateNum: "17th", month: "JUL", venue: "METRO CITY", city: "PERTH" },
  { id: "au-59", dateNum: "18th", month: "JUL", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-60", dateNum: "18th", month: "JUL", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-61", dateNum: "18th", month: "JUL", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-62", dateNum: "18th", month: "JUL", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-63", dateNum: "24th", month: "JUL", venue: "CAZALYS CAIRNS", city: "CAIRNS" },
  { id: "au-64", dateNum: "24th", month: "JUL", venue: "THE POWERHOUSE", city: "TOOWOOMBA" },
  { id: "au-65", dateNum: "25th", month: "JUL", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-66", dateNum: "25th", month: "JUL", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-67", dateNum: "25th", month: "JUL", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-68", dateNum: "25th", month: "JUL", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-69", dateNum: "31st", month: "JUL", venue: "OLYMPIC HOTEL", city: "PRESTON" },
  { id: "au-70", dateNum: "31st", month: "JUL", venue: "PANTHERS PORT MACQUARIE", city: "PORT MACQUARIE" },
  { id: "au-71", dateNum: "1st", month: "AUG", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-72", dateNum: "1st", month: "AUG", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-73", dateNum: "1st", month: "AUG", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-74", dateNum: "1st", month: "AUG", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-75", dateNum: "7th", month: "AUG", venue: "PENRITH PANTHERS", city: "PENRITH" },
  { id: "au-76", dateNum: "7th", month: "AUG", venue: "INFINITE LOUNGE AND DANCECLUB", city: "MELTON" },
  { id: "au-77", dateNum: "8th", month: "AUG", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-78", dateNum: "8th", month: "AUG", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-79", dateNum: "8th", month: "AUG", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-80", dateNum: "8th", month: "AUG", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-81", dateNum: "14th", month: "AUG", venue: "CASINO RSM CLUB", city: "CASINO" },
  { id: "au-82", dateNum: "14th", month: "AUG", venue: "SPRINGLAKE HOTEL", city: "SPRINGFIELD LAKES" },
  { id: "au-83", dateNum: "15th", month: "AUG", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-84", dateNum: "15th", month: "AUG", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-85", dateNum: "15th", month: "AUG", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-86", dateNum: "15th", month: "AUG", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-87", dateNum: "21st", month: "AUG", venue: "SOUTHS LEAGUES CLUB", city: "MACKAY" },
  { id: "au-88", dateNum: "22nd", month: "AUG", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-89", dateNum: "22nd", month: "AUG", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-90", dateNum: "22nd", month: "AUG", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-91", dateNum: "22nd", month: "AUG", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-92", dateNum: "27th", month: "AUG", venue: "MARYBOROUGH EX SERVICES", city: "MARYBOROUGH" },
  { id: "au-93", dateNum: "28th", month: "AUG", venue: "BROTHERS SPORTS CLUB", city: "BUNDABERG" },
  { id: "au-94", dateNum: "29th", month: "AUG", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-95", dateNum: "29th", month: "AUG", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-96", dateNum: "29th", month: "AUG", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-97", dateNum: "29th", month: "AUG", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-98", dateNum: "4th", month: "SEP", venue: "COMMERCIAL HOTEL", city: "SOUTH MORANG" },
  { id: "au-99", dateNum: "4th", month: "SEP", venue: "THE VILLE RESORT-CASINO", city: "TOWNSVILLE" },
  { id: "au-100", dateNum: "5th", month: "SEP", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-101", dateNum: "5th", month: "SEP", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-102", dateNum: "5th", month: "SEP", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-103", dateNum: "5th", month: "SEP", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-104", dateNum: "11th", month: "SEP", venue: "CAPITOL THEATRE", city: "TAMWORTH" },
  { id: "au-105", dateNum: "11th", month: "SEP", venue: "BRIDGEWAY HOTEL", city: "ADELAIDE" },
  { id: "au-106", dateNum: "12th", month: "SEP", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-107", dateNum: "12th", month: "SEP", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-108", dateNum: "12th", month: "SEP", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-109", dateNum: "12th", month: "SEP", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-110", dateNum: "18th", month: "SEP", venue: "YARALLA SPORTS CLUB", city: "GLADSTONE" },
  { id: "au-111", dateNum: "18th", month: "SEP", venue: "PLAZA TAVERN", city: "HOPPERS CROSSING" },
  { id: "au-112", dateNum: "19th", month: "SEP", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-113", dateNum: "19th", month: "SEP", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-114", dateNum: "19th", month: "SEP", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-115", dateNum: "19th", month: "SEP", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-116", dateNum: "24th", month: "SEP", venue: "HARBORD DIGGERS", city: "SYDNEY" },
  { id: "au-117", dateNum: "26th", month: "SEP", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-118", dateNum: "26th", month: "SEP", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-119", dateNum: "26th", month: "SEP", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-120", dateNum: "26th", month: "SEP", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-121", dateNum: "2nd", month: "OCT", venue: "SHOPPINGTOWN HOTEL", city: "DONCASTER" },
  { id: "au-122", dateNum: "3rd", month: "OCT", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-123", dateNum: "3rd", month: "OCT", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-124", dateNum: "3rd", month: "OCT", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-125", dateNum: "3rd", month: "OCT", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-126", dateNum: "10th", month: "OCT", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-127", dateNum: "10th", month: "OCT", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-128", dateNum: "10th", month: "OCT", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-129", dateNum: "10th", month: "OCT", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-130", dateNum: "17th", month: "OCT", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-131", dateNum: "17th", month: "OCT", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-132", dateNum: "17th", month: "OCT", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-133", dateNum: "17th", month: "OCT", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-134", dateNum: "23rd", month: "OCT", venue: "CLUB ITALIA GEELONG", city: "GEELONG" },
  { id: "au-135", dateNum: "23rd", month: "OCT", venue: "YORK ON LILYDALE", city: "MOUNT EVELYN" },
  { id: "au-136", dateNum: "24th", month: "OCT", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-137", dateNum: "24th", month: "OCT", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-138", dateNum: "24th", month: "OCT", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-139", dateNum: "24th", month: "OCT", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-140", dateNum: "31st", month: "OCT", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-141", dateNum: "31st", month: "OCT", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-142", dateNum: "31st", month: "OCT", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-143", dateNum: "31st", month: "OCT", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-144", dateNum: "7th", month: "NOV", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-145", dateNum: "7th", month: "NOV", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-146", dateNum: "7th", month: "NOV", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-147", dateNum: "7th", month: "NOV", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-148", dateNum: "13th", month: "NOV", venue: "HERVEY BAY RSL", city: "HERVEY BAY" },
  { id: "au-149", dateNum: "13th", month: "NOV", venue: "HELLENIC CLUB", city: "CANBERRA" },
  { id: "au-150", dateNum: "14th", month: "NOV", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-151", dateNum: "14th", month: "NOV", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-152", dateNum: "14th", month: "NOV", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-153", dateNum: "14th", month: "NOV", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-154", dateNum: "20th", month: "NOV", venue: "DRIFTERS WHARF", city: "GOSFORD" },
  { id: "au-155", dateNum: "20th", month: "NOV", venue: "METRO CITY", city: "PERTH" },
  { id: "au-156", dateNum: "21st", month: "NOV", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-157", dateNum: "21st", month: "NOV", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-158", dateNum: "21st", month: "NOV", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-159", dateNum: "21st", month: "NOV", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-160", dateNum: "27th", month: "NOV", venue: "THE DECK", city: "TRARALGON" },
  { id: "au-161", dateNum: "28th", month: "NOV", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-162", dateNum: "28th", month: "NOV", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-163", dateNum: "28th", month: "NOV", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-164", dateNum: "28th", month: "NOV", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-165", dateNum: "4th", month: "DEC", venue: "BRIDGEWAY HOTEL", city: "ADELAIDE" },
  { id: "au-166", dateNum: "4th", month: "DEC", venue: "THE OAKS HOTEL", city: "ALBION PARK RAIL" },
  { id: "au-167", dateNum: "5th", month: "DEC", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-168", dateNum: "5th", month: "DEC", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-169", dateNum: "5th", month: "DEC", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-170", dateNum: "5th", month: "DEC", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-171", dateNum: "12th", month: "DEC", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-172", dateNum: "12th", month: "DEC", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-173", dateNum: "12th", month: "DEC", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-174", dateNum: "12th", month: "DEC", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-175", dateNum: "19th", month: "DEC", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-176", dateNum: "19th", month: "DEC", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-177", dateNum: "19th", month: "DEC", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
  { id: "au-178", dateNum: "19th", month: "DEC", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-179", dateNum: "26th", month: "DEC", venue: "CROWN CASINO", city: "MELBOURNE" },
  { id: "au-180", dateNum: "26th", month: "DEC", venue: "SHARK HOTEL", city: "SYDNEY" },
  { id: "au-181", dateNum: "26th", month: "DEC", venue: "WONDERLAND", city: "BRISBANE" },
  { id: "au-182", dateNum: "26th", month: "DEC", venue: "PLATINUM NIGHTCLUB", city: "GOLD COAST" },
];

const CA_DATES: ShowDate[] = [
  { id: "ca-01", dateNum: "15th", month: "JUL", venue: "THE BROADWAY THEATRE", city: "SASKATOON" },
  { id: "ca-02", dateNum: "16th", month: "JUL", venue: "VERNON AND DISTRICT PERFORMING ARTS CENTRE", city: "VERNON" },
  { id: "ca-03", dateNum: "17th", month: "JUL", venue: "KELOWNA COMMUNITY CENTRE", city: "KELOWNA" },
  { id: "ca-04", dateNum: "18th", month: "JUL", venue: "VOGUE THEATRE", city: "VANCOUVER" },
  { id: "ca-05", dateNum: "19th", month: "JUL", venue: "VOGUE THEATRE", city: "VANCOUVER" },
  { id: "ca-06", dateNum: "22nd", month: "JUL", venue: "THE LIGHTHOUSE ARTS CENTRE", city: "HALIFAX" },
  { id: "ca-07", dateNum: "24th", month: "JUL", venue: "THE ELGIN THEATRE", city: "TORONTO" },
  { id: "ca-08", dateNum: "25th", month: "JUL", venue: "THE ELGIN THEATRE", city: "TORONTO" },
  { id: "ca-09", dateNum: "30th", month: "JUL", venue: "PLACE DES ARTS DU GRAND SUDBURY", city: "SUDBURY" },
  { id: "ca-10", dateNum: "31st", month: "JUL", venue: "THE BRONSON MUSIC THEATRE", city: "OTTAWA" },
  { id: "ca-11", dateNum: "1st", month: "AUG", venue: "L'OLYMPIA", city: "MONTREAL" },
  { id: "ca-12", dateNum: "2nd", month: "AUG", venue: "L'OLYMPIA", city: "MONTREAL" },
  { id: "ca-13", dateNum: "4th", month: "AUG", venue: "PARK THEATRE", city: "WINNIPEG" },
  { id: "ca-14", dateNum: "6th", month: "AUG", venue: "RED DEER MEMORIAL CENTRE", city: "RED DEER" },
  { id: "ca-15", dateNum: "7th", month: "AUG", venue: "MYER HOROWITZ THEATRE", city: "EDMONTON" },
  { id: "ca-16", dateNum: "8th", month: "AUG", venue: "THE PALACE THEATRE", city: "CALGARY" },
  { id: "ca-17", dateNum: "9th", month: "AUG", venue: "MELISSA'S MISSTEAK", city: "BANFF" },
];

const EU_DATES: ShowDate[] = [
  { id: "eu-01", dateNum: "5th", month: "MAY", venue: "VÄSTERÅS KONGRESS", city: "VASTERAS" },
  { id: "eu-02", dateNum: "6th", month: "MAY", venue: "BORÅS KONGRESS", city: "BORAS" },
  { id: "eu-03", dateNum: "7th", month: "MAY", venue: "ODENSE ARENA", city: "ODENSE" },
  { id: "eu-04", dateNum: "8th", month: "MAY", venue: "LUND SKÅNE ARENA", city: "LUND" },
  { id: "eu-05", dateNum: "9th", month: "MAY", venue: "COPENHAGEN", city: "COPENHAGEN" },
  { id: "eu-06", dateNum: "10th", month: "MAY", venue: "CONGRESS SEA U", city: "HELSINGBORG" },
  { id: "eu-07", dateNum: "12th", month: "MAY", venue: "MOLDE BJØRNSONSALEN", city: "MOLDE" },
  { id: "eu-08", dateNum: "13th", month: "MAY", venue: "TRONDHEIM SPEKTRUM", city: "TRONDHEIM" },
  { id: "eu-09", dateNum: "14th", month: "MAY", venue: "ÅLESUND SPAREBANKEN ARENA", city: "ALESUND" },
  { id: "eu-10", dateNum: "15th", month: "MAY", venue: "OSLO UNITY ARENA", city: "OSLO" },
  { id: "eu-11", dateNum: "16th", month: "MAY", venue: "ÖREBRO CONVENTUM ARENA", city: "OREBRO" },
  { id: "eu-12", dateNum: "17th", month: "MAY", venue: "NORRKÖPING DE GEERHALLEN", city: "NORRKOPING" },
  { id: "eu-13", dateNum: "21st", month: "MAY", venue: "OSEANA ART & CULTURE CENTER", city: "OS" },
  { id: "eu-14", dateNum: "22nd", month: "MAY", venue: "MARITIM HALL", city: "HAUGESUND" },
  { id: "eu-15", dateNum: "23rd", month: "MAY", venue: "VÆRSTE HANGARN", city: "FREDRIKSTAD" },
  { id: "eu-16", dateNum: "24th", month: "MAY", venue: "TEIGEN SCENE", city: "TØNSBERG" },
  { id: "eu-17", dateNum: "28th", month: "MAY", venue: "STORMEN", city: "BODØ" },
  { id: "eu-18", dateNum: "30th", month: "MAY", venue: "FLØYAHALLEN", city: "TROMSØ" },
  { id: "eu-19", dateNum: "4th", month: "JUN", venue: "AMSTERDAM AFAS LIVE", city: "AMSTERDAM" },
  { id: "eu-20", dateNum: "5th", month: "JUN", venue: "ROTTERDAM AHOY", city: "ROTTERDAM" },
  { id: "eu-21", dateNum: "6th", month: "JUN", venue: "EINDHOVEN SPORTSCENTRUM", city: "EINDHOVEN" },
  { id: "eu-22", dateNum: "7th", month: "JUN", venue: "MAASTRICHT MACC", city: "MAASTRICHT" },
  { id: "eu-23", dateNum: "10th", month: "JUN", venue: "HASSELT TRIXXO THEATER", city: "HASSELT" },
  { id: "eu-24", dateNum: "11th", month: "JUN", venue: "GENT CAPITOL THEATER", city: "GENT" },
  { id: "eu-25", dateNum: "12th", month: "JUN", venue: "LOTTO ARENA", city: "ANTWERP" },
  { id: "eu-26", dateNum: "13th", month: "JUN", venue: "ING ARENA", city: "BRUSSELS" },
  { id: "eu-27", dateNum: "15th", month: "OCT", venue: "M&S BANK ARENA", city: "LIVERPOOL" },
  { id: "eu-28", dateNum: "18th", month: "OCT", venue: "VENUE CYMRU", city: "LLANDUDNO" },
  { id: "eu-29", dateNum: "20th", month: "OCT", venue: "GUILDHALL", city: "PORTSMOUTH" },
  { id: "eu-30", dateNum: "21st", month: "OCT", venue: "BIC", city: "BOURNEMOUTH" },
  { id: "eu-31", dateNum: "23rd", month: "OCT", venue: "BRADFORD LIVE", city: "BRADFORD" },
  { id: "eu-32", dateNum: "24th", month: "OCT", venue: "SEC ARMADILLO", city: "GLASGOW" },
  { id: "eu-33", dateNum: "28th", month: "OCT", venue: "MIDDLESBROUGH TOWN HALL", city: "MIDDLESBROUGH" },
  { id: "eu-34", dateNum: "29th", month: "OCT", venue: "O2 CITY HALL", city: "NEWCASTLE" },
  { id: "eu-35", dateNum: "31st", month: "OCT", venue: "FAIRFIELD HALLS", city: "CROYDON" },
];

const NZ_DATES: ShowDate[] = [
  { id: "nz-01", dateNum: "25th", month: "JUN", venue: "REGENT THEATRE GREYMOUTH", city: "GREYMOUTH" },
  { id: "nz-02", dateNum: "26th", month: "JUN", venue: "CHRISTCHURCH TOWN HALL", city: "CHRISTCHURCH" },
  { id: "nz-03", dateNum: "27th", month: "JUN", venue: "INVERCARGILL WORKINGMENS CLUB", city: "INVERCARGILL" },
  { id: "nz-04", dateNum: "28th", month: "JUN", venue: "ERRICK'S VENUE DUNEDIN (MATINEE)", city: "DUNEDIN" },
  { id: "nz-05", dateNum: "28th", month: "JUN", venue: "ERRICK'S VENUE DUNEDIN (EVENING SHOW)", city: "DUNEDIN" },
  { id: "nz-06", dateNum: "1st", month: "JUL", venue: "LOWER HUTT LITTLE THEATRE", city: "LOWER HUTT" },
  { id: "nz-07", dateNum: "2nd", month: "JUL", venue: "BAYCOURT ADDISON THEATRE", city: "TAURANGA" },
  { id: "nz-08", dateNum: "3rd", month: "JUL", venue: "NEW PLYMOUTH CLUB", city: "NEW PLYMOUTH" },
  { id: "nz-09", dateNum: "4th", month: "JUL", venue: "ROYAL OPERA HOUSE", city: "WHANGANUI" },
  { id: "nz-10", dateNum: "5th", month: "JUL", venue: "BEV RIDGES ON YORK", city: "NAPIER" },
  { id: "nz-11", dateNum: "7th", month: "JUL", venue: "SIR HOWARD MORRISON CENTRE", city: "ROTORUA" },
  { id: "nz-12", dateNum: "8th", month: "JUL", venue: "GISBORNE DOME CINEMA", city: "GISBORNE" },
  { id: "nz-13", dateNum: "9th", month: "JUL", venue: "THE FACTORY HAMILTON", city: "HAMILTON" },
  { id: "nz-14", dateNum: "10th", month: "JUL", venue: "TOI TOI OPERA HOUSE", city: "HASTINGS" },
  { id: "nz-15", dateNum: "11th", month: "JUL", venue: "SKY CITY AUCKLAND", city: "AUCKLAND" },
  { id: "nz-16", dateNum: "12th", month: "JUL", venue: "THE FORUM WHANGAREI", city: "WHANGAREI" },
];

const UK_DATES: ShowDate[] = [
  { id: "uk-01", dateNum: "15th", month: "OCT", venue: "M&S BANK ARENA", city: "LIVERPOOL" },
  { id: "uk-02", dateNum: "16th", month: "OCT", venue: "BRIGHTON CENTRE", city: "BRIGHTON" },
  { id: "uk-03", dateNum: "18th", month: "OCT", venue: "VENUE CYMRU", city: "LLANDUDNO" },
  { id: "uk-04", dateNum: "20th", month: "OCT", venue: "GUILDHALL", city: "PORTSMOUTH" },
  { id: "uk-05", dateNum: "21st", month: "OCT", venue: "BIC", city: "BOURNEMOUTH" },
  { id: "uk-06", dateNum: "23rd", month: "OCT", venue: "BRADFORD LIVE", city: "BRADFORD" },
  { id: "uk-07", dateNum: "24th", month: "OCT", venue: "SEC ARMADILLO", city: "GLASGOW" },
  { id: "uk-08", dateNum: "25th", month: "OCT", venue: "WHITE ROCK", city: "HASTINGS" },
  { id: "uk-09", dateNum: "28th", month: "OCT", venue: "MIDDLESBROUGH TOWN HALL", city: "MIDDLESBROUGH" },
  { id: "uk-10", dateNum: "29th", month: "OCT", venue: "O2 CITY HALL", city: "NEWCASTLE" },
  { id: "uk-11", dateNum: "30th", month: "OCT", venue: "BRANGWYN HALL", city: "SWANSEA" },
  { id: "uk-12", dateNum: "31st", month: "OCT", venue: "FAIRFIELD HALLS", city: "CROYDON" },
];

const USA_DATES: ShowDate[] = [
  { id: "usa-01", dateNum: "14th", month: "AUG", venue: "MARBELLA.HTX", city: "HOUSTON" },
  { id: "usa-02", dateNum: "15th", month: "AUG", venue: "ARLINGTON MUSIC HALL", city: "ARLINGTON" },
  { id: "usa-03", dateNum: "16th", month: "AUG", venue: "WILDFIRE", city: "SAN MARCOS" },
  { id: "usa-04", dateNum: "19th", month: "AUG", venue: "THE ROOSTERTAIL", city: "DETROIT" },
  { id: "usa-05", dateNum: "20th", month: "AUG", venue: "PARK WEST", city: "CHICAGO" },
  { id: "usa-06", dateNum: "21st", month: "AUG", venue: "THE 20TH CENTURY THEATER", city: "CINCINNATI" },
  { id: "usa-07", dateNum: "22nd", month: "AUG", venue: "PLAZA SHOWROOM", city: "LAS VEGAS" },
  { id: "usa-08", dateNum: "23rd", month: "AUG", venue: "PLAZA SHOWROOM", city: "LAS VEGAS" },
  { id: "usa-09", dateNum: "24th", month: "AUG", venue: "PLAZA SHOWROOM", city: "LAS VEGAS" },
  { id: "usa-10", dateNum: "2nd", month: "SEP", venue: "OFF THE HOOK COMEDY CLUB", city: "NAPLES" },
  { id: "usa-11", dateNum: "3rd", month: "SEP", venue: "BLUE MIRAGE NIGHTCLUB", city: "TAMPA" },
  { id: "usa-12", dateNum: "6th", month: "SEP", venue: "FT LAUDERDALE IMPROV", city: "FORT LAUDERDALE" },
  { id: "usa-13", dateNum: "9th", month: "SEP", venue: "WORLD NIGHTCLUB", city: "CHARLOTTE" },
  { id: "usa-14", dateNum: "10th", month: "SEP", venue: "THE GRAND GSO", city: "GREENSBORO" },
  { id: "usa-15", dateNum: "12th", month: "SEP", venue: "CARTERET PERFORMING ARTS & EVENTS CENTER", city: "CARTERET" },
];

const ALL_DATES: Record<Region, ShowDate[]> = {
  AUSTRALIA: AU_DATES,
  CANADA: CA_DATES,
  EUROPE: EU_DATES,
  "NEW ZEALAND": NZ_DATES,
  UK: UK_DATES,
  USA: USA_DATES,
};

const REGION_CODE: Record<Region, string> = {
  AUSTRALIA: "AU",
  CANADA: "CA",
  EUROPE: "EU",
  "NEW ZEALAND": "NZ",
  UK: "UK",
  USA: "USA",
};

const AU_CITIES = ["ALL LOCATIONS", "MELBOURNE", "SYDNEY", "BRISBANE", "GOLD COAST", "PERTH", "ADELAIDE", "DARWIN", "CAIRNS", "NEWCASTLE", "TOOWOOMBA", "OTHER"];

export default function MagicMenDatesPage() {
  const router = useRouter();
  const [activeRegion, setActiveRegion] = useState<Region>("AUSTRALIA");
  const [locationFilter, setLocationFilter] = useState("ALL LOCATIONS");
  const tabsRef = useRef<HTMLDivElement>(null);

  const regions: Region[] = ["AUSTRALIA", "CANADA", "EUROPE", "NEW ZEALAND", "UK", "USA"];

  const handleBuy = (show: ShowDate) => {
    const regionCode = REGION_CODE[activeRegion];
    const params = new URLSearchParams({
      venue: show.venue,
      city: show.city,
      date: `${show.dateNum} ${show.month}`,
      day: "",
      time: "8:00 PM",
      region: regionCode,
    });
    router.push(`/waiting/magic-men?${params.toString()}`);
  };

  const filteredDates = ALL_DATES[activeRegion].filter((show) => {
    if (activeRegion !== "AUSTRALIA" || locationFilter === "ALL LOCATIONS") return true;
    if (locationFilter === "OTHER") {
      return !["MELBOURNE","SYDNEY","BRISBANE","GOLD COAST","PERTH","ADELAIDE","DARWIN","CAIRNS","NEWCASTLE","TOOWOOMBA"].includes(show.city);
    }
    return show.city === locationFilter;
  });

  const scrollTabs = (dir: "left" | "right") => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" });
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, Arial", background: "#0a0a0a", minHeight: "100vh", color: "white" }}>

      {/* HEADER */}
      <div style={{ background: "#000", borderBottom: "1px solid #222", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20, cursor: "pointer", color: "#c8a84b" }} onClick={() => router.back()}>←</span>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "white", letterSpacing: 1 }}>
              MAGIC MEN WORLD TOUR 2026
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "#888" }}>Select your region and show</p>
          </div>
        </div>
      </div>

      {/* REGION TABS */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid #222", display: "flex", alignItems: "center" }}>
        <button
          type="button"
          onClick={() => scrollTabs("left")}
          style={{ background: "none", border: "none", color: "#c8a84b", fontSize: 18, cursor: "pointer", padding: "12px 10px", flexShrink: 0 }}
        >
          ‹
        </button>
        <div
          ref={tabsRef}
          style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", flex: 1 }}
        >
          <style>{`.tab-scroll::-webkit-scrollbar { display: none; }`}</style>
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => { setActiveRegion(region); setLocationFilter("ALL LOCATIONS"); }}
              style={{
                background: activeRegion === region ? "white" : "transparent",
                border: activeRegion === region ? "none" : "none",
                color: activeRegion === region ? "#0a0a0a" : "#c8a84b",
                padding: "14px 18px",
                fontSize: 13,
                fontWeight: 900,
                cursor: "pointer",
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
                flexShrink: 0,
                borderRight: "1px solid #222",
              }}
            >
              {region}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollTabs("right")}
          style={{ background: "none", border: "none", color: "#c8a84b", fontSize: 18, cursor: "pointer", padding: "12px 10px", flexShrink: 0 }}
        >
          ›
        </button>
      </div>

      {/* LOCATION FILTER (Australia only) */}
      {activeRegion === "AUSTRALIA" && (
        <div style={{ background: "#111", padding: "16px 20px", borderBottom: "1px solid #222" }}>
          <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 900, color: "#c8a84b", letterSpacing: 1 }}>
            SELECT YOUR CITY
          </p>
          <div style={{ position: "relative", border: "1px solid #c8a84b", borderRadius: 4, display: "flex", alignItems: "center", padding: "12px 14px", gap: 10 }}>
            <span style={{ fontSize: 16, color: "#c8a84b" }}>📍</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={{ background: "transparent", border: "none", color: "white", fontSize: 14, fontWeight: 900, letterSpacing: 1, outline: "none", flex: 1, cursor: "pointer" }}
            >
              {AU_CITIES.map((city) => (
                <option key={city} value={city} style={{ background: "#111", color: "white" }}>{city}</option>
              ))}
            </select>
            <span style={{ color: "#c8a84b", fontSize: 12 }}>▼</span>
          </div>
        </div>
      )}

      {/* TABLE HEADER */}
      <div style={{ padding: "16px 20px 8px" }}>
        <p style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 900, color: "#c8a84b", letterSpacing: 1 }}>
          TOUR DATES & WEEKLY SHOWS
        </p>
        <div style={{ borderTop: "1px solid #333", paddingTop: 12, display: "grid", gridTemplateColumns: "80px 1fr 90px", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: "#c8a84b", letterSpacing: 1 }}>DATE</span>
          <span style={{ fontSize: 12, fontWeight: 900, color: "#c8a84b", letterSpacing: 1, textAlign: "center" }}>VENUE</span>
          <span style={{ fontSize: 12, fontWeight: 900, color: "#c8a84b", letterSpacing: 1, textAlign: "right" }}>TICKETS</span>
        </div>
      </div>

      {/* DATE LIST */}
      <div style={{ paddingBottom: 60 }}>
        {filteredDates.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555", padding: "40px 20px" }}>No shows found for this location.</p>
        ) : (
          filteredDates.map((show) => (
            <div
              key={show.id}
              style={{ borderTop: "1px solid #1a1a1a", padding: "14px 20px", display: "grid", gridTemplateColumns: "80px 1fr 90px", gap: 8, alignItems: "center" }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#c8a84b", lineHeight: 1 }}>{show.dateNum}</p>
                <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 900, color: "#c8a84b" }}>{show.month}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "white", lineHeight: 1.3 }}>
                  {show.venue}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#888" }}>{show.city}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => handleBuy(show)}
                  style={{
                    background: "#84cc16",
                    border: "none",
                    color: "#000",
                    fontWeight: 900,
                    fontSize: 13,
                    padding: "10px 16px",
                    borderRadius: 4,
                    cursor: "pointer",
                    letterSpacing: 1,
                  }}
                >
                  BUY
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
