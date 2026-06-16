import {
    FaGoogle,
    FaApple,
    FaLinkedin,
    FaFacebook,
} from "react-icons/fa";

export function SocialButtons() {
    return (
        <div className="grid grid-cols-2 gap-3">
            <button
                type="button"
                className="
          flex
          items-center
          justify-center
          gap-2
          h-10
          rounded-md
          border
          border-slate-200
          text-sm
          hover:bg-slate-50
        "
            >
                <FaGoogle />
                Sign in with Google
            </button>

            <button
                type="button"
                className="
          flex
          items-center
          justify-center
          gap-2
          h-10
          rounded-md
          border
          border-slate-200
          text-sm
          hover:bg-slate-50
        "
            >
                <FaApple />
                Sign in with Apple
            </button>

            <button
                type="button"
                className="
          flex
          items-center
          justify-center
          gap-2
          h-10
          rounded-md
          border
          border-slate-200
          text-sm
          hover:bg-slate-50
        "
            >
                <FaLinkedin />
                Sign in with LinkedIn
            </button>

            <button
                type="button"
                className="
          flex
          items-center
          justify-center
          gap-2
          h-10
          rounded-md
          border
          border-slate-200
          text-sm
          hover:bg-slate-50
        "
            >
                <FaFacebook />
                Sign in with Facebook
            </button>
        </div>
    );
}