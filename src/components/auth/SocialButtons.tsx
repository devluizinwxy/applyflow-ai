import { FcGoogle } from "react-icons/fc";
import {
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
          bg-white
          text-sm
          text-black
          cursor-pointer
          transition-colors
          hover:bg-slate-50
        "
            >
                <FcGoogle size={19} />
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
          bg-white
          text-sm
          text-black
          cursor-pointer
          transition-colors
          hover:bg-slate-50
        "
            >
                <FaApple size={19} />
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
          bg-white
          text-sm
          text-black
          cursor-pointer
          transition-colors
          hover:bg-slate-50
        "
            >
                <FaLinkedin
                    size={19}
                    className="text-[#0A66C2]"
                />
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
          bg-white
          text-sm
          text-black
          cursor-pointer
          transition-colors
          hover:bg-slate-50
        "
            >
                <FaFacebook
                    size={19}
                    className="text-[#1877F2]"
                />
                Sign in with Facebook
            </button>
        </div>
    );
}