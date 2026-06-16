"use client";

export default function ProfileForm() {
  return (
    <div className="w-full">

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Edit Personal Information
      </h2>

      <form className="space-y-5">

        {/* Nome */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              First Name
            </label>

            <input
              type="text"
              placeholder="John"
              className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              px-4
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              transition-colors
              "
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              Last Name
            </label>

            <input
              type="text"
              placeholder="Doe"
              className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              px-4
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              transition-colors
              "
            />
          </div>

        </div>

        {/* Email e Telefone */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              px-4
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              transition-colors
              "
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              Phone
            </label>

            <input
              type="text"
              placeholder="+55 (11) 99999-9999"
              className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              px-4
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              transition-colors
              "
            />
          </div>

        </div>

        {/* LinkedIn e Portfolio */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              LinkedIn URL
            </label>

            <input
              type="url"
              placeholder="https://linkedin.com/in/..."
              className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              px-4
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              transition-colors
              "
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              Portfolio URL
            </label>

            <input
              type="url"
              placeholder="https://myportfolio.com"
              className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              px-4
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              transition-colors
              "
            />
          </div>

        </div>

        {/* Localização */}
        <div>

          <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
            Location
          </label>

          <input
            type="text"
            placeholder="São Paulo, SP"
            className="
            w-full
            h-11
            rounded-xl
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            text-slate-900
            dark:text-white
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-sky-500
            transition-colors
            "
          />

        </div>

        {/* Botão */}
        <button
          type="submit"
          className="
          w-full
          h-11
          rounded-xl
          bg-sky-500
          hover:bg-sky-600
          text-white
          text-sm
          font-medium
          transition-colors
          "
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}