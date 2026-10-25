import { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { site, sectionNumber } from '../data/site.js';
import Reveal from '../components/Reveal.jsx';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

function Field({ id, label, error, as = 'input', ...props }) {
  const Tag = as;
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block">{label}</label>
      <Tag
        id={id}
        name={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-ink-850 px-4 py-3 text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none ${
          error ? 'border-red-400/60' : 'border-line'
        }`}
        {...props}
      />
      {error && <p id={`${id}-error`} className="mt-2 text-sm text-red-300">{error}</p>}
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '', botcheck: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (values.botcheck) return; // honeypot

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${values.name}`,
          from_name: 'Portfolio contact form',
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      // Only report success when the service confirms it.
      if (res.ok && data.success) {
        setStatus('success');
        setValues({ name: '', email: '', message: '', botcheck: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'The message could not be sent. Please try again later.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error — the message was not sent. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center rounded-2xl border border-line bg-ink-850 p-8">
        <CheckCircle2 className="text-accent" size={28} aria-hidden="true" />
        <p className="mt-4 text-xl font-semibold">Message sent.</p>
        <p className="mt-2 text-fg-muted">Thanks for reaching out — I'll reply as soon as I can.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-6 min-h-11 text-sm underline decoration-accent underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" checked={!!values.botcheck} onChange={(e) => setValues((v) => ({ ...v, botcheck: e.target.checked ? 'on' : '' }))} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
        <Field id="email" label="Email" type="email" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} />
      </div>
      <Field id="message" label="Message" as="textarea" rows={5} value={values.message} onChange={onChange} error={errors.message} />

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-200">
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-ink-900 transition-opacity disabled:opacity-60"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  );
}

// Shown instead of the form when no access key is configured. Setup instructions are dev-only;
// visitors to a deployed site without a key see a neutral note instead.
function SetupNotice({ hasLinks }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong p-6 text-fg-muted md:p-8">
      {import.meta.env.DEV ? (
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Contact form not configured</p>
          <p className="mt-3 text-sm leading-relaxed">
            Set <code className="font-mono text-fg">VITE_WEB3FORMS_ACCESS_KEY</code> in{' '}
            <code className="font-mono text-fg">.env.local</code> (or in your hosting provider's environment settings) to
            enable the form. This notice is only shown in development.
          </p>
        </>
      ) : (
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Contact form</p>
          <p className="mt-3 text-sm leading-relaxed">
            The contact form isn't available right now.
            {hasLinks && ' Please reach out through one of the links on this page.'}
          </p>
        </>
      )}
    </div>
  );
}

export default function Contact() {
  const links = [
    site.email && { href: `mailto:${site.email}`, label: site.email, icon: Mail, external: false },
    site.github && { href: site.github, label: 'GitHub', icon: Github, external: true },
    site.linkedin && { href: site.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
  ].filter(Boolean);

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">{sectionNumber('contact')}</span>
              <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
              Contact
            </p>
            <h2 id="contact-title" className="display-xl mt-6">Let's connect.</h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-fg-muted">
              Questions about my work, a project, or an idea worth discussing — I'm happy to hear from you.
            </p>
          </Reveal>

          {links.length > 0 && (
            <Reveal delay={0.1}>
              <ul className="mt-10 border-t border-line">
                {links.map(({ href, label, icon: Icon, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center justify-between border-b border-line py-5 transition-colors hover:text-accent"
                    >
                      <span className="flex items-center gap-3"><Icon size={18} aria-hidden="true" /> {label}</span>
                      <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          {ACCESS_KEY ? <ContactForm /> : <SetupNotice hasLinks={links.length > 0} />}
        </Reveal>
      </div>
    </section>
  );
}
