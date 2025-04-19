'use client'

const ContactPage = () => {
  return (
    <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have questions, suggestions, or need support? Feel free to reach out.
      </p>

      <form className="grid gap-6 text-left">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message here..."
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactPage
