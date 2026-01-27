// src/utils/roleImageMap.ts
// Utility to map role image paths to imported images

import seniorEngineer from "@/assets/roles/Senior Software Engineer.png";
import productEngineer from "@/assets/roles/Product Engineer.png";
import engineeringManager from "@/assets/roles/Engineering Manage.png";
import devops from "@/assets/roles/devops.png";
import musicProduction from "@/assets/roles/Music Production.png";

const imageMap: Record<string, any> = {
  "/img/roles/Senior Software Engineer.png": seniorEngineer,
  "/img/roles/Product Engineer.png": productEngineer,
  "/img/roles/Engineering Manage.png": engineeringManager,
  "/img/roles/devops.png": devops,
  "/img/roles/Music Production.png": musicProduction,
};

export function getRoleImage(imagePath: string) {
  return imageMap[imagePath];
}
