import { Icon } from "@/components/ui/icon";
import { business, telLink } from "@/lib/data/business";

/** شريط علوي رفيع (.ubar من نظام التصميم) — قيمة مضافة + اتصال سريع. */
export function UtilityBar() {
  return (
    <div className="ubar">
      <div className="wrap">
        <span className="uitem">
          <Icon name="truck" /> توصيل وتركيب احترافي
        </span>
        <span className="uitem max-sm:hidden">
          <Icon name="shield" /> ضمان على الجودة
        </span>
        <span className="spacer" />
        <span className="uitem max-sm:hidden">
          <Icon name="location" /> {business.address.city}
        </span>
        <a href={telLink} dir="ltr" className="uitem font-semibold">
          <Icon name="phone" /> {business.phone.display}
        </a>
      </div>
    </div>
  );
}
