import { Icon } from "@/components/ui/icon";
import { whatsappLink } from "@/lib/data/business";

/** زر واتساب عائم — رابط حقيقي (بلا حالة)، ثابت أسفل الشاشة. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("السلام عليكم، أرغب بالاستفسار عن الموكيت والأرضيات.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-5 end-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  );
}
