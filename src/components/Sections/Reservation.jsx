import { useEffect, useRef, useState } from "react";
import { site } from "../../Data/Site";
import {
  buildReservationMessage,
  cx,
  getTodayStatus,
  isTodo,
  isValidIndianMobile,
  todayISO,
  whatsappHref,
} from "../../Lib/utils";
import { buttonClasses } from "../Ui/Button";
import Reveal from "../Ui/Reveal";
import TodoBadge from "../Ui/TodoBadge";
import {
  AlertIcon,
  CalendarIcon,
  CheckIcon,
  PhoneIcon,
  UsersIcon,
  WhatsAppIcon,
} from "../Ui/Icons";

const initialForm = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  notes: "",
  company: "",
};

function validate(form) {
  const errors = {};
  const name = form.name.trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  if (name.length > 80) errors.name = "Please use 80 characters or fewer.";

  if (!isValidIndianMobile(form.phone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }

  const minDate = todayISO();
  if (!form.date) errors.date = "Please choose a date.";
  else if (form.date < minDate) errors.date = "Choose today or a future date.";

  if (!form.time) errors.time = "Please choose a time.";

  const guests = Number(form.guests);
  if (
    !Number.isInteger(guests) ||
    guests < site.reservation.minGuests ||
    guests > site.reservation.maxGuests
  ) {
    errors.guests = `Choose between ${site.reservation.minGuests} and ${site.reservation.maxGuests} guests.`;
  }

  if (form.notes.length > 500) {
    errors.notes = "Please keep your request under 500 characters.";
  }

  return errors;
}

export default function Reservation() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const whatsapp = whatsappHref(site.whatsapp);
  const submitted = status === "success";
  const minDate = todayISO();
  const todayStatus = getTodayStatus(site.hours, site.timezone);

  useEffect(() => {
    if (["success", "fallback", "error"].includes(status)) {
      statusRef.current?.focus();
    }
  }, [status]);

  const update = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status === "fallback" || status === "error") setStatus("idle");
  };

  const focusFirstError = (nextErrors) => {
    const first = Object.keys(nextErrors)[0];
    if (!first) return;
    window.requestAnimationFrame(() => {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (form.company.trim() !== "") {
      setForm(initialForm);
      setStatus("success");
      return;
    }

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    if (isTodo(site.reservation.endpoint)) {
      setStatus(whatsapp ? "fallback" : "error");
      setMessage(whatsapp ? "" : site.reservation.errorMessage);
      return;
    }

    setStatus("submitting");
    setMessage("");

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      guests: Number(form.guests),
      notes: form.notes.trim(),
      source: "website",
      submittedAt: new Date().toISOString(),
    };

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(site.reservation.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Reservation request failed");
      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage(site.reservation.errorMessage);
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const fieldClass = (field) =>
    cx(
      "mt-1.5 block min-h-11 w-full rounded-xl border bg-white/70 px-3.5 py-2.5 text-base text-espresso placeholder:text-espresso/65 transition-colors focus:border-wood-deep",
      errors[field] ? "border-brick" : "border-espresso/20",
    );

  const errorProps = (field) => ({
    "aria-invalid": errors[field] ? "true" : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <section id="reserve" className="border-y border-espresso/10 bg-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-wood-deep">
              <CalendarIcon className="h-4 w-4" />
              Book ahead
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-espresso sm:text-5xl">
              Reserve a table
            </h2>

            <div className="mt-8 rounded-3xl border border-espresso/10 bg-white/45 p-5 shadow-[0_24px_70px_-50px_rgba(43,27,20,0.6)] sm:p-7">
              {submitted ? (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="status"
                  className="rounded-2xl border border-green-700/20 bg-green-700/[0.06] p-5 focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 text-cream">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-espresso">
                        Request received
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-espresso/70">
                        {site.reservation.successMessage}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setForm(initialForm);
                        }}
                        className={buttonClasses({
                          variant: "outline-dark",
                          size: "sm",
                          className: "mt-4",
                        })}
                      >
                        Send another request
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-busy={status === "submitting"}
                >
                  {(status === "fallback" || status === "error") && (
                    <div
                      ref={statusRef}
                      tabIndex={-1}
                      role={status === "error" ? "alert" : "status"}
                      className={cx(
                        "mb-6 rounded-2xl border p-4 focus:outline-none",
                        status === "error"
                          ? "border-brick/25 bg-brick/[0.05]"
                          : "border-amber/40 bg-amber/10",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {status === "error" ? (
                          <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-brick" />
                        ) : (
                          <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-wood" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm leading-relaxed text-espresso/80">
                            {status === "fallback"
                              ? site.reservation.fallbackNote
                              : message}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {whatsapp && (
                              <a
                                href={whatsappHref(
                                  site.whatsapp,
                                  buildReservationMessage(site, form),
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={buttonClasses({
                                  variant: "primary",
                                  size: "sm",
                                })}
                              >
                                <WhatsAppIcon className="h-4 w-4" />
                                {site.reservation.whatsappLabel}
                              </a>
                            )}
                            <a
                              href={`tel:${site.phone.tel}`}
                              className={buttonClasses({
                                variant: "outline-dark",
                                size: "sm",
                              })}
                            >
                              <PhoneIcon className="h-4 w-4" />
                              Call {site.phone.display}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="res-name" className="text-sm font-semibold text-espresso">
                        Name
                      </label>
                      <input
                        id="res-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={update("name")}
                        className={fieldClass("name")}
                        placeholder="Your name"
                        {...errorProps("name")}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs font-medium text-brick">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="res-phone" className="text-sm font-semibold text-espresso">
                        Phone
                      </label>
                      <input
                        id="res-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        value={form.phone}
                        onChange={update("phone")}
                        className={fieldClass("phone")}
                        placeholder="10-digit mobile number"
                        {...errorProps("phone")}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-xs font-medium text-brick">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="res-date" className="text-sm font-semibold text-espresso">
                        Date
                      </label>
                      <input
                        id="res-date"
                        name="date"
                        type="date"
                        required
                        min={minDate}
                        value={form.date}
                        onChange={update("date")}
                        className={fieldClass("date")}
                        {...errorProps("date")}
                      />
                      {errors.date && (
                        <p id="date-error" className="mt-1 text-xs font-medium text-brick">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="res-time" className="text-sm font-semibold text-espresso">
                        Time
                      </label>
                      <input
                        id="res-time"
                        name="time"
                        type="time"
                        required
                        value={form.time}
                        onChange={update("time")}
                        className={fieldClass("time")}
                        {...errorProps("time")}
                      />
                      {errors.time && (
                        <p id="time-error" className="mt-1 text-xs font-medium text-brick">
                          {errors.time}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="res-guests" className="text-sm font-semibold text-espresso">
                        Number of guests
                      </label>
                      <div className="relative">
                        <UsersIcon className="pointer-events-none absolute left-3.5 top-1/2 mt-0.5 h-4 w-4 -translate-y-1/2 text-espresso/40" />
                        <input
                          id="res-guests"
                          name="guests"
                          type="number"
                          inputMode="numeric"
                          min={site.reservation.minGuests}
                          max={site.reservation.maxGuests}
                          step="1"
                          required
                          value={form.guests}
                          onChange={update("guests")}
                          className={cx(fieldClass("guests"), "pl-10")}
                          {...errorProps("guests")}
                        />
                      </div>
                      {errors.guests && (
                        <p id="guests-error" className="mt-1 text-xs font-medium text-brick">
                          {errors.guests}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="res-notes" className="text-sm font-semibold text-espresso">
                        Special request{" "}
                        <span className="font-normal text-espresso/65">(optional)</span>
                      </label>
                      <textarea
                        id="res-notes"
                        name="notes"
                        rows={3}
                        maxLength={500}
                        value={form.notes}
                        onChange={update("notes")}
                        className={cx(fieldClass("notes"), "min-h-24 resize-y")}
                        placeholder="Birthday, high chair, dietary needs…"
                        {...errorProps("notes")}
                      />
                      {errors.notes && (
                        <p id="notes-error" className="mt-1 text-xs font-medium text-brick">
                          {errors.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="res-company">Company</label>
                    <input
                      id="res-company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company}
                      onChange={update("company")}
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className={buttonClasses({
                        variant: "primary",
                        size: "lg",
                        className: "w-full",
                      })}
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream" />
                          {site.reservation.submittingLabel}
                        </>
                      ) : (
                        site.reservation.submitLabel
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs leading-relaxed text-espresso/70">
                      {site.reservation.confirmationNote}
                      {isTodo(site.reservation.endpoint) && (
                        <span className="ml-2 inline-flex">
                          <TodoBadge label="reservation endpoint" />
                        </span>
                      )}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={100} className="focus-on-dark self-start rounded-3xl bg-espresso p-6 text-cream sm:p-8 lg:mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber">
              Prefer to talk?
            </p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-cream">
              We are happy to help
            </h3>
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-5 inline-flex items-center gap-2 font-display text-2xl text-amber transition-colors hover:text-cream"
            >
              <PhoneIcon className="h-5 w-5" />
              {site.phone.display}
            </a>

            <div className="mt-5">
              {whatsapp ? (
                <a
                  href={whatsappHref(
                    site.whatsapp,
                    `Hello ${site.shortName}, I would like to reserve a table.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({
                    variant: "outline-light",
                    className: "w-full",
                  })}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              ) : (
                import.meta.env.DEV && (
                  <p className="flex items-center gap-2 text-sm text-cream/50">
                    WhatsApp <TodoBadge label="WhatsApp number" />
                  </p>
                )
              )}
            </div>

            <div className="mt-7 border-t border-cream/10 pt-5">
              <p className="text-sm leading-relaxed text-cream/70">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.state} {site.address.pin}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-cream/55">
                {site.reservation.confirmationNote}
              </p>
              {todayStatus && (
                <p className="mt-4 text-sm text-cream/55">
                  Today: {todayStatus.label} · {todayStatus.hoursLabel}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
