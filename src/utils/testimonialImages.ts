
import asger from "@/assets/testimonial/asger.jpg";
import desire from "@/assets/testimonial/desire.jpeg";
import lenny from "@/assets/testimonial/lenny.jpg";
import jony from "@/assets/testimonial/jony.jpg";
import heshan from "@/assets/testimonial/heshan.jpg";
import fredrik2 from "@/assets/testimonial/fredrik2.jpg";
import timothy from "@/assets/testimonial/timothy.jpg";
import erfan from "@/assets/testimonial/erfan.jpg";
import rebecca from "@/assets/testimonial/rebecca.jpg";
import fredrik from "@/assets/testimonial/fredrik.jpg";
import david from "@/assets/testimonial/david.jpg";
import klas from "@/assets/testimonial/klas.jpg";

const imageMap: Record<string, { src: string }> = {
    "/img/testimonial/asger.jpg": asger,
    "/img/testimonial/desire.jpeg": desire,
    "/img/testimonial/lenny.jpg": lenny,
    "/img/testimonial/jony.jpg": jony,
    "/img/testimonial/heshan.jpg": heshan,
    "/img/testimonial/fredrik2.jpg": fredrik2,
    "/img/testimonial/timothy.jpg": timothy,
    "/img/testimonial/erfan.jpg": erfan,
    "/img/testimonial/rebecca.jpg": rebecca,
    "/img/testimonial/fredrik.jpg": fredrik,
    "/img/testimonial/david.jpg": david,
    "/img/testimonial/klas.jpg": klas,
};

export function getTestimonialImage(path: string): string {
    const image = imageMap[path];
    return image ? image.src : path;
}
