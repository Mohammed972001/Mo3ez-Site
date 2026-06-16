import { Icon } from "@/components/ui/icon";
import { business, telLink } from "@/lib/data/business";

/** شريط علوي رفيع — قيمة مضافة + اتصال سريع. */
export function UtilityBar() {
  return (
    <div className="bg-primary text-on-primary">
      <div className="mx-auto flex h-9 max-w-[1280px] items-center gap-4 px-4 text-[12.5px] sm:px-6">
        <span className="flex items-center gap-1.5">
          <Icon name="truck" className="size-4" />
          توصيل وتركيب احترافي
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <Icon name="shield" className="size-4" />
          ضمان على الجودة
        </span>
        <span className="ms-auto flex items-center gap-1.5">
          <Icon name="location" className="size-4" />
          {business.address.city}
        </span>
        <a href={telLink} dir="ltr" className="flex items-center gap-1.5 font-semibold hover:underline">
          <Icon name="phone" className="size-4" />
          {business.phone.display}
        </a>
      </div>
    </div>
  );
}
