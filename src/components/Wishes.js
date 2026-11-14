import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchWishes, addWish, verifyAdmin, deleteWish } from "../api";
import { Heart, Lock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "./Ornaments";
import CoverFlow from "./CoverFlow";

const ADMIN_KEY = "dd_wish_admin_pin";

const labelCls = "block text-[10px] uppercase tracking-[0.3em] text-golddeep mb-2";
const inputCls =
  "w-full bg-transparent border-b border-golddeep/40 focus:border-maroon outline-none py-2.5 text-cocoa placeholder:text-cocoa-soft/40 transition-colors duration-300";

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");

  useEffect(() => {
    fetchWishes()
      .then((list) => setWishes(list))
      .catch(() => {})
      .finally(() => setLoaded(true));
    if (sessionStorage.getItem(ADMIN_KEY)) setAdmin(true);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please add your name and a blessing.");
      return;
    }
    setSending(true);
    try {
      const data = await addWish({
        name: name.trim(),
        message: message.trim(),
      });
      setWishes((w) => [{ id: data.id, name: name.trim(), message: message.trim() }, ...w]);
      setName("");
      setMessage("");
      toast.success("Your blessing has been shared with love.");
    } catch {
      toast.error("Something went wrong. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const unlock = async () => {
    if (!pinInput.trim()) return;
    try {
      await verifyAdmin(pinInput.trim());
      sessionStorage.setItem(ADMIN_KEY, pinInput.trim());
      setAdmin(true);
      setPinOpen(false);
      setPinInput("");
      toast.success("Admin mode enabled — you can now remove blessings");
    } catch {
      toast.error("Incorrect PIN");
    }
  };

  const removeWish = async (id) => {
    try {
      await deleteWish(id, sessionStorage.getItem(ADMIN_KEY) || "");
      setWishes((w) => w.filter((x) => x.id !== id));
      toast.success("Blessing removed");
    } catch (err) {
      if (err?.response?.status === 401) {
        sessionStorage.removeItem(ADMIN_KEY);
        setAdmin(false);
        toast.error("Admin session expired — please enter the PIN again");
      } else {
        toast.error("Could not remove this blessing");
      }
    }
  };

  const exitAdmin = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setAdmin(false);
  };

  return (
    <section id="wishes" className="relative py-24 md:py-32 bg-ivory" data-testid="wishes-section">
      <SectionHeading
        eyebrow="Share your love"
        title="Blessings for the Couple"
        sub="Leave a wish for Tanishk & Aishwarya — it will appear here for everyone to read."
      />

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="royal-frame bg-champagne rounded-lg max-w-xl mx-auto mt-14 px-7 py-9 md:px-10 shadow-gold-soft"
      >
        <form onSubmit={submit} data-testid="wish-form" className="space-y-7">
          <div>
            <label htmlFor="wish-name" className={labelCls}>Your name</label>
            <input
              id="wish-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputCls}
              data-testid="wish-name-input"
            />
          </div>
          <div>
            <label htmlFor="wish-message" className={labelCls}>Your blessing</label>
            <textarea
              id="wish-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A heartfelt wish for the couple…"
              className={`${inputCls} resize-none`}
              data-testid="wish-message-input"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            data-testid="wish-submit-button"
            className="w-full bg-maroondark text-gold text-[11px] md:text-xs uppercase tracking-[0.3em] py-4 rounded-full border border-gold/50 transition-colors duration-300 hover:bg-maroon disabled:opacity-60"
          >
            {sending ? "Sharing…" : "Share Your Blessing"}
          </button>
        </form>
      </motion.div>

      <div className="max-w-5xl mx-auto mt-14 px-2" data-testid="wishes-wall">
        {loaded && wishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
            data-testid="wishes-empty"
          >
            <Heart size={22} className="text-golddeep mx-auto" />
            <p className="font-display italic text-lg text-cocoa-soft mt-4">
              Be the first to bless the happy couple.
            </p>
          </motion.div>
        ) : (
          <CoverFlow
            items={wishes}
            testidPrefix="wishes"
            cardHeight={380}
            renderItem={(w, i) => (
              <div
                className="royal-frame bg-champagne rounded-lg p-6 md:p-7 h-[300px] md:h-[340px] flex flex-col relative"
                data-testid={`wish-card-${i}`}
              >
                {admin && (
                  <button
                    onClick={() => removeWish(w.id)}
                    aria-label="Delete blessing"
                    data-testid={`wish-delete-${i}`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-maroon text-ivory flex items-center justify-center hover:bg-maroondark transition-colors duration-300 z-10"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
                <Heart size={14} className="text-golddeep" fill="currentColor" />
                <p className="font-display italic text-lg text-cocoa leading-relaxed mt-3 flex-1 overflow-hidden">
                  &ldquo;{w.message}&rdquo;
                </p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-golddeep mt-4">
                  — {w.name}
                </p>
              </div>
            )}
          />
        )}
      </div>

      <div className="text-center mt-10" data-testid="wishes-admin-area">
        {admin ? (
          <button
            onClick={exitAdmin}
            data-testid="wishes-admin-exit-button"
            className="text-[10px] uppercase tracking-[0.3em] text-cocoa-soft/60 hover:text-maroon transition-colors duration-300"
          >
            Exit admin mode
          </button>
        ) : pinOpen ? (
          <div className="inline-flex flex-col sm:flex-row items-center gap-3">
            <input
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              placeholder="Admin PIN"
              className="bg-transparent border-b border-golddeep/40 focus:border-maroon outline-none py-1.5 text-cocoa text-center w-36 placeholder:text-cocoa-soft/40"
              data-testid="wish-admin-pin-input"
            />
            <button
              onClick={unlock}
              data-testid="wish-admin-unlock-button"
              className="text-[10px] uppercase tracking-[0.25em] border border-golddeep/50 text-golddeep px-5 py-2 rounded-full hover:bg-maroon hover:text-ivory hover:border-maroon transition-colors duration-300"
            >
              Unlock
            </button>
          </div>
        ) : (
          <button
            onClick={() => setPinOpen(true)}
            data-testid="wishes-manage-button"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cocoa-soft/60 hover:text-golddeep transition-colors duration-300"
          >
            <Lock size={11} />
            Manage wishes
          </button>
        )}
      </div>
    </section>
  );
}
