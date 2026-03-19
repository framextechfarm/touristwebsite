import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 pt-20 md:pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">SMR Holidays</span>
            </div>
            <p className="text-foreground/60 leading-relaxed text-[15px]">
              Making mountain adventures accessible and safe for everyone. Join us for a journey of a lifetime.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/smr.holidays" target="_blank" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary active:scale-95 transition-all group shadow-sm">
                <Instagram size={18} className="text-foreground/70 group-hover:text-white transition-colors" />
              </Link>
              <Link href="https://www.facebook.com/share/1KrRLbZgEt/" target="_blank" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary active:scale-95 transition-all group shadow-sm">
                <Facebook size={18} className="text-foreground/70 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 md:mb-8 text-lg text-foreground">Company</h5>
            <ul className="space-y-4 text-foreground/60 text-[15px]">
              <li><Link href="#" className="hover:text-primary transition-colors inline-block py-1">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-block py-1">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-block py-1">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-block py-1">Press Kit</Link></li>
              <li><Link href="/admin/images" className="hover:text-primary transition-colors inline-block py-1 text-primary/70 font-bold">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 md:mb-8 text-lg text-foreground">Support</h5>
            <ul className="space-y-4 text-foreground/60 text-[15px]">
              <li><Link href="#" className="hover:text-primary transition-colors inline-block py-1">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-block py-1">Safety Guides</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-block py-1">Cancellation Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-block py-1">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 md:mb-8 text-lg text-foreground">Contact Us</h5>
            <ul className="space-y-6 text-foreground/60 text-[15px]">
              <li>
                <Link href="https://wa.me/919003922073" target="_blank" className="flex items-center gap-4 hover:text-primary transition-colors group">
                  <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-secondary/80 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 md:w-4 md:h-4 text-foreground group-hover:text-primary" />
                  </div>
                  <span className="flex-1">WhatsApp: 9003922073</span>
                </Link>
              </li>
              <li>
                <Link href="mailto:smrholidayskkl@gmail.com" className="flex items-center gap-4 hover:text-primary transition-colors group">
                  <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-secondary/80 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 md:w-4 md:h-4 text-foreground group-hover:text-primary" />
                  </div>
                  <span className="flex-1 break-all">smrholidayskkl@gmail.com</span>
                </Link>
              </li>
              <li>
                <Link href="https://share.google/GF1cjMuX67fisj4N7" target="_blank" className="flex items-center gap-4 hover:text-primary transition-colors group">
                  <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-secondary/80 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5 md:w-4 md:h-4 text-foreground group-hover:text-primary" />
                  </div>
                  <span className="flex-1">Locate us on Google Maps</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-foreground/50 text-xs tracking-wider font-medium uppercase leading-relaxed">
          <p>designed and developed by JAMES ANDREW | FRAMEX TECH 2026 COPYRIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
