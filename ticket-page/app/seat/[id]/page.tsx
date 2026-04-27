"use client";
import React, { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// ─── SOMBR SEATS ─────────────────────────────────────────────────────────────
const SOMBR_SEATS = [
  { id: "c-r15-std", section: "C", row: 15, type: "Standard Admission", price: 247.8 },
  { id: "208-r17-ap", section: "208", row: 17, type: "Artist Presale", price: null },
  { id: "117-r7-plat", section: "117", row: 7, type: "Official Platinum", price: 401.2 },
  { id: "213-r20-ap", section: "213", row: 20, type: "Artist Presale", price: null },
  { id: "108-r8-vip", section: "108", row: 8, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "109-r15-ap", section: "109", row: 15, type: "Artist Presale", price: null },
  { id: "c-r3-vip", section: "C", row: 3, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "227-r16-ap", section: "227", row: 16, type: "Artist Presale", price: null },
  { id: "211-r18-ap", section: "211", row: 18, type: "Artist Presale", price: null },
  { id: "a-r9-plat", section: "A", row: 9, type: "Official Platinum", price: 354.0 },
  { id: "211-r17-ap", section: "211", row: 17, type: "Artist Presale", price: null },
  { id: "222-r11-ap", section: "222", row: 11, type: "Artist Presale", price: null },
  { id: "105-r7-plat", section: "105", row: 7, type: "Official Platinum", price: 271.4 },
  { id: "108-r10-vip", section: "108", row: 10, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "a-r6-plat", section: "A", row: 6, type: "Official Platinum", price: 401.2 },
  { id: "208-r9-ap", section: "208", row: 9, type: "Artist Presale", price: null },
  { id: "a-r3-plat", section: "A", row: 3, type: "Official Platinum", price: 483.8 },
  { id: "a-r25-std", section: "A", row: 25, type: "Standard Admission", price: 224.2 },
  { id: "c-r6-vip", section: "C", row: 6, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "209-r9-ap", section: "209", row: 9, type: "Artist Presale", price: null },
  { id: "108-r10-plat", section: "108", row: 10, type: "Official Platinum", price: 401.2 },
  { id: "117-r14-plat", section: "117", row: 14, type: "Official Platinum", price: 306.8 },
  { id: "a-r15-std", section: "A", row: 15, type: "Standard Admission", price: 247.8 },
  { id: "105-r5-plat", section: "105", row: 5, type: "Official Platinum", price: 295.0 },
  { id: "213-r15-ap", section: "213", row: 15, type: "Artist Presale", price: null },
  { id: "226-r2-std", section: "226", row: 2, type: "Standard Admission", price: 147.5 },
  { id: "209-r2-std", section: "209", row: 2, type: "Standard Admission", price: 147.5 },
  { id: "223-r4-std", section: "223", row: 4, type: "Standard Admission", price: 147.5 },
  { id: "116-r8-plat", section: "116", row: 8, type: "Official Platinum", price: 483.8 },
  { id: "b-r10-plat", section: "B", row: 10, type: "Official Platinum", price: 354.0 },
  { id: "a-r8-plat", section: "A", row: 8, type: "Official Platinum", price: 354.0 },
  { id: "a-r11-plat", section: "A", row: 11, type: "Official Platinum", price: 354.0 },
  { id: "b-r13-plat", section: "B", row: 13, type: "Official Platinum", price: 354.0 },
  { id: "c-r4-vip", section: "C", row: 4, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "107-r5-plat", section: "107", row: 5, type: "Official Platinum", price: 401.2 },
  { id: "c-r17-std", section: "C", row: 17, type: "Standard Admission", price: 247.8 },
  { id: "108-r9-vip", section: "108", row: 9, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "211-r13-ap", section: "211", row: 13, type: "Artist Presale", price: null },
  { id: "b-r8-plat", section: "B", row: 8, type: "Official Platinum", price: 389.4 },
  { id: "103-r8-plat", section: "103", row: 8, type: "Official Platinum", price: 271.4 },
  { id: "104-r4-plat", section: "104", row: 4, type: "Official Platinum", price: 318.6 },
  { id: "c-r14-plat", section: "C", row: 14, type: "Official Platinum", price: 318.6 },
  { id: "108-r7-vip", section: "108", row: 7, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "116-r13-plat", section: "116", row: 13, type: "Official Platinum", price: 401.2 },
  { id: "116-r13-vip", section: "116", row: 13, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "c-r7-vip", section: "C", row: 7, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "120-r5-plat", section: "120", row: 5, type: "Official Platinum", price: 295.0 },
  { id: "212-r2-std", section: "212", row: 2, type: "Standard Admission", price: 147.5 },
  { id: "a-r7-vip", section: "A", row: 7, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "c-r25-std", section: "C", row: 25, type: "Standard Admission", price: 224.2 },
  { id: "a-r19-std", section: "A", row: 19, type: "Standard Admission", price: 247.8 },
  { id: "b-r9-plat", section: "B", row: 9, type: "Official Platinum", price: 354.0 },
  { id: "c-r24-std", section: "C", row: 24, type: "Standard Admission", price: 224.2 },
  { id: "107-r4-plat", section: "107", row: 4, type: "Official Platinum", price: 401.2 },
  { id: "a-r16-std", section: "A", row: 16, type: "Standard Admission", price: 247.8 },
  { id: "a-r14-plat", section: "A", row: 14, type: "Official Platinum", price: 318.6 },
  { id: "c-r12-plat", section: "C", row: 12, type: "Official Platinum", price: 318.6 },
  { id: "a-r4-plat", section: "A", row: 4, type: "Official Platinum", price: 448.4 },
  { id: "c-r16-std", section: "C", row: 16, type: "Standard Admission", price: 247.8 },
  { id: "107-r5-vip", section: "107", row: 5, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "116-r12-plat", section: "116", row: 12, type: "Official Platinum", price: 401.2 },
  { id: "a-r6-vip", section: "A", row: 6, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "103-r6-plat", section: "103", row: 6, type: "Official Platinum", price: 295.0 },
  { id: "202-r2-std", section: "202", row: 2, type: "Standard Admission", price: 147.5 },
  { id: "117-r8-vip", section: "117", row: 8, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "b-r7-vip", section: "B", row: 7, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "c-r20-std", section: "C", row: 20, type: "Standard Admission", price: 247.8 },
  { id: "117-r7-vip", section: "117", row: 7, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "107-r8-vip", section: "107", row: 8, type: "HOMEWRECKER VIP PACKAGE", price: 412.95 },
  { id: "118-r14-std", section: "118", row: 14, type: "Standard Admission", price: 247.8 },
  { id: "117-r12-plat", section: "117", row: 12, type: "Official Platinum", price: 354.0 },
  { id: "a-r13-plat", section: "A", row: 13, type: "Official Platinum", price: 318.6 },
  { id: "108-r3-plat", section: "108", row: 3, type: "Official Platinum", price: 483.8 },
  { id: "119-r5-plat", section: "119", row: 5, type: "Official Platinum", price: 295.0 },
  { id: "201-r2-std", section: "201", row: 2, type: "Standard Admission", price: 147.5 },
  { id: "c-r5-plat", section: "C", row: 5, type: "Official Platinum", price: 401.2 },
  { id: "117-r10-plat", section: "117", row: 10, type: "Official Platinum", price: 354.0 },
  { id: "b-r12-plat", section: "B", row: 12, type: "Official Platinum", price: 354.0 },
  { id: "116-r13-plat2", section: "116", row: 13, type: "Official Platinum", price: 401.2 },
  { id: "b-r11-plat", section: "B", row: 11, type: "Official Platinum", price: 354.0 },
  { id: "c-r19-std", section: "C", row: 19, type: "Standard Admission", price: 247.8 },
  { id: "207-r19-std63", section: "207", row: 19, type: "Standard Admission", price: 63.35 },
  { id: "207-r20-std63", section: "207", row: 20, type: "Standard Admission", price: 63.35 },
  { id: "226-r19-std63", section: "226", row: 19, type: "Standard Admission", price: 63.35 },
  { id: "226-r20-std63", section: "226", row: 20, type: "Standard Admission", price: 63.35 },
  { id: "209-r19-std63", section: "209", row: 19, type: "Standard Admission", price: 63.35 },
  { id: "209-r20-std63", section: "209", row: 20, type: "Standard Admission", price: 63.35 },
  { id: "210-r18-std63", section: "210", row: 18, type: "Standard Admission", price: 63.35 },
  { id: "211-r16-std63", section: "211", row: 16, type: "Standard Admission", price: 63.35 },
  { id: "211-r17-std63", section: "211", row: 17, type: "Standard Admission", price: 63.35 },
  { id: "211-r18-std63", section: "211", row: 18, type: "Standard Admission", price: 63.35 },
  { id: "222-r16-std63", section: "222", row: 16, type: "Standard Admission", price: 63.35 },
  { id: "222-r17-std63", section: "222", row: 17, type: "Standard Admission", price: 63.35 },
  { id: "208-r16-std75", section: "208", row: 16, type: "Standard Admission", price: 75.70 },
  { id: "208-r17-std75", section: "208", row: 17, type: "Standard Admission", price: 75.70 },
  { id: "208-r18-std75", section: "208", row: 18, type: "Standard Admission", price: 75.70 },
  { id: "207-r16-std75", section: "207", row: 16, type: "Standard Admission", price: 75.70 },
  { id: "207-r17-std75", section: "207", row: 17, type: "Standard Admission", price: 75.70 },
  { id: "207-r18-std75", section: "207", row: 18, type: "Standard Admission", price: 75.70 },
  { id: "226-r16-std75", section: "226", row: 16, type: "Standard Admission", price: 75.70 },
  { id: "226-r17-std75", section: "226", row: 17, type: "Standard Admission", price: 75.70 },
  { id: "209-r16-std75", section: "209", row: 16, type: "Standard Admission", price: 75.70 },
  { id: "209-r17-std75", section: "209", row: 17, type: "Standard Admission", price: 75.70 },
  { id: "224-r16-std75", section: "224", row: 16, type: "Standard Admission", price: 75.70 },
  { id: "210-r13-std75", section: "210", row: 13, type: "Standard Admission", price: 75.70 },
  { id: "210-r14-std75", section: "210", row: 14, type: "Standard Admission", price: 75.70 },
  { id: "210-r15-std75", section: "210", row: 15, type: "Standard Admission", price: 75.70 },
  { id: "223-r16-std75", section: "223", row: 16, type: "Standard Admission", price: 75.70 },
  { id: "223-r17-std75", section: "223", row: 17, type: "Standard Admission", price: 75.70 },
  { id: "211-r13-std75", section: "211", row: 13, type: "Standard Admission", price: 75.70 },
  { id: "211-r14-std75", section: "211", row: 14, type: "Standard Admission", price: 75.70 },
  { id: "211-r15-std75", section: "211", row: 15, type: "Standard Admission", price: 75.70 },
  { id: "222-r13-std75", section: "222", row: 13, type: "Standard Admission", price: 75.70 },
  { id: "222-r14-std75", section: "222", row: 14, type: "Standard Admission", price: 75.70 },
  { id: "222-r15-std75", section: "222", row: 15, type: "Standard Admission", price: 75.70 },
  { id: "221-r12-std75", section: "221", row: 12, type: "Standard Admission", price: 75.70 },
  { id: "212-r12-std75", section: "212", row: 12, type: "Standard Admission", price: 75.70 },
  { id: "213-r11-std75", section: "213", row: 11, type: "Standard Admission", price: 75.70 },
  { id: "214-r11-std75", section: "214", row: 11, type: "Standard Admission", price: 75.70 },
  { id: "219-r10-std75", section: "219", row: 10, type: "Standard Admission", price: 75.70 },
  { id: "219-r11-std75", section: "219", row: 11, type: "Standard Admission", price: 75.70 },
  { id: "208-r13-std88", section: "208", row: 13, type: "Standard Admission", price: 88.05 },
  { id: "208-r14-std88", section: "208", row: 14, type: "Standard Admission", price: 88.05 },
  { id: "208-r15-std88", section: "208", row: 15, type: "Standard Admission", price: 88.05 },
  { id: "207-r13-std88", section: "207", row: 13, type: "Standard Admission", price: 88.05 },
  { id: "207-r14-std88", section: "207", row: 14, type: "Standard Admission", price: 88.05 },
  { id: "207-r15-std88", section: "207", row: 15, type: "Standard Admission", price: 88.05 },
  { id: "209-r13-std88", section: "209", row: 13, type: "Standard Admission", price: 88.05 },
  { id: "209-r14-std88", section: "209", row: 14, type: "Standard Admission", price: 88.05 },
  { id: "209-r15-std88", section: "209", row: 15, type: "Standard Admission", price: 88.05 },
  { id: "224-r13-std88", section: "224", row: 13, type: "Standard Admission", price: 88.05 },
  { id: "224-r14-std88", section: "224", row: 14, type: "Standard Admission", price: 88.05 },
  { id: "224-r15-std88", section: "224", row: 15, type: "Standard Admission", price: 88.05 },
  { id: "210-r8-std88", section: "210", row: 8, type: "Standard Admission", price: 88.05 },
  { id: "210-r9-std88", section: "210", row: 9, type: "Standard Admission", price: 88.05 },
  { id: "210-r10-std88", section: "210", row: 10, type: "Standard Admission", price: 88.05 },
  { id: "210-r11-std88", section: "210", row: 11, type: "Standard Admission", price: 88.05 },
  { id: "210-r12-std88", section: "210", row: 12, type: "Standard Admission", price: 88.05 },
  { id: "223-r13-std88", section: "223", row: 13, type: "Standard Admission", price: 88.05 },
  { id: "223-r14-std88", section: "223", row: 14, type: "Standard Admission", price: 88.05 },
  { id: "223-r15-std88", section: "223", row: 15, type: "Standard Admission", price: 88.05 },
  { id: "222-r8-std88", section: "222", row: 8, type: "Standard Admission", price: 88.05 },
  { id: "222-r9-std88", section: "222", row: 9, type: "Standard Admission", price: 88.05 },
  { id: "222-r10-std88", section: "222", row: 10, type: "Standard Admission", price: 88.05 },
  { id: "222-r11-std88", section: "222", row: 11, type: "Standard Admission", price: 88.05 },
  { id: "222-r12-std88", section: "222", row: 12, type: "Standard Admission", price: 88.05 },
  { id: "211-r8-std88", section: "211", row: 8, type: "Standard Admission", price: 88.05 },
  { id: "211-r9-std88", section: "211", row: 9, type: "Standard Admission", price: 88.05 },
  { id: "211-r10-std88", section: "211", row: 10, type: "Standard Admission", price: 88.05 },
  { id: "211-r11-std88", section: "211", row: 11, type: "Standard Admission", price: 88.05 },
  { id: "211-r12-std88", section: "211", row: 12, type: "Standard Admission", price: 88.05 },
  { id: "221-r8-std88", section: "221", row: 8, type: "Standard Admission", price: 88.05 },
  { id: "221-r9-std88", section: "221", row: 9, type: "Standard Admission", price: 88.05 },
  { id: "221-r10-std88", section: "221", row: 10, type: "Standard Admission", price: 88.05 },
  { id: "221-r11-std88", section: "221", row: 11, type: "Standard Admission", price: 88.05 },
  { id: "212-r8-std88", section: "212", row: 8, type: "Standard Admission", price: 88.05 },
  { id: "220-r8-std88", section: "220", row: 8, type: "Standard Admission", price: 88.05 },
  { id: "220-r9-std88", section: "220", row: 9, type: "Standard Admission", price: 88.05 },
  { id: "220-r10-std88", section: "220", row: 10, type: "Standard Admission", price: 88.05 },
  { id: "219-r8-std88", section: "219", row: 8, type: "Standard Admission", price: 88.05 },
  { id: "219-r9-std88", section: "219", row: 9, type: "Standard Admission", price: 88.05 },
] as const;

// ─── BRUNO MARS SEATS ─────────────────────────────────────────────────────────
const BRUNO_MARS_SEATS = [
  { id: "bm-426-r21", section: "426", row: 21, type: "Resale - Upper Level", price: 213.01 },
  { id: "bm-403-r18", section: "403", row: 18, type: "Resale - Upper Level", price: 150.39 },
  { id: "bm-425-r18", section: "425", row: 18, type: "Resale - Upper Level", price: 220.15 },
  { id: "bm-425-r17", section: "425", row: 17, type: "Resale - Upper Level", price: 123.72 },
  { id: "bm-428-r6", section: "428", row: 6, type: "Resale - Upper Level", price: 226.10 },
  { id: "bm-402-r13", section: "402", row: 13, type: "Resale - Upper Level", price: 232.05 },
  { id: "bm-403-r1", section: "403", row: 1, type: "Resale - Upper Level", price: 232.05 },
  { id: "bm-426-r8", section: "426", row: 8, type: "Resale - Upper Level", price: 136.33 },
  { id: "bm-402-r2", section: "402", row: 2, type: "Resale - Upper Level", price: 245.14 },
  { id: "bm-426-r10", section: "426", row: 10, type: "Resale - Upper Level", price: 251.09 },
  { id: "bm-402-r9", section: "402", row: 9, type: "Resale - Upper Level", price: 153.23 },
  { id: "bm-426-r3", section: "426", row: 3, type: "Resale - Upper Level", price: 268.94 },
  { id: "bm-426-r1", section: "426", row: 1, type: "Resale - Upper Level", price: 214.26 },
  { id: "bm-426-r18", section: "426", row: 18, type: "Resale - Upper Level", price: 305.83 },
  { id: "bm-426-r14", section: "426", row: 14, type: "Resale - Upper Level", price: 220.97 },
  { id: "bm-429-r15", section: "429", row: 15, type: "Resale - Upper Level", price: 304.64 },
  { id: "bm-430-r20", section: "430", row: 20, type: "Resale - Upper Level", price: 324.87 },
  { id: "bm-432-r3", section: "432", row: 3, type: "Resale - Upper Level", price: 226.95 },
  { id: "bm-451-r11", section: "451", row: 11, type: "Resale - Upper Level", price: 303.45 },
  { id: "bm-453-r17", section: "453", row: 17, type: "Resale - Upper Level", price: 280.84 },
  { id: "bm-319-r18", section: "319", row: 18, type: "Resale - Club Level", price: 272.51 },
  { id: "bm-319-r17", section: "319", row: 17, type: "Resale - Club Level", price: 274.89 },
  { id: "bm-303-r16", section: "303", row: 16, type: "Resale - Club Level", price: 276.08 },
  { id: "bm-303-r15", section: "303", row: 15, type: "Resale - Club Level", price: 277.27 },
  { id: "bm-319-r14", section: "319", row: 14, type: "Resale - Club Level", price: 130.03 },
  { id: "bm-303-r13", section: "303", row: 13, type: "Resale - Club Level", price: 286.79 },
  { id: "bm-401-r16", section: "401", row: 16, type: "Resale - Club Level", price: 289.17 },
  { id: "bm-303-r11", section: "303", row: 11, type: "Resale - Club Level", price: 228.44 },
  { id: "bm-219-r8", section: "219", row: 8, type: "Resale - Club Level", price: 337.96 },
  { id: "bm-326-r17", section: "326", row: 17, type: "Resale - Club Level", price: 360.57 },
  { id: "bm-320-r19", section: "320", row: 19, type: "Resale - Club Level", price: 367.71 },
  { id: "bm-324-r8", section: "324", row: 8, type: "Resale - Club Level", price: 370.09 },
  { id: "bm-319-r11", section: "319", row: 11, type: "Resale - Club Level", price: 379.61 },
  { id: "bm-325-r6", section: "325", row: 6, type: "Resale - Club Level", price: 399.84 },
  { id: "bm-321-r17", section: "321", row: 17, type: "Resale - Club Level", price: 408.17 },
  { id: "bm-329-r9", section: "329", row: 9, type: "Resale - Club Level", price: 414.12 },
  { id: "bm-334-r9", section: "334", row: 9, type: "Resale - Club Level", price: 414.12 },
  { id: "bm-338-r15", section: "338", row: 15, type: "Resale - Club Level", price: 464.10 },
  { id: "bm-226-r11", section: "226", row: 11, type: "Resale - Club Level", price: 434.35 },
  { id: "bm-228-r2", section: "228", row: 2, type: "Resale - Club Level", price: 418.88 },
  { id: "bm-136-r20", section: "136", row: 20, type: "Resale - Lower Level", price: 380.80 },
  { id: "bm-127-r16", section: "127", row: 16, type: "Resale - Lower Level", price: 395.08 },
  { id: "bm-135-r14", section: "135", row: 14, type: "Resale - Lower Level", price: 399.84 },
  { id: "bm-134-r27", section: "134", row: 27, type: "Resale - Lower Level", price: 402.22 },
  { id: "bm-127-r13", section: "127", row: 13, type: "Resale - Lower Level", price: 404.60 },
  { id: "bm-135-r13", section: "135", row: 13, type: "Resale - Lower Level", price: 405.79 },
  { id: "bm-127-r10", section: "127", row: 10, type: "Resale - Lower Level", price: 409.36 },
  { id: "bm-134-r26", section: "134", row: 26, type: "Resale - Lower Level", price: 412.93 },
  { id: "bm-130-r27", section: "130", row: 27, type: "Resale - Lower Level", price: 416.50 },
  { id: "bm-135-r9", section: "135", row: 9, type: "Resale - Lower Level", price: 418.88 },
  { id: "bm-124-r22", section: "124", row: 22, type: "Resale - Lower Level", price: 420.07 },
  { id: "bm-135-r10", section: "135", row: 10, type: "Resale - Lower Level", price: 421.26 },
  { id: "bm-134-r21", section: "134", row: 21, type: "Resale - Lower Level", price: 423.64 },
  { id: "bm-135-r15", section: "135", row: 15, type: "Resale - Lower Level", price: 424.83 },
  { id: "bm-127-r8", section: "127", row: 8, type: "Resale - Lower Level", price: 427.21 },
  { id: "bm-124-r24", section: "124", row: 24, type: "Resale - Lower Level", price: 428.40 },
  { id: "bm-126-r20", section: "126", row: 20, type: "Resale - Lower Level", price: 433.16 },
  { id: "bm-130-r11", section: "130", row: 11, type: "Resale - Lower Level", price: 439.11 },
  { id: "bm-124-r20", section: "124", row: 20, type: "Resale - Lower Level", price: 446.25 },
  { id: "bm-126-r19", section: "126", row: 19, type: "Resale - Lower Level", price: 452.20 },
  { id: "bm-138-r7", section: "138", row: 7, type: "Resale - Lower Level", price: 455.77 },
  { id: "bm-127-r6", section: "127", row: 6, type: "Resale - Lower Level", price: 459.34 },
  { id: "bm-135-r5", section: "135", row: 5, type: "Resale - Lower Level", price: 461.72 },
  { id: "bm-126-r5", section: "126", row: 5, type: "Resale - Lower Level", price: 464.10 },
  { id: "bm-126-r2", section: "126", row: 2, type: "Resale - Lower Level", price: 466.48 },
  { id: "bm-138-r2", section: "138", row: 2, type: "Resale - Lower Level", price: 490.28 },
  { id: "bm-126-r1", section: "126", row: 1, type: "Resale - Lower Level", price: 493.85 },
  { id: "bm-138-r1", section: "138", row: 1, type: "Resale - Lower Level", price: 534.31 },
  { id: "bm-134-r10", section: "134", row: 10, type: "Resale - Lower Level", price: 535.50 },
  { id: "bm-119-r26", section: "119", row: 26, type: "Resale - Lower Level", price: 545.02 },
  { id: "bm-126-r13", section: "126", row: 13, type: "Resale - Lower Level", price: 584.29 },
  { id: "bm-123-r12", section: "123", row: 12, type: "Resale - Lower Level", price: 608.09 },
  { id: "bm-134-r8", section: "134", row: 8, type: "Resale - Lower Level", price: 621.18 },
  { id: "bm-126-r6", section: "126", row: 6, type: "Resale - Lower Level", price: 623.56 },
  { id: "bm-102-r9", section: "102", row: 9, type: "Resale - Lower Level", price: 729.47 },
  { id: "bm-101-r12", section: "101", row: 12, type: "Resale - Lower Level", price: 785.40 },
  { id: "bm-120-r5", section: "120", row: 5, type: "Resale - Lower Level", price: 850.85 },
  { id: "bm-121-r4", section: "121", row: 4, type: "Resale - Lower Level", price: 896.07 },
  { id: "bm-fielda10-r19", section: "FIELD A10", row: 19, type: "Resale - Floor/Field", price: 672.35 },
  { id: "bm-a9-r6", section: "A9", row: 6, type: "Resale - Floor/Field", price: 706.86 },
  { id: "bm-a7-r15", section: "A7", row: 15, type: "Resale - Floor/Field", price: 724.71 },
  { id: "bm-floora2-r6", section: "FLOOR A2", row: 6, type: "Resale - Floor/Field", price: 728.28 },
  { id: "bm-floora4-r6", section: "FLOOR A4", row: 6, type: "Resale - Floor/Field", price: 769.93 },
  { id: "bm-a2-r29", section: "A2", row: 29, type: "Resale - Floor/Field", price: 785.40 },
  { id: "bm-a14-r1", section: "A14", row: 1, type: "Resale - Floor/Field", price: 786.59 },
  { id: "bm-a8-r5", section: "A8", row: 5, type: "Resale - Floor/Field", price: 850.85 },
  { id: "bm-a4-r29", section: "A4", row: 29, type: "Resale - Floor/Field", price: 863.94 },
  { id: "bm-a1-r5", section: "A1", row: 5, type: "Resale - Floor/Field", price: 896.07 },
  { id: "bm-a2-r14", section: "A2", row: 14, type: "Resale - Floor/Field", price: 896.07 },
  { id: "bm-a4-r11", section: "A4", row: 11, type: "Resale - Floor/Field", price: 896.07 },
  { id: "bm-a5-r4", section: "A5", row: 4, type: "Resale - Floor/Field", price: 896.07 },
  { id: "bm-119-r23", section: "119", row: 23, type: "Resale - Floor/Field", price: 997.22 },
  { id: "bm-floora2-r20", section: "FLOOR A2", row: 20, type: "Resale - Floor/Field", price: 1019.83 },
  { id: "bm-floora4-r19", section: "FLOOR A4", row: 19, type: "Resale - Floor/Field", price: 1032.92 },
  { id: "bm-a3-r29", section: "A3", row: 29, type: "Resale - Floor/Field", price: 1106.70 },
  { id: "bm-a3-r23", section: "A3", row: 23, type: "Resale - Floor/Field", price: 1204.28 },
  { id: "bm-a8-r1", section: "A8", row: 1, type: "Resale - Floor/Field", price: 1228.08 },
  { id: "bm-floora1-r25", section: "FLOOR A1", row: 25, type: "Resale - Floor/Field", price: 1284.01 },
  { id: "bm-119-r1", section: "119", row: 1, type: "Resale - Floor/Field", price: 1447.04 },
  { id: "bm-floora1-r1", section: "FLOOR A1", row: 1, type: "Resale - Floor/Field", price: 1483.93 },
  { id: "bm-floora2-r30", section: "FLOOR A2", row: 30, type: "Resale - Floor/Field", price: 1506.54 },
  { id: "bm-floora2-r22", section: "FLOOR A2", row: 22, type: "Resale - Floor/Field", price: 1580.32 },
  { id: "bm-a3-r20", section: "A3", row: 20, type: "Resale - Floor/Field", price: 1683.85 },
  { id: "bm-a2-r1", section: "A2", row: 1, type: "Resale - Floor/Field", price: 1717.17 },
  { id: "bm-floora3-r30", section: "FLOOR A3", row: 30, type: "Resale - Floor/Field", price: 1964.69 },
  { id: "bm-floora3-r9", section: "FLOOR A3", row: 9, type: "Resale - Floor/Field", price: 1970.64 },
] as const;

// ─── CANADA SEATS ─────────────────────────────────────────────────────────────
const CANADA_SEATS = [
  { id: "ca-b1-r20", section: "B1", row: 20, type: "Featured - Standard", price: 118.13 },
  { id: "ca-a2-r22", section: "A2", row: 22, type: "Featured - Standard", price: 265.40 },
  { id: "ca-a2-r23", section: "A2", row: 23, type: "Featured - Standard", price: 165.40 },
  { id: "ca-d1-r2", section: "D1", row: 2, type: "Verified Resale", price: 115.28 },
  { id: "ca-w106-r36", section: "W106", row: 36, type: "Verified Resale", price: 243.60 },
  { id: "ca-d5-r5a", section: "D5", row: 5, type: "Verified Resale", price: 201.20 },
  { id: "ca-e124-r47", section: "E124", row: 47, type: "Verified Resale", price: 230.64 },
  { id: "ca-d5-r5b", section: "D5", row: 5, type: "Verified Resale", price: 173.69 },
  { id: "ca-d3-r5a", section: "D3", row: 5, type: "Verified Resale", price: 230.50 },
  { id: "ca-c6-r26", section: "C6", row: 26, type: "Verified Resale", price: 170.50 },
  { id: "ca-d3-r5b", section: "D3", row: 5, type: "Verified Resale", price: 150.80 },
  { id: "ca-d3-r5c", section: "D3", row: 5, type: "Verified Resale", price: 282.00 },
  { id: "ca-c2-r22a", section: "C2", row: 22, type: "Verified Resale", price: 284.40 },
  { id: "ca-c6-r20", section: "C6", row: 20, type: "Verified Resale", price: 285.60 },
  { id: "ca-d5-r4a", section: "D5", row: 4, type: "Verified Resale", price: 285.60 },
  { id: "ca-c2-r13", section: "C2", row: 13, type: "Verified Resale", price: 287.28 },
  { id: "ca-c7-r25", section: "C7", row: 25, type: "Verified Resale", price: 287.28 },
  { id: "ca-d5-r1", section: "D5", row: 1, type: "Verified Resale", price: 287.28 },
  { id: "ca-w104-r50", section: "W104", row: 50, type: "Verified Resale", price: 287.28 },
  { id: "ca-d5-r4b", section: "D5", row: 4, type: "Verified Resale", price: 288.00 },
  { id: "ca-e124-r44", section: "E124", row: 44, type: "Verified Resale", price: 296.40 },
  { id: "ca-e123-r51", section: "E123", row: 51, type: "Verified Resale", price: 300.00 },
  { id: "ca-w104-r29", section: "W104", row: 29, type: "Verified Resale", price: 306.00 },
  { id: "ca-w103-r34", section: "W103", row: 34, type: "Verified Resale", price: 306.00 },
  { id: "ca-e124-r41", section: "E124", row: 41, type: "Verified Resale", price: 206.00 },
  { id: "ca-w103-r33", section: "W103", row: 33, type: "Verified Resale", price: 313.20 },
  { id: "ca-c6-r6", section: "C6", row: 6, type: "Verified Resale", price: 313.20 },
  { id: "ca-w104-r27", section: "W104", row: 27, type: "Verified Resale", price: 314.40 },
  { id: "ca-e122-r36", section: "E122", row: 36, type: "Verified Resale", price: 214.40 },
  { id: "ca-w104-r52", section: "W104", row: 52, type: "Verified Resale", price: 315.60 },
  { id: "ca-c6-r5", section: "C6", row: 5, type: "Verified Resale", price: 318.00 },
  { id: "ca-e124-r35", section: "E124", row: 35, type: "Verified Resale", price: 321.60 },
  { id: "ca-w101-r54", section: "W101", row: 54, type: "Verified Resale", price: 322.80 },
  { id: "ca-c2-r3", section: "C2", row: 3, type: "Verified Resale", price: 322.80 },
  { id: "ca-e124-r30a", section: "E124", row: 30, type: "Verified Resale", price: 325.20 },
  { id: "ca-e122-r33", section: "E122", row: 33, type: "Verified Resale", price: 327.60 },
  { id: "ca-c2-r2a", section: "C2", row: 2, type: "Verified Resale", price: 327.60 },
  { id: "ca-e125-r46", section: "E125", row: 46, type: "Verified Resale", price: 120.00 },
  { id: "ca-e125-r47", section: "E125", row: 47, type: "Verified Resale", price: 330.00 },
  { id: "ca-w101-r27", section: "W101", row: 27, type: "Verified Resale", price: 331.20 },
  { id: "ca-w103-r37", section: "W103", row: 37, type: "Verified Resale", price: 331.20 },
  { id: "ca-c6-r2", section: "C6", row: 2, type: "Verified Resale", price: 332.40 },
  { id: "ca-c2-r2b", section: "C2", row: 2, type: "Verified Resale", price: 332.40 },
  { id: "ca-w106-r6", section: "W106", row: 6, type: "Verified Resale", price: 126.00 },
  { id: "ca-b2-r27", section: "B2", row: 27, type: "Verified Resale", price: 336.00 },
  { id: "ca-c2-r2c", section: "C2", row: 2, type: "Verified Resale", price: 337.20 },
  { id: "ca-w101-r51", section: "W101", row: 51, type: "Verified Resale", price: 338.40 },
  { id: "ca-e124-r30b", section: "E124", row: 30, type: "Verified Resale", price: 342.00 },
  { id: "ca-c3-r15", section: "C3", row: 15, type: "Verified Resale", price: 342.00 },
  { id: "ca-w101-r45", section: "W101", row: 45, type: "Verified Resale", price: 344.40 },
  { id: "ca-e124-r28", section: "E124", row: 28, type: "Verified Resale", price: 345.60 },
  { id: "ca-e125-r42", section: "E125", row: 42, type: "Verified Resale", price: 345.60 },
  { id: "ca-c5-r12", section: "C5", row: 12, type: "Verified Resale", price: 346.80 },
  { id: "ca-w107-r4", section: "W107", row: 4, type: "Verified Resale", price: 348.00 },
  { id: "ca-e125-r44", section: "E125", row: 44, type: "Verified Resale", price: 348.00 },
  { id: "ca-b7-r28", section: "B7", row: 28, type: "Verified Resale", price: 350.40 },
  { id: "ca-b6-r24", section: "B6", row: 24, type: "Verified Resale", price: 351.60 },
  { id: "ca-c5-r7", section: "C5", row: 7, type: "Verified Resale", price: 351.60 },
  { id: "ca-e119-r3", section: "E119", row: 3, type: "Verified Resale", price: 354.00 },
  { id: "ca-e122-r31", section: "E122", row: 31, type: "Verified Resale", price: 354.00 },
  { id: "ca-w101-r39", section: "W101", row: 39, type: "Verified Resale", price: 354.00 },
  { id: "ca-e124-r43", section: "E124", row: 43, type: "Verified Resale", price: 354.00 },
] as const;

// ─── TYPES ────────────────────────────────────────────────────────────────────
type SombrSeat = (typeof SOMBR_SEATS)[number];
type BrunoSeat = (typeof BRUNO_MARS_SEATS)[number];
type CanadaSeat = (typeof CANADA_SEATS)[number];
type AnySeat = SombrSeat | BrunoSeat | CanadaSeat;

type SombrFilter = "Standard Admission" | "Artist Presale" | "HOMEWRECKER VIP PACKAGE" | "Official Platinum";
type BrunoFilter = "Resale - Upper Level" | "Resale - Club Level" | "Resale - Lower Level" | "Resale - Floor/Field";
type CanadaFilter = "Featured - Standard" | "Verified Resale";
type AnyFilter = SombrFilter | BrunoFilter | CanadaFilter;

const SOMBR_FILTERS: SombrFilter[] = ["Standard Admission", "Artist Presale", "HOMEWRECKER VIP PACKAGE", "Official Platinum"];
const BRUNO_FILTERS: BrunoFilter[] = ["Resale - Upper Level", "Resale - Club Level", "Resale - Lower Level", "Resale - Floor/Field"];
const CANADA_FILTERS: CanadaFilter[] = ["Featured - Standard", "Verified Resale"];

const VALID_PASSCODE = "POTENTIAL";
const TM_BLUE = "#0064d2";
const TM_BLACK = "#0b0b0b";
const TM_TEXT = "#0f172a";
const TM_MUTED = "#4b5563";

function rand50to160() { return 50 + Math.floor(Math.random() * 111); }

// ─── ARENA MAPS ───────────────────────────────────────────────────────────────
function SombrArenaMap() {
  return (
    <svg width="300" height="300" viewBox="0 0 500 500" style={{ display: "block", margin: "0 auto" }}>
      <ellipse cx="250" cy="260" rx="235" ry="225" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1.5" />
      <ellipse cx="250" cy="260" rx="185" ry="175" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
      <ellipse cx="250" cy="260" rx="140" ry="130" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5" />
      <ellipse cx="250" cy="270" rx="90" ry="100" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x="205" y="115" width="90" height="50" rx="4" fill="#111827" />
      <text x="250" y="146" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">STAGE</text>
      <rect x="246" y="165" width="8" height="28" fill="#374151" />
      <rect x="185" y="193" width="52" height="35" rx="3" fill="#2563eb" />
      <text x="211" y="215" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PIT LEFT</text>
      <rect x="263" y="193" width="52" height="35" rx="3" fill="#2563eb" />
      <text x="289" y="215" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PIT RIGHT</text>
      {["A","B","C","D","E","F"].map((s, i) => (
        <g key={s}>
          <rect x={172 + i*26} y={233} width="24" height="22" rx="2" fill="#1d4ed8" />
          <text x={184 + i*26} y={248} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s}</text>
        </g>
      ))}
      {["G","H","J","K","L","M"].map((s, i) => (
        <g key={s}>
          <rect x={172 + i*26} y={259} width="24" height="22" rx="2" fill="#1d4ed8" />
          <text x={184 + i*26} y={274} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s}</text>
        </g>
      ))}
      <rect x="234" y="312" width="32" height="20" rx="3" fill="#111827" />
      <text x="250" y="326" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">B STAGE</text>
      {[
        {n:"201",x:290,y:468},{n:"202",x:322,y:450},{n:"203",x:345,y:428},
        {n:"204",x:363,y:403},{n:"205",x:375,y:374},{n:"206",x:382,y:343},
        {n:"207",x:384,y:310},{n:"208",x:380,y:277},{n:"209",x:371,y:246},
        {n:"210",x:358,y:218},{n:"211",x:341,y:193},{n:"212",x:320,y:173},
        {n:"213",x:296,y:158},{n:"214",x:272,y:150},{n:"221",x:250,y:147},
        {n:"222",x:228,y:150},{n:"223",x:204,y:158},{n:"224",x:180,y:173},
        {n:"225",x:159,y:193},{n:"226",x:142,y:218},{n:"227",x:129,y:246},
        {n:"228",x:120,y:277},{n:"229",x:116,y:310},{n:"230",x:118,y:343},
        {n:"231",x:125,y:374},{n:"232",x:137,y:403},{n:"233",x:155,y:428},
        {n:"234",x:178,y:450},{n:"235",x:210,y:468},{n:"236",x:250,y:474},
      ].map(s => (
        <text key={s.n} x={s.x} y={s.y} textAnchor="middle" fill="#374151" fontSize="8" fontWeight="bold">{s.n}</text>
      ))}
      {[
        {n:"101",x:227,y:388},{n:"102",x:245,y:392},{n:"103",x:263,y:388},
        {n:"104",x:279,y:382},{n:"105",x:294,y:373},{n:"106",x:310,y:358},
        {n:"107",x:322,y:340},{n:"108",x:329,y:320},{n:"109",x:333,y:298},
        {n:"110",x:332,y:276},{n:"111",x:328,y:255},{n:"112",x:321,y:236},
        {n:"113",x:312,y:218},{n:"114",x:301,y:202},{n:"115",x:289,y:188},
        {n:"116",x:278,y:178},{n:"117",x:264,y:172},{n:"118",x:250,y:170},
        {n:"119",x:236,y:172},{n:"120",x:222,y:178},{n:"125",x:200,y:188},
        {n:"126",x:188,y:202},{n:"127",x:177,y:218},{n:"128",x:168,y:236},
        {n:"129",x:161,y:255},{n:"130",x:157,y:276},{n:"131",x:156,y:298},
        {n:"132",x:160,y:320},{n:"133",x:167,y:340},{n:"134",x:178,y:358},
        {n:"135",x:196,y:373},{n:"136",x:211,y:382},
      ].map(s => (
        <text key={s.n} x={s.x} y={s.y} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s.n}</text>
      ))}
    </svg>
  );
}

