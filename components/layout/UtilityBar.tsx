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
        <span className="uitem u-sec">
          <Icon name="shield" /> ضمان على الجودة
        </span>
        <span className="spacer" />
        <span className="uitem u-sec">
          <Icon name="location" /> {business.address.city}
        </span>
        <a href={telLink} className="uitem font-semibold" aria-label={`اتصل بنا: ${business.phone.display}`}>
          <Icon name="phone" /> <bdi dir="ltr">{business.phone.display}</bdi>
        </a>
      </div>
    </div>
  );
}
