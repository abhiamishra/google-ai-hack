import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

// const { blog_folder, summary_length } = config.settings;

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section d-flex justify-content-center align-items-center">
          <div className="col-12 md:col-6 lg:col-3 text-center">
            <form
              className="contact-form"
              method="POST"
              action={contact_form_action}
            >
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="passw"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              {/* <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  placeholder="Your message"
                />
              </div> */}
              {/* <button type="submit" className="btn btn-primary">
                Submit
              </button> */}
              <Link className="btn btn-primary mt-4"
                href={`/checklist`}
                rel="">
                Submit
              </Link>
            </form>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            {/* <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;