function BrunoArenaMap() {
  return (
    <svg width="340" height="220" viewBox="0 0 680 440" style={{ display: "block", margin: "0 auto" }}>
      <rect x="20" y="20" width="640" height="400" rx="80" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
      <rect x="60" y="60" width="560" height="320" rx="60" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x="110" y="100" width="460" height="240" rx="40" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="160" y="130" width="360" height="180" rx="20" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x="30" y="170" width="80" height="100" rx="6" fill="#111827" />
      <text x="70" y="225" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">STAGE</text>
      {[
        {n:"A1",x:175,y:145},{n:"A2",x:215,y:145},{n:"A3",x:255,y:145},{n:"A4",x:295,y:145},
        {n:"A5",x:335,y:145},{n:"A6",x:375,y:145},{n:"A7",x:415,y:145},{n:"A8",x:455,y:145},
        {n:"A9",x:175,y:175},{n:"A10",x:215,y:175},{n:"A11",x:255,y:175},{n:"A12",x:295,y:175},
        {n:"A13",x:335,y:175},{n:"A14",x:375,y:175},
      ].map(s => (
        <g key={s.n}>
          <rect x={s.x - 17} y={s.y - 13} width="36" height="22" rx="3" fill="#1d4ed8" stroke="#1e40af" strokeWidth="0.8" />
          <text x={s.x} y={s.y + 2} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s.n}</text>
        </g>
      ))}
      {["119","120","121","122","123","124","125","126","127","128","129","130"].map((n, i) => (
        <text key={n} x={130 + i*35} y={118} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{n}</text>
      ))}
      {["131","132","133","134","135","136","137","138","139","140","141","142"].map((n, i) => (
        <text key={n} x={130 + i*35} y={322} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{n}</text>
      ))}
      {["101","102","103","104"].map((n, i) => (
        <text key={n} x={125} y={160 + i*28} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{n}</text>
      ))}
      {["107","108","109","110"].map((n, i) => (
        <text key={n} x={555} y={160 + i*28} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{n}</text>
      ))}
      {["219","220","221","222","223","224","225","226","227","228"].map((n, i) => (
        <text key={n} x={100 + i*48} y={82} textAnchor="middle" fill="#1e3a8a" fontSize="9" fontWeight="bold">{n}</text>
      ))}
      {["319","320","321","322","323","324","325","326","327","328"].map((n, i) => (
        <text key={n} x={100 + i*48} y={48} textAnchor="middle" fill="#374151" fontSize="8" fontWeight="bold">{n}</text>
      ))}
      {["424","425","426","427","428","429","430","431"].map((n, i) => (
        <text key={n} x={110 + i*58} y={28} textAnchor="middle" fill="#6b7280" fontSize="8">{n}</text>
      ))}
      {["401","402","403","404","405","406","407","408"].map((n, i) => (
        <text key={n} x={110 + i*58} y={428} textAnchor="middle" fill="#6b7280" fontSize="8">{n}</text>
      ))}
      {["450","451","452","453","454"].map((n, i) => (
        <text key={n} x={45} y={160 + i*22} textAnchor="middle" fill="#6b7280" fontSize="8">{n}</text>
      ))}
      {["432","433","434","435","436"].map((n, i) => (
        <text key={n} x={635} y={160 + i*22} textAnchor="middle" fill="#6b7280" fontSize="8">{n}</text>
      ))}
      <rect x="488" y="203" width="30" height="16" rx="3" fill="#374151" />
      <text x="503" y="215" textAnchor="middle" fill="white" fontSize="8">MIX</text>
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function SeatPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params?.id ?? "sombr";
  const search = useSearchParams();
  const isBruno = eventId === "bruno-mars";

  const venue = search.get("venue") ?? (isBruno ? "MetLife Stadium" : "Madison Square Garden");
  const city = search.get("city") ?? (isBruno ? "East Rutherford, NJ" : "New York, NY");
  const date = search.get("date") ?? (isBruno ? "AUG 21" : "NOV 23");
  const day = search.get("day") ?? (isBruno ? "Fri" : "Mon");
  const time = search.get("time") ?? "7:00 PM";
  const venueParams = `venue=${encodeURIComponent(venue)}&city=${encodeURIComponent(city)}&date=${encodeURIComponent(date)}&day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`;

  const isCanada = isBruno && (city.includes("Canada") || venue === "Rogers Stadium" || venue === "BC Place");

  const tourName = isBruno ? "Bruno Mars - The Romantic Tour" : "SOMBR - You Are The Reason Tour";
  const allSeats: readonly AnySeat[] = isCanada ? CANADA_SEATS : isBruno ? BRUNO_MARS_SEATS : SOMBR_SEATS;
  const allTypes: AnyFilter[] = isCanada ? [...CANADA_FILTERS] : isBruno ? [...BRUNO_FILTERS] : [...SOMBR_FILTERS];

  const [showPresaleModal, setShowPresaleModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [presaleUnlocked, setPresaleUnlocked] = useState(false);
  const [sortBy, setSortBy] = useState<"all" | "top">("all");
  const [activeFilters, setActiveFilters] = useState<AnyFilter[]>(allTypes);

  const unlockedPrices = useMemo(() => {
    if (!presaleUnlocked || isBruno) return {} as Record<string, number>;
    const map: Record<string, number> = {};
    for (const s of SOMBR_SEATS) {
      if (s.price == null) map[s.id] = rand50to160();
    }
    return map;
  }, [presaleUnlocked, isBruno]);

  const toggleFilter = (t: AnyFilter) => {
    setActiveFilters((prev) => prev.includes(t) ? prev.filter((f) => f !== t) : [...prev, t]);
  };

  const filtered = useMemo(
    () => allSeats.filter((s) => activeFilters.includes(s.type as AnyFilter)),
    [allSeats, activeFilters]
  );

  const sorted = useMemo(() => {
    if (sortBy !== "top") return filtered;
    return [...filtered].sort((a, b) => {
      const pa = a.price ?? (presaleUnlocked ? unlockedPrices[a.id] ?? 9999 : 9999);
      const pb = b.price ?? (presaleUnlocked ? unlockedPrices[b.id] ?? 9999 : 9999);
      return pa - pb;
    });
  }, [filtered, sortBy, presaleUnlocked, unlockedPrices]);

  const typeColor = (type: string) => {
    if (type === "Featured - Standard") return "#b45309";
    if (type === "Verified Resale") return "#0891b2";
    if (type === "HOMEWRECKER VIP PACKAGE") return "#b45309";
    if (type === "Resale - Floor/Field") return "#7c3aed";
    if (type === "Resale - Lower Level") return TM_BLUE;
    if (type === "Resale - Club Level") return "#0891b2";
    if (type === "Resale - Upper Level") return "#374151";
    if (type === "Official Platinum" || type === "Artist Presale") return TM_BLUE;
    return TM_TEXT;
  };

  const getEffectivePrice = (seat: AnySeat): number | null => {
    if (seat.price != null) return seat.price;
    if (!presaleUnlocked) return null;
    return unlockedPrices[seat.id] ?? null;
  };

  const isLocked = (seat: AnySeat) => seat.price == null;

  const goToDetail = (seat: AnySeat) => {
    if (!eventId) return;
    const p = getEffectivePrice(seat);
    router.push(`/seat/${eventId}/detail?section=${seat.section}&row=${seat.row}&type=${encodeURIComponent(seat.type)}&price=${p ?? 0}&seatId=${seat.id}&${venueParams}`);
  };

  const handleSelect = (seat: AnySeat) => {
    if (!isLocked(seat)) { goToDetail(seat); return; }
    if (!presaleUnlocked) { setShowPresaleModal(true); return; }
    goToDetail(seat);
  };

  const handleUnlock = () => {
    if (passcode.trim().toUpperCase() === VALID_PASSCODE) {
      setPresaleUnlocked(true);
      setUnlockError(null);
      setShowPresaleModal(false);
    } else {
      setUnlockError("Invalid passcode. Try POTENTIAL.");
    }
  };

  const pillBase: React.CSSProperties = {
    flex: 1, borderRadius: 999, padding: "11px 10px", fontSize: 13,
    fontWeight: 800, cursor: "pointer", border: "1px solid #d1d5db",
    background: "#ffffff", color: TM_TEXT,
  };

  const pillSelected: React.CSSProperties = {
    ...pillBase, background: "#e8f1ff", border: `1px solid ${TM_BLUE}`, color: TM_BLUE,
  };

  if (!eventId) return <div style={{ padding: 24 }}>Loading…</div>;

  return (
    <div style={{ fontFamily: "system-ui, Arial", background: "#f3f4f6", minHeight: "100vh", color: TM_TEXT }}>
      <div style={{ background: TM_BLUE, height: 4 }} />
      <div style={{ background: TM_BLACK, color: "white", padding: "16px 16px 14px" }}>
        <div style={{ fontSize: 18, fontWeight: 900, fontStyle: "italic", letterSpacing: -0.3, marginBottom: 10 }}>ticketmaster</div>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 900 }}>{tourName}</h2>
        <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.78)", fontSize: 13 }}>
          {day} • {date}, 2026 • {time} — {venue}, {city}
        </p>
      </div>

      <div style={{ background: "#e9edf2", padding: 16, textAlign: "center", borderBottom: "1px solid #d7dde6" }}>
        <button type="button" style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 999, padding: "10px 16px", fontSize: 13, fontWeight: 900, color: TM_TEXT, cursor: "pointer", marginBottom: 12, width: "100%", maxWidth: 520 }}>
          ⇄ Switch to Map
        </button>
        {isBruno ? <BrunoArenaMap /> : <SombrArenaMap />}
      </div>

      <div style={{ padding: "12px 16px", display: "flex", gap: 10 }}>
        <button type="button" style={pillBase}>1 Ticket ▾</button>
        {!isBruno && (
          <button type="button" onClick={() => { setUnlockError(null); setShowPresaleModal(true); }}
            style={{ ...pillBase, border: presaleUnlocked ? "1px solid #16a34a" : pillBase.border, color: presaleUnlocked ? "#166534" : TM_TEXT, background: presaleUnlocked ? "#dcfce7" : "#fff" }}>
            🔒 {presaleUnlocked ? "Unlocked" : "Unlock"}
          </button>
        )}
        <button type="button" onClick={() => setShowFilterModal(true)} style={pillBase}>⚙ Filters</button>
      </div>

      {!isBruno && (
        <div style={{ margin: "0 16px 10px", background: "#fff", borderRadius: 10, padding: "12px 14px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span>📢</span>
              <span style={{ fontSize: 13, fontWeight: 900 }}>PRESALE HAPPENING NOW!</span>
            </div>
            <span style={{ color: TM_BLUE, fontSize: 13, fontWeight: 900, cursor: "pointer" }}>View Sales</span>
          </div>
        </div>
      )}

      <div style={{ margin: "0 16px 10px", background: "#fff7ed", borderRadius: 10, padding: "10px 12px", border: "1px solid #fed7aa" }}>
        <p style={{ margin: 0, fontSize: 13, color: "#7c2d12", fontWeight: 700 }}>
          <strong>All-In Pricing:</strong> Prices include fees (before taxes).
          {isCanada && <span> Prices shown in CA$.</span>}
        </p>
      </div>

      {!isBruno && (
        <>
          <div style={{ margin: "0 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span>⭐</span>
              <strong style={{ fontSize: 15 }}>VIP Packages</strong>
            </div>
            <span style={{ color: TM_BLUE, fontSize: 13, fontWeight: 900, cursor: "pointer" }}>More Info</span>
          </div>
          <div style={{ margin: "0 16px", height: 3, background: "#f59e0b" }} />
        </>
      )}

      {isBruno && !isCanada && (
        <>
          <div style={{ margin: "0 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span>🎤</span>
              <strong style={{ fontSize: 15 }}>Floor & Field Seats</strong>
            </div>
            <span style={{ color: TM_BLUE, fontSize: 13, fontWeight: 900, cursor: "pointer" }}>More Info</span>
          </div>
          <div style={{ margin: "0 16px", height: 3, background: "#7c3aed" }} />
        </>
      )}

      {isCanada && (
        <>
          <div style={{ margin: "0 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span>🍁</span>
              <strong style={{ fontSize: 15 }}>Canadian Venue Tickets</strong>
            </div>
            <span style={{ color: TM_BLUE, fontSize: 13, fontWeight: 900, cursor: "pointer" }}>More Info</span>
          </div>
          <div style={{ margin: "0 16px", height: 3, background: "#dc2626" }} />
        </>
      )}

      <div style={{ margin: "10px 16px 90px" }}>
        {sorted.map((seat) => {
          const locked = isLocked(seat);
          const effective = getEffectivePrice(seat);
          return (
            <div key={seat.id} onClick={() => handleSelect(seat)} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, padding: "14px", display: "flex", gap: 12, alignItems: "center", border: "1px solid #e5e7eb", boxShadow: "0 2px 10px rgba(15,23,42,0.06)", cursor: "pointer" }}>
              <div style={{ width: 46, height: 46, background: "#eef2ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, border: "1px solid #e5e7eb" }}>
                📍
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 950, fontSize: 16, color: TM_TEXT }}>Sec {seat.section} • Row {seat.row}</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 800, color: typeColor(seat.type) }}>
                  {seat.type === "HOMEWRECKER VIP PACKAGE" ? <span>⭐ {seat.type}</span>
                    : seat.type === "Artist Presale" ? <span>🔒 {seat.type}</span>
                    : seat.type === "Resale - Floor/Field" ? <span>🎤 {seat.type}</span>
                    : seat.type === "Featured - Standard" ? <span>⭐ {seat.type}</span>
                    : seat.type === "Verified Resale" ? <span>✅ {seat.type}</span>
                    : seat.type}
                </p>
                {isBruno && <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>Mobile Entry</p>}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                {effective != null ? (
                  <p style={{ margin: 0, fontWeight: 950, fontSize: 17 }}>
                    {isCanada ? "CA $" : "$"}{effective.toFixed(2)}
                  </p>
                ) : (
                  <button type="button" style={{ background: "#fff", border: `2px solid ${TM_BLUE}`, color: TM_BLUE, borderRadius: 10, padding: "8px 12px", fontSize: 13, cursor: "pointer", fontWeight: 950 }}
                    onClick={(e) => { e.stopPropagation(); setUnlockError(null); setShowPresaleModal(true); }}>
                    🔒 Unlock
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {(showPresaleModal || showFilterModal) && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: "16px 16px 0 0", padding: "18px 18px 34px", maxHeight: "90vh", overflowY: "auto", width: "100%", maxWidth: 520 }}>

            {showPresaleModal && !isBruno && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 950 }}>Presale happening now!</h3>
                  <span style={{ fontSize: 22, cursor: "pointer" }} onClick={() => setShowPresaleModal(false)}>✕</span>
                </div>
                <p style={{ fontWeight: 950, margin: "0 0 10px" }}>GET EARLY ACCESS TO TICKETS DURING PRESALE.</p>
                <p style={{ color: TM_MUTED, fontSize: 13, margin: "0 0 10px", fontWeight: 700 }}>Enter Offer Passcode</p>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="POTENTIAL"
                    style={{ flex: 1, padding: "12px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 15, fontWeight: 700, outline: "none" }} />
                  <button type="button" onClick={handleUnlock} style={{ padding: "12px 14px", background: TM_BLUE, color: "white", border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontWeight: 950 }}>Unlock</button>
                </div>
                {unlockError && <p style={{ margin: "0 0 12px", color: "#b91c1c", fontSize: 13, fontWeight: 800 }}>{unlockError}</p>}
                <p style={{ fontWeight: 950, margin: "10px 0" }}>Sort list by</p>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  {["All Tickets", "Top Seats"].map((opt) => {
                    const active = (opt === "All Tickets" && sortBy === "all") || (opt === "Top Seats" && sortBy === "top");
                    return <button key={opt} type="button" onClick={() => setSortBy(opt === "All Tickets" ? "all" : "top")} style={active ? pillSelected : pillBase}>{opt}</button>;
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <strong>Presale Options</strong>
                  <div style={{ fontWeight: 800 }}>
                    <span style={{ color: TM_BLUE, cursor: "pointer" }} onClick={() => setActiveFilters(allTypes)}>Select All</span>
                    <span style={{ color: "#9ca3af" }}> | </span>
                    <span style={{ color: TM_BLUE, cursor: "pointer" }} onClick={() => setActiveFilters([])}>Clear All</span>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "0 0 12px" }} />
                {allTypes.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, cursor: "pointer" }} onClick={() => toggleFilter(t)}>
                    <div style={{ width: 24, height: 24, background: activeFilters.includes(t) ? TM_BLUE : "#fff", border: `2px solid ${TM_BLUE}`, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {activeFilters.includes(t) && <span style={{ color: "white", fontSize: 14, fontWeight: 950 }}>✓</span>}
                    </div>
                    <span style={{ color: typeColor(t), fontWeight: 800 }}>{t}</span>
                  </div>
                ))}
                <button type="button" onClick={() => setShowPresaleModal(false)} style={{ width: "100%", padding: 14, background: TM_BLUE, color: "white", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 950, cursor: "pointer", marginTop: 6 }}>View Seats</button>
              </>
            )}

            {showFilterModal && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontWeight: 950 }}>Filters</h3>
                  <span style={{ fontSize: 22, cursor: "pointer" }} onClick={() => setShowFilterModal(false)}>✕</span>
                </div>
                <p style={{ fontWeight: 950, margin: "0 0 10px" }}>Sort by</p>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  {["All Tickets", "Top Seats"].map((opt) => {
                    const active = (opt === "All Tickets" && sortBy === "all") || (opt === "Top Seats" && sortBy === "top");
                    return <button key={opt} type="button" onClick={() => setSortBy(opt === "All Tickets" ? "all" : "top")} style={active ? pillSelected : pillBase}>{opt}</button>;
                  })}
                </div>
                <p style={{ fontWeight: 950, margin: "0 0 10px" }}>Ticket Type</p>
                {allTypes.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, cursor: "pointer" }} onClick={() => toggleFilter(t)}>
                    <div style={{ width: 24, height: 24, background: activeFilters.includes(t) ? TM_BLUE : "#fff", border: `2px solid ${TM_BLUE}`, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {activeFilters.includes(t) && <span style={{ color: "white", fontSize: 14, fontWeight: 950 }}>✓</span>}
                    </div>
                    <span style={{ color: typeColor(t), fontWeight: 800 }}>{t}</span>
                  </div>
                ))}
                <button type="button" onClick={() => setShowFilterModal(false)} style={{ width: "100%", padding: 14, background: TM_BLUE, color: "white", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 950, cursor: "pointer", marginTop: 6 }}>Apply Filters</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
